"use strict"

const button = document.querySelectorAll('.button');
const wolf = document.querySelectorAll('.wolf-el');
const basket = document.querySelectorAll('.basket-el');
const sound = document.querySelector('#sound')
let wolfPosition = 0 //положение волка
let soundPrizn = true
sound.addEventListener("click", soundClik);
function soundClik(){
   soundPrizn = !soundPrizn
}

button.forEach(element => {
   element.addEventListener("mousedown", buttonDown);
   element.addEventListener("mouseup", buttonUp);
});

function buttonDown(e) {
   e.stopPropagation();
   const n = +e.target.attributes.date.value
   e.target.classList.add('down')
   createWolf(n)
   
}

function buttonUp(e) {
   e.stopPropagation();
   e.target.classList.remove('down')
}

//определение положения волка
function createWolf(n) {
   delBasket(n)
   switch (n) {
      case 0:
      case 1:
         delWolf(0,1)
         break;
      case 2:
      case 3:
         delWolf(1,0)
         break;
      default:
         break;
   }
   wolfPosition = n
}
//перерисовка корзины
function delBasket(n){
   basket[wolfPosition].classList.remove('active')
   basket[n].classList.add('active')
}
//перерисовка волка
function delWolf(active, noActive){
    
   wolf[active].classList.add('active')
   wolf[noActive].classList.remove('active')
}

