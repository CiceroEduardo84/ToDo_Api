import express from "express";
import "dotenv/config";
import { routes } from "./routes";
import { errorHandling } from "./middlewares/errorHandling";

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json());
server.use(routes);
server.use(errorHandling);

server.listen(PORT, () => {
  console.log(`Server running in the PORT:${PORT}`);
});
