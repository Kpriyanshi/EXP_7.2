const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // parse JSON bodies

const products = [
  { id: 1, name: "Laptop", price: 75000 },
  { id: 2, name: "Smartphone", price: 30000 },
  { id: 3, name: "Headphones", price: 2000 },
];

// simple root message
app.get("/", (req, res) => res.send("Product API running. Use /api/products"));

// GET products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// POST new product (for testing with Postman)
app.post("/api/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) return res.status(400).json({ error: "name and price required" });
  const newProduct = { id: products.length + 1, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
