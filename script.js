function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.right = '0%';
    const overlay = document.querySelector('.overlay')
    overlay.style.right = '0%';

}
function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.right = '-80%'
    const overlay = document.querySelector('.overlay')
    overlay.style.right = '100%'
}
const display = document.querySelector('.display');

function appendToDisplay(input){
    display.value += input;

}
function clearDisplay(){
    display.value ="";
}
function calculate(){
    try{

    
    display.value = eval(display.value)
 }
    catch(error){
        display.value = "Error"
    }
}
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let rows = 20;
let cols = 20;
let food;
let foodCollected = false;
let score = 0;


let snake = [{
    x: 10, 
    y: 10
}];

placeFood();
let cellWidth = canvas.width / cols;
let cellHeight = canvas.height / rows;


function placeFood(){
    let randomX = Math.floor(Math.random() * cols); 
    let randomY = Math.floor(Math.random() * rows); 

    food = {x: randomX, 
            y: randomY};

}

setInterval(gameLoop, 120);
document.addEventListener('keydown', Keydown);

draw(); 
function draw() {
    ctx.fillStyle = 'lightgreen';
    ctx.fillRect (0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    snake.forEach(part => add(part.x, part.y)); 
    ctx.fillStyle = 'yellow';
    add(food.x, food.y); 

    requestAnimationFrame(draw);
}   

function testGameOver(){
    let firstPart = snake[0];
    let otherParts = snake.slice(1);
    let dublicatepart = otherParts.find(part => part.x == firstPart.x && part.y == firstPart.y);
   
    if( snake[0].x < 0 || 
        snake[0].x > cols -1|| 
        snake[0].y < 0 || 
        snake[0].y > rows -1||
        dublicatepart
    ){
        placeFood(food);
        snake = [{
            x: 19, 
            y: 3
        }];
        direction = undefined;
        score = 0; 
        document.getElementById('score').innerText = "Score: 0";
    }
    
    }


function add(x, y){
    ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);
}

function shiftSnake(){
    for (let i = snake.length - 1;i > 0; i--) {
        const part = snake[i];
        const lastPart = snake[i - 1];
        part.x = lastPart.x
        part.y = lastPart.y;
        
    }

}

function gameLoop(){ 
    testGameOver();
    
    if (foodCollected){ 
        snake = [{
            x: snake[0].x, 
            y: snake[0].y
        }, ...snake];
        score++;
        document.getElementById('score').innerText = "Score: " + score; 
        
        foodCollected = false;
        
    }
    shiftSnake();

    if(direction == 'LEFT') {
        snake[0].x--;
    }
    if(direction == 'RIGHT') {
        snake[0].x++;
    }
    if(direction == 'UP') {
        snake[0].y--;
    }
    if(direction == 'DOWN') {
        snake[0].y++;
    }

    if(snake [0].x ==food.x && snake[0].y == food.y){
      foodCollected = true;
      placeFood();
      
    }


}; 

function Keydown(e){ 
    if (e.keyCode ==37){
        direction= 'LEFT';
    }
    if (e.keyCode ==38){
        direction= 'UP';
    }
    if (e.keyCode ==39){
        direction= 'RIGHT';
    }
    if (e.keyCode ==40){
        direction= 'DOWN';
    }
}


window.addEventListener("keydown", function(e) {
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

let currentCountry = "";  
    let scoreFlag = 0;       

    
    async function generateRandomFlag() {
        try {
          
            const response = await fetch('https://restcountries.com/v3.1/all');
            if (!response.ok) {
                throw new Error("Fehler beim Abrufen der Länderinformationen");
            }
            const countries = await response.json();

            
            const randomIndex = Math.floor(Math.random() * countries.length);
            const randomCountry = countries[randomIndex];

            
            if (randomCountry.translations && randomCountry.translations.deu) {
                currentCountry = randomCountry.translations.deu.common; 
            } else {
                currentCountry = randomCountry.name.common; 
            }

            
            const flagImg = document.getElementById('flag');
            flagImg.src = randomCountry.flags.png || randomCountry.flags.svg; 
            flagImg.alt = "Flagge"; 

           
            document.getElementById('country-input').value = "";
        } catch (error) {
            console.error('Fehler beim Abrufen der Länderinformationen:', error);
        }
    }

   
    function checkAnswer() {
        const userAnswer = document.getElementById('country-input').value.trim();
        
       
        if (userAnswer.toLowerCase() === currentCountry.toLowerCase()) {
            scoreFlag++;  
            document.getElementById('scoreFlag').innerText = scoreFlag; 
            document.getElementById('message').innerText = "Richtig!";
        } else {
            scoreFlag = 0; 
        document.getElementById('scoreFlag').innerText = "0";
            document.getElementById('message').innerText = `Falsch! Das richtige Land war: ${currentCountry}`;
        }

      
        generateRandomFlag();  
    }

   
    document.getElementById('country-input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            checkAnswer();  
            event.preventDefault(); 
        }
    });


    document.getElementById('country-input').addEventListener('input', function() {
   
    });

    window.onload = generateRandomFlag;