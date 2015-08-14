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


    $("#collector-selector").change(function () {
      actionstr = $("#collector-selector :selected").val();
      $('#par-form').attr("action", actionstr + "/data.pcap");
    }).change();

    //$("#collector-selector :selected").val();
    //$('#par-form').attr("action","http://google.com");

    var theTemplateScript = $("#sensor-template").html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    $("#sensor-selector").append(theTemplate(sensorData));

    var theTemplateScript = $("#collector-template").html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    $("#collector-selector").append(theTemplate(collectorData));

    $('#par-form').attr("action", $("#collector-selector :selected").val() + "/data.pcap");

    //$("#par-form").submit(function() {
    //  $(this).children('#collector_id').remove();
    //});

    $('#serialize').click(function () {
      $('#example-out').text(
        $("#collector-selector :selected").val() + "/data.pcap?" + $('#par-form').serialize()
      );
    });

});
