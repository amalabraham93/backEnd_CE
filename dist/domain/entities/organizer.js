"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Organizer {
    id;
    organizername;
    email;
    password;
    constructor(name, email, password) {
        this.organizername = name;
        this.email = email;
        this.password = password;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.organizername;
    }
    getEmail() {
        return this.email;
    }
    getOrganization() {
        return this.password;
    }
    setpassword(password) {
        this.password = password;
    }
}
exports.default = Organizer;
