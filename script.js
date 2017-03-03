/*global $, document */


//when date field is clicked
$('#date').click(function () {

    //initialise datepicker defaults
    $.datepicker.setDefaults({
        dateFormat: "dd/mm/yy",
        numberOfMonths: 2,
        minDate: null,
        maxDate: "+0d",
        changeYear: true,
        showButtonPanel: true
    });

    //open date picker
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
    //if date input field left position is more than half the screen width then aligns datepicker right to date field right
    if ($('#date').offset().left > $(document).width() / 2) {

        var $offsetWidth = 500-$('#date').width();

        $('.ui-datepicker').css('transform', 'translateX(-'+$offsetWidth+'px)');
    }

});

//closes date picker when clicking outside it
$(document).click(function (event) {

    //console.log(event.target.tagName);

    //close if body clicked
    if (event.target.tagName == "BODY") {
        $('#datepicker').datepicker("destroy");

    }

    event.target.classList.forEach(function (element) {
        //close if element clicked is not ui element of datepicker ***made need tweaking***
        if (!/ui-datepicker*/g.test(element) && !/ui-icon*/g.test(element) && element !== "date-input" && element !== "ui-icon" && event.target.tagName !== "BUTTON") {
            console.log(element);
            $('#datepicker').datepicker("destroy");
        }
    });
});
