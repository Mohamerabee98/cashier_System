import mongoose from "mongoose";

async function connectDB() {
 await mongoose
    .connect("mongodb://localhost:27017/cashier_System")
    .then(() => {
      console.log("db connected successfully");
    })
    .catch((error) => {
      console.log("fail to connected db", error.message);
    });
}

export default connectDB