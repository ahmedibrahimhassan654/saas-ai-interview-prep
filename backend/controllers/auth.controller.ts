import dbConnect from "../config/dbConnect";
import User from "../models/user.model";

export interface RegisterResult {
  created: boolean;
  message: string;
}

function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: number }).code === 11000
  );
}

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<RegisterResult> {
  await dbConnect();

  try {
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
      return {
        created: true,
        message: "Account created successfully. Welcome aboard!",
      };
    }

    return {
      created: false,
      message: "We couldn't create your account. Please try again.",
    };
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return {
        created: false,
        message: "An account with this email already exists.",
      };
    }

    console.error("register error:", error);
    return {
      created: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
