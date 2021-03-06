// --------------
// SUPPORTING FUNCTIONS

// Makes a circle of a given position and size, and places it on the screen.
function makeCircle(x, y, radius) {

	var circle = document.createElement('div');

	circle.className = 'circle';
	circle.style.left = x;
	circle.style.top = y;

	circle.style.width = 2 * radius;
	circle.style.height = 2 * radius;

	document.body.appendChild(circle);
  	return circle;
}

// Adjusts the x-position of a circle: negative dx moves it to the left, positive dx to the right
function changeX(circle, dx) {
	circle.style.left = parseInt(circle.style.left) + dx;
}

// Adjusts the y-position of a circle: negative dy moves it up, positive dy to the bottom
function changeY(circle, dy) {
	circle.style.top = parseInt(circle.style.top) + dy;
}

// Adjusts the size of a circle: positive dr increases the size, negative dr decreases it
function changeSize(circle, dr) {
	circle.style.width = parseInt(circle.style.width) + dr;
	circle.style.height = parseInt(circle.style.height) + dr;
}

// Centers a circle on the middle of the screen
function center(circle) {
	circle.style.top = (document.body.scrollHeight/2) - (parseInt(circle.style.height)/2);
	circle.style.left = (document.body.scrollWidth/2) - (parseInt(circle.style.width)/2);
}

// Adds the given "numCircles" amount of circles to the given "circles" array
function addCircles(numCircles, circles) {
	while(numCircles > 0) {

		// The next few concepts are rather complicated - please explain using a diagram
		var randomX = Math.floor( Math.random() * document.body.scrollWidth);
		var randomY = Math.floor( Math.random() * document.body.scrollHeight);
		var randomRadius = Math.floor( Math.random() * 20 + 5);

		var randomColor = 	"rgb(" + 
								Math.floor(Math.random()*255) + "," + 
								Math.floor(Math.random()*255) + "," + 
								Math.floor(Math.random()*255) 
							+ ")";

		var circle = makeCircle(randomX, randomY, randomRadius);
		circle.style.backgroundColor = randomColor;
		circles.push(circle);

		numCircles--;
	}
}

// Updates the stored mouse position values whenever the mouse is moved
document.onmousemove = function(event) {
	mouseX = event.clientX;
	mouseY = event.clientY;
}

// Updates the player's position and checks for collisions with circles
function updatePlayer() {
	var dx = mouseX - parseInt(player.style.left);
	var dy = mouseY - parseInt(player.style.top);

	changeX(player, dx/50); // See what happens when you change the 50s
	changeY(player, dy/50);

	checkCollisions();
}

// Checks if a specific circle is colliding with the player
function isColliding(circle, player) {
	var circleY = (parseInt(circle.style.top) + (parseInt(circle.style.height)/2));
	var circleX = (parseInt(circle.style.left) + (parseInt(circle.style.width)/2));
	
	var playerY = (parseInt(player.style.top) + (parseInt(player.style.height)/2));
	var playerX = (parseInt(player.style.left) + (parseInt(player.style.width)/2));
	var playerRadius = parseInt(player.style.width)/2;

	if( Math.abs(playerX - circleX) < playerRadius && Math.abs(playerY - circleY) < playerRadius) {
		return true;
	} else {
		return false;
	}

}

// Checks if all circles are colliding with the player, and if so, removes them and increases
// the player's size.
function checkCollisions() {
	for(var index = circles.length - 1; index >= 0; index -= 1) {
		// check if each circle is covered by the main player
		if( isColliding(circles[index], player) ) {

			// Make player bigger by how big the circle just eaten was
			changeSize(player, parseInt(circles[index].style.width)/2);

			// Remove circle from screen
			circles[index].parentNode.removeChild(circles[index]);

			// Remove circle from circles list
			circles.splice(index, 1);
		}
	}
}

// Reduces the size of the player by 1 px. 
function reducePlayer() {
	changeSize(player, -1);
}

// END SUPPORTING FUNCTIONS
// --------------

// Create the player and center it on the screen
var player = makeCircle(500, 500, 50);
player.id = "player";
center(player);

// Create temporary variables to save where the mouse is.
// Initially say that the mouse is at the player, so that the player does not try to move.
var mouseX = player.style.top;
var mouseY = player.style.left;

// Add the other circles that the player will try to eat
var circles = [];
addCircles(20, circles);

// Update where the player circle is every 1 ms
setInterval(updatePlayer, 1);

// Make the player become smaller every 0.5 seconds
setInterval(reducePlayer, 1000 * 0.5);