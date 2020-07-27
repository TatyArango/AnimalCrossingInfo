// https://acnhapi.com/v1/fish/{fishID}
// https://acnhapi.com/v1/sea/{seaID}
// https://acnhapi.com/v1/bugs/{bugID}

const fishUrl = 'https://acnhapi.com/v1/fish/';
const bugsUrl = 'https://acnhapi.com/v1/bugs/';
const seaUrl = 'https://acnhapi.com/v1/sea/';

const getBugs = async() =>{

    
        const resp = await fetch(bugsUrl);
        const data = await resp.json();
        return data;
        

}

const getFish = async() => {

    const resp = await fetch(fishUrl);
    const data = await resp.json();
    return data;

} 

const getSea = async() =>{

    const resp = await fetch(seaUrl);
    const data = await resp.json();
    return data;

}



export {
    getBugs,
    getFish,
    getSea
}