"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./infrastructure/routes/userRoutes"));
const organizerRoutes_1 = __importDefault(require("./infrastructure/routes/organizerRoutes"));
const adminRoutes_1 = __importDefault(require("./infrastructure/routes/adminRoutes"));
const connection_1 = __importDefault(require("./infrastructure/database/connection"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import confereceRouter from './infrastructure/routes/conference';
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: [`${process.env.ORIGIN}`],
}));
const databaseConnection = new connection_1.default();
const port = process.env.PORT || 3000;
//connect database
databaseConnection.connect()
    .then(() => {
    console.log('Database connected successfully');
    // Set up routes
    app.use('/users', userRoutes_1.default);
    // Organizer Routes
    app.use('/organizers', organizerRoutes_1.default);
    // Admin Routes
    app.use('/admins', adminRoutes_1.default);
    //conference
    // app.use('/conference', confereceRouter);
    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit the application if the database connection fails
});
