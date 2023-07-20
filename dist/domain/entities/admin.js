"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Admin {
    id;
    name;
    email;
    password;
    role;
    constructor(name, email, password, role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
exports.default = Admin;
