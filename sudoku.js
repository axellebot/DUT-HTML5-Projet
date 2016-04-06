var tab_grille_affichage = [5,3,0,0,7,0,0,0,0,6,0,0,1,9,5,0,0,0,0,9,8,0,0,0,0,6,0,8,0,0,0,6,0,0,0,3,4,0,0,8,0,3,0,0,1,7,0,0,0,2,0,0,0,6,0,6,0,0,0,0,2,8,0,0,0,0,4,1,9,0,0,5,0,0,0,0,8,0,0,7,9];
var tab_grille = new Array();

//[5,3,4,6,7,8,9,1,2,6,7,2,1,9,5,3,4,8,1,9,8,3,4,2,5,6,7,8,5,9,7,6,1,4,2,3,4,2,6,8,5,3,7,9,1,7,1,3,9,2,4,8,5,6,9,6,1,5,3,7,2,8,4,2,8,7,4,1,9,6,3,5,3,4,5,2,8,6,1,7,9]

// Cette fonction permet d'initialiser le tableau de grille, même si pour l'instant il n'a qu'une seule grille
function initialiser_tab(){
	for (var i = 0; i < 1; i++) {
		tab_grille[i] = new Array(5,3,4,6,7,8,9,1,2,6,7,2,1,9,5,3,4,8,1,9,8,3,4,2,5,6,7,8,5,9,7,6,1,4,2,3,4,2,6,8,5,3,7,9,1,7,1,3,9,2,4,8,5,6,9,6,1,5,3,7,2,8,4,2,8,7,4,1,9,6,3,5,3,4,5,2,8,6,1,7,9);
	}
}

// Cette fonction sert a creer la grille en affichant la bonne case pour la bonne valeur dans le tableau (input s'il faut ajouter une valeur et div s'il faut l'afficher)
function creer_grille(){ 
	var grille = document.getElementById("grille");
	k = 0; 
	for (var i = 1; i <= 9; i++) { //boucle pour créer les blocs qui contiennent les cases
		var div = document.createElement("div");
		grille.appendChild(div);
		div.setAttribute("id", "bloc"+i); //ajout d'un id pour les blocs

		for (var j = 1; j <= 9; j++) { //boucle pour créer les cases
			if(tab_grille_affichage[k] == 0){ //ajout d'une case de type input
				var input = document.createElement("input");
				input.setAttribute("id", "case"+k); //ajout d'un id pour chaque case
				$("#bloc"+i).append(input);
				console.log(input);
				$( "#case"+k ).addClass( "case_input" ); //ajout d'une classe
			}
			else{ // ajout d'une case div
				var div_case = document.createElement("div");
				div_case.setAttribute("id", "case"+k); //ajout d'un id pour chaque case
				$("#bloc"+i).append(div_case);
				$( "#case"+k ).addClass( "case_p" ); //ajout d'une classe
			}
			k++;
		}
	}
}

window.onload = function(){
	initialiser_tab(); //appel de la fonction pour creer le tableau que contient les grilles
	creer_grille(); //appel de la fonction pour genérer la grille
	afficher_grille(); //appel de la fonction pour afficher la grille
	console.log(tab_grille[0]);
}

// Cette fonction sert a vérifier que la grille est correctement remplis même si pour l'instant elle ne fonctionne pas encore totalement
function valider(){
	var i = 0;
	var continuer = true;
	while(continuer == true) {
		for (var i = 0; i < 81; i++) {
			if($("case"+ i).val() != tab_grille[0]){
				alert("La grille est imcomplète ou fausse !");
				continuer = false;
			}
		}
	}
	if(continuer != false){
		alert("Vous avez résolu la grille. Félicitations !");
	}
}

// Cette fonction sert a afficher les éléments de base de la grille, c'est a dire les valeurs déja presentes au départ
function afficher_grille(){
	for (var i = 0; i < tab_grille_affichage.length; i++) {
		if(tab_grille_affichage[i] != 0)
			document.getElementById("case"+i).innerHTML = tab_grille_affichage[i];
	};
	
}
