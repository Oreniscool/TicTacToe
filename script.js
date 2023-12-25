const Gameboard = (function (){
    let board = [];
    const initiate = () =>{
        let tempList=[]
        for(let i=3;i>0;i--) {
            for(let j=3;j>0;j--) {
                tempList.push("_");
            }
            board.push(tempList);
            tempList=[];
        }
    }
    const get = () => {
        return board;
    }
    const print = () => {
        for(let i=0;i<3;i++) {
            console.log(board[i]);
        }
    }
    return {initiate,get,print};
})();


const gameFunctions = (function (){
    let board = Gameboard.get();
    const placeX = (x,y) =>{
        board[x][y]='X';
    }
    const placeO = (x,y) =>{
        board[x][y]='O';
    }
    const getPosition = () =>{
        let x=prompt("Enter x positon: ");
        let y=prompt("Enter y positon: ");
        if(x<0 || x>=3 || y<0 ||y>=3) {
            console.log("Enter correct integer values of x&y");
            return getPosition();
        }
        return [x,y];
    }
    const find = (arr,pos) => {
        for(let i=0; i<arr.length; i++) {
            if(arr[i][0]==pos[0] && arr[i][1]==pos[1]) {
                return true;
            }
            return false;
        }
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

    return {placeO,placeX,getPosition,find,checkWin};
})();


const gameLogic = ()=> {
    Gameboard.initiate();
    let xOccupied = [];
    let oOccupied = [];
    Gameboard.print();
    let flag=0;
    for(let i=0; i<9;i++) {
        if(i%2==0) {
            console.log("X's move");
            let position;
            do {
                position= gameFunctions.getPosition();
                if (gameFunctions.find(xOccupied,position) || gameFunctions.find(oOccupied,position)) {
                    console.log("Already occupied");
                    flag=1;
                }
                else {
                    flag=0;
                }
            }
            while(flag==1);
            gameFunctions.placeX(position[0],position[1]);
            xOccupied.push(position);
            Gameboard.print();
            if(gameFunctions.checkWin("X")) {
                console.log("X wins!")
                break;
            }
        }
        else if(i%2!=0) {
            console.log("O's move");
            do {
                position= gameFunctions.getPosition();
                if (gameFunctions.find(xOccupied,position) || gameFunctions.find(oOccupied,position)) {
                    console.log("Already occupied");
                    flag=1;
                }
                else {
                    flag=0;
                }
            }
            while(flag==1);
            gameFunctions.placeO(position[0],position[1]);
            oOccupied.push(position);
            Gameboard.print();
            if(gameFunctions.checkWin("O")) {
                console.log("O wins!")
                break;
            }
        }
    }
    console.log("Game over! Reload the page to restart.");
};

gameLogic();
