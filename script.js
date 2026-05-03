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

window.addEventListener('popstate', function (event) {});

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

function calcularResultados() {
	for (let i = 0; i < panhadores.length; i++) {
		panhadores[i].total =
			(panhadores[i].latoes + panhadores[i].litros / 60) *
			panhadores[i].preço;
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
