import { initMongoDB } from "./config/db.js";
import { startServer } from "./server.js";
const boot = async () => {
    await initMongoDB();
    startServer();
};
boot();
