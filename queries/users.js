import { User } from "../model/UserModel";

export async function createUser(user) {
  try {
    await User.create(user);
    console.log("Create user successful!");
  } catch (e) {
    throw new Error(e);
  }
}
