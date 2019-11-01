var numOfSquares = 6;

//Select the necessary html elements
var h1 = document.getElementsByTagName("h1")[0];
var colorDisplay = document.getElementById("colorDisplay");
var resetButton = document.querySelector("#reset");
var messageDisplay = document.getElementById("message");
var squares = document.querySelectorAll(".square");
var modeButtons = document.getElementsByClassName("mode");

//Initializing the game
init();

function init(){
    setUpModes();
    setUpSquares();
    reset();
}

//Generate a Random Color
function randomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var result = "rgb(" + r + ", " + g + ", " + b + ")";
    return result;
}

//Generate the Six Random Colors
function generateRandomColors(num){
    var arr = [];
    for(var i = 1; i <= num; i++){
        arr.push(randomColor());
    }
    return arr;
}

//Declaring the container for future storage the six different colors
var colors;

//Pick the color to be matched
function pickColor(){
    var  random =  Math.floor(Math.random() * colors.length);
    return colors[random];
}

//The container that will hold the picked color
var pickedColor;

//Declare the function for resetting the game
function reset(){
    colors = generateRandomColors(numOfSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }else{
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors";
}

//reset the game when the reset button is clicked
resetButton.addEventListener("click", function(){
    reset();
});

//Game Modes (Easy and/or Hard)
function setUpModes(){
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            for(var a = 0; a < modeButtons.length; a++){
                modeButtons[a].classList.remove("selected");
            }
            this.classList.add("selected");
            this.textContent === "Easy" ? numOfSquares = 3 : numOfSquares = 6;
            reset();
        });
    }
}

//Change the background colors of all the squares to that of the correct match
function changeColors(color){
    var count = 0;
    while(count < squares.length){
        squares[count].style.backgroundColor = color;
        count++;
    } 
}

//Check if the player guessed the color rightly or wrongly
function setUpSquares(){
    for(var i = 0; i < squares.length; i++){
        //Check if the player guessed the color rightly or wrongly
        squares[i].addEventListener("click", function(){
            var clickedColor = this.style.backgroundColor;
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again!";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            }else{
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again!";
            }
        });
    }   
}






