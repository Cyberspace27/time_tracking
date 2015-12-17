function tableToJson(table){
    var data = [];

  //first row needs to be headers   https://www.youtube.com/watch?v=1Sjq8KfDnTc
  var headers = [];
  for(var i=0; i< table.rows[0].cells.length;i++){
    headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
    
  }
  data.push(headers);
  //go through cells
  for (var i = 1; i < table.rows.length; i++) {
    var tableRow = table.rows[i];
    var rowData = {};
    for (var j = 0;j < tableRow.cells.length; j++) {
      rowData[ headers[j] ] = tableRow.cells[j].innerHTML;
      
    }
    data.push(rowData);
  }
  return data;
  }


function pdfToHTML(){

var table = tableToJson($('#table-id').get(0));
var pdf = new jsPDF('p', 'pt', 'letter');
// source = $('#pdf2htmldiv')[0];
 source = $('#table-id')[0];

  pdf.cellInitialize();

    $.each(table, function(i, row){
      $.each(row, function(j, cell){
        if (j=="email" | j==1) {
          pdf.cell(1,10,190,20,cell,i);
        }else{
          pdf.cell(1,10,90,20,cell,i);
        }       
      });
    });
    

specialElementHandlers = {
	'#bypassme': function(element, renderer){
		return true

	}
}
margins = {
    top: 50,
    left: 60,
    width: 545
  };
pdf.fromHTML(
  	source // HTML string or DOM elem ref.
  	, margins.left // x coord
  	, margins.top // y coord
  	, {
  		'width': margins.width // max width of content on PDF
  		, 'elementHandlers': specialElementHandlers
  	},
  	function (dispose) {
  	  // dispose: object with X, Y of the last line add to the PDF
  	  //          this allow the insertion of new lines after html


        pdf.save('prueba1.pdf');
      }
  )		
}