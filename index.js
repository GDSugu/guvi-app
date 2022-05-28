const axios = require("axios")
const express = require("express");
const {config} = require("dotenv")

const jwt = require("jsonwebtoken");
const{log,middleware,mongo, validateToken} = require("./shared");


const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");

// const userRoutes = require("./routes/user.routes");

// LOGIC FOR MONGO
const app = express();
config();


// const PORT = 3001;


(async() => {
    try {
        await mongo.connect();

        // PARSE REQUEST BODY AS JSON
        app.use(express.json());
        


        //LOGGING MIDDLEWARE

            app.use(middleware.logging);

        // MAINTENANCE MIDDLEWARE

            app.use(middleware.Maintenance);


        //Auth Route
        app.use("/auth",authRoutes);

        // Token Middleware
        app.use(middleware.validateToken);

        // Resource Route
        app.use("/posts",postRoutes );
        // app.use("/users",userRoutes);


//Initialising the port 

app.listen( process.env.PORT, () => log(`server listening at port ${process.env.PORT}`));
    
    } catch (err) {
        console.error(err)
    }

})();