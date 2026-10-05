import express from "express";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import "dotenv/config";

const app = express();

const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

const db = new pg.Client({
  host: "localhost",
  port: 5432,
  database: "shop-list",
  user: "postgres",
  password: process.env.DB_PASSWORD,
});

db.connect()
  .then(() => console.log("DATABASE CONNECTED"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.get("/shop-list", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  const result = await db.query(
    "SELECT * FROM items WHERE user_id = $1",
    [req.session.userId]
  );

  res.render("shop-list.ejs", {
    items: result.rows
  });
});

app.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, hashedPassword]
  );

  res.redirect("/login");
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const result = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    return res.redirect("/login");
  }

  const user = result.rows[0];

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    return res.redirect("/login");
  }
req.session.userId = user.id;

res.redirect("/shop-list");
});
app.post("/add-item", async (req, res) => {
  const item = req.body.item;
  const userId = req.session.userId;

  await db.query(
    "INSERT INTO items (itemname, user_id) VALUES ($1, $2)",
    [item, userId]
  );

  res.redirect("/shop-list");
});

app.post("/complete-item", async (req, res) => {
  const itemId = req.body.completed;

 await db.query(
  "UPDATE items SET completed = NOT completed WHERE id = $1 AND user_id = $2",
  [itemId, req.session.userId]
);

  res.redirect("/shop-list");
});

app.get("/edit/:id", async (req, res) => {
  const itemId = req.params.id;

  const result = await db.query(
    "SELECT * FROM items WHERE id = $1 AND user_id = $2",
    [itemId, req.session.userId]
  );

  res.render("edit-item.ejs", {
    item: result.rows[0]
  });
});
app.post("/edit-item", async (req, res) => {
  const itemId = req.body.id;
  const item = req.body.item;

 

  await db.query(
    "UPDATE items SET itemname = $1 WHERE id = $2 AND user_id = $3",
    [item, itemId, req.session.userId]
  );

  res.redirect("/shop-list");
});
app.post("/delete-item", async (req, res) => {
  const itemId = req.body.id;

 

  await db.query(
    "DELETE FROM items WHERE id = $1 AND user_id = $2",
    [itemId, req.session.userId]
  );

  res.redirect("/shop-list");
});
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
app.listen(port, () => {
  console.log("server is running on port 3000");
});