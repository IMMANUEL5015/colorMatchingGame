//Select the necessary html elements
var h1 = document.getElementsByTagName("h1")[0];
var colorDisplay = document.getElementById("colorDisplay");
var resetButton = document.querySelector("#reset");
var messageDisplay = document.getElementById("message");
var squares = document.querySelectorAll(".square");
var modeButtons = document.getElementsByClassName("mode");
var player = document.getElementById("playerName");
var submit = document.querySelector("h1 button");

var numOfSquares = 6;
var playerName = "";
//Initializing the game
init();

function init(){
    setUpModes();
    setUpSquares();
    reset();
}

//Convert Number to String
function numToStr(num){
    var result =  ''+ num + '';
    return result;
}

//Generate Random Number and convert it to string
function genRandomNum(){
    var result = numToStr(Math.floor(Math.random() * 16));
    if(result === '10'){
        return 'a';
    }else if(result === '11'){
        return 'b';
    }else if(result === '12'){
        return 'c';
    }else if(result === '13'){
        return 'd';
    }else if(result === '14'){
        return 'e';
    }else if(result === '15'){
        return 'f';
    }
    return result;
}

//Generate the Hex color value
function genRandomHexColor(){
    var red = genRandomNum() + genRandomNum(); 
    var green = genRandomNum() + genRandomNum();
    var blue = genRandomNum() + genRandomNum();
    var randomHexValue = '#' + red + green + blue;
    return randomHexValue;
}


//Generate the Six Random Colors
function generateRandomColors(num){
    var arr = [];
    for(var i = 1; i <= num; i++){
        arr.push(genRandomHexColor());
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
            var hexColor = "background-color: " + colors[i];
            squares[i].setAttribute("style", hexColor);
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
            var hexColor = this.getAttribute("style");
            var clickedColor =  hexColor.slice(18);
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "Correct " +  playerName + "!";
                resetButton.textContent = "Play Again!";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            }else{
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again " +  playerName + "!";
            }
        });
    }   
}


//When player's name changes
submit.addEventListener("click", function(){
    if(player.value !== playerName){
        playerName = player.value;
        reset();
    }    
});
