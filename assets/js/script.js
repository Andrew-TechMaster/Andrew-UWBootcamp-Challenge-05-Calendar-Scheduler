// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  /* {============================= DOM / Element / Variable Declaration  =============================} */
  var displayedCurrentTime = $("#currentDay");
  var timeBlockListEl = $(".time-block");
  // var textInput = $(".description").val();
  var hourListEl = $(".hour");
  var textBlockListEl = $(".description");

  /* {============================= Functions (callback) =============================} */
  function pushData() {
    // var key = $(this).siblings(".hour").text();
    // var value = $(this).siblings(".description").val();
    // localStorage.setItem(key, value);
  };

  function renderData() {
    hourListEl.each(function () {
      var keyName = $(this).text();
      var remoteValue = localStorage.getItem(keyName);
      if (remoteValue) {
        $(this).siblings(".description").val(remoteValue);
      }
    })
  }

  // function renderData2() {
  //   timeBlockListEl.each(function() {
  //     var keyName = $(this).children().eq(0).text();
  //     var remoteValue = localStorage.getItem(keyName)
  //     if (remoteValue) {
  //       $(this).children(".description").val(remoteValue);
  //     }
  //   })
  // }

  function timeBlcokDisplay() {
    var currentHour = dayjs().hour();
    timeBlockListEl.each(function () {
      var hourBlockStr = $(this).attr("id").split("-")[1];
      var hourBlockNum = parseInt(hourBlockStr);

      if (currentHour === hourBlockNum) {
        // present
      } else if (currentHour > hourBlockNum) {
        // past
      } else {
        // future
      }

      console.log(hourBlockNum);
    })
  }

  /* {============================= Add Event Listener  =============================} */
  // TODO: Add a listener for click events on the save button.
  timeBlockListEl.on("click", ".saveBtn", function (evt) {
    evt.preventDefault();

    var key = $(this).siblings(".hour").text();
    var value = $(this).siblings(".description").val();
    localStorage.setItem(key, value);

    // pushData();

    // console.log("------inside event listener------");
    // console.log(evt.target);
    // console.log($(evt.target).parent());
    // console.log($(this));
    // console.log($(this).siblings(".description").val());
    // console.log($(this).siblings(".hour").text());
    // console.log(typeof($(this).siblings(".description").val()));
    // console.log(typeof($(this).siblings(".hour").text()));
  });

  // TODO: Add code to apply the past, present, or future class to each time block by comparing the id to the current hour.
  timeBlcokDisplay()

  // TODO: Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements.
  renderData();
  // renderData2();

  // TODO: Add code to display the current date in the header of the page.
  displayedCurrentTime.text(dayjs().format('dddd, MMMM DD, YYYY'));

  /* {============================= Testing / Logging  =============================} */
  console.log("~~~~~~~~~~~~~Refresh Start~~~~~~~~~~~~~");
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