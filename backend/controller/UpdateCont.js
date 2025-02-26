const express = require("express");
const PhoneBook = require("../model/Phonebook");
const router = express.Router();

router.patch("/update-phone", async (req, res) => {
  const { id, newPhone } = req.body;

  try {
    const updatedPhone = await PhoneBook.findByIdAndUpdate(
      id,
      { phone: newPhone },
      { new: true }
    );

    if (!updatedPhone) {
      return res.status(404).json({ message: "Phone number not found" });
    }

    res.status(200).json({ message: "Phone number updated", updatedPhone });
  } catch (error) {
    res.status(500).json({ message: "Error updating phone number", error });
  }
});

module.exports = router;
