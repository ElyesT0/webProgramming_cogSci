'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https'); // Add HTTPS module

const app = express();
const port = 0; // Enter the port from which to establish contact

// Load SSL certificates
const sslOptions = {
  key: fs.readFileSync(path.resolve(__dirname, '../../certificates/privkey.pem')), // Absolute path to SSL private key
  cert: fs.readFileSync(path.resolve(__dirname, '../../certificates/fullchain.pem')), // Absolute path to SSL certificate
};

const allowedOrigins = ['https://www.myWebsite.fr', 'https://myWebsite.fr']; // Replace with URL of your website

// Enable CORS for multiple domains
app.use(
  cors({
    origin: function (origin, callback) {
      // If the request's origin is in the allowedOrigins array or if there's no origin (for server-to-server requests)
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error('Not allowed by CORS')); // Reject the request
      }
    },
    credentials: true, // If you need to send cookies or HTTP authentication
  })
);

// Middleware to parse JSON request body
app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit if needed

// Save participant data based on custom headers. Post request is sent to
app.post('/api/saveData', (req, res) => {
  const { experiment_name, participantID, participantData } = req.body;

  // Check headers to determine the directory
  let directory;
  if (experiment_name === 'course_stroopTask') {
    directory = 'course/stroop_task';
  } else {
    directory = 'default_dir'; // Default directory if no matching header is found
  }

  // Ensure the directory exists
  const dirPath = path.resolve(__dirname, `api/${directory}`);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }); // Create the directory if it doesn't exist
  }

  // Define file path
  const filePath = path.join(dirPath, `participant_${participantID}.json`);

  // Write participant data to the file
  fs.writeFile(filePath, JSON.stringify(participantData, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).send('Error saving data');
    }

    res.status(200).send(`Data saved successfully in: ${directory}`);
  });
});

// Start HTTPS server
https.createServer(sslOptions, app).listen(port, () => {
  console.log(`HTTPS Server running on port ${port}`);
});
