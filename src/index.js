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

// let containerDiv = document.createElement('div');
// let img = document.createElement('img');
// let tooltipDiv = document.createElement('div');
// let tooltipSpan = document.createElement('span');

let div = document.querySelector('.bug-div');

let bugs;
let fishes;
let creatures;
let bug = '';
let fish = '';
let creature = '';
let bugsLength = 0;
let names = [];
let category = '';


let isVisible = true;



const clearDiv = () =>{

    divBugs.innerHTML = "";

}

const createDiv = (category, id, name) =>{


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
        openDetail(id);
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

    bugs = await getBugs().then((bugs)=>{

        for (bug in bugs){
            
            let name = bugs[bug]["name"]["name-USes"];
            let id = bugs[bug]["id"];
            createDiv(category, id, name);
            
        }      

    });

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
            createDiv(category, id, name);
            
        }      

    });
    
        
            
})

const openDetail = (id) =>{
    console.log(`click en el div!! ${id}`);

}


