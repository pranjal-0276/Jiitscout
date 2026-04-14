const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const Building = require("./models/schema");
const { getNavigationSteps } = require("./utils/pathfinder");
const graph = require("./data/campusGraph");

const app = express();
const PORT = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/jiitscout";

console.log("App is starting...");

// ================= DATABASE =================
async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => console.log("MongoDB connection successful ✅"))
  .catch((err) => console.log(err));

// ================= MIDDLEWARE =================
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static + views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

// ================= ROUTES =================

// 🔁 Redirect root → main app
app.get("/", (req, res) => {
  res.redirect("/jiitscout");
});

// 🏠 Home Page
app.get("/jiitscout", (req, res) => {
  res.render("pages/home");
});

// 📍 All Buildings
app.get("/jiitscout/stuff", async (req, res) => {
  const buildings = await Building.find();
  res.render("pages/stuff", { buildings });
});

// 📄 Details Page + Increment Search Count
app.get("/jiitscout/stuff/:id", async (req, res) => {
  const { id } = req.params;

  const building = await Building.findByIdAndUpdate(
    id,
    { $inc: { searchCount: 1 } },
    { new: true }
  );

  res.render("pages/details", { building });
});

// 📊 Stats Page
app.get("/jiitscout/stats", async (req, res) => {
  const buildings = await Building.find().sort({ searchCount: -1 });
  res.render("pages/stats", { buildings });
});

// 🧭 Navigation Feature
function renderNavigation(req, res) {
  const { start, goal } = req.query;
  const locations = Object.keys(graph);

  if (!start || !goal) {
    return res.render("pages/navigation", {
      steps: null,
      start: "",
      goal: "",
      locations,
    });
  }

  const steps = getNavigationSteps(start, goal);

  res.render("pages/navigation", { steps, start, goal, locations });
}

app.get("/navigate", renderNavigation);
app.get("/jiitscout/navigate", renderNavigation);

// ================= ADMIN =================

// Add Place Form
app.get("/jiitscout/admin/add", (req, res) => {
  res.render("pages/register-place");
});

// Backward-compatible admin route
app.get("/jiitscout/admin/register-place", (req, res) => {
  res.redirect("/jiitscout/admin/add");
});

// Save New Place
app.post("/jiitscout/admin/add", async (req, res) => {
  try {
    const { name, desc, type, imageUrl } = req.body;

    const building = new Building({
      name,
      desc,
      type,
      image: { url: imageUrl },
    });

    await building.save();
    res.redirect("/jiitscout/stuff");
  } catch (err) {
    console.log(err);
    res.redirect("/jiitscout/admin/add");
  }
});

// Update Form
app.get("/jiitscout/admin/:id/update", async (req, res) => {
  const { id } = req.params;
  const building = await Building.findById(id);
  res.render("pages/update", { building });
});

// Update Data
app.put("/jiitscout/stuff/:id", async (req, res) => {
  const { id } = req.params;
  const updatedBuilding = req.body.building;

  await Building.findByIdAndUpdate(id, updatedBuilding, {
    new: true,
    runValidators: true,
  });

  res.redirect(`/jiitscout/stuff/${id}`);
});

// Delete
app.delete("/jiitscout/admin/:id", async (req, res) => {
  const { id } = req.params;

  await Building.findByIdAndDelete(id);
  res.redirect("/jiitscout/stuff");
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`SERVER STARTED ON http://localhost:${PORT} 🚀`);
});