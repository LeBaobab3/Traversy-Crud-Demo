const e = require("express");
const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Story = require("../models/Story");

//@desc Show add page
//@router GET / stories/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("stories/add");
});

//@desc Process add form
//@router POST /stories
//when we interact with the database we need to use async
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id; //taking in the body and grabbing the user i.d and added that value to the body
    await Story.create(req.body); //create the structure for the body. It'll populate
    res.redirect("/dashboard"); // added redirect so once we submit we post then go back to dashboard
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

//@desc Showw all public stories
//@Route GET /stories
router.get("/", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();
    res.render("stories/index", {
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

//@desc Show edit page
//@Route GET /stories/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    const story = await Story.findOne({
      _id: req.params.id,
    }).lean();

    if (!story) {
      return res.render("error/404");
    }

    if (story.user != req.user.id) {
      res.redirect("/stories");
    } else {
      res.render("stories/edit", {
        story,
      });
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

module.exports = router;
