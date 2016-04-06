window.document.onkeydown = checkDepla;

//Constantes du Casse-Brique

var nbLignes = 5; //Nombres de lignes de briques
var nbBriqueParLigne =8; //Nombres de briques par lignes
var LargeurBrique = 48; // Taille en largeur d'une brique
var HauteurBrique = 15; // Taille en hauteur d'une brique
var EspaceBrique = 2; // Espace entre deux briques.
var tabBriques; // tableau contenant les briques
var context;
var couleurAleatoireBrique = "rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")";

//Barre de jeu
var LargeurBarre = 100; // Largeur de la barre
var HauteurBarre = 20; // Hauteur de la balle
var barreX; // Emplacement sur l'axe X où se trouve la barre
var barreY; // Emplacement sur l'axe Y où se trouve la barre
var EcartDeplacement=10; // Nombre d'écart de déplacement de la barre (ou vitesse)
var LargeurZoneJeu = 400; // Largeur de la zone de jeu
var HauteurZoneJeu = 300; // Hauteur de la zone de jeu

//Balle
var BalleX = 100; // Emplacement sur l'axe X où se trouve la balle
var BalleY = 250; // Emplacement sur l'axe Y où se trouve la balle
var TailleBalle = 8;
var dirBalleX = 1;
var dirBalleY = -1;
var vitesseBalle = 0.8;
var couleurBalle = "black";

var boucleJeu; //permet de pouvoir arreter la fonction  setInterval
boucleJeu = setInterval(refreshGame, 10);
var COULEURS_BRIQUES = ["#0000FF", "#FF0066", "#99FFFF", "#CC00CC", "#CCFF00"]; 

var GagneOuPas=0;
var ZoneBriques = (EspaceBrique+HauteurBrique)*nbLignes; // Définit la zone de brique afin de pouvoir détecter les collisions.


window.addEventListener('load', function () {	 
	 var elem = document.getElementById('canvasElem');		
	 if (!elem || !elem.getContext) {
		 return;																		//Initialisation du contexte
	   }
	   context = elem.getContext('2d');
	   if (!context) {
		 return;
	   }
	   barreX = (elem.width/2)-(LargeurBarre/2);
	   barreY = (elem.height-HauteurBarre);
	   context.fillStyle = "black";
	   context.fillRect(barreX,barreY,LargeurBarre,HauteurBarre);
	   creerBriques(context, nbLignes, nbBriqueParLigne, LargeurBrique, HauteurBrique, EspaceBrique);
	   idInterv = setInterval(refreshGame, 10);

	 }, false);


//Création du tableau de brique
function creerBriques(context, nbLignes, nbBriqueParLigne, LargeurBrique, HauteurBrique, EspaceBrique) {
	
		tabBriques = new Array(nbLignes);
		
		for (var i=0; i < nbLignes; i++) {
		
			tabBriques[i] = new Array(nbBriqueParLigne);			
			
			context.fillStyle = COULEURS_BRIQUES[i];
			
			for (var j=0; j < nbBriqueParLigne; j++) {
	
				context.fillRect((j*(LargeurBrique+EspaceBrique)),(i*(HauteurBrique+EspaceBrique)),LargeurBrique,HauteurBrique);
				tabBriques[i][j] = 1;
				
			}
		}
		
		return 1;
		
	}
	
function perdu(){ 
	clearInterval(boucleJeu); // Stop la boucle infinie du jeu
	alert("Vous avez perdu !");	// Affiche une petite fenêtre avec " Perdu " dès lors que la balle franchit la barre.	
	location.reload() ;
	
}

function gagne() {
	clearInterval(boucleJeu); // Stop la boucle infinie du jeu
	alert("Vous avez gagné !"); // Affiche une petite fenêtre avec " Gagner " dès lors que la balle franchit la barre.
}
	
function refreshGame() { // Rafraichissement page
	
	clearContexte(context,0,LargeurZoneJeu,0,HauteurZoneJeu);

	for (var i=0; i < tabBriques.length; i++) {
		context.fillStyle = COULEURS_BRIQUES[i];
		for (var j=0; j < tabBriques[i].length; j++) {
			if (tabBriques[i][j] == 1){
				context.fillRect((j*(LargeurBrique+EspaceBrique)),(i*(HauteurBrique+EspaceBrique)),LargeurBrique,HauteurBrique);
			GagneOuPas = 0;
			}
		}
	}

if(GagneOuPas){
	gagne();
}

	//Barre 
	context.fillStyle = "black";
	context.fillRect(barreX,barreY,LargeurBarre,HauteurBarre);
	
	//Balle
	context.fillStyle = couleurBalle;
	context.beginPath();
	context.arc(BalleX,BalleY,TailleBalle,0,Math.PI*2,true);
	context.closePath();
	context.fill();
	
	BalleX+=dirBalleX*vitesseBalle;
	BalleY+=dirBalleY*vitesseBalle;
	
	
		
	if ((BalleX + dirBalleX * vitesseBalle) >  LargeurZoneJeu){
		dirBalleX = -1;
	}
	else if ( (BalleX + dirBalleX * vitesseBalle) <  0) dirBalleX = 1;
	if ((BalleY + dirBalleY * vitesseBalle) >  HauteurZoneJeu){
		perdu();
	}
	else {
	if ((BalleY + dirBalleY * vitesseBalle) <  0){
		dirBalleY = 1;
	}
	else {
		if (((BalleY + dirBalleY * vitesseBalle) > (HauteurZoneJeu - HauteurBarre)) && ((BalleX + dirBalleX * vitesseBalle) >= barreX) && ((BalleX + dirBalleX * vitesseBalle) <= (barreX+LargeurBarre))) {
			dirBalleY = -1;
			dirBalleX = 2*(balleX-(barreX+LargeurBarre/2))/LargeurBarre;
		}
		}
		}


	
	//Collision avec une brique
	if ( BalleY <= ZoneBriques) {
	
	var ligneY = Math.floor(BalleY/(HauteurBrique+EspaceBrique));
	var ligneX = Math.floor(BalleX/(LargeurBrique+EspaceBrique));
	if ( tabBriques[ligneY][ligneX] == 1 ) {
		tabBriques[ligneY][ligneX] = 0;
		dirBalleY = 1;
	}
}
	
}

function clearContexte(context, startwidth, ctxwidth, startheight, ctxheight) {
	context.clearRect(startwidth, startheight, ctxwidth, ctxheight);
}

// Déplacement avec les touches directionnelles.
function checkDepla(e) {

	if (e.keyCode == 39) { 
		if ( (barreX+EcartDeplacement+LargeurBarre) <= LargeurZoneJeu ) barreX += EcartDeplacement;
	}

	else if (e.keyCode == 37) {
		if ( ((barreX-EcartDeplacement)) >= 0 )  barreX -= EcartDeplacement;
	}
}
