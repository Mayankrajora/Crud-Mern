const express = require("express");
const PhoneBook = require("../model/Phonebook");
const router = express.Router();

router.post("/add-phone", async (req, res) => {
  const phoneNumber = new PhoneBook(req.body);
  try {
    await phoneNumber.save();
    res.status(200).json({
      status: "Success",
      data: {
        phoneNumber,
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
