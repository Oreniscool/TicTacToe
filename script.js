const Gameboard = (function (){
    let elements = document.getElementsByClassName('element');
    let board= new Array();

    const initiate = () =>{
        let tempList=[]
        for(let i=3;i>0;i--) {
            for(let j=3;j>0;j--) {
                tempList.push(" ");
            }
            board.push(tempList);
            tempList=[];
        }
    }
    const get = () => {
        return board;
    }

    //Printing the board elements on the grid(Courtesy of Saad)
    const print = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const index = i * 3 + j;
                const element = elements[index];
                element.textContent = board[i][j];

                if (board[i][j] === 'X') {
                element.style.color = '#86a0e5';
                } else if (board[i][j] === 'O') {
                element.style.color = '#8a1e36';
                }
            }
        }
    };

    const disable = () => {
        for(let i=0; i<9;i++) {
            gameFunctions.disableButton(elements[i]);
        }
    }

    const reset = () => {
        window.location.reload();
    }
    const getElements = () => {return elements};

    const highlight = (indicator,i) =>{
        if(indicator==="r") {
            for(let j=0; j<3;j++) {
                const index = i* 3 + j;
                const element = elements[index];
                element.classList.add("highlight");
            }
        }
        else if(indicator==="c") {
            for(let j=0; j<3;j++) {
                const index = j* 3 + i;
                const element = elements[index];
                element.classList.add("highlight");
            }
        }
        else if(indicator==="d") {
            //reusing index as an indicator of the type of diagonal(0=normal&1=inverse)
            elements[4].classList.add("highlight");
            if(i==0) {
                elements[0].classList.add("highlight");
                elements[8].classList.add("highlight");
            }
            else if(i==1) {
                elements[2].classList.add("highlight");
                elements[6].classList.add("highlight");
            }
        }
    }
    return {initiate, get, print, getElements, disable, reset, highlight};
})();


const gameFunctions = (function (){
    let board = Gameboard.get();
    let round = 0;
    let xOccupied= new Array();
    let oOccupied= new Array();
    //Places x on board
    const placeX = (x,y) =>{
        board[x][y]='X';
        xOccupied.push([x,y]);
    }
    //Places O on board
    const placeO = (x,y) =>{
        board[x][y]='O';
        oOccupied.push([x,y]);
    }
    const disableButton = (button) => {
        button.classList.add("disabled-cursor");
        button.replaceWith(button.cloneNode(true));
    }
    //Adds event listeners
    const addListeners = () =>{
        let elements = document.getElementsByClassName('element');
        for(let i=0; i<9;i++) {
            elements[i].addEventListener("click",(e)=> {
                e.preventDefault();
                gameLogic([elements[i].dataset.x,elements[i].dataset.y])});     
        }
        let reset = document.querySelector('.reset');
        reset.addEventListener("click",()=>{Gameboard.reset()});
    }
    //Finds match
    const find = (arr,pos) => {
        for(let i=0; i<arr.length; i++) {
            if(arr[i][0]==pos[0] && arr[i][1]==pos[1]) {
                return true;
            }
        }
        return false;
    }

    //round functions
    const getRound = () => {
        return round;
    }
    const inrRound=() => {
        round++;
    }

    const checkWin = (char) => {
        //check rows
        let flag;
        skipRow: for(let i=0; i<3; i++) {
            flag=true;
            for(let j=0; j<3; j++) {
                if(board[i][j]!=char) {
                    flag=false;
                    continue skipRow;
                }  
            }
            if(flag) {
                Gameboard.highlight("r",i);
                return flag;
            }
        }
        //check columns
        for(let i=0; i<3; i++) {
            flag=true;
            for(let j=0; j<3; j++) {
                if(board[j][i]!=char) {
                    flag=false;
                    break;
                }
            }
            if(flag) {
                Gameboard.highlight("c",i);
                return flag;
            }
        }
        
        //check diags
        for(let i=0; i<3; i++) {
            flag=true;
            if(board[i][i]!=char) {
                flag=false;
                break;
            }
        }
        if(flag) {
            Gameboard.highlight("d",0);
            return flag;
        }
        for(let i=0; i<3; i++) {
            flag=true;
            if(board[i][2-i]!=char) {
                flag=false;
                break;
            }
        }
        if(flag) {
            Gameboard.highlight("d",1);
            return flag;
        }
    }
    const getXOccup = () => {return xOccupied};
    const getOOccup = () => {return oOccupied};
    return {placeO,placeX,addListeners,find,checkWin,getRound,inrRound,disableButton,getXOccup, getOOccup};
})();


const gameLogic = (position)=> {
    let infotext=document.querySelector(".info");
    let xOccupied=gameFunctions.getXOccup();
    let oOccupied=gameFunctions.getOOccup();
    let round=gameFunctions.getRound();
    if (gameFunctions.find(xOccupied,position) || gameFunctions.find(oOccupied,position)) {
        return;
    }    
        if(round%2==0) {
            infotext.textContent="O's move";
            gameFunctions.placeX(position[0],position[1]);
            Gameboard.print();
            if(gameFunctions.checkWin("X")) {
                infotext.textContent="X wins!";
                Gameboard.disable();
            }
        }
        else if(round%2!=0) {
            infotext.textContent="X's move";
            gameFunctions.placeO(position[0],position[1]);
            Gameboard.print();
            if(gameFunctions.checkWin("O")) {
                infotext.textContent="O wins!";
                Gameboard.disable();
            }
        }
        if(round==9) {
            Gameboard.disable();
            infotext.textContent="It's a draw!";
            return;
        }
    gameFunctions.inrRound();
    return;
};


Gameboard.initiate();
Gameboard.print();
gameFunctions.addListeners();
