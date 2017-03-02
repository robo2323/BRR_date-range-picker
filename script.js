/*global $, window, document */

var datePicker = document.getElementsByTagName('body')[0];//document.getElementsByClassName('datepicker')[0];

//show date picker on date input click
$('.date-input').click(function () {
    $('.datepicker').css('display', 'block');
});


//hide date picker when clicking outside of it
window.onclick = function(event) {
    if (event.target == datePicker) {
        $('.datepicker').css('display', 'none');
    }
};


$.datepicker.setDefaults({
    dateFormat: "dd/mm/yy",
    numberOfMonths: 2,
    minDate: null,
    maxDate: "+0d",
    changeYear: true,
    showButtonPanel: true
});

$(".datepicker").datepicker({
    beforeShowDay: function (date) {
        var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input1").val());
        var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input2").val());
        var isHightlight =
            date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2));
        return [true, isHightlight ? "dp-highlight" : ""];
    },
    onSelect: function (dateText, inst) {
        var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input1").val());
        var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input2").val());
        var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);

        if (!date1 || date2) {
            $("#input1").val(dateText);
            $("#input2").val("");
        } else if (selectedDate < date1) {
            $("#input2").val($("#input1").val());
            $("#input1").val(dateText);
        } else {
            $("#input2").val(dateText);
        }

        $(this).datepicker();
    }
});
