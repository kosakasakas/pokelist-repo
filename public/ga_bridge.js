
function readCSVData(filePath, successCallback, failCallback)
{
  $.get( filePath, function(data) {
    var csv = $.csv.toArrays(data, { });
    csv.shift();
    successCallback(csv);
  }, 'text')
  .done(function() {
    //alert( "second success" );
  })
  .fail(function() {
    //alert( "error" );
    failCallback();
  })
  .always(function() {
    //alert( "finished" );
  });
}