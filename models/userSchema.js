const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;


const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const categorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
});

const cardSchema = mongoose.Schema({
    name: String,
    category: String,
    front: { type: String, required: true },
    image: { type: String, required: true },
    envelope: { type: String, required: true },
    custom: { type: String, required: true },
});

const emailSchema = mongoose.Schema({
    id: { type: String, unique: true, required: true },
    text: String,
    color: String,
    size: Number,
    family: String,
    front: {
        mime_type: { type: String, required: true },
        content: { type: String, required: true, maxlength: 10 * 1024 * 1024 },
    },
    image: {
        mime_type: { type: String, required: true },
        content: { type: String, required: true, maxlength: 10 * 1024 * 1024 },
    },
    envelope: {
        mime_type: { type: String, required: true },
        content: { type: String, required: true, maxlength: 10 * 1024 * 1024 },
    },
    custom: {
        mime_type: { type: String, required: true },
        content: { type: String, required: true, maxlength: 10 * 1024 * 1024 },
    },
    stamp: {
        mime_type: { type: String },
        content: { type: String, maxlength: 10 * 1024 * 1024 },
    },
    envelopeOpen: {
        mime_type: { type: String },
        content: { type: String, maxlength: 10 * 1024 * 1024 },
    },
    logo: {
        mime_type: { type: String },
        content: { type: String, maxlength: 10 * 1024 * 1024 },
    },
});
const EmailReceiversData = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    }
});


const passwordResetTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    expires: {
        type: Date,
        required: true,
    },
});

passwordResetTokenSchema.methods.removeToken = async function () {
    await this.remove();
};

const Category = mongoose.model("Category", categorySchema);
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admins", adminSchema);
const Card = mongoose.model("Card", cardSchema);
const Email = mongoose.model("Email", emailSchema);
const Receivers = mongoose.model("Receivers", EmailReceiversData)
const passwordReset = mongoose.model("PasswordReset", passwordResetTokenSchema)


module.exports = { User, Admin, Category, Card, Email, Receivers, passwordReset };
