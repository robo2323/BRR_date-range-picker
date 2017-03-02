/*global $, window, document */

var clickOut = document.getElementsByTagName('body')[0];
/*//show date picker on date input click
$('.date-input').click(function () {
    $('.datepicker').css('display', 'block');
});*/



$('#date').click(function () {

    $.datepicker.setDefaults({
        dateFormat: "dd/mm/yy",
        numberOfMonths: 2,
        minDate: null,
        maxDate: "+0d",
        changeYear: true,
        showButtonPanel: true
    });

    $("#datepicker").datepicker({
        beforeShowDay: function (date) {
            var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input1").text());
            var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input2").text());
            var isHightlight = date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2));
            return [true, isHightlight ? "dp-highlight" : ""];
        },
        onSelect: function (dateText, inst) {
            var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input1").text());
            var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input2").text());
            var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);

            if (!date1 || date2) {
                $("#input1").text(dateText);
                $("#input2").text("");
                $("#date").val(dateText+" - ");
            } else if (selectedDate < date1) {
                $("#input2").text($("#input1").text());
                $("#input1").text(dateText);
                $("#date").val($("#input1").text()+ " - " +dateText);

            } else {
                $("#input2").text(dateText);
                $("#date").val($("#date").val() +dateText);
            }

            $(this).datepicker();

        }
    });


});

//hide date picker when clicking outside of it
window.onclick = function(event) {
    if (event.target == clickOut) {
        $('#datepicker').datepicker("destroy");
    }
};
