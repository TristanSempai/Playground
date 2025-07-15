import express from "express";
const app = express();
const port = 3000;
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index2.html"));
});
app.get("/index2.js", (req, res) => {
  res.sendFile(path.join(__dirname, "index2.js"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
