var timeSlotsEl = $('#time-slots');
const calendarStartHour = 09;
const calendarEndHour = 18;


$('#currentDay').text(moment().format('ddd, MMM Do'));
var currentTime = moment().format('hh:mm');
console.log(currentTime);
const LS = JSON.parse(localStorage.scheduler || '{}');

function showTime() {
    for (var i = calendarStartHour; i < calendarEndHour; i++) {
        let time = moment(i,'HH').format('hh a');
        let timeRow = $('<tr>').addClass('row');
        timeRow.appendTo(timeSlotsEl);
        let colTime =$('<td>').addClass('col-1');
        let colText = $('<td>').addClass('col-10');
        let colSave = $('<td>').addClass('col-1');
        colTime.appendTo(timeRow);
        colText.appendTo(timeRow);
        colSave.appendTo(timeRow);
        colTime.text(time);
        $('<textarea>').appendTo(colText);
        colSave.prepend('<img src="./assets/images/save_icon.png" />')  
    }
}

showTime();

