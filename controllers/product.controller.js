const Product = require('../models/product.model.js')

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error'});
  }
};

const getProduct = async (req, res) => {
  try {
    const { _id } = req.params;
    const product = await Product.findById(_id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const getSimilarProducts = async (req, res) => {
  try {
    const { type } = req.params;
    const similarProducts = await Product.find({ type });
    res.status(200).json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error'});
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
    return res.status(404).json({message: "Product not found"});
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
    return res.status(404).json({message: "Product not found"})
    }
    res.status(200).json({ message: `${product.name} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
    getProducts,
    getSimilarProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};