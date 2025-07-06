// Import dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const { connectDB, syncDB } = require("./config/db.config");

const path = require("path");
const routes = require("./src/routes/index.route");

// Initialize Express app
const app = express();

//update the numbers if the number of proxy increase
app.set("trust proxy", 1);

// Define Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "https://meetvo.vercel.app",
      "https://meetvo-tech.lovable.app",
      "http://localhost:3000",
      "https://meetvo.me",
      "http://localhost:8181",
    ],
    credentials: true, // Allow cookies and authentication headers
  })
); // Enable Cross-Origin Resource Sharing (CORS)

app.use(cookieParser()); // Parse cookies in request headers
app.use(morgan("common"));
app.use(helmet());

// Define the base of all routes
app.use("/v1", routes);

// Serve static files from src/public
app.use(express.static(path.join(__dirname, "src", "public", "pages")));

// Simple test route to verify the app is working
app.get("/", (req, res) => {
  res.status(200).send("Hello, world! Meetvo backend app is running!");
});

// Get the port from environment variables (default to 3000 if not set)
const port = process.env.PORT;

// Authenticate DB Before Server app starts
connectDB();

// Synchronize the database with models
syncDB();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
