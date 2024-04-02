import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", true);
  mongoose.set("strictPopulate", false);

  mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected sucessfully..."))
    .catch((error) => console.log(error));
};

export default connectDB;
