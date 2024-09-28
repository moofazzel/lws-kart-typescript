import dbConnect from "@/lib/mongodb";
import { User } from "@/model/user-model";
import { saltAndHashPassword } from "@/utils/saltAndHashPassword";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { fullName, email, password } = await request.json();

    if (!fullName || !email || !password) {
      return NextResponse.json({
        message: "Full Name, Email and password are required",
        status: 400,
      });
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists", status: 400 });
    }

    const hashedPassword = await saltAndHashPassword(password);
    const newUser = new User({ fullName, email, password: hashedPassword });

    await newUser.save();

    return NextResponse.json({ message: "User created", status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Error creating user", status: 500 });
  }
}
