const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Item = require('./models/itemsModel');


const itemCollection = Item.collection;

itemCollection.createIndex({ name: 'text' }, (err) => {
  if (err) {
    console.error('Error creating text index:', err);
  } else {
    console.log('Text index created successfully.');
  }

  mongoose.connection.close();
});
