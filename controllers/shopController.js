const Shop = require("../models/Shop");

const getAllShops = async (req, res) => {
  try {
    // console.log(req.shops);
    const shops = await Shop.find();
    res.status(200).json({ shops });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSingleShop = async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ msg: "Shop not found" });
    }
    res.status(200).json(shop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateShop = async (req, res) => {
  try {
    const shopId = req.params.shopId;
    let shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ msg: "Shop not found" });
    }
    shop = await Shop.findByIdAndUpdate(shopId, req.body, {
      new: true,
    });
    res.status(200).json(shop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteShop = async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ msg: "Shop not found" });
    }
    await Shop.findByIdAndDelete(shopId);
    res.status(200).json({ msg: "Shop Deleted." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllShops,
  getSingleShop,
  updateShop,
  deleteShop,
};
