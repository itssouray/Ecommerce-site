const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./config/db")
const Item = require('./models/itemsModel');

const PORT = 5000

// middlewares
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"));
// require("./TextIndex");




app.get('/api/items', async (req, res) => {
    try {
        const itemData = await Item.find({});
        res.json(itemData);
    } catch (error) {
        console.error('Error fetching item data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.query;
  
      // Perform a search on the Item table based on the query
      const results = await Item.find({ $text: { $search: query } });
  
      res.json(results);
    } catch (error) {
      console.error("Error searching:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });



app.listen(PORT, console.log("Server is running on port ", PORT))





// app.use('/api/items', require("./routes/items"))
// app.use('/api/payment', cors(), require("./routes/payment"))