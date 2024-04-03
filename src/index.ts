import express from "express";
import { db } from "./db";

const port = 1337;
const app = express();

app.use(express.json());

app.get("/api/users", async (_, res) => {
  try {
    const users = await db
      .from("users")
      .select("*")
      .orderBy("created_at")
      .returning("*");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await db
      .from("users")
      .select("*")
      .where("id", "=", parseInt(id))
      .returning("*");

    if (!user[0]) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { name } = req.body;
    const user = await db.from("users").insert({ name }).returning("*");

    res.status(201).json(user[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.patch("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const user = await db
      .from("users")
      .select("*")
      .where("id", "=", parseInt(id))
      .returning("*");

    if (!user[0]) {
      return res.status(404).json({ message: "User not found." });
    }

    const updatedUser = await db
      .from("users")
      .update({ name })
      .where("id", "=", parseInt(id))
      .returning("*");

    res.status(201).json(updatedUser[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await db
      .from("users")
      .select("*")
      .where("id", "=", parseInt(id))
      .returning("*");

    if (!user[0]) {
      return res.status(404).json({ message: "User not found." });
    }

    const deletedUser = await db
      .from("users")
      .where("id", "=", parseInt(id))
      .del()
      .returning("*");

    res.status(201).json(deletedUser[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is up on http://localhost:${port}`);
});
