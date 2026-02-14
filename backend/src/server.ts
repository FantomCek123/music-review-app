import app from "./app";
import dotenv from "dotenv";

import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const PORT = process.env.PORT || 3000;
const client = new MongoClient(process.env.MONGO_URI!, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function startServer() {
  try {
    await client.connect();
    console.log("MongoDB uspešno povezan!");
    app.listen(PORT, () => {
      console.log(`Server radi na portu ${PORT}`);
    });
  } catch (err) {
    console.error("Greška pri konekciji sa MongoDB:", err);
    process.exit(1);
  }
}

startServer();
