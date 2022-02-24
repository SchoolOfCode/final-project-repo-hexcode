//set up the database PORT and the listener:
import app from "../app.js";

// if there's a port for a remote deployment on, say, Heroku, use that, otherwise go for local host, which i would set to 3000, or 3001 or 5000 etc.
const PORT_FALLBACK_VALUE = 3000; //changed to 3000 from 5000 ao it works for development on Mac's
const PORT = process.env.PORT || PORT_FALLBACK_VALUE;

//remember app = express(), and express has been imported from 'express';
app.listen(PORT, () => {
    console.log(`Reporting from www.js. Listening on PORT ${PORT}`);
});
