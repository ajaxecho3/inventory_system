const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

const db = mysql.createConnection({
  host: "localhost",
  password: "",
  user: "root",
  database: "inventory_management_system",
});
const port = process.env.PORT || 5000;

//test connection
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

//create table script
db.query(
  "CREATE TABLE IF NOT EXISTS products (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), price INT, quantity INT, category VARCHAR(255), description VARCHAR(256), brand VARCHAR(255))",
  (err, result) => {
    if (err) {
      throw err;
    }
    console.log("Table created");
  },
);

//create supplier table
db.query(
  "CREATE TABLE IF NOT EXISTS suppliers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255), mobile VARCHAR(255), product_id INT, FOREIGN KEY (product_id) REFERENCES products(id))",
  (err, result) => {
    if (err) {
      throw err;
    }
    console.log("Table created");
  },
);



app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

//create product
app.post("/product", (req, res) => {
  const { name, price, quantity, category, description, brand } = req.body;
  db.query(
    "INSERT INTO products (name, price, quantity, category, description, brand) VALUES (?,?,?,?,?,?)",
    [name, price, quantity, category, description, brand],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("Product added");
    },
  );
});

//update product
app.put("/product/:id", (req, res) => {
  const id = req.params.id;
  const { name, price, quantity, category, description, brand } = req.body;
  db.query(
    "UPDATE products SET name = ?, price = ?, quantity = ?, category = ?, description = ?, brand = ? WHERE id = ?",
    [name, price, quantity, category, description, brand, id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("Product updated");
    },
  );
});

//delete product
app.delete("/product/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM products WHERE id = ?", id, (err, result) => {
    if (err) {
      throw err;
    }
    res.send("Product deleted");
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
