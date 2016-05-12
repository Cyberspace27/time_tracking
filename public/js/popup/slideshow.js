function main(){
	$("body").append("<div id='descripcion'></div>");
	
	$("#popupTickets").on("click", abrirImagen);
	$("#cerrar").on("click",cerrarImagen);
	

}
function  abrirImagen(){
	$("#previewSlideshow").fadeIn();
	$("#previewSlideshow popupTickets");
	
	
}
function cerrarImagen(){
	$("#previewSlideshow").fadeOut();
}