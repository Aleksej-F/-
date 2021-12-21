"use strict"

const button = document.querySelectorAll('.button');
const wolf = document.querySelectorAll('.wolf-el');
const basket = document.querySelectorAll('.basket-el');

button.forEach(element => {
   element.addEventListener("mousedown", buttonDown);
   element.addEventListener("mouseup", buttonUp);
});

function buttonDown(e) {
   e.stopPropagation();
   
  const n = e.target.attributes.date.value
  e.target.classList.add('down')
   if (game){game.craateWolfPosition(n)
    } else{
      createWolf(n)
   }
}

function buttonUp(e) {
   e.stopPropagation();
   e.target.classList.remove('down')
}
//отрисовка волка
function createWolf(n) {
  
   delBasket()
   switch (+n) {
      case  0:
         basket[0].classList.add('active') 
         delWolf(0,1)
         break;
      case 1:
         basket[1].classList.add('active') 
         delWolf(0,1)
         break;
      case 2:
         basket[2].classList.add('active') 
         delWolf(1,0)
         break;
      case 3:
         basket[3].classList.add('active') 
         delWolf(1,0)
         break;
      default:
          break;
   }
}
//стирание корзины
function delBasket(){
   basket.forEach(element => {
      element.classList.remove('active')
   });
}
//перерисовка волка
function delWolf(active, noActive){
   wolf[active].classList.add('active')
   wolf[noActive].classList.remove('active')
}

class Egg {
   block= `
   <svg width="8px" height="8px" xmlns="http://www.w3.org/2000/svg" class="egg" >
               <g inkscape:groupmode="layer" id="layer3" inkscape:label="Layer 2">
                  <path style="fill:none;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" 
                  d="M 1.4072884,0.71640787 C 0.79510341,1.3178379 0.66082841,1.9442679 0.48855141,2.7793879 c -0.01894,0.90058 -0.04832,1.14409
                     0.108577,2.01288 0.182144,0.57693 0.388154,1.21694 1.22776899,1.72055 0.65188,0.27383 0.807937,0.32271 1.277884,0.26726 0.564961,-0.0415
                     0.912057,-0.34618 1.169304,-0.65147 0.36236,-0.49781 0.480609,-0.97097 0.517833,-1.56185 -0.03993,-0.55973 -0.0452,-1.05629 
                     -0.300678,-1.63703 -0.177904,-0.40174 -0.367094,-0.70654 -0.768399,-1.14425 -0.359651,-0.33845 -0.579084,-0.50113 -0.977205,-0.71829
                     C 2.1864914,0.82057787 1.8260394,0.73694787 1.4072884,0.71640787 Z" 
                  id="path4531" inkscape:connector-curvature="0" sodipodi:nodetypes="ccccccccccc"/></g>
            </svg>
`;
   // constructor() {
   //    this.block =
   // }
      
}

class EggBlok {
   blok=[]
   classListy=""
   constructor(n, list){
      for (let index = 0; index < n; index++) {
         this.blok.push(new Egg()) ;
      }
      this.classListy = list;
   }
   
   creatEggBlok() {
      let bl = ''
      this.blok.forEach(element => {
         bl += element.block
      });
      const eggBlok = document.querySelector('.wrapper')
      const bloki = `<div class="egg_blok ${this.classListy}">
         ${bl}
      </div>`
      eggBlok.insertAdjacentHTML("beforeend", bloki);
   }
}
class Pole {
   pole = []
   
   constructor(){
      for (let index = 0; index < 4; index++) {
         this.pole.push(new EggBlok(5,`egg_blok_${index}` )) ;
      }
   }

   activatePole(){
      this.pole.forEach(element => {
        element.creatEggBlok()
      });
   }
}

class ButtonM {
   blok=""
   
   constructor (n) {
      this.blok = `
         <div class="button_m-border">
            <div class="button_m-border-black">
               <div class="button_m " date="${n}"></div>
            </div>
         </div>
      `
   }
  
}

class ButtonBlokM {
   blok=[]
   
   constructor(n){
      for (let index = 0; index < n; index++) {
         this.blok.push(new ButtonM(index)) ;
      }
      
   }

   creatButtonBlokM() {
      let bl = ''
      this.blok.forEach(element => {
        // console.log(element.blok)
         bl += element.blok
      });
      const blok = document.querySelector('.wrapper')
      const bloki = `<div class="button-blok-m">
         ${bl}
      </div>`
      blok.insertAdjacentHTML("beforeend", bloki);
      const button = document.querySelectorAll('.button_m');
      button.forEach(element => {
         element.addEventListener("mousedown", this.buttonDown);
         element.addEventListener("mouseup", this.buttonUp);
      });
   }

   
   buttonDown(e) {
      e.stopPropagation();
      const n = e.target.attributes.date.value
      e.target.classList.add('down')
      switch (n) {
         case  '0':
            if (game.gameStart) { 
               break
            } else {
               game.startGame(1,0)   
               game.gameVisible('a')
               let int = setTimeout(function run() {
                  game.gameA();
                  setTimeout(run, game.sped);
               }, 100)
            }
            break;
         case '1':
            game.gameVisible('b')
            break;
         case '2':
            
            break;
         default:
             break;
      }
   }

   buttonUp(e) {
      e.stopPropagation();
   
   e.target.classList.remove('down')
   }

}
class Game {
   wolfPosition = 0 //положение волка
   total = 0 // счетчик очков
   counter = 0 // счетчик тактов
   sped = 1000 // переодичность обновления кадра
   interval = 5 // интервал появления новых яиц
   maxEgg = 5 //максимальное количество яиц на лотках
   zeroingSped = [5, 100, 200, 500, 999]
   upSped = [5, 10, 15, 20, ]
   countUpSped = 0 // номер в массиве upSped
   predNewEgg = 4 //номер лотка на котором было предыдущее яйцо
   eggTotal = 0 //колличество яиц на лотках
   brokenEgg = 0 // счетчик разбитых яиц
   gameStart = false
   trays = [
      [0,0,0,0,0,0],
      [0,0,0,0,0,0],
      [0,0,0,0,0,0],
      [0,0,0,0,0,0],
   ]
   
