//Packets-At-REST-gui-simple

function setElementValue(element, value) {
    element.val(value);
    element.parsley().validate();
}

function setStartTime(unit, value) {
    if (unit === null) {
        $("input[name='start_time']").val(moment().utc().format('YYYY-MM-DD h:mm a')) //2001-01-01 5:05pm
    }
    else {
        $("input[name='start_time']").val(moment().utc().subtract(value, unit).format('YYYY-MM-DD h:mm a'))
    }
}

function setEndTime(unit, value) {
    if (unit === null) {
        $("input[name='end_time']").val(moment().utc().format('YYYY-MM-DD h:mm a'))
    }
    else {
        $("input[name='end_time']").val(moment().utc().subtract(value, unit).format('YYYY-MM-DD h:mm a'))
    }
}


$(document).ready(function () {

    // $("#input-timezone-offset").val(moment().format("Z"));
    $("input[name='start_time']").val(moment().subtract(1,  'minutes').utc().format('YYYY-MM-DD h:mm a'));
    $("input[name='end_time']").val(moment().utc().format('YYYY-MM-DD h:mm a'));

    $("#query-tabs a").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
        $("#query-type").val($(this).attr("query-type"));
    });

    $("#api_key").focus( function() {
    if ( $(this).val()=="Enter API key ..") {
        $(this).val('');
    }
    });

    $("#api_key").blur( function() {
        if ( $(this).val()=="") {
            $(this).val('Enter API key ..');
        }
    });

    var theTemplateScript = $("#sensor-template").html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    $("#sensor-selector").append(theTemplate(sensorData));

    var theTemplateScript = $("#collector-template").html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    $("#collector-selector").append(theTemplate(collectorData));

    // Build the default submit location for the first collector url
    $('#par-form').attr("action", $("#collector-selector :selected").val() + "/data.pcap");

    // When the collector changes rebuild the action for the selected collector url
    $("#collector-selector").change(function () {
      actionstr = $("#collector-selector :selected").val();
      $('#par-form').attr("action", actionstr + "/data.pcap");
    }).change();

    // Example serialization builder
    $('#serialize').click(function () {

      if ( $("#par-form").parsley().isValid() ) {
        $("#serialize").removeClass('btn-danger');
        $("#serialize").addClass('btn-info');
        $('#example-out').text(
          $("#collector-selector :selected").val() + "/data.pcap?" + $("#par-form :input").not("select.exclude").serialize()
        )
      } else {
        $("#serialize").removeClass('btn-info');
        $("#serialize").addClass('btn-danger');
        $('#example-out').text('Invalid : ' + $("#collector-selector :selected").val() + "/data.pcap?" + $("#par-form :input").not("select.exclude").serialize())
      }
    });

    // Dont submit the collector_id

    $("#par-form").submit(function( event ) {
        event.preventDefault();

        var data = $("#par-form :input").not("select.exclude").serializeArray();
        var $form = $( this ),
            url = $form.attr( "action" );

        var serial_data = $("#collector-selector :selected").val() + "/data.pcap?" + $("#par-form :input").not("select.exclude").serialize();

        //$.get( url, data );

        var jqxhr = $.get( serial_data, function( data ) {
          $( "<tr><td>" + serial_data + "</td></tr>" ).appendTo( "tbody#log" );
        }).fail(function() {
          $( "<tr class='warning'><td>"+serial_data+"</td></tr>" ).appendTo( "tbody#log" );
        });

        console.log(data);

    });

});
