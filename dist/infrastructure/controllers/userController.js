"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    createUserUseCase;
    loginUseCase;
    verifyEmailUseCase;
    userRepository;
    makePayment;
    constructor(createUserUseCase, userRepository, verifyEmailUseCase, loginUseCase, makePayment) {
        this.loginUseCase = loginUseCase;
        this.createUserUseCase = createUserUseCase;
        this.userRepository = userRepository;
        this.verifyEmailUseCase = verifyEmailUseCase;
        this.makePayment = makePayment;
        this.createUserHandler = this.createUserHandler.bind(this);
        this.getAllUsersHandler = this.getAllUsersHandler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.active = this.active.bind(this);
        this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
        this.verifyEmailHandler = this.verifyEmailHandler.bind(this);
        this.makePaymentHandler = this.makePaymentHandler.bind(this);
    }
    async createUserHandler(req, res) {
        try {
            const { name, email, password, role } = req.body;
            // Validate the input data here if needed
            const findUser = await this.userRepository.getUserByEmail(email);
            if (findUser) {
                res.status(400).send({ error: "Email already registered" });
            }
            else {
                const user = await this.createUserUseCase.execute(name, email, password, role);
                if (user) {
                    // Generate a JWT token
                    const token = jsonwebtoken_1.default.sign({ userId: user._id }, "your-secret-key");
                    // res.cookie("jwt-user", token, {
                    //   httpOnly: true,
                    //   maxAge: 24 * 60 * 60 * 1000,
                    //   sameSite: "none", // Enable this for cross-site requests
                    //   secure: true, // Enable this for secure requests (HTTPS)
                    // });
                    // Return the token in the response
                    res.status(200).json({ token });
                }
                else {
                    res.status(401).json({ error: "Invalid email or password" });
                }
            }
            // res.status(201).json(user);
        }
        catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    async verifyEmailHandler(req, res) {
        try {
            const { token } = req.params;
            const user = await this.userRepository.findUserByVerificationToken(token);
            if (user) {
                await this.verifyEmailUseCase.execute(user._id);
                res.status(200).json({ verified: true });
                // Send response...
            }
            else {
                // Invalid verification token
                res.status(401).json({ error: "token is not valid" });
            }
        }
        catch (error) {
            // Handle error...
        }
    }
    async getAllUsersHandler(req, res) {
        try {
            const users = await this.userRepository.getAllUsers();
            res.status(200).json(users);
        }
        catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    async loginHandler(req, res) {
        try {
            const { email, password } = req.body;
            // Perform login using the LoginUseCase
            const user = await this.loginUseCase.execute(email, password);
            if (!user) {
                res.status(401).json({ error: "Invalid email or password" });
                return;
            }
            if (!user.isEmailVerified) {
                res.status(401).json({ error: "Email not verified" });
                return;
            }
            console.log(user._id);
            // Generate a JWT token
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, "your-secret-key");
            // res.cookie("jwt-user", token, {
            //   httpOnly: true,
            //   maxAge: 24 * 60 * 60 * 1000,
            //   sameSite: "none",
            //   secure: true,
            // });
            res.status(200).json({ token });
            // Return the token in the response
        }
        catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    async logout(req, res) {
        // res.clearCookie("jwt-user");
        res.json({ message: "Logout successful" });
    }
    async active(req, res) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.json({ unauthenticated: true });
            }
            const claims = jsonwebtoken_1.default.verify(token, "your-secret-key");
            const userId = claims.userId;
            console.log(userId);
            if (!userId) {
                return res.json({ unauthenticated: true });
            }
            const user = await this.userRepository.getUserById(userId);
            if (!user) {
                return res.json({ unauthenticated: true });
            }
            else {
                return res.json({ authenticated: true, user });
            }
        }
        catch (error) {
            return res.json({ unauthenticated: true });
        }
    }
    async getUserByIdHandler(req, res) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.json({ unauthenticated: true });
            }
            const claims = jsonwebtoken_1.default.verify(token, "your-secret-key");
            const userId = claims.userId;
            console.log(userId);
            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            const user = await this.userRepository.getUserById(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.json({ user });
        }
        catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    async makePaymentHandler(req, res) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.json({ unauthenticated: true });
            }
            const claims = jsonwebtoken_1.default.verify(token, "your-secret-key");
            const userId = claims.userId;
            if (!claims) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            const { paymentData } = req.body;
            const { conferenceId, paperId, amount } = paymentData;
            const user = await this.userRepository.getUserById(userId);
            const paymentType = user.role;
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            if (user.role === "author") {
                if (!paperId) {
                    return res
                        .status(400)
                        .json({ error: "Paper ID is required for author payment" });
                }
                await this.makePayment.execute(userId, paymentType, undefined, paperId, amount);
            }
            else if (user.role === "attendee") {
                if (!conferenceId) {
                    return res
                        .status(400)
                        .json({ error: "Conference ID is required for attendee payment" });
                }
                await this.makePayment.execute(userId, paymentType, conferenceId, undefined, amount);
            }
            else {
                return res.status(400).json({ error: "Invalid user role" });
            }
            return res.json({ success: true });
        }
        catch (error) {
            console.error("Error making payment:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}
exports.default = UserController;
