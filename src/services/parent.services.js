import parentModel from "../models/parent.model.js";

export async function checkParentExist(username, email) {
  try {
    const existingParent = await parentModel.find({
      $or: [{ username }, { email }]
    });
    return existingParent;
  } catch (error) {
    return error;
  }
}

export async function createParent(
  username,
  firstname,
  lastname,
  phone,
  email,
  password,
  address
) {
  try {
    const parent = await parentModel.create({
      username,
      firstname,
      lastname,
      phone,
      email,
      password,
      address
    });
    return parent;
  } catch (error) {
    return error;
  }
}

export async function findParentByUsername(username) {
  try {
    const parent = await parentModel.findOne({ username });
    return parent;
  } catch (error) {
    return error;
  }
}