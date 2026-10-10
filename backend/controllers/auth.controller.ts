import dbConnect from "../config/dbConnect";
import User from "../models/user.model";

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<{ created: boolean }> {
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
