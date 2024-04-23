const asyncHandler = require("express-async-handler");
const { Category } = require("../models/userSchema");

const addCategory = asyncHandler(async (req, res) => {
  const { category } = req.body;
  let trimmedData = category.trim();
  const exists = await Category.findOne({ category:trimmedData });
  if (exists) {
    res.status(400);
    throw new Error("Category already exists");
  }
  const data = await Category.create({
    category: trimmedData,
  });

  if (data) {
    res.status(201).json({ data });
  } else {
    res.status(400);
    throw new Error("Failed");
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const data = await Category.find();
  if (data) {
    res.status(201).json({ data });
  } else {
    res.status(401);
    throw new Error("Error");
  }
});

module.exports = {
  addCategory,
  getCategory,
};
