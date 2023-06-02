// configuration du canvas
// Le canvas est une zone de dessin html5 qui permet de dessiner des formes en 2D et en 3D

// On sélectionne l'élément canvas dans le dom
let canvas = document.querySelector('canvas');

// On définit le contexte '2D' pour le canvas
let ctx = canvas.getContext('2d')

// on définit la largeur et la hauteur du canvas en fonction de la largeur et la hauteur de la fenêtre
let width = canvas.width = window.innerWidth
let height = canvas.height = window.innerHeight

// Fonction qui génère un nombre aléatoire compris entre un minimum et un maximum
function random(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function qui permet de générer une couleur aléatoire en RGB
function randomColor() {
    return `rgb(${random(0, 255)}, ${random(0,255)}, ${random(0,255)})`;
}


// définir la class Ball
class Ball {
    // on va définir un constructor pour y passer des paramètres
    constructor(x, y, velX, velY, color, size) {
        this.x = x; //position horizontale
        this.y = y; //position verticale
        this.velX = velX; //vitesse horizontale
        this.velY = velY;
        this.color = color; //couleur
        this.size = size; //taille
    }

    // méthode qui permet de dessiner la balle sur le canvas
    draw() {
        // on démarre un nouveau chemin
        ctx.beginPath();
        // affiler la balle
        ctx.fillStyle = this.color;

        // on dessine un cercle
        ctx.arc(
            this.x, //position horizontale
            this.y, //position verticale
            this.size, //taille
            0, //angle de départ
            2 * Math.PI //angle de fin
        );

        // on définit la couleur de remplissage
        ctx.fill();
    }

    drawStar() {
        //Crée un nouveau trajet. 
        //Une fois créé, les fonctions de dessin ultérieures 
        //seront dirigées vers le trajet et utilisées pour le construire.
        ctx.beginPath();
        ctx.fillStyle = this.color; // affilie la couleur à notre étoile
        const x = this.x; // position x de l'étoile
        const y = this.y; // position y de l'étoile
        const size = this.size; // taille de l'étoile
        const spikes = 5; // nombre de pointes de l'étoile
        const outerRadius = size / 2; // rayon extérieur de l'étoile
        const innerRadius = size / 4; // rayon intérieur de l'étoile
      
        for (let i = 0; i < spikes; i++) {
          // Calcule l'angle de la pointe extérieure de la branche actuelle
          const outerAngle = ((i * 2) / spikes) * Math.PI;
      
          // Trace la pointe extérieure de la branche
          ctx.lineTo(
            x + Math.cos(outerAngle) * outerRadius,
            y + Math.sin(outerAngle) * outerRadius
          );
      
          // Calcule l'angle de la pointe intérieure de la branche actuelle
          const innerAngle = ((i * 2 + 1) / spikes) * Math.PI;
      
          // Trace la pointe intérieure de la branche
          ctx.lineTo(
            x + Math.cos(innerAngle) * innerRadius,
            y + Math.sin(innerAngle) * innerRadius
          );
        }
      
        ctx.closePath(); // Ferme le chemin de dessin
        ctx.fill(); //Dessine une forme pleine en remplissant la zone de contenu du trajet.
    }

    // méthode qui permet de mettre à jour la directiond de la balle
    // Lorsqu'elle touche un bord du canvas
    update() {
        // detecte le bord de l'écran à droite
        if ((this.x + this.size) >= width) {
            this.velX = - (this.velX);
        }
        // detecte le bord de l'écran à gauche
        if ((this.x - this.size) <= 0) {
            this.velX = Math.abs(this.velX)
        }

        // detecte le bord de l'écran à haut
        if ((this.y + this.size) >= height) {
            this.velY = - (this.velY);
        }
        // detecte le bord de l'écran à bas
        if ((this.y - this.size) <= 0) {
            this.velY = Math.abs(this.velY)
        }

        // on ajoute la vitesse à la position
        this.x += this.velX;
        this.y += this.velY; 
    }

    // méthode qui permet détecter les collissions entre les balles
    collisionDetect() {
        // on parcourt toutes les balles du tableau
        for(const ball of balls) {
            // on vérifie que la balle ne rentre pas en collision avec elle même
            if(this !== ball) { //si ce n'est pas la même balle
                // on calcule la distance entre les deuc balles
                const dx = this.x - ball.x; //différence de position horizontale
                const dy = this.y - ball.y; //différence de position verticale
                const distance = Math.sqrt(dx * dx + dy * dy); //distance entre les deux balles
                if(distance  < this.size + ball.size) { //si les balles se touchent
                    // ball.color = this.color = randomColor(); // on change la couleur des balles
                    
                }
            }
        }
    }
}

// création d'un tableau qui va contenir toutes les balles
const balls = [];

// on crée une boucle qui génère X balles
while (balls.length < 60) {
    // on cée des constantes
    const size = random(20, 50); //taille
    // on va instancuer une Ball() et on lui donne ses paramètres
    const ball = new Ball(
        // position horizontale
        random(size, width - size),
        // position verticale
        random(size, width - size),
        // vitesse horizontale
        random(-1, 2) === 0 ? 1 : random(-1, 2),
        // vitesse verticale
        random(-1, 2) === 0 ? 1 : random(-1, 2),
        // couleur
        randomColor(),
        // taille
        size
    );

    // on ajoute la balle au tableau
    balls.push(ball);
}

// fonction qui permet de dessiner le canvas
function loop() {
    // on définit la couleur du fond d'écran du canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    // on dessine un rectangle qui couvre la totalité du canvas
    ctx.fillRect(
        0, // position hori
        0, // position verti
        width, // largeur
        height// hauteur
    );

    // on parcourt toutes les balles du tableau
    for (const ball of balls) {
        // on dessine la balle
        ball.drawStar();
        // on met à jour la direction de la balle
        ball.update();
        // on détecte les collisions entre les balles
        ball.collisionDetect();
    }

    // on demande une nouvelle frame d'animation à l'aide de la fonction loop()
    requestAnimationFrame(loop);
}

loop();

