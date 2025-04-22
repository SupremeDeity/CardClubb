const asyncHandler = require("express-async-handler");
const { Category, Card } = require("../models/userSchema");

const addCategory = asyncHandler(async (req, res) => {
  const { category } = req.body;
  let trimmedData = category.trim();
  const exists = await Category.findOne({ category: trimmedData });
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
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) ?? 4; // Default to 4 items per page
    const skip = (page - 1) * limit;
    const skipImages = Boolean(req.query.skipImages) ?? false;

    const categories = await Category.find().skip(skip).limit(limit);
    const categoryData = await Promise.all(
      categories.map(async (category) => {
        const firstCard = !skipImages ? await Card.findOne({ category: category.category }).select("front") : null;
        return {
          category: category.category,
          image: firstCard ? firstCard.front : null,
        };
      })
    );

    const totalCategories = await Category.countDocuments();
    const hasMore = page * limit < totalCategories;

    res.json({ data: categoryData, hasMore });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

module.exports = {
  addCategory,
  getCategory,
};
