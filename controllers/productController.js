const fs = require("fs");

exports.getAllProducts = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.addProduct = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  products.push(req.body);
  fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
};

exports.getProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};

exports.putProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const foundproduct = products.find((p) => p.id == req.params.id);
  
  if (foundproduct) {
    products[((foundproduct.id-1))].name= req.body.name;
    products[((foundproduct.id-1))].price= req.body.price;
    products[((foundproduct.id-1))].category= req.body.category;
    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
    res.status(200).json({
      status: "success",
      data: {
        product:  products,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};

exports.deleteProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {
    products.splice((foundProduct.id-1),1);
    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
    res.status(200).json({
      status: "success",
      data: {
        product: products,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};