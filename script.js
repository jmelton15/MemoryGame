const gameContainer = document.getElementById("game");
const startButton = document.querySelector(".start-button");
const resetButton = document.querySelector(".reset-button");
const score = document.querySelector("span");
const lowScore = document.querySelector(".low-score");

let flippedArray = [];
let flippedBox;
let clicking = true;
let clicks = 0;
let play = false;
let guessScore = 0;
let divCounter = 1;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    let divString = divCounter.toString();
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.setAttribute("id", divString);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    divCounter++;
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  let divArray = document.querySelectorAll(".color-div");
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  
  if (play) {
 //this code prevents the user from clicking the same square twice
  if (event.target.classList.contains("flipped")) return;

  //set the clicked element to a variable
  //as well as createa a color variable from the className
  let clickedBox = event.target;
  let boxColor = event.target.className;

  //I decided to use an array for my script
  //every clicked element gets "flipped"
  //and then pushed onto an array as a node
  //In order to make sure no more than two cards are flipped
  //I check for when the array has two elements, length = 2
  //then I iterate through the array to alter the DOM accordingly
  clickedBox.style.backgroundColor = boxColor;
  clickedBox.classList.add("flipped");
  flippedArray.push(clickedBox);
  if (flippedArray.length === 2) {
   
    guessScore++;
    score.innerHTML = guessScore;
      if (flippedArray[0].className == flippedArray[1].className ) {
        for (let box in flippedArray) {
          flippedArray[box].classList.add("matched");
          flippedArray[box].removeEventListener("click", handleCardClick);
        }
        flippedArray = [];
      }
      else {
        setTimeout(function() {
          for(let box in flippedArray) {
            flippedArray[box].classList.remove("flipped");
            flippedArray[box].style.backgroundColor = "";
          }
          flippedArray = [];
        },100);
      }
  }
  let finish = document.querySelectorAll(".matched");
   setTimeout( function() {
    if (finish.length === COLORS.length) {
      let lastScore = localStorage.setItem("LastScore", guessScore);
      lowScore.innerText = `Your Previous Score Was: ${localStorage.getItem("LastScore")}`;
      alert(`You Have Completed The Memory Game!\r\n Your Guess Score was ${guessScore}`);
      play = false;
    }
   },200);
}
}
startButton.addEventListener("click", function() {
  createDivsForColors(shuffledColors);
  play = true;
  lowScore.innerText = `Your Previous Score Was: ${localStorage.getItem("LastScore")}`;
  startButton.style.visibility="hidden";
});
resetButton.addEventListener("click", function() {
    window.location.reload();
    play = true;
    startButton.style.visibility="visible";
});

