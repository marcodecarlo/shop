const app = require('./app');
const connectDatabase = require('./config/database');

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