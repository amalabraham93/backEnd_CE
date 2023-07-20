"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    _id;
    name;
    email;
    password;
    role;
    verificationToken;
    isEmailVerified;
    transactions;
    constructor(name, email, password, role, verificationToken) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.verificationToken = verificationToken;
        this.isEmailVerified = false;
        this.transactions = [];
    }
    getId() {
        return this._id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
    }
    getRole() {
        return this.role;
    }
    getVerificationToken() {
        return this.verificationToken;
    }
}
exports.default = User;
