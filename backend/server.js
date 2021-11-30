const app = require('./app');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');

const dotenv = require('dotenv');

//Handle Uncaught exceptions
process.on('uncaughtException', err =>{
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down server due to uncaught exception');
    process.exit(1);
})

dotenv.config({ path: 'backend/config/config.env'})

//Connessione database
connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () =>{
    console.log(`Il server è avviato sulla porta: ${process.env.PORT} nell'ambiente ${process.env.NODE_ENV} `)
});

// Handle Unhandled Promise rejections
process.on('unhandledRejection', err =>{
    console.log(`ERROR : ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise rejections');
    server.close(() =>{
        process.exit(1);
    })
});