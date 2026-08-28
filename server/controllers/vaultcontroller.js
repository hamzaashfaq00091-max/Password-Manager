import VaultItem from "../models/VaultItem.js";

// Add a new vault item
export const createVaultItem = async (req, res) => {
  try {
    const {
      website,
      username,
      encryptedPassword,
      iv,
      salt,
      category,
      favorite,
    } = req.body;

    if (!req.userId) {
      return res.status(401).json({
        message: "Not authenticated",
      });
    }

    // Check required fields
    if (!website || !username || !encryptedPassword || !iv || !salt) {
      return res.status(400).json({
        message: "Website, username, password, iv, and salt are required",
      });
    }

    const vaultItem = await VaultItem.create({
      userId: req.userId,
      website,
      username,
      encryptedPassword,
      iv,
      salt,
      category: category || "Other",
      favorite: favorite || false,
    });

    return res.status(201).json({
      message: "Vault item created successfully",
      vaultItem,
    });
  } catch (error) {
    console.error("Create vault item error:", error);

    return res.status(500).json({
      message: "Server error",
      detail: error.message,
      stack: error.stack,
    });
  }
};


// Get all vault items of logged-in user
export const getVaultItems = async (req, res) => {
  try {
    const vaultItems = await VaultItem.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      vaultItems,
    });
  } catch (error) {
    console.error("Get vault items error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};


// Get one vault item
export const getVaultItem = async (req, res) => {
  try {
    const { id } = req.params;

    const vaultItem = await VaultItem.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!vaultItem) {
      return res.status(404).json({
        message: "Vault item not found",
      });
    }

    return res.status(200).json({
      vaultItem,
    });
  } catch (error) {
    console.error("Get vault item error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};


// Update vault item
export const updateVaultItem = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      website,
      username,
      encryptedPassword,
      iv,
      salt,
      category,
      favorite,
    } = req.body;

    const vaultItem = await VaultItem.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!vaultItem) {
      return res.status(404).json({
        message: "Vault item not found",
      });
    }

    // Update only fields that were provided
    if (website !== undefined) {
      vaultItem.website = website;
    }

    if (username !== undefined) {
      vaultItem.username = username;
    }

    if (encryptedPassword !== undefined) {
      vaultItem.encryptedPassword = encryptedPassword;
    }

    if (iv !== undefined) {
      vaultItem.iv = iv;
    }

    if (salt !== undefined) {
      vaultItem.salt = salt;
    }

    if (category !== undefined) {
      vaultItem.category = category;
    }

    if (favorite !== undefined) {
      vaultItem.favorite = favorite;
    }

    await vaultItem.save();

    return res.status(200).json({
      message: "Vault item updated successfully",
      vaultItem,
    });
  } catch (error) {
    console.error("Update vault item error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};


// Delete vault item
export const deleteVaultItem = async (req, res) => {
  try {
    const { id } = req.params;

    const vaultItem = await VaultItem.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!vaultItem) {
      return res.status(404).json({
        message: "Vault item not found",
      });
    }

    return res.status(200).json({
      message: "Vault item deleted successfully",
    });
  } catch (error) {
    console.error("Delete vault item error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};