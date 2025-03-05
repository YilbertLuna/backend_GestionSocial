import app from "./server/server.js";
import 'dotenv/config';
import { connectionDatabase } from "./connection/connection.js";

const port = process.env.PORT || 3000;

async function startServer() {
    
    try {
        await connectionDatabase();
    } catch (error) {
        process.exit(1);
    }
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })
}

startServer();