import { NextResponse } from "next/server";
import { createUser } from "@/queries/users";
import { dbConnect } from "@/lib/mongo";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  const { username, email, password } = await request.json();
  console.log("REGISTER", username, email, password);

  // Create DB connection
  await dbConnect();

  // Encrypt password
  const hashedPassword = await bcrypt.hash(password, 5);

  // Create user payload
  const newUser = {
    username,
    password: hashedPassword,
    email,
  };

  // Update db
  try {
    await createUser(newUser);
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err.message, {
      status: 500,
    });
  }

  // Add user info to DB
  return new NextResponse("User has been created", {
    status: 201,
  });
};
