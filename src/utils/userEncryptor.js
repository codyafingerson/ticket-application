import sha256 from "crypto-js";

/**
 * Encrypt the users data using AES encryption and store the encrypted in local storage as 'user'`
 * @param {Object} user
 * @returns encrypted user data as a string
 */
export const encryptUser = (user) => {
  const userKey = localStorage.getItem("key");
  if (!userKey) {
    // Generate a new key and store it securely
    // const newKey = CryptoJS.lib.WordArray.random(16).toString();
    // localStorage.setItem("key", newKey);
    // return CryptoJS.AES.encrypt(JSON.stringify(user), newKey).toString();
    const newKey = sha256.lib.WordArray.random(16).toString();
    localStorage.setItem("key", newKey);
    return sha256.AES.encrypt(JSON.stringify(user), newKey).toString();
  }
  return sha256.AES.encrypt(JSON.stringify(user), userKey).toString();
};

/**
 * Decrypt the users data from local storage item 'user'
 * @param {String} data
 * @returns decrypted user data as an object
 * @throws {Error} if the userKey is not found in local storage
 */
export const decryptUser = (data) => {
  // const userKey = localStorage.getItem('key');
  // return JSON.parse(CryptoJS.AES.decrypt(data, userKey).toString(CryptoJS.enc.Utf8));
 
    const userKey = localStorage.getItem("key");
    if (!userKey) {
      throw new Error("User key not found");
    }
    
    const user = JSON.parse(sha256.AES.decrypt(data, userKey).toString(sha256.enc.Utf8));
    return user;
}