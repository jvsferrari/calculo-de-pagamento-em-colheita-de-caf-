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
const confirmar = document.querySelector('#confirmar');
const finalizar = document.querySelector('#finalizar');
const adicionar = document.querySelector('#adicionar');
const baixar = document.querySelector('#baixar');
const compartilhar = document.querySelector('#compartilhar');
const reiniciar = document.querySelector('#reiniciar');
const zerar = document.querySelector('#zerar');
const borracha = document.querySelector('#borracha');
const pular = document.querySelector('#pular');
const paginas = document.querySelectorAll('.pagina');

let numPanhador = -1;
let passo = 1;
let panhadores = [];
// preço novo??????????????????????????????? checkbox
function novoPanhador() {
	let nome = campoNome.value;
	if (nome == null || nome == undefined || nome.trim() == '') {
		nome = 'Nome não definido';
	} else campoNome.value = '';
	numPanhador++;
	return {
		index: numPanhador,
		nome: nome,
		preço: 0,
		latoes: 0,
		litros: 0,
		total: 0,
	};
}

nomePronto.addEventListener('click', () => {
	panhadores.push(novoPanhador());
	proximaPagina(passo);
});

pular.addEventListener('click', () => {
	panhadores.push(novoPanhador());
	proximaPagina(passo);
});

window.addEventListener('popstate', function (event) {});

borracha.addEventListener('click', () => {
	campoCalculadora.value = campoCalculadora.value.slice(0, -1);
});

finalizar.addEventListener('click', () => {
	confirmar.style.display = 'none';
	resultados.style.display = 'flex';
	passo = 6;
	window.history.pushState({ passo: passo }, '', '#' + 'resultados');
	calcularResultados();
	mostrarResultados();
});

adicionar.addEventListener('click', () => {
	passo = 1;
	nomes.style.display = 'flex';
	confirmar.style.display = 'none';
	window.history.pushState({ passo: passo }, '', '#' + 'nome');
});

numeroPronto.addEventListener('click', () => {
	switch (passo) {
		case 2:
			panhadores[numPanhador].preço = math.evaluate(
				campoCalculadora.value,
			);
			campoCalculadora.value = '';
			break;
		case 3:
			panhadores[numPanhador].latoes = math.evaluate(
				campoCalculadora.value,
			);
			campoCalculadora.value = '';
			break;
		case 4:
			panhadores[numPanhador].litros = math.evaluate(
				campoCalculadora.value,
			);
			campoCalculadora.value = '';
			calcularResultados();
			break;
	}
	proximaPagina(passo);
});

numeros.forEach((tecla) => {
	tecla.addEventListener('click', () => {
		campoCalculadora.value += tecla.innerText;
	});
});

compartilhar.addEventListener('click', () => {
	compartilharPdf('compartilhar');
});

baixar.addEventListener('click', () => {
	compartilharPdf('baixar');
});

reiniciar.addEventListener('click', () => {
	numPanhador = -1;
	passo = 1;
	nomes.style.display = 'flex';
	resultados.style.display = 'none';
	tabela.replaceChildren();
	window.history.pushState({ passo: passo }, '', '#' + 'nome');
});

zerar.addEventListener('click', () => {
	numPanhador = -1;
	panhadores = [];
	tabela.replaceChildren();
	passo = 1;
	nomes.style.display = 'flex';
	resultados.style.display = 'none';
	window.history.pushState({ passo: passo }, '', '#' + 'nome');
});

function proximaPagina() {
	switch (passo) {
		case 1:
			campoCalculadora.placeholder = 'Preço por litro R$/Litro';
			etapa.innerText = 'Preço por litro';
			nomes.style.display = 'none';
			calculadora.style.display = 'flex';
			passo = 2;
			window.history.pushState({ passo: passo }, '', '#' + 'preco');
			break;
		case 2:
			campoCalculadora.placeholder = 'Latões';
			etapa.innerText = 'Latões';
			passo = 3;
			window.history.pushState({ passo: passo }, '', '#' + 'latoes');
			break;
		case 3:
			campoCalculadora.placeholder = 'Litros';
			etapa.innerText = 'Litros';
			passo = 4;
			window.history.pushState({ passo: passo }, '', '#' + 'litros');
			break;
		case 4:
			calculadora.style.display = 'none';
			confirmar.style.display = 'flex';
			passo = 5;
			window.history.pushState({ passo: passo }, '', '#' + 'confirmar');
			break;
	}
}

function calcularResultados() {
	for (let i = 0; i < panhadores.length; i++) {
		panhadores[i].total = (
			(panhadores[i].latoes + panhadores[i].litros / 60) *
			panhadores[i].preço
		).toFixed(2);
		if (isNaN(panhadores[i].total)) {
			panhadores[i].total = 0;
		}
	}
}

function mostrarResultados() {
	for (let i = 0; i < panhadores.length; i++) {
		let linha = document.createElement('tr');
		let nome = document.createElement('td');
		nome.innerText = panhadores[i].nome;
		linha.appendChild(nome);
		let total = document.createElement('td');
		total.innerText = panhadores[i].total;
		linha.appendChild(total);
		tabela.appendChild(linha);
	}
}

async function compartilharPdf(chamador) {
	const { jsPDF } = window.jspdf;
	const doc = new jsPDF();
	doc.autoTable({ html: '#tabela' });

	// 1. Gera o Blob
	const pdfBlob = doc.output('blob');

	// 2. Transforma o Blob em um objeto de Arquivo (File)
	const arquivo = new File([pdfBlob], 'relatorio.pdf', {
		type: 'application/pdf',
	});

	// 3. Verifica se o navegador suporta compartilhamento de arquivos
	if (
		navigator.canShare &&
		navigator.canShare({ files: [arquivo] }) &&
		chamador == 'compartilhar'
	) {
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
		doc.save('relatorio.pdf');
	}
}

window.addEventListener('popstate', (event) => {
	if (event.state && event.state.passo) {
		exibirPagina(event.state.passo);
		passo = event.state.passo;
	} else {
		exibirPagina(1);
	}
});

window.addEventListener('load', () => {
	window.history.replaceState({ passo: 1 }, '', '#nomes');
});

function exibirPagina(passo) {
	paginas.forEach((pagina) => {
		pagina.style.display = 'none';
	});
	switch (passo) {
		case 1:
			nomes.style.display = 'flex';
			break;
		case 2:
			campoCalculadora.placeholder = 'Preço por litro R$/Litro';
			etapa.innerText = 'Preço por litro';
			calculadora.style.display = 'flex';
			break;
		case 3:
			campoCalculadora.placeholder = 'Latões';
			etapa.innerText = 'Latões';
			calculadora.style.display = 'flex';
			break;
		case 4:
			campoCalculadora.placeholder = 'Litros';
			etapa.innerText = 'Litros';
			calculadora.style.display = 'flex';
			break;
		case 5:
			confirmar.style.display = 'flex';
			break;
		case 6:
			resultados.style.display = 'flex';
			break;
	}
}

window.onbeforeunload = () => {
	return 'You have unsaved changes. Do you really want to refresh the page?';
};
