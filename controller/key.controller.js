const Key = require("../models/key.model");

/**
 * * Requirement 1
 */
const createKey = async (req, res) => {
  try {
    const list = await Key.find({});

    if (!list.includes((item) => item.key === req.body.key)) {
      const createdKey = await Key.create(req.body);
      res.status(200).json(createdKey);
    } else {
      /** do update  */
      const foundKey = list.find((item) => item.key === req.body.key);
      const updatedKey = await doUpdateKey(foundKey.id, foundKey);
      if (!updatedKey) {
        return res.status(404).json({ message: "Key does not exist" });
      }
      const result = await Product.findById(updateKey.id);
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * * Requirement 2 & 3
 */
const getKey = async (req, res) => {
  try {
    const foundKeys = await Key.find({});
    const filteredKeys = foundKeys.filter((item) => item.key === req.body.key);
    if (req.body.timestamp) {
      const result = filteredKeys.filter(
        (item) =>
          new Date(item.timestamp).getTime() ===
          new Date(req.body.timestamp).getTime()
      );

      res.status(200).json(result);
    } else {
      res.status(200).json(filteredKeys);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllKeys = async (req, res) => {
  try {
    const foundKeys = await Key.find({});
    res.status(200).json(foundKeys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateKey = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedKey = await doUpdateKey(id, req.body);
    if (!updatedKey) {
      return res.status(404).json({ message: "Key does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const doUpdateKey = async (id, body) => {
  const updatedKey = await Key.findByIdAndUpdate(id, body);
  return updatedKey;
};

module.exports = {
  createKey,
  getKey,
  getAllKeys,
  updateKey,
};
