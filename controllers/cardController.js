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

const updateCard = asyncHandler(async (req, res) => {
    try {
        const { id, name, category } = req.body;
        const card = await Card.findOne({_id:id})
        
        if (!card) {
            res.status(404);
            throw new Error("Card not found");
        }

        card.name = name
        card.category = category
        if(req.files["front"]) card.front = req.files["front"][0].buffer.toString("base64")
        if(req.files["image"]) card.image = req.files["image"][0].buffer.toString("base64")
        if(req.files["envelope"]) card.envelope = req.files["envelope"][0].buffer.toString("base64")
        if(req.files["custom"]) card.custom = req.files["custom"][0].buffer.toString("base64")

        await card.save();
        res.status(200).json({ message: "Card Update successfully" });
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

const getFewFieldsofCards = asyncHandler(async (req, res) => {
    const data = await Card.find({},{_id:1,name:1,category:1});
    if (data) {
        res.status(201).json({ data });
    } else {
        res.status(401);
        throw new Error("Error");
    }
});

const getCardByCategory = asyncHandler(async (req, res) => {
    const { category } = req.body;
    const data = await Card.find({category});
    if (data) {
        res.status(201).json({ data });
    } else {
        res.status(401);
        throw new Error("Error");
    }
});

const deleteCard = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const data = await Card.findOneAndDelete({ _id: id });
    if (data) {
        res.status(200).json({message:"Removed"});
    } else {
        res.status(401);
        throw new Error("Error");
    }
});

const getSpecificCard = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const data = await Card.findOne({ _id: id });
    if (data) {
        res.status(200).json({card:data});
    } else {
        res.status(401);
        throw new Error("Error");
    }
});

module.exports = {
    addCard,
    getCard,
    deleteCard,
    getSpecificCard,
    updateCard,
    getCardByCategory,
    getFewFieldsofCards,
};
