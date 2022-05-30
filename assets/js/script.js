// Table element for showing calendar events.
var timeSlotsEl = $('#time-slots');
// Starting hour for the calendat events.
const calendarStartHour = 09;
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
        // Convert the hour  from 24hr format to 12hr format
        let time = moment(hour,'HH').format('hh a');
        // Create a tablerow for the hour
        let timeRow = $('<tr>').addClass('row');
        timeRow.appendTo(timeSlotsEl);
        // Add a column to display the hour.
        let colTime =$('<td>').addClass('col-1');
        colTime.appendTo(timeRow);
        colTime.text(time);
        // Add a colum to display/edit the event for the hour.
        let colText = $('<td>').addClass('col-10');
        colText.appendTo(timeRow);
        $('<textarea>').appendTo(colText);
        // Add a column to display save button.
        let colSave = $('<td>').addClass('col-1');
        colSave.appendTo(timeRow);
        colSave.prepend('<img src="./assets/images/save_icon.png" />')  
    }
}

// Display the calendar on loading the page.
displayCalender();

