
"use strict";
const gameFactory = () => {
    const playerFactory = (pName = 'john', shape = 'x') => {
        pName = pName;
        shape = shape
        function getName(){
            return pName;
        }
        function getShape(){
            return shape;
        }
        return {getShape, getName}
    }

    let counter = 0;
    let players = [playerFactory(), playerFactory('george', 'o')];
    let gameState = [];
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {cell.addEventListener('click', function() {jenga.play(cell)} )});
    const resetButton = document.querySelector('#restartButton');
    resetButton.addEventListener('click', function() {jenga.reset(cells)});
    const winningMessage = document.querySelector('#winningMessage');
    const board = document.querySelector('#board');
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ]; 
         
    const play = (currentCell) => {
        if(currentCell.innerHTML != "") return;
        let player = players[counter % 2];
        let shape = player.getShape();
        currentCell.innerHTML = shape;
        let index = Array.prototype.indexOf.call(board.children, currentCell);
        gameState[index] = shape;
        counter +=1;
        checkWin(player);
    }

    const  checkWin = (player) => {
        let shape = player.getShape();
        let pName = player.getName();
        winningCombos.forEach((index) => {
            if(gameState[index[0]] == shape && gameState[index[1]] == shape && gameState[index[2]] == shape )
            {
                toggleStuff();
                winningMessage.firstChild.textContent = `the winner is ${pName}`;
            }
            

        });
    };

    function reset(){
        cells.forEach((cell)=>cell.innerHTML = "");
        gameState = [];
        counter = 0;
        toggleStuff();
    }

    const toggleStuff = () => {
        winningMessage.classList.toggle("hidden");
        board.classList.toggle("hidden");
    }
    //events.emit('reset', reset);
    return {reset, play}
};

let jenga = gameFactory();