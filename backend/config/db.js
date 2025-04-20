import mongoose from "mongoose";

export const connectDb = async () => {
    await mongoose
      .connect(
        "mongodb+srv://Suhail:vegdeli1234@cluster0.kck4gss.mongodb.net/vegdeli"
      )
      .then(() => {
        console.log("Db Connected");
      });
}

