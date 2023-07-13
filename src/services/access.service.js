"use strict";

const bcrypt = require("bcrypt");
const shopModel = require("../models/shop.model");
const crypto = require("crypto");
const KeyTokenSerice = require("./keytoken.service");
const { createTokenPair } = require("../auth/auth.utils");
const { getInfoData } = require("../utils");
const { BadRequestError } = require("../core/error.response");

const RoleShop = {
  SHOP: "7e0e6171361a668abdf843969340dbb4",
  WRITER: "de6a892dfba28ced005d17c79010b112",
  EDITOR: "4698850447aa09571776addcb6a2911b",
  ADMIN: "73acd9a5972130b75066c82595a1fae3",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    //check email exist
    const holderShop = await shopModel.findOne({ email }).lean();
    if (!holderShop) {
      throw new BadRequestError("Error: Shop exited!");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [RoleShop.SHOP],
    });

    if (newShop) {
      //create privateKey, publicKey
      const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: { type: "pkcs1", format: "pem" },
        privateKeyEncoding: { type: "pkcs1", format: "pem" },
      });
      // console.log("KEY:::", { privateKey, publicKey });

      const publicKeyString = await KeyTokenSerice.createKeyToken({
        userId: newShop._id,
        publicKey: publicKey,
      });

      if (!publicKeyString) {
        throw BadRequestError("Badddd");
      }

      const tokens = await createTokenPair(
        { userId: newShop._id, email: email },
        publicKeyString,
        privateKey
      );

      console.log(`Create Token Success::`, tokens);

      return {
        code: 201,
        message: "Shop already registered",
        metadata: {
          shop: getInfoData({
            fields: ["_id", "name", "email"],
            object: newShop,
          }),
          tokens,
        },
      };
    }

    return {
      code: 200,
      metadata: null,
    };
  };
}

module.exports = AccessService;