   // constructor(n) {
   //    this.wolfPosition =''
   //    this.total = 0
   // }

   upTotal(){
      ++this.total
   }
   upCounter(){
      ++this.counter
   }
   getTotal(){
      return this.total
   }

   traysNull() {
      this.trays = [
         [0,0,0,0,0,0],
         [0,0,0,0,0,0],
         [0,0,0,0,0,0],
         [0,0,0,0,0,0],
      ]
      this.eggTotal = 0
      
   }


   craateWolfPosition(n){
      this.wolfPosition = n
      createWolf(n)
   }

   startGame(n,l){
      this.total = 0
      this.craateWolfPosition(n)
      this.newTrays(l)
      this.gameStart = true
   }

   gameA() {
      this.rendering()
      this.checkTrays()
      this.offsetTrays()
      this.upCounter() //
      this.controlCounter()
   }

   //новое яйцо
   newTrays(lot){
      this.trays[lot][0] = 1
      ++this.eggTotal
   }
   //смещение яиц на лотках
   offsetTrays(){
      for (let index = 0; index < 4; index++) {
         this.trays[index].pop()
         this.trays[index].unshift(0)
      }
   }
   //проверка на попадание в корзину
   checkTrays(){
      for (let index = 0; index < 4; index++) {
         if (this.trays[index][5] === 1) {
            if ( +this.wolfPosition === +index){
               this.upTotal() //увеличить счет
               score.rendering(this.getTotal())
              // console.log('счет -', this.getTotal())//отрисовка счета
            } else { 
              // console.log("яйцо упало")//}
               this.traysNull()
               this.eggFallen(+index)
            }
            --this.eggTotal
         }
      }
   }

   controlCounter(){
      if (this.counter % this.interval === 0 && this.eggTotal < this.maxEgg){
         let n = 0
         do {
            n = Math.floor(Math.random() * 4)
         } while (n === this.predNewEgg);
         this.predNewEgg = n
         this.newTrays(n)
      }
      if (this.total === this.upSped[this.countUpSped]) {
         --this.interval 
         ++this.countUpSped
      }

   }

   rendering(){
      for (let er = 0; er < 4; er++){
         let egg_blok= document.querySelector(`.egg_blok_${er}`)
         for (let i = 0; i < 5; i++){
            if (this.trays[er][i] === 1) {
               egg_blok.children[i].classList.add('active')
            } else {
               egg_blok.children[i].classList.remove('active')
            }
         }
      }
   }

   async eggFallen(n){
      switch (n) {
         case 0:
         case 1:
            const blok = document.querySelector('.chicken_blok_left');
            let rr=0
            setTimeout(function eggRend() {
               if (rr<5) {
                  blok.children[rr].classList.add('active')
               }
                              
               if (rr>0){
                  blok.children[rr-1].classList.remove('active') 
               }
                  
               
                  rr++
                  if (rr===6){return }
                setTimeout(eggRend, 800);
              }, 100);
           
            
            // for (let i = 0; i<5; i++) {
            //    blok.children[i].classList.add('active')
            //    setTimeout(() =>{
            //       blok.children[i].classList.remove('active')
            //    }, 800);
            // }
            
               //console.dir(blok)
              
               
              
               
           
         
         break;
         case 2:
         case 3:
            const blok1 = document.querySelector('.chicken_blok_right');
            let rr1=0
            setTimeout(function eggRend() {
               if (rr1<5) {
                  blok1.children[rr1].classList.add('active')
               }
                              
               if (rr1>0){
                  blok1.children[rr1-1].classList.remove('active') 
               }
                  
               
                  rr1++
                  if (rr1===6){return }
                setTimeout(eggRend, 800);
              }, 100);
            
         break;
         
         default:
             break;
      }
      
   }

   gameVisible(n){
      const blok = document.querySelector('.game_blok');
      if (n==="a") {
         blok.children[0].classList.add('active')
         blok.children[1].classList.remove('active')
      } else if (n==="b") {
         blok.children[1].classList.add('active')
         blok.children[0].classList.remove('active')
      }
   }
}

class Scoreboard {
   numbers = {
      0: [1,1,1,0,1,1,1],
      1: [0,0,1,0,0,1,0],
      2: [0,1,1,1,1,0,1],
      3: [0,1,1,1,0,1,1],
      4: [1,0,1,1,0,1,0],
      5: [1,0,1,1,0,1,0],
      6: [1,1,0,1,1,1,1],
      7: [0,1,1,0,0,1,0],
      8: [1,1,1,1,1,1,1],
      9: [1,1,1,1,0,1,1]
   }

   rendering(n) {
      const str = n.toString()
      const arir = str.split('')
      const score = document.querySelectorAll('.blok-z');
      let sch = arir.length - 1
      for (let i = 0; i < arir.length; i++){
         for (let index = 0; index < 7; index++) {
            if (this.numbers[arir[i]][index] == 1) {
               score[sch].children[index].classList.add('active')
            } else {
               score[sch].children[index].classList.remove('active')
            }
         }
         sch--
      }
   }

}


const blokEgg = new Pole()
blokEgg.activatePole()

const blokButtonM = new ButtonBlokM (3)
blokButtonM.creatButtonBlokM()

const game = new Game()
const score = new Scoreboard()
//console.log( game)
