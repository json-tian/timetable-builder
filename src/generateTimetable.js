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

export async function generateTimetable(courses) {
  return getCourses2(courses, 0, [])
    .then(table => {
      return table;
    })
    .then(table => {
      console.table(table);
      return table;
    });
  /* 
    1. Get each course detail and store them
    2. Loop through each possible arrangement of dates
    3. Run a method that checks whether its possible
    4. If possible, add to list, otherwise don't. Return list {[course, section]}
    */
}
