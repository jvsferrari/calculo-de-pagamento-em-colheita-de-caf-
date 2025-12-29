const DATABANK_NAME = 'allData';

function typeNum(key, fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) {
    return;
  }
  field.value = field.value + key;
}

function erase(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) {
    return;
  }
  field.value = field.value.slice(0, -1);
}

function plus(fieldId) {
  const a = 1;
}

function readDatabase() {
  return JSON.parse(localStorage.getItem(DATABANK_NAME)) || [];
}

function saveData(list) {
  localStorage.setItem(DATABANK_NAME, JSON.stringify(list));
}

function addName() {
  const nameField = document.getElementById('name');
  if (!nameField) {
    return;
  }
  let nameTyped = nameField.value;

  if (nameTyped === '' || nameTyped === 'null' || nameTyped === 'undefined') {
    nameTyped = 'Nome não inserido';
  }

  const list = readDatabase();

  list.push({
    names: nameTyped,
    pricePer: 0,
    latoes: 0,
    liters: 0,
  });

  saveData(list);
}

function getNumber(event, fieldId, valueInArray) {
  const field = document.getElementById(fieldId);
  if (!field) {
    return;
  }

  let numberTyped = field.value;

  if (/[^0-9+\-*/.]/.test(numberTyped)) {
    alert('Digite apenas números e operações matemáticas!');
    return;
  }

  if (
    numberTyped == '' ||
    numberTyped == 'undefined' ||
    numberTyped == 'null'
  ) {
    numberTyped === '0';
  }

  numberTyped = math.evaluate(numberTyped);

  numberTyped = parseFloat(numberTyped);

  const list = readDatabase();

  if (list.length === 0) {
    alert('Comece pela página 1!');
    event.preventDefault();
    return;
  }

  const lastPerson = list[list.length - 1];

  lastPerson[valueInArray] = numberTyped;

  saveData(list);
}

function finalResults() {
  const fullList = readDatabase();
  const tableBody = document.getElementById('results-table');
  if (!tableBody) {
    return;
  }
  const calculatedList = fullList.map(function (worker) {
    const pricePer = worker.pricePer || 0;
    const latoes = worker.latoes || 0;
    const liters = worker.liters || 0;

    const costCalculated = (pricePer / 60) * (latoes * 60 + liters);
    return {
      names: worker.names,
      finalCost: costCalculated,
    };
  });
  tableBody.innerHTML = '';
  calculatedList.forEach(function (item) {
    tableBody.innerHTML += `
        <tr>
            <td>${item.names}</td>
            <td>${item.finalCost.toFixed(2)}</td>
        </tr>
        `;
  });
}

finalResults();
