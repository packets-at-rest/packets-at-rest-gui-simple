//Packets-At-REST-gui-simple

function setElementValue(element, value) {
    element.val(value);
    element.parsley().validate();
}

function setStartTime(unit, value) {
    if (unit === null) {
        $("input[name='start_time']").val(moment().format())
    }
    else {
        $("input[name='start_time']").val(moment().subtract(value, unit).format())
    }
}

function setEndTime(unit, value) {
    if (unit === null) {
        $("input[name='end_time']").val(moment().format())
    }
    else {
        $("input[name='end_time']").val(moment().subtract(value, unit).format())
    }
}


$(document).ready(function () {

    // $("#input-timezone-offset").val(moment().format("Z"));
    $("input[name='start_time']").val(moment().format());
    $("input[name='end_time']").val(moment().format());

    $("#query-tabs a").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
        $("#query-type").val($(this).attr("query-type"));
    });

    $("#api-key").focus( function() {
    if ( $(this).val()=="Enter API key ..") {
        $(this).val('');
    }
    });

    $("#api-key").blur( function() {
        if ( $(this).val()=="") {
            $(this).val('Enter API key ..');
        }
    });
    
    var theTemplateScript = $("#sensor-template").html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    $("#sensor-selector").append(theTemplate(sensorData));

});
