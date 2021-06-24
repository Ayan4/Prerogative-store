const { extend } = require("lodash");

exports.getWishlist = async (req, res) => {
  try {
    let wishlist = req.wishlist;
    wishlist = await wishlist.populate("wishlistItems.product").execPopulate();
    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, msg: "failed to fetch wishlist items" });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    let wishlist = req.wishlist;
    const product = req.product;

    if (wishlist.wishlistItems.id(product._id)) {
      res
        .status(400)
        .json({ success: false, message: "Item Already existis in wishlist" });
      return;
    }

    wishlist = extend(wishlist, {
      wishlistItems: [
        ...wishlist.wishlistItems,
        {
          _id: product._id,
          product: product._id
        }
      ]
    });

    wishlist = await wishlist.save();
    wishlist = await wishlist.populate("wishlistItems.product").execPopulate();
    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, msg: "failed to add item to wishlist" });
  }
};

exports.deleteWishlist = async (req, res) => {
  try {
    let wishlist = req.wishlist;
    const product = req.product;

    await wishlist.wishlistItems.id(product._id).remove();
    await wishlist.save();
    res.status(200).json({ success: true, msg: "item deleted" });
  } catch (err) {
    res.status(400).json({ success: false, msg: "item not deleted" });
  }
};
