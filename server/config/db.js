const mongoose = require("mongoose")

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI)
//         console.log("Mongo DB Connected: ", conn.connection.host)
//     }
//     catch(err) {
//         console.log(err)
//         process.exit(1)
//     }
// }

mongoose.connect(process.env.MONGO_URI,options)
  .then(()=>{
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err)=>{
    console.log("Error connecting to MongoDB: ",err);
  })

module.exports = mongoose;

