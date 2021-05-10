const express = require("express");
const mongoose = require("mongoose");
const FoodModel = require("./models/Food");
const cors = require("cors");
const app = express();

// Middlewares

// This is will parse the raw data into json format
app.use(express.json());

// This will remove the blockage of the api
app.use(cors());

// Connecting to the database
const databaseUrl = "encryptedUrl";
mongoose.connect(
  databaseUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Mongodb is connected");
  }
);

app.post("/insert", async (req, res) => {
  const food = req.body.foodName;
  const days = req.body.days;
  const newFoodData = new FoodModel({ foodName: food, daysSinceIAte: days });
  try {
    await newFoodData.save();
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  try {
    const totalFoodData = await FoodModel.find();
    res.json(totalFoodData);
  } catch (error) {
    res.json({ message: error });
  }
});

app.put("/update", async (req, res) => {
  try {
    const id = req.body.id;
    const updatedFood = req.body.updatedFood;
    await FoodModel.findById(id, (err, updatedFoodResult) => {
      updatedFoodResult.foodName = updatedFood;
      updatedFoodResult.save();
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await FoodModel.findByIdAndDelete(id);
    res.send("Deleted");
  } catch (error) {
    console.log(error);
  }
});

app.listen(8000, () => {
  console.log("Server is running on Port 8000");
});
