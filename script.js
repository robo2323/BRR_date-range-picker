/*global $, window, document */


$('#date').click(function () {

    $("#modal-clickout-detect").css('display', 'block');

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
                $("#date").val(dateText + " - ");
            } else if (selectedDate < date1) {
                $("#input2").text($("#input1").text());
                $("#input1").text(dateText);
                $("#date").val($("#input1").text() + " - " + dateText);

            } else {
                $("#input2").text(dateText);
                $("#date").val($("#date").val() + dateText);
            }

            $(this).datepicker();

        }
    });


});

$(document).click(function (event) {

    console.log(event.target.tagName);

    if (event.target.tagName == "BODY") {
        $('#datepicker').datepicker("destroy");

    }

    event.target.classList.forEach(function (element) {
        if (!/ui-datepicker*/g.test(element) && !/ui-icon*/g.test(element) && element !== "date-input" && element !== "ui-icon" &&event.target.tagName!=="BUTTON") {
            console.log(element);
            $('#datepicker').datepicker("destroy");
        }
    });
});

/*
//hide date picker when clicking outside of it
window.onclick = function(event) {
    if (event.target == clickOut) {
        $('#datepicker').datepicker("destroy");
    }
};
*/
