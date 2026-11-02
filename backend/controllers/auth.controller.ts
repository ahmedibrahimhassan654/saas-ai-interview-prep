import dbConnect from "../config/dbConnect";
import User from "../models/user.model";
import { uploadFile, deleteFile } from "../utils/cloudinary";

interface RegisterSuccess {
  created: true;
}

type RegisterReturn = RegisterSuccess | { error: { message: string; statusCode: number } };

interface UpdateProfileSuccess {
  success: true;
}

type UpdateProfileReturn = UpdateProfileSuccess | { error: { message: string; statusCode: number } };

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<RegisterReturn> => {
  try {
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
  } catch (error: any) {
    return { error: { message: error.message || "Registration failed", statusCode: 500 } };
  }
};

export const updateUserProfile = async (
  data: {
    name: string;
    email: string;
    avatar?: string;
    oldavatar?: string;
  }
): Promise<UpdateProfileReturn> => {
  try {
    await dbConnect();

    let profilePictureUpdate: { id?: string; url?: string } | undefined = undefined;

    if (data.avatar) {
      try {
        const uploadResult = await uploadFile(data.avatar, "prep-ai/avatars");
        profilePictureUpdate = {
          id: uploadResult.public_id,
          url: uploadResult.url,
        };

        if (data.oldavatar) {
          try {
            await deleteFile(data.oldavatar);
          } catch (error) {
            console.error("Error deleting old avatar:", error);
          }
        }
      } catch (uploadError: any) {
        console.error("Cloudinary upload error details:", uploadError);
        console.error("Cloudinary upload error message:", uploadError?.message);
        return { error: { message: uploadError?.message || "Avatar upload failed", statusCode: 400 } };
      }
    }

    const updateData: any = {
      name: data.name,
    };

    if (profilePictureUpdate) {
      updateData.profilePicture = profilePictureUpdate;
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: data.email },
      updateData,
      { new: true }
    );

    if (updatedUser) {
      return { success: true };
    }

    throw new Error("User not found");
  } catch (error: any) {
    console.error("Update profile error:", error);
    return { error: { message: error.message || "Update failed", statusCode: 500 } };
  }
};

export const updateUserPassword = async (
  data: {
    name: string;
    email: string;
    newPassword: string;
    confirmPassword: string;
  }
): Promise<UpdateProfileReturn> => {
  try {
    await dbConnect();

    if (data.newPassword !== data.confirmPassword) {
      return { error: { message: "New password and confirm password do not match", statusCode: 400 } };
    }

    const user = await User.findOne({ email: data.email }).select("+password");

    if (!user) {
      throw new Error("User not found");
    }

    user.password = data.newPassword;
    await user.save();

    // Ensure credentials provider is linked (for OAuth users setting a password for the first time)
    const alreadyHasCredentials = (user.authProviders ?? []).some(
      (p: { provider: string; providerId: string }) => p.provider === "credentials",
    );

    if (!alreadyHasCredentials) {
      user.authProviders.push({
        provider: "credentials",
        providerId: data.email,
      });
      await user.save();
    }

    return { success: true };
  } catch (error: any) {
    console.error("Update password error:", error);
    return { error: { message: error.message || "Password update failed", statusCode: 500 } };
  }
};
