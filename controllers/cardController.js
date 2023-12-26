const { Card } = require("../models/userSchema");
const asyncHandler = require("express-async-handler");


const addCard = asyncHandler(async (req, res) => {
    try {
        const { name, category } = req.body;

        const newCard = await Card.create({
            name,
            category,
            front: req.files["front"][0].buffer.toString("base64"),
            image: req.files["image"][0].buffer.toString("base64"),
            envelope: req.files["envelope"][0].buffer.toString("base64"),
            custom: req.files["custom"][0].buffer.toString("base64"),
        });
        if (newCard) res.status(201).json(newCard);
        else {
            res.status(401);
            throw new Error("Error");
        }
    } catch (error) {
        console.error("Error saving card:", error.message);
        res.status(500).json({ error: error.message });
    }
});

const getCard = asyncHandler(async (req, res) => {
    const data = await Card.find();
    if (data) {
        res.status(201).json({ data });
    } else {
        res.status(401);
        throw new Error("Error");
    }
});

module.exports = {
    addCard,
    getCard,
};
