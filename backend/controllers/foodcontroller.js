import { response } from "express";
import foodModel from "../models/FoodModel.js";
import fs from "fs";

export const addFood = async (request, response) => {
  let image_file = `${request.file.filename}`;
  const food = new foodModel({
    name: request.body.name,
    description: request.body.description,
    price: request.body.price,
    category: request.body.category,
    image: image_file,
  });
  try {
    await food.save();
    response.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" });
  }
};

export const listFood = async (request, response) => {
  try {
    const food = await foodModel.find({});
    response.json({ success: true, data: food });
  } catch (error) {
    response.json({ success: false, message: error });
  }
};

export const removeFood = async (request, response) => {
  try {
    const food = await foodModel.findById(request.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(request.body.id);
    response.json({ success: true, message: "Food Removed" });
  } catch (error) {
    response.json({ success: false, message: error });
  }
};
