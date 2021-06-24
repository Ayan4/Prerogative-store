const Category = require("../models/Categories");

exports.getCategories = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).json({ success: true, category });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Could not find category" });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const newCategory = new Category({
      category: req.body.category
    });
    const category = await newCategory.save();
    res.status(200).json({ success: true, category });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Could not save new category" });
  }
};
