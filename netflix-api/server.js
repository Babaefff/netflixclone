const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/UserRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://babaef:ronaldoo123@cluster0.yljpnc2.mongodb.net/netflix?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB CONNECTED");
  });


app.use("/api/user",userRoute)
const port = process.env.PORT || 5000;
app.listen(port, console.log("server running"));
