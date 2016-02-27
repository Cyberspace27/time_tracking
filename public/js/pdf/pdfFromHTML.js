function pdfToHTML(){
var pdf = new jsPDF('p', 'pt', 'letter');

source = $('#pdf2htmldiv')[0];

var diaActual = new Date();

specialElementHandlers = {
  '#bypassme': function(element, renderer){
    return true
  },
  '#ocultarBtn': function(element, renderer){
    return true
  }
}

pdf.setFontSize(20);
pdf.text(60, 40, "Lista de tickets creados en la fecha");

pdf.setFontSize(10);
pdf.text(60, 60, "Fecha : "+diaActual);
margins = {
    top: 70,
    left: 60,
    width: 545
  }
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
        pdf.save(diaActual+'.pdf');
      }
  )   
}