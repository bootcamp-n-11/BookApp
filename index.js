import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api", router);

const port = process.env.PORT || 3001;
app.listen(port, (err) => {
  if (err) throw err;
  else console.log(`Server is running on port: ${port}`);
});
