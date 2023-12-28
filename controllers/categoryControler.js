const asyncHandler = require("express-async-handler");
const { Category } = require("../models/userSchema");

const addCategory = asyncHandler(async (req, res) => {
    const { category } = req.body;
      const data = await Category.create({
          category:category,
      }); 
      
    if (data) {

      res.status(201).json({data});
    } else {
      res.status(400);
      throw new Error('Failed');
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
