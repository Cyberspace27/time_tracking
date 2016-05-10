$(document).on("ready", main);

function main(){
	//$("body").append("<div id='cerrar'>Cerrar</div>");
	
	$("#popupTickets").on("click", abrirImagen);
	$("#cerrar").on("click",cerrarImagen);
	console.log("Entre en el slideshow");

}
function  abrirImagen(){
	$("#previewSlideshow").fadeIn();
	$("#previewSlideshow popupTickets");
	//$("#previewSlideshow #descripcion");
	console.log("Entre al metodo slideshow");
}
function cerrarImagen(){
	$("#previewSlideshow").fadeOut();
}