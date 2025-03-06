import app from "./server/server.js";
import 'dotenv/config';
import { sequelize } from "./connection/connection.js";

const port = process.env.PORT || 3000;

async function startServer() {
    
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully 🟢')
    } catch (error) {
        process.exit(1);
    }
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })
}

startServer();