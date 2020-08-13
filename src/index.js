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

let modalName = document.querySelector("#name");
let modalMonthN = document.querySelector("#monthN");
let modalMonthS = document.querySelector("#monthS");
let modalImageCont = document.querySelector("#image");
let modalTimeN = document.querySelector("#timeN");
let modalTimeS = document.querySelector("#timeS");
let modalRarity = document.querySelector("#rarity");
let modalPrice = document.querySelector("#price");
let modalSpecial = document.querySelector("#specialPrice");
let modalLocation = document.querySelector("#location");




// let containerDiv = document.createElement('div');
// let img = document.createElement('img');
// let tooltipDiv = document.createElement('div');
// let tooltipSpan = document.createElement('span');

let div = document.querySelector('.bug-div');

let bugObject = {
    id: '',
    name: '',
    price: '',
    rarity: ''

};
let bugs = " ";
let bugsArray = [];
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

const createDiv = (category, id, name, data) =>{


    let containerDiv = document.createElement('div');
    let img = document.createElement('img');
    let tooltipDiv = document.createElement('div');
    let tooltipSpan = document.createElement('span');
    img.src = `http://acnhapi.com/v1/icons/${category}/${id}`;
    img.classList.add('img');

    tooltipDiv.appendChild(tooltipSpan);
    tooltipDiv.appendChild(img);
    containerDiv.appendChild(tooltipDiv);
    
    bugsView.appendChild(containerDiv);
    tooltipDiv.classList.add('tooltip');
    tooltipSpan.classList.add('tooltiptext');
    containerDiv.classList.add('bug-div');
    containerDiv.addEventListener('click', ()=>{
        toggleDetail(name, id, category, data);
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
            
            createDiv(category, id, name, data);
        

            
        }  
        
        console.log(data);
    });

   
   //console.log(data);
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

    fishes = await getFish().then((data)=>{

        for (fish in data){
            
            let name = data[fish]["name"]["name-USes"];
            let id = data[fish]["id"];
           
            createDiv(category, id, name, data);
            
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

    creatures = await getSea().then((data)=>{
        
        for (creature in data){
            
            let name = data[creature]["name"]["name-USes"];
            let id = data[creature]["id"];
           
            createDiv(category, id, name, data);
            
        }      

    });
    
        
            
})

const toggleDetail = (name, id, category, data) =>{
    let price, priceFlick, priceCj, isAllDay, time, isAllYear, northernMonth, southernMonth, location, rarity, speed
    // let modalImage = document.createElement('img');
    modalImageCont.innerHTML = '';
    bugsTitle.classList.add('hide');
    let title = document.querySelector('#title');
    
    for(let item in data){
        if(data[item]["id"] === id ){
            let modalImage = document.createElement('img');
            modalImage.src = `http://acnhapi.com/v1/images/${category}/${id}`
            modalImage.classList.add('image');
            modalImageCont.appendChild(modalImage);
            price = data[item]["price"]
            priceFlick = data[item]["price-flick"]
            priceCj = data[item]["price-cj"]
            isAllDay = data[item]["availability"]["isAllDay"];
            time = data[item]["availability"]["time"];
            isAllYear = data[item]["availability"]["isAllYear"];
            northernMonth = data[item]["availability"]["month-northern"];
            southernMonth =  data[item]["availability"]["month-southern"];
            location = data[item]["availability"]["location"];
            rarity = data[item]["availability"]["rarity"];
            speed = data[item]["speed"];
            break;
        }
    }

    modalName.innerText = `${name}`; 

    if(isAllYear){
        modalMonthN.innerText = `Todo el año`;
        modalMonthS.innerText = `Todo el año`;

    }else{
        modalMonthN.innerText = `${northernMonth}`;
        modalMonthS.innerText = `${southernMonth}`;
    }

    isAllDay ? modalTimeN.innerText = `Todo el día` : modalTimeN.innerText = `${time}`
   
    // modalImage.innerText = `${name}`;

    modalRarity.innerText = `${rarity}`;
    modalPrice.innerText = `${price}`;
    if(category === 'bugs'){
        
        title.innerText = "Precio Kamilo / Flick";
       
        modalSpecial.innerText = `${priceFlick}`;

    }else if( category === 'fish'){
        title.innerText = "Precio CJ";
        
        modalSpecial.innerText = `${priceCj}`;
    }else{
        title.innerText = "";
        
        modalSpecial.innerText = '';

    }
     
    modalLocation.innerText = `${location}`;
    console.log(`click en el div!! ${id}`);
    modal.classList.toggle("show-modal");
    // modalTitle.innerText = `soy el numero ${name}`;
    console.log(`soy !!! ${rarity}`);
    console.log(`aqui hay esta info ${bug}`)
    console.log(data);
    console.log(location);

}


// function toggleModal() {
//     modal.classList.toggle("show-modal");
// }
const windowOnClick = (event) => {
    // bugsTitle.classList.remove('hide');
    if (event.target === modal) {
        bugsTitle.classList.remove('hide');
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


