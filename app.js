const express=require("express");
const PORT=8080;
const mongoose=require("mongoose");
const MONGO_URL="mongodb://127.0.0.1:27017/jiitscout";
const path=require("path");
const app=express();
const ejsMate=require("ejs-mate");
const Building=require("./models/schema");
const methodOverride=require("method-override");

app.use(methodOverride("_method"));
main()
.then(()=>{
    console.log("mongodb connection successful");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
}

//setting up ejs views folder and public folder path
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"./public")));
app.engine("ejs",ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.listen(PORT,()=>{
    console.log(`PORT ${PORT} is listening`);
})

const admins = [
  { adminName: "Akshita", email: "akshita@example.com", password: "pass123" },
  { adminName: "Rohit", email: "rohit@example.com", password: "pass456" },
  { adminName: "Meena", email: "meena@example.com", password: "pass789"},
  { adminName: "Amit", email: "amit@example.com", password: "pass000" },
];


app.get("/jiitscout/stuff/:id", async (req, res) => {
    //this route is to increase count of search done for stats
  const { id } = req.params;

  const building = await Building.findByIdAndUpdate(
  id,
  { $inc: { searchCount: 1 } },   
  { new: true }
);

  res.render("pages/details", { building });
});

//for home page 
app.get("/jiitscout",async (req,res)=>{
    
    res.render("pages/home");
})

//for all locations
app.get("/jiitscout/stuff",async(req,res)=>{
    let buildings=await Building.find();
    res.render("pages/stuff",{buildings});
})

app.get("/jiitscout/stats", async (req, res) => {
  const buildings = await Building.find().sort({ searchCount: -1 });

  res.render("pages/stats.ejs", { buildings });
});


// app.post('/jiitscout/admin', (req, res) => {
//   const { adminName, email, password, adminSecret } = req.body;

//   // check if admin exists and credentials match
//   const admin = admins.find(a =>
//     a.adminName === adminName &&
//     a.email === email &&
//     a.password === password // can also check a.adminSecret
//   );

//   if (admin) {
//     // success → redirect to admin dashboard
//     res.render('pages/admin-dashboard');
//   } else {
//     // failure → reload login with error
//     res.render('pages/error')
//   }
// });
app.get("/jiitscout/admin/register-place",(req,res)=>{
    res.render("pages/register-place")
})

app.get("/jiitscout/admin/:id/update",async(req,res)=>{
    const {id}=req.params
    const building = await Building.findById(id)

    res.render("pages/update",{building})
})

app.put("/jiitscout/stuff/:id", async (req, res) => {
  const { id } = req.params;
  const updatedBuilding = req.body.building; // object from form

  // Update in MongoDB
  await Building.findByIdAndUpdate(id, updatedBuilding, { new: true, runValidators: true });

  // Redirect back to details page or listings page
  res.redirect(`/jiitscout/stuff/${id}`);
});

app.delete("/jiitscout/admin/:id", async (req, res) => {
  const { id } = req.params;

  // Delete the building from database
  await Building.findByIdAndDelete(id);

  // Redirect back to listings page
  res.redirect("/jiitscout/stuff");
});


// GET route → show the Add Place form
app.get("/jiitscout/admin/add", (req, res) => {
  res.render("pages/register-place"); // your add form
});

// POST route → handle form submission
app.post("/jiitscout/admin/add", async (req, res) => {
  try {
    // req.body contains the form data
    const { name, desc, type, imageUrl } = req.body;

    // Create a new building document
    const building = new Building({
      name,
      desc,
      type,
      image: { url: imageUrl }
    });

    await building.save(); // save to MongoDB

    // Redirect back to all listings
    res.redirect("/jiitscout/stuff");
  } catch (err) {
    console.log(err);
    res.redirect("/jiitscout/admin/add");
  }
});