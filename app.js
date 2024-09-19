const gameBoard = document.getElementById("gameBoard");
const turn = document.getElementById("span");
const infoDisplay = document.getElementById("infoDisplay")
const width =8;
let playerGo = "black";
turn.innerHTML="Black";



const array = [
    rook,knight,bishop,queen,king,bishop,knight,rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    "","","","","","","","",
    "","","","","","","","",
    "","","","","","","","",
    "","","","","","","","",
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook,knight,bishop,king,queen,bishop,knight,rook,
]

function createBoard(){
    array.forEach((element,i)=>{
        const square = document.createElement("div");
        square.classList.add("square");
        square.innerHTML = element;
        square.firstChild?.setAttribute("draggable",true)
        square.setAttribute("square-id",i);
        const row = Math.floor((63-i)/8)+1;
        if(row%2===0){
            square.classList.add(i%2===0?"beige":"brown");
        }
        else{
            square.classList.add(i%2===0?"brown":"beige");
        }

        if(i<=15){
            square.firstChild.firstChild.classList.add("black");
        }
        if(i>=48){
            square.firstChild.firstChild.classList.add("white");
        }
        gameBoard.append(square);
    })
}
createBoard();



const allSquares = document.querySelectorAll(".square");

allSquares.forEach(square=>{
    square.addEventListener("dragstart", dragStart);
    square.addEventListener("dragover", dragOver);
    square.addEventListener("drop",dragDrop);
})

let startPositionId;
let draggedElement;

function dragStart(e){
    startPositionId = e.target.parentNode.getAttribute("square-id");
    draggedElement = e.target;
}

function dragOver(e){
    e.preventDefault();
    
}

function dragDrop(e){
    e.stopPropagation();
    const correctGo = draggedElement.firstChild.classList.contains(playerGo);
    const taken = e.target.classList.contains("piece");
    const valid = checkIfValid(e.target)
    const opponentGo = playerGo === "white"?"black":"white";
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo);


    if(correctGo){
        if(takenByOpponent && valid){
            e.target.parentNode.append(draggedElement);
            e.target.remove();
            checkForWin();
            changePlayer();
            return;
        }

        if(taken && !takenByOpponent){
            infoDisplay.innerHTML="Invalid Move"
            setTimeout(() => infoDisplay.innerHTML="", 2000);
            return
        }
        if(valid){
            e.target.append(draggedElement);
            checkForWin();
            changePlayer();
            return;
        }
    }
    
    

    changePlayer();
}


function changePlayer(){
    if(playerGo==="black"){
        reverseIds();
        playerGo = "white";
        turn.innerHTML="White";
        
    }
    else{
        revertIds();
        playerGo="black";  
        turn.innerHTML="Black";

    }
}

function reverseIds(){
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square,i)=>{
        square.setAttribute("square-id",(width*width-1)-i)
    })
}

function revertIds(){
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square,i)=>{
        square.setAttribute("square-id",i);
    })
}


