const express = require("express");
const PhoneBook = require("../model/Phonebook");
const router = express.Router();

router.get("/get-phone", async (req, res) => {
  const phoneNumbers = await PhoneBook.find({});
  try {
    res.status(200).json({
      status: "Success",
      data: {
        phoneNumbers,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});

module.exports = router;
