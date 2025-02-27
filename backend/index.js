require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
const uploadPhone = require("./controller/UploadCont");
const getPhone = require("./controller/GetCont");
const updatePhone = require("./controller/UpdateCont");
const deletePhone = require("./controller/DeleteCont");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 9000;
connectDB();

app.use("/", uploadPhone);
app.use("/", getPhone);
app.use("/", updatePhone);
app.use("/", deletePhone);

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
