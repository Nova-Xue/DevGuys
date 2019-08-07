const path = require("path");
const router = require("express").Router();
const topicApi = require("./topicApi");
const userApi = require("./userApi");
const loginApi = require("./loginApi");
const registerApi = require("./registerApi");
// API Routes
router.use("/api/", topicApi);
router.use("/api/",userApi);
router.use("/api/",loginApi)
router.use("/api/",registerApi);
router.use("/api/user_data",(req,res)=>{
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({uid : req.user.uid, username : req.user.username});
  }
})
// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;