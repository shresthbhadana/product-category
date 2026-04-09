const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepo = require("../repository/userRepo");

const  JWT_SECRET = "your_jwt_secret"; 


exports.signup = async (data) => {
  const existingByEmail = await userRepo.findByEmail(data.email);
  if (existingByEmail) throw new Error("Email already registered");

  if (data.mobile) {
    const existingByMobile = await userRepo.findByMobile(data.mobile);
    if (existingByMobile) throw new Error("Mobile already registered");
  }

  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
    data.password = hashedPassword;
  }

  return await userRepo.createUser(data);
}


exports.login = async (data) => {
  if (!data.email && !data.mobile) {
    throw new Error("Email or mobile is required");
  }

  let user;

  if (data.email) {
    user = await userRepo.findByEmail(data.email);
  } else {
    user = await userRepo.findByMobile(data.mobile);
  }

  if (!user) {
    throw new Error("User not found");
  }

  
  if (user.password) {
    if (!data.password) {
      throw new Error("Password is required");
    }

    const match = await bcrypt.compare(data.password, user.password);

    if (!match) {
      throw new Error("Invalid password");
    }
  }


  const token = jwt.sign(
    {
      user_id: user.user_id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
};


exports.getUsers = async(query) => {
  const search = query.search;
  const city = query.city;
  const page = query.page || 1;
  const limit = query.limit || 20;

  const  filter = {};

  if (search) {
    filter.$or = [
      { name: search },
      { email: search },
      { mobile: search },
    ];
  }

  if (city) filter["location.city"] = city;

  const  skip = (page - 1) * limit;
  return  await userRepo.getAllUsers(filter, skip, Number(limit));
}



exports.getUserById = async (id) => {
  return  await userRepo.getUserById(id);
}

exports.updateUser = async (id, data) => {
  if (data.password) {
    const hashed = await bcrypt.hash(data.password, 10);
    data.password = hashed;
  }
  return await userRepo.updateUser(id, data);
  }


exports.deleteUser = async (id) => {
  return await userRepo.deleteUser(id);
}


