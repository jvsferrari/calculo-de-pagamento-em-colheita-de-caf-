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
const tabelaToda = document.querySelector('#tabelaToda');
const mudarPreco = document.querySelector('#mudarPreco');
const voltar = document.querySelectorAll('.voltar');

let numPanhador = 0;
let passo = 1;
let panhadores = [];
let precoDefinido = false;
// preço novo??????????????????????????????? checkbox
function novoPanhador() {
	let nome = campoNome.value;
	if (nome == null || nome == undefined || nome.trim() == '') {
		nome = 'Nome não definido';
	}
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
	if (!panhadores[numPanhador]) {
		panhadores[numPanhador] = novoPanhador();
	} else {
		let nome = campoNome.value.trim();
		panhadores[numPanhador].nome = nome === '' ? 'Nome não definido' : nome;
	}
	proximaPagina();
});

pular.addEventListener('click', () => {
	if (!panhadores[numPanhador]) {
		panhadores[numPanhador] = novoPanhador();
	}
	proximaPagina();
});

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
	precoDefinido = false;
	mudarPreco.style.display = 'none';
});

adicionar.addEventListener('click', () => {
	campoNome.value = '';

	numPanhador++;
	passo = 1;
	nomes.style.display = 'flex';
	confirmar.style.display = 'none';
	window.history.pushState({ passo: passo }, '', '#' + 'nomes');
});

mudarPreco.addEventListener('click', () => {
	if (!panhadores[numPanhador]) {
		panhadores[numPanhador] = novoPanhador();
	}
	precoDefinido = false;
	proximaPagina();
});

voltar.forEach((botao) => {
	botao.addEventListener('click', () => {
		window.history.back();
	});
});

numeroPronto.addEventListener('click', () => {
	switch (passo) {
		case 2:
			try {
				let expressao = campoCalculadora.value.trim();
				panhadores[numPanhador].preço =
					expressao === '' ? 0 : math.evaluate(expressao);
			} catch (erro) {
				alert('Expressão matemática inválida! Corrija os valores.');
				return;
			}
			mudarPreco.style.display = 'flex';
			campoCalculadora.value = '';
			break;
		case 3:
			try {
				let expressao = campoCalculadora.value.trim();
				panhadores[numPanhador].latoes =
					expressao === '' ? 0 : math.evaluate(expressao);
			} catch (erro) {
				alert('Expressão matemática inválida! Corrija os valores.');
				return;
			}
			campoCalculadora.value = '';
			break;
		case 4:
			try {
				let expressao = campoCalculadora.value.trim();
				panhadores[numPanhador].litros =
					expressao === '' ? 0 : math.evaluate(expressao);
				precoDefinido = true;
			} catch (erro) {
				alert('Expressão matemática inválida! Corrija os valores.');
				return;
			}
			campoCalculadora.value = '';
			calcularResultados();
			break;
	}
	proximaPagina();
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
	campoNome.value = '';
	numPanhador++;
	passo = 1;
	nomes.style.display = 'flex';
	resultados.style.display = 'none';
	tabela.replaceChildren();
	window.history.pushState({ passo: passo }, '', '#' + 'nomes');
});

zerar.addEventListener('click', () => {
	numPanhador = 0;
	panhadores = [];
	tabela.replaceChildren();
	passo = 1;
	nomes.style.display = 'flex';
	resultados.style.display = 'none';
	window.history.pushState({ passo: passo }, '', '#' + 'nomes');
});

function proximaPagina() {
	switch (passo) {
		case 0:
			nomes.style.display = 'flex';
			calculadora.style.display = 'none';
			passo = 1;
			break;
		case 1:
			if (precoDefinido && numPanhador > 0) {
				passo = 2;
				panhadores[numPanhador].preço =
					panhadores[numPanhador - 1].preço;
				proximaPagina();
			} else {
				campoCalculadora.placeholder = 'Preço por Latão R$/Latão';
				etapa.innerText = 'Preço por Latão';
				nomes.style.display = 'none';
				calculadora.style.display = 'flex';
				passo = 2;
				window.history.pushState({ passo: passo }, '', '#' + 'preco');
			}
			break;
		case 2:
			campoCalculadora.placeholder = 'Latões';
			etapa.innerText = 'Latões';
			nomes.style.display = 'none';
			calculadora.style.display = 'flex';
			passo = 3;
			window.history.pushState({ passo: passo }, '', '#' + 'latoes');
			break;
		case 3:
			confirmar.style.display = 'none';
			calculadora.style.display = 'flex';
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
		panhadores[i].total =
			(panhadores[i].latoes + panhadores[i].litros / 60) *
			panhadores[i].preço;
		if (isNaN(panhadores[i].total)) {
			panhadores[i].total = 0;
		}
	}
}

