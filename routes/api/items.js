const express = require("express");
const router = express.Router();

//Item Model
const Item = require("../../models/Item");

// @route GET request to api/items
// @desc Get All Items
// @access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route POST request to api/items
// @desc Create an item
// @access Public (normally private if you have authentication)
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name
    //date is automatic
  });
  newItem.save().then(item => res.json(item));
});

// @route DELETE request to api/items/:id
// @desc Delete an item
// @access Public (normally private if you have authentication)
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
