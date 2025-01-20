const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

const MONGO_URI=process.env.MONGO_URI || 'mongodb+srv://shubhamkate962:Z6C3RKTu6es3NEyG@cygniidata.kyxrd.mongodb.net/CygniiDbCluster?retryWrites=true&w=majority'
console.log(MONGO_URI);

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define the schema and model for the color data
const colorDataSchema = new mongoose.Schema({
  srNo: { type: String, required: true },
  color: { type: String, required: true },
});

const ColorData = mongoose.model('ColorData', colorDataSchema);

// POST route to save data
app.post('/submit', async (req, res) => {
  const { srNo, color } = req.body;

  try {
    const newColorData = new ColorData({
      srNo,
      color,
    });

    await newColorData.save();
    res.status(201).json({
      message: 'Data saved successfully!',
      data: { srNo, color },
    });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Error saving data' });
  }
});

// Start the server
const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
