const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const client = new MongoClient(process.env.MONGODB_URI);

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const db = client.db("smasam_database"); // change to your DB name
        const users = db.collection("users");   // change to your collection name

        app.get("/add-user", async (req, res) => {
            const newUser = { name: "Rayhan", email: "rayhan@test.com" };
            await users.insertOne(newUser);
            res.send("User added!");
        });

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error(err);
    }
}
run();
