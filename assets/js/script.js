$(function () {
  /* {============================= DOM / Element / Variable Declaration  =============================} */
  var displayedCurrentTime = $("#currentDay");
  var timeBlockListEl = $(".time-block");
  var hourListEl = $(".hour");
  var mainSection = $("main");
  // var textBlockListEl = $(".description");
  // var textInput = $(".description").val();

  /* {============================= Functions (callback) =============================} */
  /* [--------- For getting local storage data and then display in the browser ---------] */
  function renderData() {
    timeBlockListEl.each(function () {
      var keyName = $(this).children().eq(0).text();
      var remoteValue = localStorage.getItem(keyName)
      if (remoteValue) {
        $(this).children(".description").val(remoteValue);
      }
    })
  }

  /* [--------- For timeblock background-color ---------] */
  function timeBlcokDisplayColor() {
    var currentHour = dayjs().hour();
    timeBlockListEl.each(function () {
      var hourBlockStr = $(this).attr("id").split("-")[1];
      var hourBlockNum = parseInt(hourBlockStr);

      if (hourBlockNum === currentHour) {
        // present
        $(this).addClass("present");
        // $(this).toggleClass("present");
      } else if (hourBlockNum < currentHour) {
        // past
        $(this).addClass("past");
        // $(this).toggleClass("past");
      } else {
        // future
        $(this).addClass("future");
        // $(this).toggleClass("future");
      }

      // console.log(`Current: ${currentHour}`);
      // console.log(hourBlockNum);
    })
  }

  /* {============================= Add Event Listener  =============================} */
  /* [--------- Add a listener for click events on the save button -> if click then save key:value pair in the local storage ---------] */
  timeBlockListEl.on("click", ".saveBtn", function (evt) {
    evt.preventDefault();

    var key = $(this).siblings(".hour").text();
    var value = $(this).siblings(".description").val();
    // localStorage.setItem(key, value);
    var errorMessage = "Text area cannot be empty. Please type somthing... \nOr use the delete button to clear all text";
    /*
     If the input is empty -> alert error message
     If sth in the text field -> save the data in the remote local storage {[key: xAPM]: [value: input.val()]}
    */
    ((typeof value === 'string' && value.trim().length === 0) ? window.alert(errorMessage) : localStorage.setItem(key, value));



    // pushData();

    // console.log("------inside event listener------");
    // console.log(evt.target);
    // console.log($(evt.target).parent());
    // console.log("---up: evt.terget vs this---");
    // console.log($(this));
    // console.log($(this).siblings(".description").val());
    // console.log($(this).siblings(".hour").text());
    // console.log(typeof($(this).siblings(".description").val()));
    // console.log(typeof($(this).siblings(".hour").text()));
    // console.log(value);
  });

  /* [--------- For deleting local storage data and then display empty in the textarea ---------] */
  timeBlockListEl.on("click", ".btn-danger", function (evt) {
    evt.preventDefault();

    var keyName = $(this).siblings(".hour").text();
    localStorage.removeItem(keyName);
    $(this).siblings(".description").val("");
  });


  /* {============================= Calling functions  =============================} */
  /* [--------- Add code to apply the past, present, or future class to each time block by comparing the id to the current hour. ---------] */
  // Call for the first time dispaly
  timeBlcokDisplayColor();
  setInterval(function () {
    timeBlcokDisplayColor();
  }, 1000 * 60 * 30);

  /* [--------- Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements. ---------] */
  renderData();

  /* [--------- Add code to display the current date in the header of the page. ---------] */
  setInterval(() => {
    var dateTime = dayjs();
    displayedCurrentTime.text(dateTime.format('dddd, MMMM DD, h:mm:ss , YYYY'))
  }, 1000)
  // displayedCurrentTime.text(dayjs().format('ss dddd, MMMM DD, YYYY'));


  /* {============================= Testing / Logging  =============================} */
  // console.log("~~~~~~~~~~~~~Refresh Start~~~~~~~~~~~~~");
  // console.log(timeBlockListEl);
});


/* {============================= Notes =============================} */
// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.


  // /* [--------- Temp ---------] */
  // var insetHtmlArray = [];

  // for (let index = 7; index < 10; index++) {
  //   insetHtmlArray.push(`
  //   <div id="hour-${index + 12}" class="row time-block">
  //     <div class="col-2 col-md-1 hour text-center py-3">${index}PM</div>
  //     <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
  //     <button class="btn saveBtn col-2 col-md-1" aria-label="save">
  //       <i class="fas fa-save" aria-hidden="true"></i>
  //     </button>
  //   </div>`)
  // };

  // // console.log(insetHtmlArray);
  // insetHtmlArray.forEach((item) => {
  //   mainSection.append(item);
  // });
  // // very important, not define again will...
  // var timeBlockListEl = $(".time-block");


/* 
$(function() {
  allCodeInsideHere
})

Wrap all code that interacts with the DOM in a call to jQuery to ensure that
the code isn't run until the browser has finished rendering all the elements
in the html.
*/

/*<-----I had intended to create a callback function in the timeBlockListEl onclick, but we cannot $(this) keyword is not what I expect...----->*/
/*
function pushData() {
  var key = $(this).siblings(".hour").text();
  var value = $(this).siblings(".description").val();
  localStorage.setItem(key, value);
};
*/

/*<-----Another way to render data----->*/
/*
function renderData() {
  hourListEl.each(function () {
    var keyName = $(this).text();
    var remoteValue = localStorage.getItem(keyName);
    if (remoteValue) {
      $(this).siblings(".description").val(remoteValue);
    }
  })
};
*/

/*<-----I had intended to create a method to create each timeblock row => but cannot get the element at the appended row... ----->*/
/*
function createRow() {

};
*/

/*
var insetHtmlArray = [];
for (let index = 0; index < 5; index++) {
  insetHtmlArray.push(`
    <div id="hour-${index}" class="row time-block">
      <div class="col-2 col-md-1 hour text-center py-3">${index}</div>
      <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    </div>`)
}
console.log(insetHtmlArray);
insetHtmlArray.forEach((item) => {
  mainSection.prepend(item);
});
*/

/*
var mainInnerHtml = `
  <div id="hour-8" class="row time-block">
    <div class="col-2 col-md-1 hour text-center py-3">8</div>
    <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
  </div>`

mainSection.prepend(mainInnerHtml);
*/