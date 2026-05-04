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

let numPanhador = 0;
let passo = 1;
let panhadores = [];

// Configuração de Plugins do Capacitor
const isCapacitor = window.Capacitor !== undefined;
const Share = isCapacitor ? Capacitor.Plugins.Share : null;
const Filesystem = isCapacitor ? Capacitor.Plugins.Filesystem : null;

function novoPanhador() {
	let nome = campoNome.value;
	if (nome == null || nome == undefined || nome.trim() == '') {
		nome = 'Nome não definido';
	} else campoNome.value = '';
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
	panhadores[numPanhador] = novoPanhador();
	proximaPagina();
});

pular.addEventListener('click', () => {
	panhadores[numPanhador] = novoPanhador();
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
});

adicionar.addEventListener('click', () => {
	numPanhador++;
	passo = 1;
	nomes.style.display = 'flex';
	confirmar.style.display = 'none';
	window.history.pushState({ passo: passo }, '', '#' + 'nomes');
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
		case 1:
			campoCalculadora.placeholder = 'Preço por Latão R$/Latão';
			etapa.innerText = 'Preço por Latão';
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

	let somaTotal = 0;
	let somaLatoes = 0;
	let somaLitros = 0;

	for (let i = 0; i < panhadores.length; i++) {
		let p = panhadores[i];
		let linha = document.createElement('tr');

		// Converte litros em latões para a exibição individual também
		let latoesIndividuais = p.latoes + Math.floor(p.litros / 60);
		let litrosRestantes = Math.floor(p.litros % 60);

		let nome = document.createElement('td');
		nome.innerText = p.nome;

		let total = document.createElement('td');
		total.innerText = p.total.toFixed(2);

		let quantidadeCafe = document.createElement('td');
		quantidadeCafe.innerText = `${latoesIndividuais} latões e ${litrosRestantes} litros`;
		quantidadeCafe.classList.add('quantidadeCafe');

		linha.appendChild(nome);
		linha.appendChild(total);
		linha.appendChild(quantidadeCafe);
		tabela.appendChild(linha);

		somaTotal += p.total;
		somaLatoes += p.latoes;
		somaLitros += p.litros;
	}

	let quociente = Math.floor(somaLitros / 60);
	let resto = somaLitros % 60;
	let totalLatoesGeral = somaLatoes + quociente;
	let totalLitrosGeral = Math.floor(resto);

	let linhaSoma = document.createElement('tr');
	let soma1 = document.createElement('td');
	let soma2 = document.createElement('td');
	let soma3 = document.createElement('td');

	soma1.innerHTML = "<strong>Total</strong>";
	soma2.innerHTML = `<strong>${somaTotal.toFixed(2)}</strong>`;
	soma3.innerHTML = `<strong>${totalLatoesGeral} latões e ${totalLitrosGeral} litros</strong>`;
	soma3.classList.add('quantidadeCafe');

	linhaSoma.appendChild(soma1);
	linhaSoma.appendChild(soma2);
	linhaSoma.appendChild(soma3);
	tabela.appendChild(linhaSoma);
}

async function compartilharPdf(chamador) {
	const { jsPDF } = window.jspdf;
	const doc = new jsPDF();

	doc.autoTable({
		html: '#tabelaToda',
		includeHiddenHtml: true,
		// Ajuste para garantir que o negrito do HTML apareça no PDF
		didParseCell: function (data) {
			if (data.section === 'body' && data.row.index === panhadores.length) {
				data.cell.styles.fontStyle = 'bold';
			}
		}
	});

	if (isCapacitor) {
		try {
			const pdfBase64Completo = doc.output('datauristring');
			const apenasBase64 = pdfBase64Completo.split(',')[1];

			const agora = new Date();
			const timestamp = `${agora.getDate()}-${agora.getMonth() + 1}_${agora.getHours()}-${agora.getMinutes()}`;
			const nomeArquivo = `relatorio_cafe_${timestamp}.pdf`;

			if (chamador === 'compartilhar') {
				const caminhoSalvo = await Filesystem.writeFile({
					path: nomeArquivo,
					data: apenasBase64,
					directory: 'CACHE',
				});

				await Share.share({
					title: 'Relatório de Colheita',
					text: 'Segue o relatório da colheita de café.',
					url: caminhoSalvo.uri,
					dialogTitle: 'Compartilhar Relatório'
				});
			} else {
				await Filesystem.writeFile({
					path: nomeArquivo,
					data: apenasBase64,
					directory: 'DOCUMENTS',
				});
				alert(`Sucesso! PDF salvo na pasta Documentos: ${nomeArquivo}`);
			}
		} catch (erro) {
			if (chamador === 'baixar') {
				alert("Erro ao salvar o PDF.");
			}
		}
		return;
	}

	// Lógica Web normal
	if (chamador === 'baixar') {
		doc.save('relatorio_colheita.pdf');
	} else {
		const pdfBlob = doc.output('blob');
		const arquivo = new File([pdfBlob], 'relatorio.pdf', { type: 'application/pdf' });
		if (navigator.canShare && navigator.canShare({ files: [arquivo] })) {
			await navigator.share({ files: [arquivo], title: 'Relatório' });
		} else {
			doc.save('relatorio.pdf');
		}
	}
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
	return 'Você tem alterações não salvas. Deseja realmente sair?';
};
