const http = require('http');
const mongoose = require("mongoose");

const app = require("./app");
const PORT = process.env.PORT || 8000;
// Nikhil_Sachan
// NikhilSachan123

const MONGO_URL = "mongodb+srv://Nikhil_sachan:NikhilSachan123@nasacluster.vzipnoa.mongodb.net/nasa?retryWrites=true&w=majority"

const {
    loadPlanetData,
} = require("./models/planets.models");

const server = http.createServer(app);

mongoose.connection.once('open', () =>{
    console.log("MongoDb Connnection Ready!");
});
mongoose.connection.on("error", (err) =>{
    console.error(err);
})

async function startServer(){
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology : true
    })
    await loadPlanetData();

    server.listen(PORT, () =>{
        console.log(`server started listening on port ${PORT}`);
    })
}

startServer();



