const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { google } = require("googleapis");
const dotenv = require("dotenv");
const cors = require('cors');
const Activity = require('./models/Activity');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Enable CORS
app.use(cors());


// Middleware
app.use(express.json()); 

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected..."))
.catch((err) => console.error("MongoDB connection failed:", err));

// Google Sheets API setup
const credentials = require("./credentials.json");

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

// Route to create a new activity
app.post('/activities', async (req, res) => {
  try {
    const activity = new Activity(req.body); 
    await activity.save(); 
    res.status(201).send(activity);

    try{
      const spreadsheetId = process.env.SHEET_ID;
    const range = "Sheet!A2:C2";

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[activity.title, activity.description, activity.date]],
      },
    });
    }catch(error){
      console.error("Error appending to Google Sheets:", error);
    }

  } catch (err) {
    res.status(400).send(err.message);
  }

});

// Route to get all activities
app.get('/activities', async (req, res) => {
  try {
    const activities = await Activity.find(); 
    res.status(200).send(activities);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to get a single activity by ID
app.get('/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id); 
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
