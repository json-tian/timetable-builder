const router = require("express").Router();
let Course = require("../models/course.model");

router.route("/").get((req, res) => {
  Course.find()
    .then(courses => res.json(courses))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/getByCode").get((req, res) => {
  var course = Course.findOne({ code: req.body.code }).exec();
  course.then(function(doc) {
    res.json(doc);
  });
});

router.route("/getByName").get((req, res) => {
  var course = Course.findOne({ name: req.body.courseName }).exec();
  course.then(function(doc) {
    res.json(doc);
  });
});

function getTimeSlot(num) {
  return (num - 8) * 2;
}

async function isValidTime(input, sections) {
  return new Promise((resolve, reject) => {
    let data = input;
    console.log("TIMES" + data + ":" + sections);
    let possible = true;
    let times = Array(5)
      .fill(0)
      .map(x => Array(27).fill(0));
    for (var i = 0; i < data.length; i++) {
      for (var k = 0; k < data[i].dates.length; k++) {
        let date = data[i].dates[k];
        if (date.section === sections[i]) {
          for (var j = date.startTime; j < date.endTime; j++) {
            if (times[date.dayOfWeek - 1][getTimeSlot(j)] !== 1) {
              times[date.dayOfWeek - 1][getTimeSlot(j)] = 1;
            } else {
              possible = false;
              break;
            }
          }
        }
      }
    }
    resolve(possible);
  });
}

async function getCourses2(input, start, sections) {
  var allTables = [];

  async function getCourses(input, start, sections) {
    //console.log("start: " + input);

    if (input.length === start) {
      // TODO: verify sections is valid in another method
      isValidTime(input, sections).then(possible => {
        if (possible) allTables.push(sections);
      });

      //console.log("FINAL: " + allTables);
      //console.table(allTables);
    } else {
      for (var i = 1; i <= input[start].sections; i++) {
        var newSection = [...sections];
        newSection.push(i);
        getCourses(input, start + 1, newSection);
      }
    }
  }
  return new Promise((resolve, reject) => {
    getCourses(input, start, sections).then(result => {
      resolve(allTables);
    });
  });
}

async function getDoc(courseNamee) {
  return new Promise((resolve, reject) => {
    Course.findOne({ name: courseNamee })
      .exec()
      .then(doc => {
        console.log("doc" + doc);
        console.log("courses" + courseNamee);

        resolve(doc);
      });
  });
}

function mapCourses(courseNames) {
  let docs = [];
  return new Promise((resolve, reject) => {
    courseNames.map(courseNamee => {
      console.log(courseNamee);
      docs.push(getDoc(courseNamee));
    });
    Promise.all(docs).then(docsList => {
      resolve(docsList);
    });
  });
}

router.route("/getTimetable").post((req, res) => {
  // 1.
  let courseNames = req.body.courses;
  console.log(courseNames);
  //let courses = [];
  mapCourses(courseNames)
    .then(response => {
      return getCourses2(response, 0, []).then(table => {
        return table;
      });
    })
    .then(table => {
      console.table(table);
      res.send(table);
    })
    .catch(err => res.status(400).json("Error: " + err));
  /* 
  1. Get each course detail and store them
  2. Loop through each possible arrangement of dates
  3. Run a method that checks whether its possible
  4. If possible, add to list, otherwise don't. Return list {[course, section]}
  */
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const code = req.body.code;
  const description = req.body.description;
  const dates = req.body.dates;
  const sections = req.body.sections;
  const discipline = req.body.discipline;

  const newCourse = new Course({
    name,
    code,
    description,
    discipline,
    dates,
    sections
  });

  newCourse
    .save()
    .then(() => res.json("Course added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Course.findById(req.params.id)
    .then(course => res.json(course))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Course.findByIdAndDelete(req.params.id)
    .then(() => res.json("Course deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Course.findById(req.params.id)
    .then(course => {
      course.name = req.body.name;
      course.code = req.body.code;
      course.description = req.body.description;
      course.dates = req.body.date;
      course.sections = req.body.sections;
      course.discipline = req.body.discipline;

      course
        .save()
        .then(() => res.json("Course updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
