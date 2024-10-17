"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { server } from "@/app/layout";

const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
  }),
  password: z.string().min(4).max(100, {
    message: "Password must be between 4 and 100 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export async function signOutUserAction() {
  await signOut({ redirectTo: "/signin" });
}

export async function signInUserAction(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (err) {
    throw err;
  }
}

export async function registerUserAction(prevState, formData) {
  const username = formData.get("username");
  const password = formData.get("password");
  const email = formData.get("email");

  const validatedFields = schemaRegister.safeParse({
    username,
    password,
    email,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      isSuccess: false,
      message: "Missing Fields. Failed to Register",
    };
  }
  const response = await fetch(`${server}/api/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  response.status === 201 && redirect("/signin");

  if (response.status === 500) {
    console.log(response);
  }

  return {
    ...prevState,
    zodErrors: null,
    isSuccess: true,
    message: "Registration successful",
  };
}
