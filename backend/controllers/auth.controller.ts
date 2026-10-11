import dbConnect from "../config/dbConnect";
import User from "../models/user.model";
import { catchAsyncError } from "../middlewares/catchAsyncError";

interface RegisterSuccess {
  created: true;
}

type RegisterReturn = RegisterSuccess | { error: { message: string; statusCode: number } };

export const register = catchAsyncError<[string, string, string], RegisterReturn>(
  async (name: string, email: string, password: string): Promise<RegisterReturn> => {
    await dbConnect();
    const newUser = await User.create({
      name,
      email,
      password,
      authProviders: [
        {
          provider: "credentials",
          providerId: email,
        },
      ],
    });
    if (newUser?._id) {
      return { created: true };
    }
    throw new Error("User not created");
  }
);