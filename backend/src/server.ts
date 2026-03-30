import app from "./app";
import "./utils/scheduler";
import {pool} from "./utils/db";

const PORT=process.env.BACKEND_PORT || 3000;

pool.connect()
    .then(()=>{
        console.log("Connected to database");

        app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err)=>{
        console.error("Failed to connect to database",err);
        process.exit(1);
    })

