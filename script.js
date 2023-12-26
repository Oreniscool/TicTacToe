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

    //Printing the board elements on the grid
    const print = () => {
        for(let i=0;i<3;i++) {
            for(let j=0;j<3;j++) {
                for(let l=0;l<9;l++) {
                    if(elements[l].dataset.x==i && elements[l].dataset.y==j) {
                        elements[l].textContent=board[i][j];
                        if(board[i][j]=='X') {
                            elements[l].style="color:teal";
                        }
                        else if(board[i][j]=='O') {
                            elements[l].style="color:#cc9600";
                        }
                        
                    }
                }
            }
        }
    }

    const disable = () => {
        for(let i=0; i<9;i++) {
            gameFunctions.disableButton(elements[i]);
        }
    }

    const reset = () => {
        window.location.reload();
    }
    const getElements = () => {return elements};
    return {initiate, get, print, getElements, disable, reset};
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
        console.log(xOccupied);
    }
    //Places O on board
    const placeO = (x,y) =>{
        board[x][y]='O';
        oOccupied.push([x,y]);
        console.log(oOccupied);
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
        console.log("Already occupied");
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
        if(round==8) {
            Gameboard.disable();
            infotext.textContent="It's a draw!";
            return;
        }
    gameFunctions.inrRound();
    return;
};

const game= ()=> {
    Gameboard.initiate();
    Gameboard.print();
    gameFunctions.addListeners();
}

game();