function mostrarResultados() {
	tabela.replaceChildren();
	for (let i = 0; i < panhadores.length; i++) {
		let linha = document.createElement('tr');
		let nome = document.createElement('td');
		nome.innerText = panhadores[i].nome;
		linha.appendChild(nome);
		let total = document.createElement('td');
		total.innerText = panhadores[i].total.toFixed(2);
		let quantidadeCafe = document.createElement('td');
		quantidadeCafe.innerText = `${panhadores[i].latoes} latões e ${panhadores[i].litros} litros`;
		quantidadeCafe.classList.add('quantidadeCafe');
		linha.appendChild(total);
		linha.appendChild(quantidadeCafe);
		tabela.appendChild(linha);
	}
	let linhaSoma = document.createElement('tr');
	let soma1 = document.createElement('td');
	let soma2 = document.createElement('td');
	let soma3 = document.createElement('td');
	soma1.innerText = 'Total';
	let soma = 0;
	let somaLatoes = 0;
	let somaLitros = 0;
	for (let i = 0; i < panhadores.length; i++) {
		soma += panhadores[i].total;
		somaLatoes += panhadores[i].latoes;
		somaLitros += panhadores[i].litros;
	}
	let quociente = Math.floor(somaLitros / 60);
	let resto = somaLitros % 60;
	somaLatoes += quociente;
	somaLitros = Math.floor(resto);
	soma2.innerText = soma.toFixed(2);
	soma3.innerText = `${somaLatoes} latões e ${somaLitros} litros`;
	soma3.classList.add('quantidadeCafe');
	tabela.appendChild(linhaSoma);
	linhaSoma.appendChild(soma1);
	linhaSoma.appendChild(soma2);
	linhaSoma.appendChild(soma3);
}

async function compartilharPdf(chamador) {
	tabelaToda.classList.remove('escondido');
	const { jsPDF } = window.jspdf;
	const doc = new jsPDF();
	doc.autoTable({ html: '#tabelaToda' });

	// Verifica se está rodando dentro do aplicativo Android (Capacitor)
	const isApp = window.Capacitor && window.Capacitor.isNativePlatform();

	if (isApp) {
		// --- LÓGICA NATIVA DO APLICATIVO ANDROID ---
		try {
			const Filesystem = window.Capacitor.Plugins.Filesystem;
			const Share = window.Capacitor.Plugins.Share;

			// O Capacitor não entende "Blob", então transformamos o PDF em Base64
			const base64Data = doc.output('datauristring').split(',')[1];

			if (chamador === 'compartilhar') {
				// Salva temporariamente no CACHE para poder enviar pelo WhatsApp
				const resultado = await Filesystem.writeFile({
					path: 'relatorio_pagamento.pdf',
					data: base64Data,
					directory: 'CACHE', // Usando string literal pois Directory enum pode não estar disponível globalmente
				});

				// Abre a tela de compartilhamento nativa do Android
				await Share.share({
					title: 'Relatório de Pagamento',
					text: 'Segue em anexo a tabela do café.',
					files: [resultado.uri], // Share plugin usa 'files' para URIs no Android
				});
			} else {
				// Botão "Baixar": Tenta salvar direto na pasta DOCUMENTOS
				try {
					await Filesystem.writeFile({
						path: 'Pagamento_Cafe_' + Date.now() + '.pdf',
						data: base64Data,
						directory: 'DOCUMENTS',
					});
					alert(
						'PDF salvo com sucesso na pasta "Documentos" do seu celular!',
					);
				} catch (erroDireto) {
					console.warn('Falha na escrita direta em DOCUMENTS (comum no Android 11+). Usando Share como fallback.');

					// Fallback: Salva no CACHE e abre menu de compartilhar para o usuário escolher "Salvar no dispositivo"
					const resultado = await Filesystem.writeFile({
						path: 'relatorio_pagamento.pdf',
						data: base64Data,
						directory: 'CACHE',
					});

					await Share.share({
						title: 'Salvar Relatório',
						text: 'Seu celular bloqueou a gravação direta. Escolha "Salvar no dispositivo" ou "Salvar em arquivos" para baixar.',
						files: [resultado.uri],
					});
				}
			}
		} catch (erro) {
			console.error('Erro no Capacitor:', erro);
			alert('Erro ao processar o arquivo no app: ' + erro.message);
		}
	} else {
		// --- LÓGICA ORIGINAL DO NAVEGADOR / GITHUB PAGES ---
		const pdfBlob = doc.output('blob');
		const arquivo = new File([pdfBlob], 'relatorio.pdf', {
			type: 'application/pdf',
		});

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
			} catch (erro) {
				console.log('O usuário cancelou o compartilhamento.', erro);
			}
		} else {
			doc.save('relatorio.pdf');
		}
	}
	tabelaToda.classList.add('escondido');
}

window.addEventListener('popstate', (event) => {
	if (event.state && event.state.passo) {
		exibirPagina(event.state.passo);
		passo = event.state.passo;
	} else {
		exibirPagina(1);
		passo = 1;
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
			campoCalculadora.placeholder = 'Preço por Latão R$/Latão';
			etapa.innerText = 'Preço por Latão';
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
	if (panhadores.length > 0) {
		return 'Você tem alterações não salvas. Deseja mesmo sair?';
	}
};
