/*
  Note: This project is a basic example and does not implement security measures.
  For a production-level application, it's crucial to incorporate proper security practices.
  At a minimum, all API methods should include Google token validation to ensure the authenticity 
  of the user by verifying their Google ID.
*/

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/itemsDB')
  .then(() => {
    console.log('Connected to MongoDB');

    // Define a schema for your items
    const itemSchema = new mongoose.Schema({
      id: {
        type: String,
        required: true,
        unique: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    });

    // Create a model based on the schema
    const Item = mongoose.model('Item', itemSchema);

    // Middleware to parse JSON in the request body
    app.use(bodyParser.json());

    // Define ApiErrors enum
    const ApiErrors = {
      invalidURL: 'Invalid URL',
      networkError: 'Network Error',
      duplicateUUID: 'Duplicate UUID',
      mandatoryFieldsMissing: 'Mandatory fields are missing',
      internalServerError: 'Internal Server Error',
      itemNotFoundServerError: 'Item not found Error',
    };

    // Example route to fetch all items
    app.get('/api/items', async (req, res) => {
      try {
        const items = await Item.find();
        res.json(items);
      } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: ApiErrors.internalServerError });
      }
    });

    // Example route to remove an item by ID
    app.delete('/api/items/remove/:id', async (req, res) => {
      const itemId = req.params.id;
  
      try {
          // Construct a query object with the item ID
          const query = { id: itemId };
  
          // Use findOneAndDelete with the query object
          const result = await Item.findOneAndDelete(query);
  
          // Check if the item was found and deleted
          if (result) {
              res.json({ success: true });
              console.log('Success: Item removed');
          } else {
              res.status(404).json({ error: ApiErrors.itemNotFoundServerError });
              console.error('Error: Item not found');
          }
      } catch (error) {
          console.error('Error removing item:', error);
          res.status(500).json({ error: ApiErrors.internalServerError });
      }
  });
  

    // Example route to update an item by ID
    app.put('/api/items/update/:id', async (req, res) => {
      const itemId = req.params.id;
      const updatedItemData = req.body;
    
      // Check for mandatory fields
      if (!updatedItemData.title || !updatedItemData.location || !updatedItemData.userId
        || !updatedItemData.userName || !updatedItemData.phoneNumber) {
        res.status(400).json({ error: ApiErrors.mandatoryFieldsMissing });
        console.error('Failed update item missing mandatory fields'); 
        return;
      }
    
      try {
        // Use findOneAndUpdate instead of findOneAndDelete
        await Item.findOneAndUpdate({ id: itemId }, updatedItemData);
        res.json({ success: true });
        console.error('success item updated');
      } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ error: ApiErrors.internalServerError });
      }
    });

    // Example route to add a new item
    // uuid generated at client side, so we should use put, not post.
    app.put('/api/items', async (req, res) => {
      const newItemData = req.body;

      // Check if newItemData is undefined
      if (!newItemData) {
        console.error('New item data is undefined'); // Debug statement
        res.status(400).json({ error: ApiErrors.mandatoryFieldsMissing });
        return;
      }

      console.log('Received new item data:', newItemData); // Debug statement

      // Check for mandatory fields
      if (!newItemData.title || !newItemData.location || !newItemData.userId
        || !newItemData.userName || !newItemData.phoneNumber) {
        res.status(400).json({ error: ApiErrors.mandatoryFieldsMissing });
        console.error('Failed create new item missing mandatory fields'); // Debug statement
        return;
      }

      try {
        const newItem = new Item(newItemData);
        await newItem.save();
        res.json({ success: true });
        console.log('success Item created');
      } catch (error) {
        // Check if the error is due to a duplicate id
        if (error.code === 11000) {
          console.log('Duplicate UUID found for userId:', newItemData.userId); // Debug statement
          res.status(406).json({ error: ApiErrors.duplicateUUID });
          return;
        }

        console.error('Error adding new item:', error);
        res.status(500).json({ error: ApiErrors.internalServerError });
      }
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
