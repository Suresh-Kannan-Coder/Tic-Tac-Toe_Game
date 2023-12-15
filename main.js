window.addEventListener('DOMContentLoaded',() => {

    const mainbox = document.querySelectorAll(".btn");
    var overgame = document.getElementById("gameover");
    var gamenew = document.getElementById("newgame");
    var xturn = document.getElementById("x");
    var oturn = document.getElementById("o");

    const possiblity = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    let options = ["","","","","","","","",""];
    let player = 'X';
    let gamestart = false;
    start();

    function start(){
        mainbox.forEach(btn => btn.addEventListener('click', Clicking));
        gamenew.addEventListener('click', restart );
        xturn.classList.add('turnchange');
        gamestart = true;
    }
    
    function Clicking(){
        const index1=this.dataset.index;
        if(options[index1]!="" || !gamestart){
            return;
        }
        boxchange(this,index1);
        wincheck();
    }

    function boxchange(btns,index){
        options[index]=player;
        btns.innerHTML=player;
    }

    function changeplayer(){
        player=(player=='X')?'O':'X';
        if(player=='X'){
            xturn.classList.add('turnchange');
            oturn.classList.remove('turnchange');
        }
        else{
            oturn.classList.add('turnchange');
            xturn.classList.remove('turnchange');
        }
    }

    function wincheck(){
        let ifwin=false;
        for(let i=0;i<8;i++){
            const checkit=possiblity[i];
            var a=options[checkit[0]];
            var b=options[checkit[1]];
            var c=options[checkit[2]];
            if(a== ""|| b==""|| c==""){
                continue;
            }
            if(a==b&&b==c){
                ifwin=true;
            }
        }
        if(ifwin){
            overgame.classList.remove('hide');
            var playagain = document.getElementById("restart");
            var win = document.getElementById("winner");
            win.innerText=`WINNER IS ${player}`;
            playagain.addEventListener('click', restart);
            playagain.addEventListener('click', ()=>{
                overgame.classList.add('hide');
            });
            gamestart=false;
        }
        else if(!options.includes("")){
            overgame.classList.remove('hide');
            var playagain = document.getElementById("restart");
            var win = document.getElementById("winner");
            win.style.fontSize="120px";
            win.innerText=`GAME IS DRAW`;
            playagain.addEventListener('click', restart);
            playagain.addEventListener('click', ()=>{
overgame.classList.add('hide');
            });
            gamestart=false;
        }
        else{
            changeplayer();
        }
    }

    function restart(){
        options = ["","","","","","","","",""];
        player = 'X';
        gamestart = true;
        xturn.classList.add('turnchange');
        oturn.classList.remove('turnchange');
        mainbox.forEach(btn =>{
            btn.innerHTML="";
        });
    }   

});