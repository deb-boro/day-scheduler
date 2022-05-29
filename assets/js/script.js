// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future

var arrTimeBlock = [1, 2, 11, 12, 13, 14, 15, 16, 17, 18]

var colorCodedTimeBlock = function (arrTimeBlock) {
  var i = 0

  while (i < arrTimeBlock.length) {
    var time = arrTimeBlock[i]
    // var time = moment(arrTimeBlock[i], 'HH').format('HH')
    console.log(time)
    var currentTimeHours = moment().hours()
    var hourDiff = time - currentTimeHours

    //when difference is calculated it is always (set time - moment time)
    if (hourDiff > 1) {
      console.log(
        time,
        currentTimeHours,
        'difference is greater than one - GREEN',
      )

      $('.color-block').addClass('bg-success')
      $('.color-block').removeClass('bg-danger')
      $('.color-block').removeClass('bg-secondary')
    } else if (hourDiff == 0) {
      console.log(
        time,
        currentTimeHours,
        'difference is less than one or zero : RED',
      )
      $('.color-block').removeClass('bg-success')
      $('.color-block').removeClass('bg-secondary')
      $('.color-block').addClass('bg-danger')
    } else if (hourDiff < 0) {
      console.log('difference is in negative : GREY ')
      $('.color-block').removeClass('bg-success')
      $('.color-block').removeClass('bg-danger')
      $('.color-block').addClass('bg-secondary')
    } else {
      console.log('time is outside scope')
    }
    i++
  }
}

var displayDateTime = function () {
  var currentTime = moment().format('MMMM Do, YYYY')
  var currentTimeContainer = $('<p>').addClass('current-time').text(currentTime)
  $('.clock-container').append(currentTimeContainer)
  colorCodedTimeBlock(arrTimeBlock)
}

displayDateTime()

// WHEN I click into a time block
// THEN I can enter an event

// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist
