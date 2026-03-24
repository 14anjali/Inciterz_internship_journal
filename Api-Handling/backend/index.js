import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/products", (req, res) => {
  const products = [
    { id: 1, name: "iPhone 14", img: "https://via.placeholder.com/150", productType: "Mobile" },
    { id: 2, name: "Samsung Galaxy S23", img: "https://via.placeholder.com/150", productType: "Mobile" },
    { id: 3, name: "MacBook Air M2", img: "https://via.placeholder.com/150", productType: "Laptop" },
    { id: 4, name: "Dell Inspiron 15", img: "https://via.placeholder.com/150", productType: "Laptop" }
  ];

  let result = products;

  if (req.query.search) {
    const search = req.query.search.toLowerCase();

    result = products.filter(product =>
      product.name.toLowerCase().includes(search)
    );
  }

  setTimeout(() => {
    res.json(result);
  }, 3000);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});