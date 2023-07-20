"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class OrganizerController {
    createOrganizerUseCase;
    loginOrganizerUseCase;
    constructor(createOrganizerUseCase, loginOrganizerUseCase) {
        this.createOrganizerUseCase = createOrganizerUseCase;
        this.loginOrganizerUseCase = loginOrganizerUseCase;
        this.createOrganizerHandler = this.createOrganizerHandler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.logout = this.logout.bind(this);
    }
    async createOrganizerHandler(req, res) {
        try {
            const { organizername, email, password } = req.body;
            // Create the organizer using the CreateOrganizerUseCase
            const organizer = await this.createOrganizerUseCase.execute(organizername, email, password);
            // Check if the organizer was created successfully
            if (organizer) {
                // Generate a JWT token
                const token = jsonwebtoken_1.default.sign({ _id: organizer.getId() }, "your-secret-key");
                // Set the JWT token as a cookie
                // res.cookie("jwt-organizer", token, {
                //   httpOnly: true,
                //   maxAge: 24 * 60 * 60 * 1000,
                // });
                // Return the token in the response
                res.status(200).json({ token });
            }
            else {
                // Return an error if the organizer creation failed
                res.status(401).json({ error: "Failed to create organizer" });
            }
        }
        catch (error) {
            console.error("Error creating organizer:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    async loginHandler(req, res) {
        try {
            const { email, password } = req.body;
            // Perform login using the LoginOrganizerUseCase
            const organizer = await this.loginOrganizerUseCase.execute(email, password);
            // Check if the login was successful
            if (organizer) {
                // Generate a JWT token
                const token = jsonwebtoken_1.default.sign({ _id: organizer.id }, "your-secret-key");
                // Set the JWT token as a cookie
                // res.cookie("jwt-organizer", token, {
                //   httpOnly: true,
                //   maxAge: 24 * 60 * 60 * 1000,
                // });
                // Return the token in the response
                res.status(200).json({ token });
            }
            else {
                // Return an error if the login failed
                res.status(401).json({ error: "Invalid email or password" });
            }
        }
        catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    async logout(req, res) {
        try {
            // res.clearCookie("jwt-organizer");
            res.status(200).json({ message: "Logout successful" });
        }
        catch (error) {
            console.error("Error during logout:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
exports.default = OrganizerController;
