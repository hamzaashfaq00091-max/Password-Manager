import mongoose from "mongoose";

const vaultItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    website: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      trim: true,
    },

    encryptedPassword: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "Other",
      trim: true,
    },

    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const VaultItem = mongoose.model("VaultItem", vaultItemSchema);

export default VaultItem;