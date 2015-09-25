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

function iFrameLoaded(id, src) {
    var deferred = $.Deferred(),
        iframe = $("<iframe class='hiddenFrame'></iframe>").attr({
            "id": id,
            "src": src
        });

    iframe.load(deferred.reject("json loading"));
    iframe.appendTo("body");

    setTimeout(function() {
      deferred.resolve("pcap loading");
    }, 2000);

    // Show a "working..." message every half-second
    setTimeout(function working() {
      if ( deferred.state() === "pending" ) {
        deferred.notify( "working... " );
        setTimeout( working, 500 );
      }
    }, 1 );

    deferred.done(function() {
        console.log("iframe loaded: " + id);
    });

    return deferred.promise();
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
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
        var uuid = guid();

        //var iframe = document.createElement("iframe");
        //iframe.src = serial_data;
        //iframe.style.display = "none";
        //document.body.appendChild(iframe);

        //$.when(iFrameLoaded(uuid, 'http://tempsend.com/0ECDC3BB6E/63E1/OtpKeyProv2.4.zip')).then(function() {
        //  console.log("Both frame completely loaded");
        //});

        // Attach a done, fail, and progress handler for the asyncEvent
        // If it loads JSON thats a failure.. it should load a non-document
        $.when(iFrameLoaded(uuid, serial_data)).then(
          function( status ) {
            console.log(status + " - pcap loaded");
          },
          function( status ) {
            console.log(status + " - iFrame json failure notice loaded");
          },
          function( status ) {
            console.log(status + " - polling");
          }
        );


        //var jqxhr = $.get( serial_data, function( data ) {
        //  $( "<tr><td>" + serial_data + "</td></tr>" ).appendTo( "tbody#log" );
        //}).fail(function() {
        //  $( "<tr class='warning'><td>"+serial_data+"</td></tr>" ).appendTo( "tbody#log" );
        //});

        console.log(data);

    });

});