function checkIfValid(target){
    const targetId = Number(target.getAttribute("square-id")) || Number(target.parentNode.getAttribute("square-id"));
    const startId = Number(startPositionId);
    const piece = draggedElement.id;

    switch (piece){
        case "pawn" : 
            const starterRow = [8,9,10,11,12,13,14,15];
            if(starterRow.includes(startId) && startId + width*2 === targetId 
            || startId+width===targetId 
            || startId+width-1 === targetId && document.querySelector(`[square-id = "${startId + width-1}" ]`).firstChild
            || startId+width+1 === targetId && document.querySelector(`[square-id = "${startId + width+1}" ]`).firstChild
            ){
                return true;
            }
            break;
        case "knight" : 
            if(
                startId+width*2-1 === targetId
                || startId+width*2+1 === targetId
                || startId+width-2 === targetId
                || startId+width+2 === targetId
                || startId-width-2 === targetId
                || startId-width+2 === targetId
                || startId-width*2+1 === targetId
                || startId-width*2-1=== targetId
            ){
                return true;
            }
            break;
        case "bishop":
            if(
                // first direction
                startId + width+1 === targetId
                || startId + width*2 +2 === targetId && !document.querySelector(`[square-id = "${startId+width+1}"]`).firstChild 
                || startId + width*3 +3 === targetId && !document.querySelector(`[square-id = "${startId+width+1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId+width*2+2}"]`).firstChild
                || startId + width*4 +4 === targetId && !document.querySelector(`[square-id = "${startId+width+1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3+3}"]`).firstChild
                || startId + width*5 +5 === targetId && !document.querySelector(`[square-id = "${startId+width+1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3+3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*4+4}"]`).firstChild
                || startId + width*6 +6 === targetId && !document.querySelector(`[square-id = "${startId+width+1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3+3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*4+4}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*5+5}"]`).firstChild
                || startId + width*7 +7 === targetId && !document.querySelector(`[square-id = "${startId+width+1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3+3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*4+4}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*5+5}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*6+6}"]`).firstChild

                // second direction
                || startId + width-1 === targetId
                || startId + width*2 -2 === targetId && !document.querySelector(`[square-id = "${startId+width-1}"]`).firstChild 
                || startId + width*3 -3 === targetId && !document.querySelector(`[square-id = "${startId+width-1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId+width*2-2}"]`).firstChild
                || startId + width*4 -4 === targetId && !document.querySelector(`[square-id = "${startId+width-1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3-3}"]`).firstChild
                || startId + width*5 -5 === targetId && !document.querySelector(`[square-id = "${startId+width-1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3-3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*4-4}"]`).firstChild
                || startId + width*6 -6 === targetId && !document.querySelector(`[square-id = "${startId+width-1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3-3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*4-4}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*5-5}"]`).firstChild
                || startId + width*7 -7 === targetId && !document.querySelector(`[square-id = "${startId+width-1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3-3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*4-4}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*5-5}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*6-6}"]`).firstChild
            
                // third direction
                || startId - width-1 === targetId
                || startId - width*2 -2 === targetId && !document.querySelector(`[square-id = "${startId-width-1}"]`).firstChild 
                || startId - width*3 -3 === targetId && !document.querySelector(`[square-id = "${startId-width-1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId-width*2-2}"]`).firstChild
                || startId - width*4 -4 === targetId && !document.querySelector(`[square-id = "${startId-width-1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3-3}"]`).firstChild
                || startId - width*5 -5 === targetId && !document.querySelector(`[square-id = "${startId-width-1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3-3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*4-4}"]`).firstChild
                || startId - width*6 -6 === targetId && !document.querySelector(`[square-id = "${startId-width-1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3-3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*4-4}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*5-5}"]`).firstChild
                || startId - width*7 -7 === targetId && !document.querySelector(`[square-id = "${startId-width-1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3-3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*4-4}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*5-5}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*6-6}"]`).firstChild
            
            
                //fourth direction
                || startId - width+1 === targetId
                || startId - width*2 +2 === targetId && !document.querySelector(`[square-id = "${startId-width+1}"]`).firstChild 
                || startId - width*3 +3 === targetId && !document.querySelector(`[square-id = "${startId-width+1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId-width*2+2}"]`).firstChild
                || startId - width*4 +4 === targetId && !document.querySelector(`[square-id = "${startId-width+1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3+3}"]`).firstChild
                || startId - width*5 +5 === targetId && !document.querySelector(`[square-id = "${startId-width+1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3+3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*4+4}"]`).firstChild
                || startId - width*6 +6 === targetId && !document.querySelector(`[square-id = "${startId-width+1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3+3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*4+4}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*5+5}"]`).firstChild
                || startId - width*7 +7 === targetId && !document.querySelector(`[square-id = "${startId-width+1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3+3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*4+4}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*5+5}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*6+6}"]`).firstChild
            ){
                return true;
            }
            break;
        case "rook":
            if(
                // first direction
                startId+width===targetId 
                || startId+width*2 === targetId && !document.querySelector(`[square-id = "${startId+width}"]`).firstChild
                || startId+width*3 === targetId && !document.querySelector(`[square-id = "${startId+width}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*2}"]`).firstChild
                || startId+width*4 === targetId && !document.querySelector(`[square-id = "${startId+width}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3}"]`).firstChild 
                || startId+width*5 === targetId && !document.querySelector(`[square-id = "${startId+width}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*4}"]`).firstChild
                || startId+width*6 === targetId && !document.querySelector(`[square-id = "${startId+width}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*4}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*5}"]`).firstChild  
                || startId+width*7 === targetId && !document.querySelector(`[square-id = "${startId+width}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*4}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*5}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*6}"]`).firstChild 
                || startId+width*8 === targetId && !document.querySelector(`[square-id = "${startId+width}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*4}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*5}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*6}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*7}"]`).firstChild 


                // second direction
                || startId-width===targetId 
                || startId-width*2 === targetId && !document.querySelector(`[square-id = "${startId-width}"]`).firstChild
                || startId-width*3 === targetId && !document.querySelector(`[square-id = "${startId-width}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*2}"]`).firstChild
                || startId-width*4 === targetId && !document.querySelector(`[square-id = "${startId-width}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3}"]`).firstChild 
                || startId-width*5 === targetId && !document.querySelector(`[square-id = "${startId-width}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*4}"]`).firstChild
                || startId-width*6 === targetId && !document.querySelector(`[square-id = "${startId-width}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*4}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*5}"]`).firstChild  
                || startId-width*7 === targetId && !document.querySelector(`[square-id = "${startId-width}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*4}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*5}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*6}"]`).firstChild 
                || startId-width*8 === targetId && !document.querySelector(`[square-id = "${startId-width}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*4}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*5}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*6}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*7}"]`).firstChild 
            
                // third direction
                || startId+1 ===targetId 
                || startId+2 === targetId && !document.querySelector(`[square-id = "${startId+1}"]`).firstChild
                || startId+3 === targetId && !document.querySelector(`[square-id = "${startId+1}"]`).firstChild && !document.querySelector(`[square-id = "${startId+2}"]`).firstChild
                || startId+4 === targetId && !document.querySelector(`[square-id = "${startId+1}"]`).firstChild && !document.querySelector(`[square-id = "${startId+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+3}"]`).firstChild 
                || startId+5 === targetId && !document.querySelector(`[square-id = "${startId+1}"]`).firstChild && !document.querySelector(`[square-id = "${startId+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+4}"]`).firstChild
                || startId+6 === targetId && !document.querySelector(`[square-id = "${startId+1}"]`).firstChild && !document.querySelector(`[square-id = "${startId+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+4}"]`).firstChild && !document.querySelector(`[square-id = "${startId+5}"]`).firstChild  
                || startId+7 === targetId && !document.querySelector(`[square-id = "${startId+1}"]`).firstChild && !document.querySelector(`[square-id = "${startId+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+4}"]`).firstChild && !document.querySelector(`[square-id = "${startId+5}"]`).firstChild && !document.querySelector(`[square-id = "${startId+6}"]`).firstChild 
                || startId+8 === targetId && !document.querySelector(`[square-id = "${startId+1}"]`).firstChild && !document.querySelector(`[square-id = "${startId+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+4}"]`).firstChild && !document.querySelector(`[square-id = "${startId+5}"]`).firstChild && !document.querySelector(`[square-id = "${startId+6}"]`).firstChild && !document.querySelector(`[square-id = "${startId+7}"]`).firstChild 


                // fourth direction
                || startId-1 ===targetId 
                || startId-2 === targetId && !document.querySelector(`[square-id = "${startId-1}"]`).firstChild
                || startId-3 === targetId && !document.querySelector(`[square-id = "${startId-1}"]`).firstChild && !document.querySelector(`[square-id = "${startId-2}"]`).firstChild
                || startId-4 === targetId && !document.querySelector(`[square-id = "${startId-1}"]`).firstChild && !document.querySelector(`[square-id = "${startId-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-3}"]`).firstChild 
                || startId-5 === targetId && !document.querySelector(`[square-id = "${startId-1}"]`).firstChild && !document.querySelector(`[square-id = "${startId-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-4}"]`).firstChild
                || startId-6 === targetId && !document.querySelector(`[square-id = "${startId-1}"]`).firstChild && !document.querySelector(`[square-id = "${startId-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-4}"]`).firstChild && !document.querySelector(`[square-id = "${startId-5}"]`).firstChild  
                || startId-7 === targetId && !document.querySelector(`[square-id = "${startId-1}"]`).firstChild && !document.querySelector(`[square-id = "${startId-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-4}"]`).firstChild && !document.querySelector(`[square-id = "${startId-5}"]`).firstChild && !document.querySelector(`[square-id = "${startId-6}"]`).firstChild 
                || startId-8 === targetId && !document.querySelector(`[square-id = "${startId-1}"]`).firstChild && !document.querySelector(`[square-id = "${startId-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-4}"]`).firstChild && !document.querySelector(`[square-id = "${startId-5}"]`).firstChild && !document.querySelector(`[square-id = "${startId-6}"]`).firstChild && !document.querySelector(`[square-id = "${startId-7}"]`).firstChild 

            )
            {
                return true;
            }
            break;
        case "queen":
            if(
                startId+width===targetId 
                || startId+width*2 === targetId && !document.querySelector(`[square-id = "${startId+width}"]`).firstChild
                || startId+width*3 === targetId && !document.querySelector(`[square-id = "${startId+width}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*2}"]`).firstChild
                || startId+width*4 === targetId && !document.querySelector(`[square-id = "${startId+width}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3}"]`).firstChild 
                || startId+width*5 === targetId && !document.querySelector(`[square-id = "${startId+width}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*4}"]`).firstChild
                || startId+width*6 === targetId && !document.querySelector(`[square-id = "${startId+width}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*4}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*5}"]`).firstChild  
                || startId+width*7 === targetId && !document.querySelector(`[square-id = "${startId+width}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*4}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*5}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*6}"]`).firstChild 
                || startId+width*8 === targetId && !document.querySelector(`[square-id = "${startId+width}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*4}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*5}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*6}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*7}"]`).firstChild 


                // second direction
                || startId-width===targetId 
                || startId-width*2 === targetId && !document.querySelector(`[square-id = "${startId-width}"]`).firstChild
                || startId-width*3 === targetId && !document.querySelector(`[square-id = "${startId-width}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*2}"]`).firstChild
                || startId-width*4 === targetId && !document.querySelector(`[square-id = "${startId-width}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3}"]`).firstChild 
                || startId-width*5 === targetId && !document.querySelector(`[square-id = "${startId-width}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*4}"]`).firstChild
                || startId-width*6 === targetId && !document.querySelector(`[square-id = "${startId-width}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*4}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*5}"]`).firstChild  
                || startId-width*7 === targetId && !document.querySelector(`[square-id = "${startId-width}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*4}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*5}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*6}"]`).firstChild 
                || startId-width*8 === targetId && !document.querySelector(`[square-id = "${startId-width}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*4}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*5}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*6}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*7}"]`).firstChild 
                
                // third direction
                || startId+1 ===targetId 
                || startId+2 === targetId && !document.querySelector(`[square-id = "${startId+1}"]`).firstChild
                || startId+3 === targetId && !document.querySelector(`[square-id = "${startId+1}"]`).firstChild && !document.querySelector(`[square-id = "${startId+2}"]`).firstChild
                || startId+4 === targetId && !document.querySelector(`[square-id = "${startId+1}"]`).firstChild && !document.querySelector(`[square-id = "${startId+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+3}"]`).firstChild 
                || startId+5 === targetId && !document.querySelector(`[square-id = "${startId+1}"]`).firstChild && !document.querySelector(`[square-id = "${startId+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+4}"]`).firstChild
                || startId+6 === targetId && !document.querySelector(`[square-id = "${startId+1}"]`).firstChild && !document.querySelector(`[square-id = "${startId+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+4}"]`).firstChild && !document.querySelector(`[square-id = "${startId+5}"]`).firstChild  
                || startId+7 === targetId && !document.querySelector(`[square-id = "${startId+1}"]`).firstChild && !document.querySelector(`[square-id = "${startId+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+4}"]`).firstChild && !document.querySelector(`[square-id = "${startId+5}"]`).firstChild && !document.querySelector(`[square-id = "${startId+6}"]`).firstChild 
                || startId+8 === targetId && !document.querySelector(`[square-id = "${startId+1}"]`).firstChild && !document.querySelector(`[square-id = "${startId+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+4}"]`).firstChild && !document.querySelector(`[square-id = "${startId+5}"]`).firstChild && !document.querySelector(`[square-id = "${startId+6}"]`).firstChild && !document.querySelector(`[square-id = "${startId+7}"]`).firstChild 


                // fourth direction
                || startId-1 ===targetId 
                || startId-2 === targetId && !document.querySelector(`[square-id = "${startId-1}"]`).firstChild
                || startId-3 === targetId && !document.querySelector(`[square-id = "${startId-1}"]`).firstChild && !document.querySelector(`[square-id = "${startId-2}"]`).firstChild
                || startId-4 === targetId && !document.querySelector(`[square-id = "${startId-1}"]`).firstChild && !document.querySelector(`[square-id = "${startId-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-3}"]`).firstChild 
                || startId-5 === targetId && !document.querySelector(`[square-id = "${startId-1}"]`).firstChild && !document.querySelector(`[square-id = "${startId-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-4}"]`).firstChild
                || startId-6 === targetId && !document.querySelector(`[square-id = "${startId-1}"]`).firstChild && !document.querySelector(`[square-id = "${startId-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-4}"]`).firstChild && !document.querySelector(`[square-id = "${startId-5}"]`).firstChild  
                || startId-7 === targetId && !document.querySelector(`[square-id = "${startId-1}"]`).firstChild && !document.querySelector(`[square-id = "${startId-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-4}"]`).firstChild && !document.querySelector(`[square-id = "${startId-5}"]`).firstChild && !document.querySelector(`[square-id = "${startId-6}"]`).firstChild 
                || startId-8 === targetId && !document.querySelector(`[square-id = "${startId-1}"]`).firstChild && !document.querySelector(`[square-id = "${startId-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-4}"]`).firstChild && !document.querySelector(`[square-id = "${startId-5}"]`).firstChild && !document.querySelector(`[square-id = "${startId-6}"]`).firstChild && !document.querySelector(`[square-id = "${startId-7}"]`).firstChild 


                // first direction
                || startId + width+1 === targetId
                || startId + width*2 +2 === targetId && !document.querySelector(`[square-id = "${startId+width+1}"]`).firstChild 
                || startId + width*3 +3 === targetId && !document.querySelector(`[square-id = "${startId+width+1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId+width*2+2}"]`).firstChild
                || startId + width*4 +4 === targetId && !document.querySelector(`[square-id = "${startId+width+1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3+3}"]`).firstChild
                || startId + width*5 +5 === targetId && !document.querySelector(`[square-id = "${startId+width+1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3+3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*4+4}"]`).firstChild
                || startId + width*6 +6 === targetId && !document.querySelector(`[square-id = "${startId+width+1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3+3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*4+4}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*5+5}"]`).firstChild
                || startId + width*7 +7 === targetId && !document.querySelector(`[square-id = "${startId+width+1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3+3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*4+4}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*5+5}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*6+6}"]`).firstChild

                // second direction
                || startId + width-1 === targetId
                || startId + width*2 -2 === targetId && !document.querySelector(`[square-id = "${startId+width-1}"]`).firstChild 
                || startId + width*3 -3 === targetId && !document.querySelector(`[square-id = "${startId+width-1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId+width*2-2}"]`).firstChild
                || startId + width*4 -4 === targetId && !document.querySelector(`[square-id = "${startId+width-1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3-3}"]`).firstChild
                || startId + width*5 -5 === targetId && !document.querySelector(`[square-id = "${startId+width-1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3-3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*4-4}"]`).firstChild
                || startId + width*6 -6 === targetId && !document.querySelector(`[square-id = "${startId+width-1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3-3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*4-4}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*5-5}"]`).firstChild
                || startId + width*7 -7 === targetId && !document.querySelector(`[square-id = "${startId+width-1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*3-3}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*4-4}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*5-5}"]`).firstChild && !document.querySelector(`[square-id = "${startId+width*6-6}"]`).firstChild
            

                // third direction
                || startId - width-1 === targetId
                || startId - width*2 -2 === targetId && !document.querySelector(`[square-id = "${startId-width-1}"]`).firstChild 
                || startId - width*3 -3 === targetId && !document.querySelector(`[square-id = "${startId-width-1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId-width*2-2}"]`).firstChild
                || startId - width*4 -4 === targetId && !document.querySelector(`[square-id = "${startId-width-1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3-3}"]`).firstChild
                || startId - width*5 -5 === targetId && !document.querySelector(`[square-id = "${startId-width-1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3-3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*4-4}"]`).firstChild
                || startId - width*6 -6 === targetId && !document.querySelector(`[square-id = "${startId-width-1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3-3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*4-4}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*5-5}"]`).firstChild
                || startId - width*7 -7 === targetId && !document.querySelector(`[square-id = "${startId-width-1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3-3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*4-4}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*5-5}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*6-6}"]`).firstChild
            
            
                //fourth direction
                || startId - width+1 === targetId
                || startId - width*2 +2 === targetId && !document.querySelector(`[square-id = "${startId-width+1}"]`).firstChild 
                || startId - width*3 +3 === targetId && !document.querySelector(`[square-id = "${startId-width+1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId-width*2+2}"]`).firstChild
                || startId - width*4 +4 === targetId && !document.querySelector(`[square-id = "${startId-width+1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3+3}"]`).firstChild
                || startId - width*5 +5 === targetId && !document.querySelector(`[square-id = "${startId-width+1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3+3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*4+4}"]`).firstChild
                || startId - width*6 +6 === targetId && !document.querySelector(`[square-id = "${startId-width+1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3+3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*4+4}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*5+5}"]`).firstChild
                || startId - width*7 +7 === targetId && !document.querySelector(`[square-id = "${startId-width+1}"]`).firstChild  && !document.querySelector(`[square-id = "${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*3+3}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*4+4}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*5+5}"]`).firstChild && !document.querySelector(`[square-id = "${startId-width*6+6}"]`).firstChild
            ){
                return true;
            }
            break;
        case "king":
            if(
                //first direction..
                startId + 1===targetId 
                || startId-1 === targetId
                || startId+width === targetId
                || startId-width === targetId
                || startId+width-1 === targetId
                || startId+width+1 === targetId
                || startId-width+1=== targetId
                || startId-width-1===targetId
            )
            {
                return true;
            }
            break;
    }
}


function checkForWin(){
    const kings = Array.from(document.querySelectorAll("#king"));
    console.log(kings)
    if(!kings.some(king=>king.firstChild.classList.contains("white"))){
        infoDisplay.innerHTML="Black pieces won";
        const allSquares = document.querySelectorAll(".square");
        allSquares.forEach(square=>square.firstChild?.setAttribute("draggable",false));
    }

    if(!kings.some(king=>king.firstChild.classList.contains("black"))){
        infoDisplay.innerHTML="White pieces won";
        const allSquares = document.querySelectorAll(".square");
        allSquares.forEach(square=>square.firstChild?.setAttribute("draggable",false));
    }
    
}