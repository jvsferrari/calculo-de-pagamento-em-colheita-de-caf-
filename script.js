const botaoPronto = document.querySelectorAll('.pronto');
const botaoPular = document.querySelector('#pular');
const botaoReiniciar = document.querySelector('#reiniciar');
const tabela = document.querySelector('#tabela');
const nomes = document.querySelector('#nomes');
const calculadora = document.querySelector('#calculadora');
const resultados = document.querySelector('#resultados');
const numeros = document.querySelectorAll('.numero');
const campoNome = document.querySelector('#campoNome');
const campoCalculadora = document.querySelector('#campoCalculadora');
const nomePronto = document.querySelector('#nomePronto');
const numeroPronto = document.querySelector('#numeroPronto');
const etapa = document.querySelector('#etapa');

let passo = 1;
let panhadores = [];
// preço novo??????????????????????????????? checkbox
function novoPanhador() {
	let nome = campoNome.value;
	if (nome == null || nome == undefined || nome.trim() == '') {
		nome = 'Nome não definido';
	} else campoNome.value = '';
	return {
		index: 0,
		nome: nome,
		preço: 0,
		latoes: 0,
		litros: 0,
		total: 0,
	};
}

nomePronto.addEventListener('click', () => {
	panhadores.push(novoPanhador());
});
window.addEventListener('popstate', function (event) {});

nomePronto.addEventListener('click', () => {
	proximaPagina(1);
});
numeroPronto.addEventListener('click', () => {
	proximaPagina(passo);
});

function proximaPagina() {
	switch (passo) {
		case 1:
			campoCalculadora.placeholder = 'Preço por litro R$/Litro';
			etapa.innerText = 'Preço por litro';
			nomes.style.display = 'none';
			calculadora.style.display = 'flex';
			window.history.pushState({ passo: passo }, '', '#' + 'preco');
			passo = 2;
			break;
		case 2:
			campoCalculadora.placeholder = 'Latões';
			etapa.innerText = 'Latões';
			window.history.pushState({ passo: passo }, '', '#' + 'latoes');
			passo = 3;
			break;
		case 3:
			campoCalculadora.placeholder = 'Litros';
			etapa.innerText = 'Litros';
			window.history.pushState({ passo: passo }, '', '#' + 'litros');
			passo = 4;
			break;
		case 4:
			calculadora.style.display = 'none';
			resultados.style.display = 'flex';
			window.history.pushState({ passo: passo }, '', '#' + 'resultados');
			mostrarResultados();
			break;
	}
}

function mostrarResultados() {}

async function compartilharPdf() {
	const { jsPDF } = window.jspdf;
	const doc = new jsPDF();
	doc.autoTable({ html: '#minhaTabela' });

	// 1. Gera o Blob
	const pdfBlob = doc.output('blob');

	// 2. Transforma o Blob em um objeto de Arquivo (File)
	const arquivo = new File([pdfBlob], 'relatorio.pdf', {
		type: 'application/pdf',
	});

	// 3. Verifica se o navegador suporta compartilhamento de arquivos
	if (navigator.canShare && navigator.canShare({ files: [arquivo] })) {
		try {
			await navigator.share({
				files: [arquivo],
				title: 'Relatório de Dados',
				text: 'Segue em anexo a tabela exportada.',
			});
			console.log('Compartilhado com sucesso!');
		} catch (erro) {
			console.log('O usuário cancelou o compartilhamento.', erro);
		}
	} else {
		// Plano B: Se estiver no PC ou navegador antigo, apenas baixa o arquivo
		alert(
			'Compartilhamento não suportado neste navegador. Baixando arquivo...',
		);
		doc.save('relatorio.pdf');
	}
}

function exportarParaPDF() {
	const { jsPDF } = window.jspdf;
	const doc = new jsPDF();
	doc.autoTable({ html: '#tabela' });
	doc.save('acertoCafe.pdf');
}

/*
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

function readDatabase() {
	return JSON.parse(localStorage.getItem(DATABANK_NAME)) || [];
}

function saveData(list) {
	localStorage.setItem(DATABANK_NAME, JSON.stringify(list));
}

function novoPanhador() {
	const camppo = document.getElementById('name');
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

	if 
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

	tableBody.textContent = '';

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

	calculatedList.forEach(function (item) {
		const tr = document.createElement('tr');

		const tdName = document.createElement('td');
		tdName.innerText = item.names;

		const tdCost = document.createElement('td');
		tdCost.innerText = item.finalCost.toFixed(2);

		tr.appendChild(tdName);
		tr.appendChild(tdCost);
		tableBody.appendChild(tr);
	});
}

finalResults();
*/
