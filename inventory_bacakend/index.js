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

// Create suppliers table
const createSuppliersTableQuery = `
  CREATE TABLE IF NOT EXISTS suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    mobile VARCHAR(255)
  )
`;

db.query(createSuppliersTableQuery, (err, result) => {
  if (err) {
    console.error('Error creating suppliers table: ', err);
    return;
  }
  console.log("Suppliers table created");
});

// Create products table
const createProductsTableQuery = `
  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price INT,
    quantity INT,
    category VARCHAR(255),
    description VARCHAR(256),
    brand VARCHAR(255),
    supplier_id INT,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
  )
`;

db.query(createProductsTableQuery, (err, result) => {
  if (err) {
    console.error('Error creating products table: ', err);
    return;
  }
  console.log("Products table created");
});



app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send(result);
  });
});

//create product
app.post("/product", (req, res) => {
  const { name, price, quantity, category, description, brand, supplier_id } = req.body;
  db.query(
    "INSERT INTO products (name, price, quantity, category, description, brand, supplier_id) VALUES (?,?,?,?,?,?,?)",
    [name, price, quantity, category, description, brand, supplier_id],
    (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
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
      console.log(result);
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
    console.log(result);
    res.send("Product deleted");
  });
});


//get product by supplier id 

app.get("/supplier/:supplierId/products", (req, res) => {
  const supplierId = req.params.supplierId;
  db.query("SELECT * FROM products WHERE supplier_id = ?", supplierId, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send(result);
  }
  );
});


//get suppliers
app.get("/suppliers", (req, res) => {
  db.query("SELECT * FROM suppliers", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

//create supplier
app.post("/supplier", (req, res) => {
  const { name, address, mobile } = req.body;
  db.query(
    "INSERT INTO suppliers (name, address, mobile) VALUES (?,?,?)",
    [name, address, mobile],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("Supplier added");
    },
  );
});

//update supplier

app.put("/supplier/:id", (req, res) => {
  const id = req.params.id;
  const { name, address, mobile } = req.body;
  db.query(
    "UPDATE suppliers SET name = ?, address = ?, mobile = ? WHERE id = ?",
    [name, address, mobile, id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("Supplier updated");
    },
  );
});

//delete supplier

app.delete("/supplier/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM suppliers WHERE id = ?", id, (err, result) => {
    if (err) {
      throw err;
    }
    res.send("Supplier deleted");
  });
});


//get supplier list [{supplier name: supplier id}]
app.get("/supplierlist", (req, res) => {
  db.query("SELECT id, name FROM suppliers", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
