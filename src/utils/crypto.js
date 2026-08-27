// Convert ArrayBuffer / Uint8Array to Base64
const bufferToBase64 = (buffer) => {
  const bytes = new Uint8Array(buffer);

  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
};


// Convert Base64 back to Uint8Array
const base64ToBuffer = (base64) => {
  const binary = atob(base64);

  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
};


// Generate a random salt
export const generateSalt = () => {
  const salt = crypto.getRandomValues(new Uint8Array(16));

  return bufferToBase64(salt);
};


// Derive encryption key from master password
export const deriveKey = async (masterPassword, saltBase64) => {
  const encoder = new TextEncoder();

  // Convert password into bytes
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(masterPassword),
    {
      name: "PBKDF2",
    },
    false,
    ["deriveKey"]
  );

  // Convert Base64 salt back to bytes
  const salt = base64ToBuffer(saltBase64);

  // Derive AES key
  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 600000,
      hash: "SHA-256",
    },
    passwordKey,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["encrypt", "decrypt"]
  );

  return derivedKey;
};


// Encrypt a password
export const encryptPassword = async (
  password,
  masterPassword,
  saltBase64
) => {
  const encoder = new TextEncoder();

  // Get encryption key
  const key = await deriveKey(
    masterPassword,
    saltBase64
  );

  // Generate random IV
  const iv = crypto.getRandomValues(
    new Uint8Array(12)
  );

  // Encrypt password
  const encryptedData = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    encoder.encode(password)
  );

  return {
    encryptedPassword: bufferToBase64(encryptedData),
    iv: bufferToBase64(iv),
    salt: saltBase64,
  };
};


// Decrypt a password
export const decryptPassword = async (
  encryptedPassword,
  masterPassword,
  saltBase64,
  ivBase64
) => {
  const decoder = new TextDecoder();

  // Get encryption key again
  const key = await deriveKey(
    masterPassword,
    saltBase64
  );

  // Convert encrypted data and IV
  const encryptedData = base64ToBuffer(
    encryptedPassword
  );

  const iv = base64ToBuffer(ivBase64);

  // Decrypt
  const decryptedData = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    encryptedData
  );

  return decoder.decode(decryptedData);
};