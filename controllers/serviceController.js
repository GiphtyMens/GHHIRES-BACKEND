const Service = require("../models/Service");
const Shop = require("../models/Shop");

const createService = async (req, res) => { 
  try {
    //get shop
    const shop = await Shop.findById({ shop: req.body.shop });
    if (!shop) return res.status(400).json({ message: "Shop not found" });

    const service = await Service.create(req.body);
    res.status(201).json({ service });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    if (services.length === 0)
      return res.status(404).json({ message: "No service in the database" });
    res.status(200).json({ services });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSingleService = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    let service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }
    service = await Service.findByIdAndUpdate(serviceId, req.body, {
      new: true,
    });
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }
    await Service.findByIdAndDelete(serviceId);
    res.status(200).json({ msg: "Service Deleted." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createService,
  getServices,
  getSingleService,
  updateService,
  deleteService,
};
