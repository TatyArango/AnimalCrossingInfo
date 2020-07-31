import {getBugs, getFish, getSea} from './js/http-provider.js';
import './js/components.js';

import './styles.css';
console.log('funciona')

let bugsTable = document.querySelector('#bugsTable');
let seaTable = document.querySelector('#seaTable');
let fishTable = document.querySelector('#fishTable');

let divBugs = document.querySelector('#bugsView');

let bugsBtn = document.querySelector('#bugsBtn');
let fishBtn = document.querySelector('#fishBtn');
let seaBtn = document.querySelector('#seaBtn');
let bugsView = document.querySelector('#bugsView');
let fishView = document.querySelector('#fishView');
let seaView = document.querySelector('#seaView');
let bugsTitle = document.querySelector('#titleBugs');
let fishTitle = document.querySelector('#titleFish');
let seaTitle = document.querySelector('#titleSea');

let modalTitle = document.querySelector("#title");

let modal = document.querySelector(".modal");

let closeButton = document.querySelector(".close-button");


// let containerDiv = document.createElement('div');
// let img = document.createElement('img');
// let tooltipDiv = document.createElement('div');
// let tooltipSpan = document.createElement('span');

let div = document.querySelector('.bug-div');

let bugs = {
    id: '',
    name: '',
    price: '',
    rarity: ''

};
let fishes;
let creatures;
let bicho = [];
let bug;
let fish = '';
let creature = '';
let bugsLength = 0;
let names = [];
let category = '';


let isVisible = true;



const clearDiv = () =>{

    divBugs.innerHTML = "";

}

const createDiv = (category, id, name, rarity, bug) =>{


    let containerDiv = document.createElement('div');
    let img = document.createElement('img');
    let tooltipDiv = document.createElement('div');
    let tooltipSpan = document.createElement('span');
    img.src = `http://acnhapi.com/v1/icons/${category}/${id}`;

    tooltipDiv.appendChild(tooltipSpan);
    tooltipDiv.appendChild(img);
    containerDiv.appendChild(tooltipDiv);
    
    bugsView.appendChild(containerDiv);
    tooltipDiv.classList.add('tooltip');
    tooltipSpan.classList.add('tooltiptext');
    containerDiv.classList.add('bug-div');
    containerDiv.addEventListener('click', ()=>{
        toggleDetail(name, id, rarity, bug);
    });
    tooltipSpan.innerText = `${name}`;

}

bugsBtn.addEventListener('click', async() =>{
    category = 'bugs';

    clearDiv();

    bugsBtn.classList.add('yellow-icon');
    fishBtn.classList.remove('yellow-icon');
    seaBtn.classList.remove('yellow-icon');

    bugsTitle.classList.remove('hide');
    fishTitle.classList.add('hide');
    seaTitle.classList.add('hide');

 
    
    bugsView.classList.remove('hide');
    bugsView.classList.remove('sea-creatures-div');
    
    fishView.classList.add('hide');
    seaView.classList.add('hide')

    bugs = await getBugs().then((data)=>{

        for (bug in data){
            
            let name = data[bug]["name"]["name-USes"];
            let id = data[bug]["id"];
            let price = data[bug]["price"]
            let priceFlick = data[bug]["price-flick"]
            let isAllDay = data[bug]["availability"]["isAllDay"];
            let time = data[bug]["availability"]["time"];
            let isAllYear = data[bug]["availability"]["isAllYear"];
            let northernMonth = data[bug]["availability"]["month-northern"];
            let southernMonth =  data[bug]["availability"]["month-southern"];
            let location = data[bug]["availability"]["location"];
            let rarity = data[bug]["availability"]["rarity"];

            createDiv(category, id, name, rarity, bug);
            
        }      

    });

    console.log(bugs);
    // console.log(rarity);


})

fishBtn.addEventListener('click',async() =>{
    category = 'fish';
    clearDiv();

    fishBtn.classList.add('yellow-icon');
    bugsBtn.classList.remove('yellow-icon');
    seaBtn.classList.remove('yellow-icon');

    bugsTitle.classList.add('hide');
    fishTitle.classList.remove('hide');
    seaTitle.classList.add('hide');
    

    bugsView.classList.remove('hide');
    bugsView.classList.remove('sea-creatures-div');
    fishView.classList.add('hide');
    seaView.classList.add('hide');

    fishes = await getFish().then((fishes)=>{

        for (fish in fishes){
            
            let name = fishes[fish]["name"]["name-USes"];
            let id = fishes[fish]["id"];
            // price
            // price-cj
            // "availability"
            // isAllDay
            // time
            // isAllYear
            // month-northern
            // month-southern
            // location
            // rarity
            createDiv(category, id, name);
            
        }      

    });

        
})

seaBtn.addEventListener('click',async() =>{
    category = 'sea';
    clearDiv();
    fishBtn.classList.remove('yellow-icon');
    bugsBtn.classList.remove('yellow-icon');
    seaBtn.classList.add('yellow-icon');

    bugsTitle.classList.add('hide');
    fishTitle.classList.add('hide');
    seaTitle.classList.remove('hide');

    bugsView.classList.add('sea-creatures-div');
    fishView.classList.add('hide');
    bugsView.classList.remove('hide');

    creatures = await getSea().then((creatures)=>{
        
        for (creature in creatures){
            
            let name = creatures[creature]["name"]["name-USes"];
            let id = creatures[creature]["id"];
            // price
            
            // "availability"
            // isAllDay
            // time
            // isAllYear
            // month-northern
            // month-southern
            // speed
            createDiv(category, id, name);
            
        }      

    });
    
        
            
})

const toggleDetail = (name, id, rarity, bug) =>{
    console.log(`click en el div!! ${id}`);
    modal.classList.toggle("show-modal");
    // modalTitle.innerText = `soy el numero ${name}`;
    console.log(`soy !!! ${rarity}`);
    console.log(`aqui hay esta info ${bug}`)

}


// function toggleModal() {
//     modal.classList.toggle("show-modal");
// }
const windowOnClick = (event) => {
    if (event.target === modal) {
        toggleDetail();
    }
}
// function windowOnClick(event) {
//     if (event.target === modal) {
//         toggleDetail();
//     }
// }


closeButton.addEventListener("click", toggleDetail);
window.addEventListener("click", windowOnClick);


