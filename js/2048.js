$(document).ready(function () {
    console.log("It's working");
});

/**
 * Constructeur de Case
 */
var Case = function (valeur, posX, posY) {
    this.valeur = valeur || 0;
    this.x = posX;
    this.y = posY;
};


/**
 * Constructeur de Grille
 */
var Grille = function () {
    this.taille = 4;
    this.grille = new Array();

    for (var i = 0; i < this.taille; i++) {
        this.grille[i] = new Array();
        for (var j = 0; j < this.taille; j++) {
            console.log("i -> " + i);
            console.log("j -> " + j);
            this.grille[i][j] = new Case(0, j, i);
        }
    }

};

/**
 * Les méthodes de la grille
 */
$.extend(Grille.prototype, {
    /**
     * Ajouter un 2 ou un 4 dans une des cases vides
     */
    addRandom: function () {
        var listeCaseVide = new Array();
        for (var i = 0; i < this.taille; i++) {
            for (var j = 0; j < this.taille; j++) {
                if (this.grille[i][j].valeur == 0) {
                    listeCaseVide.push(this.grille[i][j]);
                }
            }
        }
        if (listeCaseVide.length > 0) {
            var indice = Math.floor(Math.random() * (listeCaseVide.length - 1));

            var rand = Math.random();
            if (rand <= 0.5) {
                listeCaseVide[indice].valeur = 2;
            } else if (rand > 0.5) {
                listeCaseVide[indice].valeur = 4;
            }
        }
        this.toString();
    },
    /**
     * Récupérer la colonne j
     * @param j
     * @returns {Array}
     */
    recup_colonne: function (j) {
        var tab = new Array();
        for (var i = 0; i < this.taille; i++) {
            tab[i] = 0;
        }
        var k = 0;
        for (var i = 0; i < this.taille; i++) {
            if (this.grille[i][j].valeur > 0) {
                tab[k] = this.grille[i][j].valeur;
                k++;
            }
        }
        return tab;
    },
    /**
     * Récupérer la ligne i
     * @param i
     * @returns {Array}
     */
    recup_ligne: function (i) {
        var tab = new Array();
        for (var j = 0; j < this.taille; j++) {
            tab[j] = 0;
        }
        var k = 0;
        for (var j = 0; j < this.taille; j++) {
            if (this.grille[i][j].valeur > 0) {
                tab[k] = this.grille[i][j].valeur;
                k++;
            }
        }
        return tab;
    },
    /**
     * Pousser en haut
     */
    pousser_haut: function () {
        //appliquer la fusion sur la grille
        for (var j = 0; j < this.taille; j++) { // pour chaque colonne
            var tab = this.recup_colonne(j); //recupérer la colonne condensé

            var i = 0, k = 0;

            while (k < this.taille) {  //chaque ligne de la colonne
                if (k + 1 < this.taille && tab[k] == tab[k + 1]) {
                    this.grille[i][j].valeur = tab[k] + tab[k + 1];
                    k += 2;
                } else {
                    this.grille[i][j].valeur = tab[k];
                    k++;
                }
                i++;
            }
            for (; i < this.taille; i++) {
                this.grille[i][j].valeur = 0;
            }
        }
    },
    /**
     * Pousser en bas
     */
    pousser_bas: function () {
        for (var j = 0; j < this.taille; j++) { // pour chaque colonne
            var tab = this.recup_colonne(j); //recupérer la colonne condensé

            var i = this.taille - 1, k = this.taille - 1;

            while (k >= 0) {  //chaque ligne de la colonne
                if (tab[k] != 0) {
                    if (k - 1 >= 0 && tab[k] == tab[k - 1]) {
                        this.grille[i][j].valeur = tab[k] + tab[k - 1];
                        k -= 2;
                    } else {
                        this.grille[i][j].valeur = tab[k];
                        k--;
                    }
                    i--;
                } else {
                    k--;
                }
            }
            for (; i >= 0; i--) {
                this.grille[i][j].valeur = 0;
            }
        }
    },
    /**
     * Pousser à gauche
     */
    pousser_gauche: function () {
        //appliquer la fusion sur la grille
        for (var i = 0; i < this.taille; i++) { // pour chaque ligne
            var tab = this.recup_ligne(i); //recupérer la ligne condensé

            var j = 0, k = 0;

            while (k < this.taille) {  //chaque colonne de la ligne
                if (k + 1 < this.taille && tab[k] == tab[k + 1]) {
                    this.grille[i][j].valeur = tab[k] + tab[k + 1];
                    k += 2;
                } else {
                    this.grille[i][j].valeur = tab[k];
                    k++;
                }
                j++;
            }
            for (; j < this.taille; j++) {
                this.grille[i][j].valeur = 0;

            }
        }
    },
    /**
     * Pousser à droite
     */
    pousser_droite: function () {
        for (var i = 0; i < this.taille; i++) { // pour chaque ligne
            var tab = this.recup_ligne(i); //recupérer la ligne condensé

            var j = this.taille - 1, k = this.taille - 1;

            while (k >= 0) {  //chaque ligne de la colonne
                if (tab[k] != 0) {
                    if (k - 1 >= 0 && tab[k] == tab[k - 1]) {
                        this.grille[i][j].valeur = tab[k] + tab[k - 1];
                        k -= 2;
                    } else {
                        this.grille[i][j].valeur = tab[k];
                        k--;
                    }
                    j--;
                } else {
                    k--;
                }
            }
            for (; j >= 0; j--) {
                this.grille[i][j].valeur = 0;
            }
        }
    },
    /**
     * Comparer deux grilles
     * @param g1
     * @param g2
     * @returns {boolean}
     */
    equalsGrille: function (g1, g2) {
        if (g1.taille == g2.taille) {
            for (var i = 0; i < g1.taille; i++) {
                for (var j = 0; j < g1.taille; j++) {
                    if (g1.grille[i][j].valeur != g2.grille[i][j].valeur) {
                        return false;
                    }
                }
            }
        } else {
            return false;
        }
        return true;
    },
    /**
     * Vérifier si le nombre 2048 est présent dans la grille
     * @returns {boolean}
     */
    grilleGagne: function () {
        for (var i = 0; i < this.taille; i++) {
            for (var j = 0; j < this.taille; j++) {
                if (this.grille[i][j].valeur == 2048) {
                    return true;
                }
            }
        }
        return false;
    },
    /**
     * toString
     * @returns {string}
     */
    toString: function () {
        var _tmp = "";
        for (var i = 0; i < this.taille; i++) {
            for (var j = 0; j < this.taille; j++) {
                _tmp += this.grille[i][j].valeur;
            }
            _tmp += "/n";
        }
        return _tmp;
    }
});


grilleTest = new Grille();
grilleTest.addRandom();
update();

/**
 * Quand l'utilisateur appuie sur les touches
 */
$(document).keydown(function (e) {
    switch (e.which) {
        case 37: // left
            console.log("left");
            grilleTest.pousser_gauche();
            break;

        case 38: // up
            console.log("up");
            grilleTest.pousser_haut();
            break;

        case 39: // right
            console.log("right");
            grilleTest.pousser_droite();
            break;

        case 40: // down
            console.log("down");
            grilleTest.pousser_bas();
            break;

        default:
            return; // exit this handler for other keys
    }
    update();
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

/**
 * Mettre à jour l'affichage de la grille
 */
function update() {
    for (var i = 0; i < grilleTest.taille; i++) {
        for (var j = 0; j < grilleTest.taille; j++) {
            $e = document.getElementById("cell_" + (1 + i) + "-" + (1 + j));
            $e.innerHTML = grilleTest.grille[i][j].valeur;
        }
    }
    grilleTest.addRandom();
}