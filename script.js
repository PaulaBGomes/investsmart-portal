// Variáveis globais
let cotacoes = [];
let perguntasQuiz = [];
let respostasUsuario = {};

// ========== NAVEGAÇÃO ==========
function showSection(sectionId) {
    // Esconder todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar seção escolhida
    document.getElementById(sectionId).classList.add('active');

    // Inicializar conteúdo específico
    if (sectionId === 'quotes') {
        iniciarCotacoes();
    } else if (sectionId === 'quiz') {
        iniciarQuiz();
    }
}

// Menu mobile
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('show');
}

// ========== CALCULADORA ==========
function calcular() {
    // Pegar valores dos inputs
    const valorInicial = parseFloat(document.getElementById('valorInicial').value) || 0;
    const aporteMenual = parseFloat(document.getElementById('aporteMenual').value) || 0;
    const taxaAnual = parseFloat(document.getElementById('taxaAnual').value) || 0;
    const tempo = parseInt(document.getElementById('tempo').value) || 0;

    // Validar dados
    if (tempo <= 0) {
        alert('Por favor, preencha valores válidos!');
        return;
    }

    // Calcular investimento
    const taxaMensal = taxaAnual / 100 / 12;
    const meses = tempo * 12;
    let valorFinal = valorInicial;

    // Loop para calcular juros compostos
    for (let i = 0; i < meses; i++) {
        valorFinal = valorFinal * (1 + taxaMensal);
        valorFinal += aporteMenual;
    }

    const totalInvestido = valorInicial + (aporteMenual * meses);
    const rendimento = valorFinal - totalInvestido;

    // Mostrar resultado
    mostrarResultado(totalInvestido, valorFinal, rendimento, tempo);
}

function mostrarResultado(investido, final, rendimento, anos) {
    document.getElementById('resultado').innerHTML = `
        <div class="result">
            <h3>💰 Resultado da Simulação</h3>
            <p><strong>Valor Investido:</strong> R$ ${investido.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
            <p><strong>Valor Final:</strong> R$ ${final.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
            <p><strong>Rendimento:</strong> R$ ${rendimento.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
            <p><strong>Período:</strong> ${anos} anos</p>
        </div>
    `;
}

// ========== COTAÇÕES ==========
function iniciarCotacoes() {
    cotacoes = [
        { nome: 'IBOVESPA', preco: 118500, variacao: 2.5 },
        { nome: 'PETR4', preco: 32.45, variacao: -1.2 },
        { nome: 'VALE3', preco: 68.90, variacao: 3.8 },
        { nome: 'ITUB4', preco: 25.67, variacao: 1.5 },
        { nome: 'BBDC4', preco: 18.34, variacao: -0.8 },
        { nome: 'MGLU3', preco: 12.45, variacao: 4.2 },
        { nome: 'USD/BRL', preco: 5.23, variacao: 0.3 },
        { nome: 'SELIC', preco: 11.75, variacao: 0.0 }
    ];

    mostrarCotacoes();
}

function mostrarCotacoes() {
    const container = document.getElementById('cotacoes');
    container.innerHTML = '';

    cotacoes.forEach(cotacao => {
        const classe = cotacao.variacao >= 0 ? 'positive' : 'negative';
        const sinal = cotacao.variacao >= 0 ? '+' : '';
        
        container.innerHTML += `
            <div class="quote-card">
                <div class="quote-name">${cotacao.nome}</div>
                <div class="quote-price">R$ ${cotacao.preco.toFixed(2)}</div>
                <div class="quote-change ${classe}">
                    ${sinal}${cotacao.variacao.toFixed(2)}%
                </div>
            </div>
        `;
    });
}

function atualizarCotacoes() {
    // Simular mudanças nas cotações
    cotacoes.forEach(cotacao => {
        const mudanca = (Math.random() - 0.5) * 10; // -5% a +5%
        cotacao.variacao = mudanca;
        cotacao.preco = cotacao.preco * (1 + mudanca / 100);
        
        // Garantir valores positivos
        if (cotacao.preco < 0.01) {
            cotacao.preco = 0.01;
        }
    });

    mostrarCotacoes();
    
    // Feedback visual
    const btn = event.target;
    const textoOriginal = btn.textContent;
    btn.textContent = '✅ Atualizado!';
    setTimeout(() => {
        btn.textContent = textoOriginal;
    }, 1000);
}

