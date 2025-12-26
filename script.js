const DATABANK_NAME = "allData" 
const nameField = document.getElementById("name");
const pricePerField = document.getElementById("price");
const latoesField = document.getElementById("latoes");
const litersField = document.getElementById("liters");


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

    const table = readDatabase()

    table.push({
        names: nameTyped,
        pricePer: 0,
        latoes: 0,
        liters: 0
    });

    saveData(table)
}

function getNumber(event, field, number){

    if (isNaN(field.value)){
        event.preventDefault();
        alert("Digite um valor numérico!");
        return
    }

    const number = parseInt(field.value);

    const table = readDatabase()

    const lastPerson = data[data.length - 1];

    lastPerson[number] = parseInt(number)

    saveData(table)
}

function calculateCost(priceTyped, latoesTyped, litersTyped){
    const pricePerTyped = parseInt(pricePerField.value);
    const latoesTyped = parseInt(latoesField.value);
    const litersTyped = parseInt(litersField.value);
    costCalculated = priceTyped/60 * (latoesTyped * 60 + litersTyped)

    table.push({
        costColumn: costCalculated
    })

data.forEach(function(name)
    
}

const finalTable = [
    {namesColumn:"", costColumn:""}
]