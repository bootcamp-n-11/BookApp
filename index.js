import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.routes.js";
import helmet from "helmet";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api", routes);
app.use(helmet())

const port = process.env.PORT || 3001;
app.listen(port, (err) => {
  if (err) throw err;
  else console.log(`Server is running on port: ${port}`);
});
