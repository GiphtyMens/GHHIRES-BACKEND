const User = require("../models/User");
const Shop = require("../models/Shop");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register User
const register = async (req, res) => {
  const { firstName, lastName, email, phone, city, address, password } =
    req.body;
  console.log(req.body);
  const emailExist = await User.findOne({ email });
  if (emailExist)
    return res.status(400).json({ message: "Email already exist" });

  const phoneExist = await User.findOne({ phone });
  if (phoneExist)
    return res.status(400).json({ message: "Phone number already exist" });

  // encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  //create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    city,
    address,
    password: hashedPassword,
  });

  res.status(201).json({ user });
};

//login user
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid Credentials" });

  //decrypt password
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(404).json({ message: "Invalid Credentials" });

  //generate access token
  const accessToken = jwt.sign({ id: req.body._id }, "123456780", {
    expiresIn: "1h",
  });

  res.status(200).json({ accessToken, user });
};

//register shop
const registerShop = async (req, res) => {
  // const { name, email, phone, city, address, photo, load, passcode } = req.body;
  //validating the data before creating shop
  console.log(req.body);
  console.log();
  //check if shop name exist
  const shopName = await Shop.findOne({ name: req.body.name });
  if (shopName)
    return res.status(400).json({ message: "Shop name already exist" });

  //check if email is already registered
  const shopEmail = await Shop.findOne({ email: req.body.email });
  if (shopEmail)
    return res
      .status(400)
      .json({ message: "Shop email is already registered" });

  //check if phone is already registered
  const shopPhone = await Shop.findOne({ phone: req.body.phone });
  if (shopPhone)
    return res
      .status(400)
      .json({ message: "Shop phone is already registered" });

  //encrypt passcode
  const hashedPasscode = await bcrypt.hash(req.body.passcode, 12);
  // const path = req.file.path;

  //create shop
  const shop = await Shop.create({
    ...req.body,
    photo: req.file.path,
    passcode: hashedPasscode,
  });

  res.status(201).json({ shop });
};

const loginShop = async (req, res) => {
  const { email, passcode } = req.body;

  const shop = await Shop.findOne({ email })
    .populate("service")
    .populate("booking");
  if (!shop) return res.status(404).json({ message: "Invalid Credentials" });

  //decrypt passcode and compare if it matches
  const isMatch = await bcrypt.compare(passcode, shop.passcode);
  if (!isMatch) {
    res.status(404).json({ message: "Invalid Credentials" });
  } else {
    //generate access token
    const accessToken = jwt.sign({ id: shop._id }, "1234567890", {
      expiresIn: "1h",
    });
    res.status(200).json({ accessToken, shop });
  }
};

module.exports = {
  register,
  login,
  loginShop,
  registerShop,
};
