const express = require("express");
const PhoneBook = require("../model/Phonebook");
const router = express.Router();

router.delete("/delete-phone/:id", async (req, res) => {
  await PhoneBook.findByIdAndDelete(req.params.id);

  try {
    res.status(200).json({
      status: "Success",
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});

module.exports = router;
