const router = require("express").Router();
let Discipline = require("../models/discipline.model");

router.route("/").get((req, res) => {
  Discipline.find()
    .then(discipline => res.json(discipline))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;

  if (Array.isArray(name)) {
    name.forEach(currentName => {
      const newDiscipline = new Discipline({
        name: currentName
      });
      newDiscipline
        .save()
        .then(() => res.json("Discipline added!"))
        .catch(err => res.status(400).json("Error: " + err));
    });
  } else {
    const newDiscipline = new Discipline({
      name
    });

    newDiscipline
      .save()
      .then(() => res.json("Discipline added!"))
      .catch(err => res.status(400).json("Error: " + err));
  }
});

module.exports = router;