// ========== QUIZ ==========
function iniciarQuiz() {
    perguntasQuiz = [
        {
            id: 1,
            pergunta: "O que são juros compostos?",
            opcoes: [
                "Juros calculados apenas sobre o valor inicial",
                "Juros calculados sobre o valor inicial + juros anteriores",
                "Taxa fixa cobrada mensalmente"
            ],
            correta: 1
        },
        {
            id: 2,
            pergunta: "Qual é a característica da Renda Fixa?",
            opcoes: [
                "Rentabilidade imprevisível",
                "Alto risco de perda",
                "Rentabilidade conhecida no momento da aplicação"
            ],
            correta: 2
        },
        {
            id: 3,
            pergunta: "O que é diversificação?",
            opcoes: [
                "Investir tudo em um único ativo",
                "Distribuir investimentos em diferentes ativos",
                "Investir apenas em ações"
            ],
            correta: 1
        },
        {
            id: 4,
            pergunta: "Qual o objetivo da reserva de emergência?",
            opcoes: [
                "Investir em ações de alto risco",
                "Cobrir gastos inesperados",
                "Comprar bens de luxo"
            ],
            correta: 1
        },
        {
            id: 5,
            pergunta: "O que é o Tesouro Direto?",
            opcoes: [
                "Investimento em ações do governo",
                "Conta corrente especial",
                "Programa de venda de títulos públicos"
            ],
            correta: 2
        }
    ];

    respostasUsuario = {};
    mostrarQuiz();
}

function mostrarQuiz() {
    const container = document.getElementById('perguntas');
    container.innerHTML = '';

    // Mostrar todas as perguntas
    perguntasQuiz.forEach((pergunta, index) => {
        let opcoesHtml = '';
        pergunta.opcoes.forEach((opcao, i) => {
            opcoesHtml += `
                <div class="option" onclick="selecionarResposta(${pergunta.id}, ${i})">
                    ${opcao}
                </div>
            `;
        });

        container.innerHTML += `
            <div class="question">
                <h3>Pergunta ${index + 1}: ${pergunta.pergunta}</h3>
                <div id="opcoes-${pergunta.id}">
                    ${opcoesHtml}
                </div>
            </div>
        `;
    });

    document.getElementById('btnQuiz').style.display = 'block';
    document.getElementById('resultadoQuiz').innerHTML = '';
}

function selecionarResposta(perguntaId, opcaoIndex) {
    // Salvar resposta do usuário
    respostasUsuario[perguntaId] = opcaoIndex;

    // Atualizar visual das opções
    const opcoes = document.querySelectorAll(`#opcoes-${perguntaId} .option`);
    opcoes.forEach((opcao, index) => {
        opcao.classList.remove('selected');
        if (index === opcaoIndex) {
            opcao.classList.add('selected');
        }
    });
}

function verificarRespostas() {
    let acertos = 0;
    const total = perguntasQuiz.length;

    // Contar acertos
    perguntasQuiz.forEach(pergunta => {
        if (respostasUsuario[pergunta.id] === pergunta.correta) {
            acertos++;
        }
    });

    const porcentagem = (acertos / total) * 100;
    let mensagem = '';
    let emoji = '';

    // Determinar mensagem baseada na pontuação
    if (porcentagem >= 80) {
        mensagem = 'Excelente! Você tem ótimo conhecimento!';
        emoji = '🏆';
    } else if (porcentagem >= 60) {
        mensagem = 'Muito bom! Continue estudando!';
        emoji = '👍';
    } else if (porcentagem >= 40) {
        mensagem = 'Bom começo! Estude mais sobre investimentos.';
        emoji = '📚';
    } else {
        mensagem = 'Continue estudando! Conhecimento é fundamental.';
        emoji = '💪';
    }

    // Mostrar resultado
    document.getElementById('resultadoQuiz').innerHTML = `
        <div class="result">
            <h3>${emoji} Resultado do Quiz</h3>
            <p><strong>Acertos:</strong> ${acertos} de ${total}</p>
            <p><strong>Pontuação:</strong> ${porcentagem.toFixed(0)}%</p>
            <p>${mensagem}</p>
            <button class="btn" onclick="iniciarQuiz()">🔄 Refazer Quiz</button>
        </div>
    `;
}

// ========== INICIALIZAÇÃO ==========
window.addEventListener('load', function() {
    showSection('home');
    iniciarCotacoes();
    
    // Adicionar evento Enter na calculadora
    const inputs = ['valorInicial', 'aporteMenual', 'taxaAnual', 'tempo'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    calcular();
                }
            });
        }
    });
});

// ========== FUNÇÕES AUXILIARES ==========
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });
}

function gerarNumeroAleatorio(min, max) {
    return Math.random() * (max - min) + min;
}

function validarInput(valor, tipo) {
    switch(tipo) {
        case 'numero':
            return !isNaN(valor) && valor > 0;
        case 'tempo':
            return !isNaN(valor) && valor > 0 && valor <= 50;
        case 'taxa':
            return !isNaN(valor) && valor >= 0 && valor <= 100;
        default:
            return true;
    }
}