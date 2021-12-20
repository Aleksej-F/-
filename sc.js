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
   block= '';
   constructor() {
      this.block =`
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
   `
   }
      
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
               <div class="button_m " date="${n}"
               
               ></div>
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
      console.log(n)
      e.target.classList.add('down')
      switch (n) {
         case  '0':
           // blokEgg.game();
            game.startGame(1)   
           let eddg = 0
             let int = setTimeout(function run() {

               game.game(eddg);
                  ++eddg 
                  console.log(eddg)
                 if (eddg === 5) {
                  console.log('eddg')
                    if (game.wolfPosition == 0){

                     game.upTotal()
                     console.log('total-',game.getTotal())
                    }else { return }
                    eddg = 0
                 } 
                setTimeout(run, 1000);
              }, 100);
            
            break;
         case '1':
            
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
   wolfPosition = ''
   total = 0
   constructor(n) {
      this.wolfPosition =''
      this.total = 0
   }

   upTotal(){
      ++this.total
   }

   getTotal(){
      return this.total
   }


   craateWolfPosition(n){
      console.log('hgjghjghj-',n)
      this.wolfPosition = n
      createWolf(n)
   }

   startGame(n){
      this.total = 0
      this.craateWolfPosition(n)
   }


   game(eddg) {
      const egg_blok= document.querySelector('.egg_blok_0')
      
      for (let i = 0; i < 5; i++){
         egg_blok.children[i].classList.remove('active')
      }
       
      //console.dir(egg_blok.children)
      egg_blok.children[eddg].classList.add('active')
      
      
   }
}

const blokEgg = new Pole()
blokEgg.activatePole()

const blokButtonM = new ButtonBlokM (3)
blokButtonM.creatButtonBlokM()

const game = new Game()
