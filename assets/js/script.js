// Table element for showing calendar events.
var timeSlotsEl = $('#time-slots');
// Starting hour for the calendat events.
const calendarStartHour = 9;
// Final hour for the calendat events.
const calendarEndHour = 18;

// Update header with current day in 'ddd, MMM Do' format (ex: Sat, 28th May)
$('#currentDay').text(moment().format('ddd, MMM Do'));
// Fetch all the events stored in local storage. Initialize an dictoinary if there are no stored events.
const eventDict = JSON.parse(localStorage.scheduler || '{}');

// Displays todays events in table format.
// We use bootstrap to format the table.
// |-hour-|-------  Event details ------|-save-|
function displayCalender() {
    // Loop through start to end hour
    for (var hour = calendarStartHour; hour < calendarEndHour; hour++) {
        // Convert the hour  from 24hr format to 12hr format.
        let time = moment(hour,'HH').format('hh a');
        // Create a tablerow for the hour
        let timeRow = $('<tr>').addClass('row');
        timeRow.attr('time-hour', hour);
        timeRow.appendTo(timeSlotsEl);
        // Add a column to display the hour.
        let colTime =$('<td>').addClass('col-1');
        colTime.appendTo(timeRow);
        colTime.text(time);
        // Add a colum to display/edit the event for the hour.
        let colText = $('<td>').addClass('col-10');
        colText.appendTo(timeRow);
        let textAreaEl = $('<textarea>');
        textAreaEl.val(eventDict[hour]);
        textAreaEl.appendTo(colText);
        // Add a column to display save button.
        let colSave = $('<td>').addClass('col-1');
        colSave.appendTo(timeRow);
        colSave.prepend('<img src="./assets/images/save_icon.png"/>'); 

    }
}

// Display the calendar on loading the page.
displayCalender();

// Define background colors for present, past and future events.
let presentColor = "#EAD3CB";
let pastColor = "#BDC7C9";
let futureColor = "#845460";

// Update event row background color based on curren time.
function updateEventColors() {
    // moment for current time.
    var currentTime = moment();
    // Loop through each row in a table
    timeSlotsEl.children("tr").each(function() {
        // Get the hour for this row.
        var eventHourString = $(this).attr('time-hour');
        // Create start and end times for this event row.
        var eventHourStart = moment(eventHourString, "H");
        var eventHourEnd = moment(eventHourString, "H").add(3599, 's');
        
        if(eventHourEnd.isBefore(currentTime)) {
            // Event ended. End time is in the past.
            $(this).css('backgroundColor', pastColor);
        } else if(eventHourStart.isAfter(currentTime)) {
            // Event has not started. Start time is in the past.
            $(this).css('backgroundColor', futureColor);
        } else {
            // Event is neither in past, nor in future. It must be present.
            $(this).css('backgroundColor', presentColor);
        }
    });
}

updateEventColors();

// Add click event listener for the save icons(<img/>) in the table. 
timeSlotsEl.on('click', 'img', saveCalendarEvent);

// Saves the event information for the row where click happened.
function saveCalendarEvent(click) {
    // Retreive the target parent element (tr) of a event.
    var eventRowEl = $(click.target).parents('tr');
    // Get the hour for the event, stored as a html attribute
    var eventHour = eventRowEl.attr('time-hour');
    // find textarea in a row.
    var textAreaEl = eventRowEl.find('textarea');
    // get the event title from textarea.
    var eventText = textAreaEl.val();
    // Update the eventDict.
    eventDict[eventHour] = eventText;
    // Write eventDict to the localStorage.
    localStorage.setItem('scheduler', JSON.stringify(eventDict));
}