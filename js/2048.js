$(document).ready(function () {
    console.log("It's working");
});

$(document).on("keydown", function () {

});
$(document).on("touchmove", function (e) {
    var currentY = e.originalEvent.touches ?
        e.originalEvent.touches[0].pageY : e.pageY;
    if (currentY > lastY) {
        console.log('moving down');
    } else {
        console.log('moving up');
    }
});

function Case(posX, posY, color, n) {
    this.x = posX;
    this.y = posY;
    this.color = color || "white";
    this.valeur = n || null;
}

function Grille() {
    this.taille = 4;
    this.grille = new Array();

    for (var i = 0; i < this.taille; i++) {
        this.grille[i] = new Array();
    }
    for (var i = 0; i < this.taille; i++) {
        for (var j = 0; j < this.taille; j++) {
            console.log("i -> " + i);
            console.log("j -> " + j);
            this.grille[i][j] = new Case(j, i);
        }
    }

    this.recup_colonne = function (j) {
        var tab = new Array();
        for (var i = 0; i < this.taille; i++) {
            tab[i] = 0;
        }
        var k = 0;
        for (var i = 0; i < this.taille; i++) {
            if (grille[i][j].valeur > 0) {
                tab[k] = grille[i][j].valeur;
                k++;
            }
        }
        return tab;
    };
    this.recup_colonne = function (i) {
        var tab = new Array();
        for (var i = 0; i < this.taille; i++) {
            tab[i] = 0;
        }
        var k = 0;
        for (var j = 0; j < this.taille; j++) {
            if (grille[i][j].valeur > 0) {
                tab[k] = grille[i][j].valeur;
                k++;
            }
        }
        return tab;
    };

    this.pousser_haut = function () {
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
    };

    this.pousser_bas = function () {
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
    };

    this.pousser_gauche = function () {
        //appliquer la fusion sur la grille
        for (var i = 0; i < this.taille; i++) { // pour chaque ligne
            var tab = this.recup_ligne = i; //recupérer la ligne condensé

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
    };

    this.pousser_droite = function () {
        for (var i = 0; i < taille; i++) { // pour chaque ligne
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
    };

    this.equalsGrille = function (g1, g2) {
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
    };

    this.grilleGagne = function () {
        for (var i = 0; i < this.taille; i++) {
            for (var j = 0; j < this.taille; j++) {
                if (this.grille[i][j].valeur == 2048) {
                    return true;
                }
            }
        }
        return false;
    };

    this.toString = function () {
        var _tmp = "";
        for (var j = 0; j < this.taille; j++) {
            for (var i = 0; i < this.taille; i++) {
                _tmp += this.grille[i][j].valeur;
            }
            _tmp += "/n";
        }
        return _tmp;
    }
}


grille = new Grille();
