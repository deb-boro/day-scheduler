// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future
// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

var arrTimeBlock = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
var removeAddColorClass = function (i, hourDiff) {
  if (hourDiff >= 1) {
    $('.color-block-' + i).removeClass('bg-danger')
    $('.color-block-' + i).removeClass('bg-secondary')
    $('.color-block-' + i).addClass('bg-success')
  } else if (hourDiff == 0) {
    $('.color-block-' + i).removeClass('bg-success')
    $('.color-block-' + i).removeClass('bg-secondary')
    $('.color-block-' + i).addClass('bg-danger')
  } //(hourDiff < 0)
  else {
    $('.color-block-' + i).removeClass('bg-success')
    $('.color-block-' + i).removeClass('bg-danger')
    $('.color-block-' + i).addClass('bg-secondary')
  }
}

var colorCodedTimeBlock = function (arrTimeBlock) {
  for (var i = 0; i < arrTimeBlock.length; i++) {
    var time = arrTimeBlock[i]
    var currentTimeHours = moment().hours()
    //when difference is calculated it is always (set time - moment time)
    var hourDiff = time - currentTimeHours
    removeAddColorClass(i, hourDiff)
  }
}

$('.col-8').on('click', function () {
  var textInputEl = $(this).children('p')
  var textEventInfo = textInputEl.text()
  var textArea = $('<textarea>')
    .addClass('text-area-control')
    .val(textEventInfo)
  textInputEl.replaceWith(textArea)
  textArea.trigger('focus')
})

var saveEventInfo = function (arrLatestEventInfo) {
  var existingEntries = JSON.parse(localStorage.getItem('Event_Info') || '[]') //if empty or existing string to arr
  existingEntries.push(arrLatestEventInfo)
  localStorage.setItem('Event_Info', JSON.stringify(existingEntries)) //save it into the local storage again
}

var createTask = function (key, index, textEventInfo) {
  var className = 'color-block-' + index
  console.log(className)
  var textInputEl = $('.' + className).children('p')
  var textEventInfo = textInputEl.text(textEventInfo)
}

var loadSaveEventInfo = function () {
  var loadEventInfo = JSON.parse(localStorage.getItem('Event_Info'))

  $.each(loadEventInfo, function (key, arr) {
    createTask(key, arr.index, arr.textEventInfo)
  })
}
loadSaveEventInfo()

$('.border-left-width').on('click', function () {
  var parentEl = $(this).prev('div')
  var element = parentEl.children('textarea')
  var textEventInfo = element.val()
  var textP = $('<p>').addClass('event-block').text(textEventInfo)
  element.replaceWith(textP)
  var index = parentEl.attr('class').split(' ')[0].substring(12, 13)

  var eventInfoObj = {
    index: index,
    textEventInfo: textEventInfo,
  }

  saveEventInfo(eventInfoObj)
})

var displayDateTime = function () {
  var currentTime = moment().format('MMMM Do, YYYY HH:mm a')
  var currentTimeContainer = $('<p>').addClass('current-time').text(currentTime)
  $('.clock-container').append(currentTimeContainer)
  colorCodedTimeBlock(arrTimeBlock)
}

//getArrEventInfo()
displayDateTime()
