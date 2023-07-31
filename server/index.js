const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://dbTvarat:@Zalgiris198@atlascluster.rtjiic7.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
});

const Event = mongoose.model("Event", EventSchema);

app.post("/api/events", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: "Failed to create event" });
  }
});

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

app.put("/api/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(event);
  } catch (err) {
    res.status(404).json({ error: "Event not found" });
  }
});

app.delete("/api/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndRemove(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(404).json({ error: "Event not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
