"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "../public/images")));
app.get("/", (req, res) => {
    console.log(path_1.default.join(__dirname, "../public"));
    const foodData = [
        {
            name: "Thepla",
            price: 10,
            text: "Thepla are flavorful flatbreads that are made with spices, herbs, yogurt, whole wheat flour.",
            image: "/images/thepla.png",
            type: "breakfast",
        },
        {
            name: "Dum Aloo ",
            price: 120,
            text: "The potatoes, usually smaller ones, are first skinned and deep fried.",
            image: "/images/dumaloo.png",
            type: "lunch",
        },
        {
            name: "Biryani",
            price: 45,
            text: "Biryani is prepared from basmati rice mixed with several spices and cooked in a special way.",
            image: "/images/biryani.png",
            type: "dinner",
        },
        {
            name: "Poha",
            price: 20,
            text: "It’s a simple dish consisting of flattened rice with onions and peanuts..",
            image: "/images/poha.png",
            type: "breakfast",
        },
        {
            name: "Channa Masala",
            price: 23,
            text: "It is made with white chickpeas, freshly powdered spices, onions, tomatoes and herbs.",
            image: "/images/channamasala.png",
            type: "lunch",
        },
        {
            name: "Pancake",
            price: 25,
            text: "Pancakes are often rolled up or folded and eaten hot with a sweet or savoury filling inside",
            image: "/images/pancake.png",
            type: "dinner",
        },
    ];
    res.json(foodData);
});
app.listen(9000, () => {
    console.log("Server is running on port 9000");
});
//# sourceMappingURL=index.js.map