const mongoose = require('mongoose');
const faker = require('faker');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/itemsDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Define your item schema
const itemSchema = new mongoose.Schema({
  // Your schema fields here
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  city: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  userName: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: Date, required: true },
});

const Item = mongoose.model('Item', itemSchema);

// Insert 100 random items
async function seedItems() {
  for (let i = 0; i < 100; i++) {
    const newItem = new Item({
      id: faker.datatype.uuid(),
      title: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      location: faker.address.streetAddress(),
      city: faker.address.city(),
      phoneNumber: faker.phone.phoneNumber(),
      userName: faker.name.firstName(),
      userId: faker.internet.email(),
      date: Date.now(),
    });

    try {
      await newItem.save();
    } catch (error) {
      console.error(error);
    }
  }

  // Close the connection
  db.close();
}

seedItems();
