const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const Activity = require('./models/Activity'); // Import the Activity model

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json()); // To parse JSON requests

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.error("MongoDB connection failed:", err));

// Route to create a new activity
app.post('/activities', async (req, res) => {
    try {
      const activity = new Activity(req.body); // Create a new activity document
      await activity.save(); // Save to the database
      res.status(201).send(activity);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
  
  // Route to get all activities
  app.get('/activities', async (req, res) => {
    try {
      const activities = await Activity.find(); // Fetch all activities
      res.status(200).send(activities);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  // Route to get a single activity by ID
  app.get('/activities/:id', async (req, res) => {
    try {
      const activity = await Activity.findById(req.params.id); // Find activity by ID
      if (!activity) {
        return res.status(404).send('Activity not found');
      }
      res.status(200).send(activity);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
// Routes
app.get("/", (req, res) => {
    res.send("Welcome to the Node.js App with MongoDB!");
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
