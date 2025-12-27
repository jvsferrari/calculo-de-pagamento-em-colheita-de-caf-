const DATABANK_NAME = "allData" 
const nameField = document.getElementById("name");
const latoesField = document.getElementById("latoes");
const litersField = document.getElementById("liters");

function typeNum(key, fieldId){
    const pricePerField = document.getElementById(fieldId)
    pricePerField.value = pricePerField.value + key
}

function erase(fieldId){
    const pricePerField = document.getElementById(fieldId);
    pricePerField.value = pricePerField.value.slice(0, -1)
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

function getNumber(event, field, val){

    if (isNaN(field.value)){
        event.preventDefault();
        alert("Digite um valor numérico!");
        return
    }

    val = parseInt(field.value);

    const list = readDatabase()

    const lastPerson = list[list.length - 1];

    lastPerson[val] = parseInt(val)

    saveData(list)
}

function calculateCost(priceTyped, latoesTyped, litersTyped){
    const pricePerTyped = parseInt(pricePerField.value);
    latoesTyped = parseInt(latoesField.value);
    litersTyped = parseInt(litersField.value);
    costCalculated = priceTyped/60 * (latoesTyped * 60 + litersTyped)

    list.push({
        costColumn: costCalculated
    })

}
const finalTable = [
    {namesColumn:"", costColumn:""}
]