// яйцо
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
}
// лоток с яйцами
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
// поле из 4-х лотков
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
//кнока управления режимами
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
//блок кнопок управления режимами игры и время
class ButtonBlokM {
   blok=[]
   priznDown=false
   constructor(n){
      for (let index = 0; index < n; index++) {
         this.blok.push(new ButtonM(index)) ;
         //this.priznDown.push('false')
      }
     
   }
   // добавление кнопок в дом и навешивание слушателей нажатия и отпускания кнопки
   creatButtonBlokM() {
      let bl = ''
      this.blok.forEach(element => {
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

   getPriznDown(){
      return this.priznDown
   }
   //функция обработки нажания на кнопку 
   buttonDown(e) {
      e.stopPropagation();
      const n = e.target.attributes.date.value
      e.target.classList.add('down')
      switch (n) {
         case  '0':
            if (blokButtonM.getPriznDown()) { 
               break
            } else {
               blokButtonM.priznDown = true
               const game = new Game()
               game.startGame(1,0)   //
               game.gameVisible('a') //отрисовка надписи игра А
               let int = setTimeout(async function run() {
                  await game.gameA();
                  game.controlCounter() //проверка счетчика и
                  if (game.endGameSign) {
                     blokButtonM.priznDown = false
                     return
                  }
                 
                  setTimeout(run, game.sped);
               }, 100)
            }
            break;
         case '1':
            if (blokButtonM.getPriznDown()) { 
               break
            } else {
               blokButtonM.priznDown = true
               const game = new Game()
               game.startGame(1,0)   //
               game.gameVisible('b') //отрисовка надписи игра Б
               let int = setTimeout(async function run() {
                  await game.gameA();
                  game.controlCounterB() //проверка счетчика и
                  if (game.endGameSign) {
                     blokButtonM.priznDown = false
                     return}
                  setTimeout(run, game.sped);
               }, 100)
            }
            break;
         case '2':
            break;
         default:
             break;
      }
   }

   // функция отпускания кнопки
   buttonUp(e) {
      e.stopPropagation();
      e.target.classList.remove('down')
   }

}

class Game {
  // wolfPosition = 0 //положение волка
   total = 0 // счетчик очков
   counter = 0 // счетчик тактов
   sped = 1000 // переодичность обновления кадра
   interval = 5 // интервал появления новых яиц
   maxEgg = 5 //максимальное количество яиц на лотках
   zeroingSped = [100, 200,300,400, 500, 600, 700, 800, 999,]
   countZeroingSped = 0 // номер в массиве
   upSped = [5, 10, 15, 20, 0]
   countUpSped = 0 // номер в массиве upSped
   predNewEgg = 4 //номер лотка на котором было предыдущее яйцо
   eggTotal = 0 //колличество яиц на лотках
   brokenEgg = 0 // счетчик разбитых яиц
   gameStart = false // признак запущенной игры
   endGameSign = false //признак окончания игры
   trays = [] //массив описания расположения яиц на лотках
   hareInterval = 0 // временной интервал появления зайца
   timeHare = 0 //время до появления зайца
   priznHare = false // признак появления зайца
   
   upTotal(){
      ++this.total
   }
   upCounter(){
      ++this.counter
   }
   getTotal(){
      return this.total
   }
  
  

   //обнуление состояния лотков с яйцами
   traysNull() {
      this.trays = [
         [0,0,0,0,0,0],
         [0,0,0,0,0,0],
         [0,0,0,0,0,0],
         [0,0,0,0,0,0],
      ]
      this.eggTotal = 0
   }
   //расчет интервала до появления зайца
   calcHareInterval(){
      this.hareInterval = Math.floor(Math.random()*25 + 5)*1000
   }
   //таймер до появления зайца
   calcTimeHare(){
      this.timeHare += this.sped
   }

   startGame(n,l){
      this.total = 0
      this.eggBrokenDel() // удаления индикации разбитых яиц
      this.traysNull() // обнуление состояния лотков с яйцами
      createWolf(n) // отрисовка положения волка
      this.newTrays(l) // добавление яйца 
      this.gameStart = true
      this.endGameSign = false
   }

  async gameA() {
      score.rendering(this.getTotal()) // отрисовать счет
      this.rendering() // отрисовка яиц на лотках
     await this.checkTrays() // проверка на попадание в корзину
      this.offsetTrays() // смещение яиц
      this.upCounter() // увеличение счетчика тактов
      this.dvigSound()  // звук движения 
      this.calcTimeHare() //увеличение таймера до пояления зайца
      this.checkingAppearanceHare() //проверка появления зайца
   }
   //проверка появления зайца
   checkingAppearanceHare(){
      if (this.hareInterval <= this.timeHare){
         this.priznHare = true
         let blok= document.querySelector(`.hare`)
         blok.classList.add('active')
         this.timeHare = 0
         const tim = Math.floor(Math.random()*5 + 3)*1000
         this.calcHareInterval()
         setTimeout(()=>{
            this.priznHare = false
            let blok= document.querySelector(`.hare`)
            blok.classList.remove('active')
            this.timeHare = 0
         },tim)
      }
   }

   //проверка на окончание игры. проверка колличества разбитых яиц
   endGame(){
      if (this.brokenEgg >= 3) { 
         this.endGameSound()
         this.endGameSign = true
         this.gameStart = false
         }
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
   async checkTrays(){
     
      for (let index = 0; index < 4; index++) {
         if (this.trays[index][5] === 1) {
            if ( +wolfPosition === +index){
               this.upTotal() //увеличить счет
               this.upSound() //звук 
               score.rendering(this.getTotal()) //отрисовать счет
            } else { 
               this.traysNull() // обнуление поля
               this.rendering() // отрисовка поля
               this.eggBroken() // отрисовка разбитого яйца
               await  this.eggFallen(+index);// анимация убегающего цыпленка
               this.endGame() // проверка на окончание игры
            }
            --this.eggTotal
         }
      }
      
   }
   // отрисовка количества разбитых яиц
   eggBroken(){
      let blok= document.querySelector(`.egg_broken_blok`)
      let n = Math.floor(this.brokenEgg)
         if (this.priznHare) {
            if(blok.children[n].classList.contains('anime')){
               blok.children[n].classList.remove('anime')
               blok.children[n].classList.add('active')
            } else {
               blok.children[n].classList.add('anime')
            }
            this.brokenEgg += 0.5
         }else{
            if(blok.children[n].classList.contains('anime')){
               blok.children[n].classList.remove('anime')
               blok.children[n].classList.add('active')
               if ((n+1)<3){blok.children[n+1].classList.add('anime')}
            } else {
               blok.children[n].classList.add('active')
            }
            ++this.brokenEgg
         }
   }
    // удаление количества разбитых яиц
   eggBrokenDel(){
      let blok= document.querySelectorAll(`.egg_broken`)
      for (let i = 0; i< blok.length; i++) {
         blok[i].classList.remove('active')
         blok[i].classList.remove('anime')
      }
      this.brokenEgg = 0
   }

   //звук при попадании яйца в корзину
   upSound() {
      if (!soundPrizn) return
      let blok= document.querySelector(`.contener`)
      let audiTrek = `<audio id="upsound" src="./sound/up1.mp3" autoplay loop></audio>`
      blok.insertAdjacentHTML("beforeend", audiTrek);
      setTimeout(() => upsound.remove(), 400);
   }
   //звук при движении яйца по лотку
   dvigSound() {
      if (!soundPrizn) return
      let blok= document.querySelector(`.contener`)
      let audiTrek = `<audio id="dvigsound" src="./sound/dv1.mp3" autoplay loop></audio>`
      blok.insertAdjacentHTML("beforeend", audiTrek);
      setTimeout(() => dvigsound.remove(), 400);
   }
   //звук окончания игры после трех разбитых яиц
   endGameSound() {
      if (!soundPrizn) return
      let blok= document.querySelector(`.contener`)
      let audiTrek = `<audio id="endgamesound" src="./sound/konez.mp3" autoplay ></audio>`
      blok.insertAdjacentHTML("beforeend", audiTrek);
      setTimeout(() => endgamesound.remove(), 1400);
   }
   //звук анимации убегающего цыпленка
   animeChickenSound() {
      if (!soundPrizn) return
      let blok= document.querySelector(`.contener`)
      let audiTrek = `<audio id="audio" src="./sound/razb1.mp3" autoplay loop></audio>`
      blok.insertAdjacentHTML("beforeend", audiTrek);
      setTimeout(() => audio.remove(), 2600);
   }

   // проверка счетчика, добавление нового яйца или изменение состояния
   controlCounter(){
      if (this.counter % this.interval === 0 && this.eggTotal < this.maxEgg){
         let n = 0
         let quantity = true
         do {
            n = Math.floor(Math.random() * 4)
            if (n === this.predNewEgg) {continue}
            quantity = this.trays[n].some((element) => element === 1)
            if (!quantity) {
               let r = 0
               for (let i = 0; i < this.trays.length; i++){
                  if (this.trays[i].some((element) => element === 1)) { r++}
               }
               if (r > 2) {quantity = true }
            } else {quantity = false}
         } while ( quantity );
         this.predNewEgg = n
         this.newTrays(n)
      }
      if (this.total === this.upSped[this.countUpSped]) {
         --this.interval 
         ++this.countUpSped
         
      } else if (this.total > this.upSped[this.countUpSped]) {
         if ( this.sped > 400)  { this.sped -= 5}
      }
      if (this.total === this.zeroingSped[this.countZeroingSped]) {
         ++this.countZeroingSped
         this.sped = 1000
      }
   }
   // проверка счетчика, добавление нового яйца или изменение состояния
   controlCounterB(){
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
      }else if (this.total > this.upSped[this.countUpSped]) {
         if ( this.sped > 400)  { this.sped -= 10}
      }
      if (this.total === this.zeroingSped[this.countZeroingSped]) {
         ++this.countZeroingSped
         this.sped = 1000
      }
   }

   // отрисовка яиц на лотках
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

   // выбор анимации в случае падения яйца
   async   eggFallen(n){
      
      switch (n) {
         case 0:
         case 1:
            await this.eggFallenAnime ('.chicken_blok_left')
         break;
         case 2:
         case 3:
            await this.eggFallenAnime ('.chicken_blok_right')
         break;
         
         default:
            break;
      }
      
   }
   //анимация в случае падения яйца
   async eggFallenAnime (elem) {
      this.animeChickenSound()
      const blok = document.querySelector(elem);
      let rr=0
      let result = true
      let promise = new Promise((resolve, reject) =>
         setTimeout(function eggRend() {
            if (rr<5) {
               blok.children[rr].classList.add('active')
            }
            if (rr>0) {
               blok.children[rr-1].classList.remove('active') 
            }
            rr++
            if (rr===6) {
               return resolve(false)
            }
            setTimeout(eggRend, 500);
         }, 100)
      ) 
      result = await promise; 
   }

   //отрисовка игра А или игра Б
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
// цифры для счета
class Scoreboard {
   numbers = {
      0: [1,1,1,0,1,1,1],
      1: [0,0,1,0,0,1,0],
      2: [0,1,1,1,1,0,1],
      3: [0,1,1,1,0,1,1],
      4: [1,0,1,1,0,1,0],
      5: [1,1,0,1,0,1,1],
      6: [1,1,0,1,1,1,1],
      7: [0,1,1,0,0,1,0],
      8: [1,1,1,1,1,1,1],
      9: [1,1,1,1,0,1,1],
      10: [0,0,0,0,0,0,0]
   }
   // отрисовка счета
   rendering(n) {
      let arir = []
      if (n==0) {
         arir = [10,10,10,0]
      } else {
         let str = n.toString()
         arir = str.split('')
      }
      
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
   // добавление элементов в дом
   creatScoreBlok() {
      let blokZel =''
      let blokBlokZ =`<div class="blok-blok-z">`
      for (let index = 0; index < 7; index++) {
         blokZel += `<div class="z-el"></div>`
      }
      for (let index = 0; index < 4; index++) {
         blokBlokZ += `<div class="blok-z">${blokZel}</div>`
      }
      blokBlokZ += `</div>`
      const blok = document.querySelector('.wrapper')
      blok.insertAdjacentHTML("beforeend", blokBlokZ);
   }
}

const blokEgg = new Pole()
blokEgg.activatePole()

const blokButtonM = new ButtonBlokM (3)
blokButtonM.creatButtonBlokM()

const score = new Scoreboard()
score.creatScoreBlok()