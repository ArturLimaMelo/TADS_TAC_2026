import { criarCadastro } from "./cadastro.js";

import {
    obterAlunoComResultado
} from "./aluno.js";

import {
    gerarRelatorio,
    criarFiltro,
    relatorioAprovados,
    relatorioReprovados,
    relatorioCursoCSV,
    resumoPorCurso
} from "./relatorios.js";


const cadastro = criarCadastro();

const dadosAlunos = [
    {
        id: 1,
        matricula: "20261014040003",
        nome: "Artur Lima",
        email: "melo.artur@escolar.ifrn.edu.br",
        curso: "Análise e Desenvolvimento de Sistemas",
        notas: [8, 8, 9]
    },

    {
        id: 2,
        matricula: "20261014040012",
        nome: "Fulano de Tal",
        email: "fulano@email.com",
        curso: "Análise e Desenvolvimento de Sistemas",
        notas: [4, 5, 6]
    },

    {
        id: 3,
        matricula: "20251014040032",
        nome: "Doidinho",
        email: "doidinho@email.com",
        curso: "Administração",
        notas: [9, 8, 10]
    },

    {
        id: 4,
        matricula: "20231014040053",
        nome: "Bixinho",
        email: "bixinho@email.com",
        curso: "Administração",
        notas: [5, 4, 5]
    },

    {
        id: 5,
        matricula: "20241035040098",
        nome: "Leandro",
        email: "Leandro@email.com",
        curso: "Ciência da Computação",
        notas: [10, 9, 9]
    },

    {
        id: 6,
        matricula: "20241035040043",
        nome: "Miguel Judson",
        email: "miguel_judson@email.com",
        curso: "Ciência da Computação",
        notas: [7, 8, 6]
    },
    {
        id: 7,
        matricula: "20221074010012",
        nome: "Samuel",
        email: "samuel@email.com",
        curso: "Administração",
        notas: []
    }
];


for (const dados of dadosAlunos) {
    try {
        cadastro.cadastrar(dados);
    } catch (erro) {
        console.error(
            `Erro ao cadastrar ${dados.nome}: ${erro.message}`
        );
    }
}


const alunos = cadastro.listar();


console.log("\n\nALUNOS COM RESULTADO\n");

for (const aluno of alunos) {
    const resultado = obterAlunoComResultado(aluno);

    console.log(resultado);
}

console.log("\n\n1. APROVADOS POR NOME\n");

console.log(
    relatorioAprovados(alunos)
);

console.log("\n\n2. REPROVADOS\n");

console.log(
    relatorioReprovados(alunos)
);

console.log("\n\n3. CURSO EM CSV\n");

const csv = relatorioCursoCSV(
    alunos,
    "Sistemas de Informação"
);

console.log("\n\n4. RESUMO POR CURSO\n");

console.log(
    resumoPorCurso(alunos)
);

console.log("\n\nFILTRO POR MÉDIA\n");

const filtroMedia = criarFiltro({
    minMedia: 7
});

const alunosMediaMinima = gerarRelatorio(
    alunos,
    filtroMedia,
    aluno => ({
        nome: aluno.nome,
        media: aluno.notas.length ? Number((aluno.notas.reduce((soma, nota) => soma + nota, 0) / aluno.notas.length).toFixed(2)) : null
    })
);

console.log(alunosMediaMinima);

console.log("\n\nFILTRO POR CURSO\n");

const filtroCurso = criarFiltro({
    curso: "Ciência da Computação"
});

const alunosCTI = gerarRelatorio(
    alunos,
    filtroCurso,
    aluno => ({
        matricula: aluno.matricula,
        nome: aluno.nome,
        curso: aluno.curso
    })
);

console.log(alunosCTI);


console.log("\n\nBUSCA\n");

const encontrado = cadastro.buscarPorMatricula("20241035040043");

if (encontrado) {
    console.log("Aluno encontrado:", encontrado);
} else {
    console.log("Aluno não encontrado.");
}

console.log("\n\nREMOÇÃO\n");

const removido = cadastro.removerPorMatricula("20251014040032");

if (removido) {
    console.log("Aluno removido:", removido.nome);
} else {
    console.log("Aluno não encontrado.");
}

console.log("\n\nTESTE DE DUPLICIDADE\n");

try {
    cadastro.cadastrar({
        id: 10,
        matricula: "20231014040053",
        nome: "Outro Aluno",
        email: "outro@email.com",
        curso: "Engenharia",
        notas: [8, 8, 8]
    });
} catch (erro) {
    console.log("Erro:", erro.message);
}

console.log("\n\nTESTE DE NOTA INVÁLIDA\n");

try {
    cadastro.cadastrar({
        id: 11,
        matricula: "20271014040003",
        nome: "Aluno Teste",
        email: "teste@email.com",
        curso: "Engenharia",
        notas: [8, 11, 7]
    });
} catch (erro) {
    console.log("Erro:", erro.message);
}

console.log("\n\nTESTE DE ALUNO SEM NOTAS\n");

const alunoSemNotas = cadastro.buscarPorMatricula("20221074010012");

if (alunoSemNotas) {
    console.log(
        obterAlunoComResultado(alunoSemNotas)
    );
}

console.log("\n=== CURSO INEXISTENTE ===");

const cursoInexistente = relatorioCursoCSV(
    cadastro.listar(),
    "Medicina"
);

if (cursoInexistente === "") {
    console.log(
        "Nenhum aluno encontrado para o curso informado."
    );
}