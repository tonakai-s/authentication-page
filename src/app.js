//Importing packages
import express from "express";
import session from "express-session";

const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

//Importing modules of the router in the Routes directory
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const newUserRoutes = require("./routes/insertUser");
const logoutRoutes = require("./routes/logout");

//Setting PORT
const PORT = process.env.PORT || 3000;

//Instance express in the app const
const app = express();

//Settings to the app instance
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    //Generate a random sessionID using Crypto
    secret: crypto.randomBytes(16).toString("hex"),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
app.use(cookieParser());
app.set("view engine", "ejs");

//Routes for authentication
app.use("/auth", authRoutes);

//Route to create and insert a new user
app.use("/new-user", newUserRoutes);

//Routes of admin access
app.use("/admin", adminRoutes);

//Routes for user inside the system
app.use("/user", userRoutes);

app.use("/session", logoutRoutes);

//Redirect user to the initial page if not pass a path
app.get("/", (req, res) => {
    res.redirect("/auth");
});

//Running the server
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});