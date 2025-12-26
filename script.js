const DATABANK_NAME = "allData" 
const nameField = document.getElementById("name");
const pricePerField = document.getElementById("pricePer");
const latoesField = document.getElementById("latoes");
const litersField = document.getElementById("liters");

function type(key, field){
    field.value = field.value + key 
}

function erase(field){
    const textNow = field.value
    field.value = textNow.slice(0, -1)
}

function readDatabase(){
    return JSON.parse(localStorage.getItem(DATABANK_NAME)) || [];
}

function saveData(list) {
    localStorage.setItem(data, JSON.stringify(list));
}

function addName(){

    const nameTyped = nameField.value

    if(nameTyped ===""){
        nameTyped = "Nome não inserido"
    }

    const list = readDatabase()

    list.push({
        names: nameTyped,
        pricePer: 0,
        latoes: 0,
        liters: 0
    });

    saveData(list)
}

function getNumber(event, field, number){

    if (isNaN(field.value)){
        event.preventDefault();
        alert("Digite um valor numérico!");
        return
    }

    const number = parseInt(field.value);

    const list = readDatabase()

    const lastPerson = list[list.length - 1];

    lastPerson[number] = parseInt(number)

    saveData(list)
}

function calculateCost(priceTyped, latoesTyped, litersTyped){
    const pricePerTyped = parseInt(pricePerField.value);
    const latoesTyped = parseInt(latoesField.value);
    const litersTyped = parseInt(litersField.value);
    costCalculated = priceTyped/60 * (latoesTyped * 60 + litersTyped)

    list.push({
        costColumn: costCalculated
    })

data.forEach(function(name)
    
}

const finalTable = [
    {namesColumn:"", costColumn:""}
]