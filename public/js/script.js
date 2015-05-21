var tiempo;
function detenerse(){
	clearInterval(tiempo);
}

function cronometro(){
	contador_s = 0;
		contador_m = 0;
		s= document.getElementById("segundos");
		m= document.getElementById("minutos");

	tiempo = setInterval(
		function(){
			if(contador_s==60){
				contador_s=0;
				contador_m++;
			m.innerHTML = contador_m;
			}
			s.innerHTML = contador_s;
			contador_s++;
	}
	,1000);
	 
}
