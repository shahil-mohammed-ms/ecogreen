const User = require('../models/user')
const Product = require('../models/product');

const getUsers = async (req, res) => {
  try {
    const data = await User.find()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
};

const getUser = async (req, res) => {
  try {
    const { _id } = req?.decoded
    const data = await User.find({ _id })
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
};

const updateQty = async (req, res) => {
  try {
    const { _id } = req?.decoded
    const { qty, productId } = req?.body
    const userData = await User.findById({ _id })
    await userData.updateCart( productId, qty )
    res.status(201).json({ message: 'Quantity updated to cart' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
};

const addToCart = async (req, res) => {
  try {
    const { _id } = req?.decoded
    const productId = req?.params?.id
    const userData =await User.findById({ _id })
    const productData =await Product.findById({ _id:productId })
    userData.addToCart(productData)
    res.status(201).json({ message: 'Product added to cart' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const removeFromCart = async (req, res) => {
  try {
   const { _id } = req?.decoded
    // const _id = '66796d0936bb97720a7764f4'
    const productId = req?.params?.id 
    const userData = await User.findById({ _id })
    userData.removefromCart(productId)
    res.status(201).json({ message: 'Product removed from cart' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const addToWishlist = async (req, res) => {
  try {
    const { _id } = req?.decoded
    const productId = req?.params?.id
    const userData = await User.findById({ _id })
    const productData = await Product.findById({ _id:productId })
    userData.addToWishlist(productData)
    res.status(201).json({ message: 'Product added to wishlist' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const removeFromWishlist = async (req, res) => {
  try {
    const { _id } = req?.decoded
    const productId = req?.params?.id
    const userData = await User.findById({ _id })
    userData.removefromWishlist(productId)
    res.status(201).json({ message: 'Product removed from wishlist' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const getCartDetailsByUserId = async (req, res) => {
  const { _id } = req?.decoded

  if (_id) {
    try {
      const cart = await User.getCartWithProductsByUserId(_id);

      if (cart) {
          return res.status(200).json({ data:cart });
      } else {
          return res.status(404).json({data:[] });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
  }

  }else{

    return res.status(404).json({ data: [] });
  }


}


module.exports = {
    getUser,
    getUsers,
    updateQty,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,

    getCartDetailsByUserId,
    
  }