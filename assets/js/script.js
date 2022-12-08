
$(function () {
  /* {============================= DOM / Element / Variable Declaration  =============================} */
  var displayedCurrentTime = $("#currentDay");
  var timeBlockListEl = $(".time-block");

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
    var errorMessage = "Text area cannot be empty. Please type somthing... \nOr use the delete button to clear all text";
    /*
     If the input is empty -> alert error message
     If sth in the text area -> save the data in the remote local storage {[key: xAPM]: [value: input.val()]}
     localStorage.setItem(key, value);
    */
    ((typeof value === 'string' && value.trim().length === 0) ? window.alert(errorMessage) : localStorage.setItem(key, value));
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
  setInterval(timeBlcokDisplayColor, 1000 * 60 * 30);

  /* [--------- Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements. ---------] */
  renderData();

  /* [--------- Add code to display the current date in the header of the page. ---------] */
  setInterval(() => {
    var dateTime = dayjs();
    displayedCurrentTime.text(dateTime.format('dddd, MMMM DD, h:mm:ss , YYYY'))
  }, 1000)
  
});