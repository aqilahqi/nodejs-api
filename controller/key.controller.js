const Key = require("../models/key.model");

const getAllKeys = async (req, res) => {
  try {
    const Key = await Key.find({});
    res.status(200).json(Key);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createKey = async (req, res) => {
  try {
    const list = await Key.find({});

    if (list.includes((item) => item.key === req.body.key)) {
      const key = await Key.create(req.body);
      res.status(200).json(key);
    } else {
      /** do update  */
      const findKey = list.find((item) => item.key === req.body.key);
      const updatedKey = await doUpdateKey(findKey);
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

const updateKey = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedKey = await doUpdateKey({ id, ...req.body });
    if (!updatedKey) {
      return res.status(404).json({ message: "Key does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const doUpdateKey = async (body) => {
  const updatedKey = await Key.findByIdAndUpdate(body.id, body);
  return updatedKey;
};

module.exports = {
  getAllKeys,
  createKey,
  updateKey,
};
