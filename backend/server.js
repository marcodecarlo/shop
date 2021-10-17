const app = require('./app');
const connectDatabase = require('./config/database');

const dotenv = require('dotenv');

dotenv.config({ path: 'backend/config/config.env'})


//Connessione database
connectDatabase();

app.listen(process.env.PORT, () =>{
    console.log(`Il server è avviato sulla porta: ${process.env.PORT} nell'ambiente ${process.env.NODE_ENV} `)
})