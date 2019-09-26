const { createTransaction } = require("../models/transaction");
const { validateUserInfo } = require("../services/form-validator");
const userModel = require("../models/user");

module.exports = {
    async findAllUser(query) {
        const response = await createTransaction(query, userModel.findAll);
        return response;
    },

    async findUserById(query) {
        const response = await createTransaction(query, userModel.findByID);
        return response;
    },

    async signup(query) {
        if (!validateUserInfo(query)) {
            return false;
        }
        const response = await createTransaction(query, userModel.insertOne);
        return response;
    },

    async grantAdminAuth(query) {
        const response = await createTransaction(
            query,
            args,
            userModel.setAdminAuth
        );
        return response;
    },

    async grantUserAuth(query) {
        const response = await createTransaction(
            query,
            args,
            userModel.setUserAuth
        );
        return response;
    }
};
