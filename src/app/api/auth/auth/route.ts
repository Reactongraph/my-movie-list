
import connectToDatabase from "@/app/database/db";
import { loginUser, signUpUser } from "../services/authservices/authService";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password, action } = body;

    await connectToDatabase();
    if (action === "signup") {
      // Handle signup logic
      const { user, token } = await signUpUser(
        firstName,
        lastName,
        email,
        password
      );
      return new Response(
        JSON.stringify({ message: "User created successfully", token, user }),
        { status: 201 }
      );
    } else if (action === "login") {
      const { user, token } = await loginUser(email, password);
      return new Response(
        JSON.stringify({ message: "Login successful", token, user }),
        { status: 200 }
      );
    }else if (action ==='createMovie'){

    }
     else {
      return new Response(JSON.stringify({ message: "Invalid action" }), {
        status: 400,
      });
    }
  } catch (error) {
    console.error("error in api", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
