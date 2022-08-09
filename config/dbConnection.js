
import mongoose from "mongoose";

const dbConnection=mongoose
.connect("mongodb+srv://Hammad:Hammadhammad1@cluster0.wa042.mongodb.net/graphql?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
})
.then(() => {
  console.log("DATABASE CONNECTED");
})
.catch((err) => {
  console.log(err);
});

export default dbConnection;