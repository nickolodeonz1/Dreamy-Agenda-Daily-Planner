
let categories = [
  {
    title: "Personal",
    img: "personal.jpg",
  },
  {
    title: "Work",
    img: "briefcase.png",
  },
  {
    title: "Shopping",
    img: "shopping.jpg",
  },
  {
    title: "Coding",
    img: "work.jpg",
  },
  {
    title: "Health",
    img: "healthcare.png",
  },
  {
    title: "Fitness",
    img: "fitness.jpg",
  },
  {
    title: "Education",
    img: "educ.jpg",
  },
  {
    title: "Finance",
    img: "money.jpg",
  },
];


const toggleScreen = () => {
  screenWrapper.classList.toggle("show-category");
};

const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];



dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

//function to add event
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});

addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

// addEventSubmit.addEventListener("click", () => {
//   const eventTitle = addEventTitle.value;
//   const eventTimeFrom = addEventFrom.value;
//   const eventTimeTo = addEventTo.value;
//   if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
//     alert("Please fill all the fields");
//     return;
//   }

//   //check correct time format 24 hour
//   const timeFromArr = eventTimeFrom.split(":");
//   const timeToArr = eventTimeTo.split(":");
//   if (
//     timeFromArr.length !== 2 ||
//     timeToArr.length !== 2 ||
//     timeFromArr[0] > 23 ||
//     timeFromArr[1] > 59 ||
//     timeToArr[0] > 23 ||
//     timeToArr[1] > 59
//   ) {
//     alert("Invalid Time Format");
//     return;
//   }

//   const timeFrom = convertTime(eventTimeFrom);
//   const timeTo = convertTime(eventTimeTo);

//   //check if event is already added
//   let eventExist = false;
//   eventsArr.forEach((event) => {
//     if (
//       event.day === activeDay &&
//       event.month === month + 1 &&
//       event.year === year
//     ) {
//       event.events.forEach((event) => {
//         if (event.title === eventTitle) {
//           eventExist = true;
//         }
//       });
//     }
//   });
//   if (eventExist) {
//     alert("Event already added");
//     return;
//   }
//   const newEvent = {
//     title: eventTitle,
//     time: timeFrom + " - " + timeTo,
//   };
//   console.log('new event', newEvent);
//   console.log('active day', activeDay);
//   let eventAdded = false;
//   if (eventsArr.length > 0) {
//     eventsArr.forEach((item) => {
//       if (
//         item.day === activeDay &&
//         item.month === month + 1 &&
//         item.year === year
//       ) {
//         item.events.push(newEvent);
//         eventAdded = true;
//       }
//     });
//   }

//   if (!eventAdded) {
//     eventsArr.push({
//       day: activeDay,
//       month: month + 1,
//       year: year,
//       events: [newEvent],
//     });
//   }

//   console.log(eventsArr);
//   addEventWrapper.classList.remove("active");
//   addEventTitle.value = "";
//   addEventFrom.value = "";
//   addEventTo.value = "";
//   updateEvents(activeDay);
//   const activeDayEl = document.querySelector(".day.active");
//   if (!activeDayEl.classList.contains("event")) {
//     activeDayEl.classList.add("event");
//   }
// });

//function to delete event when clicked on event
// eventsContainer.addEventListener("click", (e) => {
//   if (e.target.classList.contains("event")) {
//     if (confirm("Are you sure you want to delete this event?")) {
//       const eventTitle = e.target.children[0].children[1].innerHTML;
//       eventsArr.forEach((event) => {
//         if (
//           event.day === activeDay &&
//           event.month === month + 1 &&
//           event.year === year
//         ) {
//           event.events.forEach((item, index) => {
//             if (item.title === eventTitle) {
//               event.events.splice(index, 1);
//             }
//           });
//           if (event.events.length === 0) {
//             eventsArr.splice(eventsArr.indexOf(event), 1);
//             //remove event class from day
//             const activeDayEl = document.querySelector(".day.active");
//             if (activeDayEl.classList.contains("event")) {
//               activeDayEl.classList.remove("event");
//             }
//           }
//         }
//       });
//       updateEvents(activeDay);
//     }
//   }
// });


const toggleAddTaskForm = () => {
  addTaskWrapper.classList.toggle("active");
  blackBackdrop.classList.toggle("active");
  addTaskBtn.classList.toggle("active");
};


// Initialize variables and DOM elements
let selectedCategory = categories[0];
const categoriesContainer = document.querySelector(".categories");
const screenWrapper = document.querySelector(".wrapper");
const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".back-btn");
const tasksContainer = document.querySelector(".tasks");
const numTasks = document.getElementById("num-tasks");
const categoryTitle = document.getElementById("category-title");
const categoryImg = document.getElementById("category-img");
const categorySelect = document.getElementById("category-select");
const addTaskWrapper = document.querySelector(".add-task");
const addTaskBtn = document.querySelector(".add-task-btn");
const taskInput = document.getElementById("task-input");
const blackBackdrop = document.querySelector(".black-backdrop");
const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const totalTasks = document.getElementById("total-tasks");

// Attach event listeners
backBtn.addEventListener("click", toggleScreen);
addTaskBtn.addEventListener("click", toggleAddTaskForm);
blackBackdrop.addEventListener("click", toggleAddTaskForm);
cancelBtn.addEventListener("click", toggleAddTaskForm);

categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category.title.toLowerCase();
  option.textContent = category.title;
  categorySelect.appendChild(option);
});
