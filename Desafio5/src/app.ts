import { configuracao } from "./config/configuracao.js";

import { Estudante } from "./models/Estudante.js";
import { Turma } from "./models/Turma.js";
import { Chamado } from "./models/Chamado.js";
import { FilaAtendimento } from "./models/FilaAtendimento.js";

import { EstudanteService } from "./servicos/estudanteService.js";
import { ChamadoService } from "./servicos/chamadoService.js";
import { TurmaService } from "./servicos/turmaService.js";

import { validarEstudante } from "./validacao/validarEstudante.js";

import type { StatusChamado } from "./tipos/chamado.js";

console.log("=== CADASTRO ACADÊMICO ===\n");

// Serviços
const estudanteService = new EstudanteService();
const chamadoService = new ChamadoService();
const turmaService = new TurmaService();

// Estudantes
console.log("=== ESTUDANTES ===\n");

const estudante1 = estudanteService.cadastrar(
    "20261014040003",
    "Artur Lima",
    "Análise e Desenvolvimento de Sistemas"
);

const estudante2 = estudanteService.cadastrar(
    "20261014040030",
    "Yasmim Fernandes",
    "Ciência da Computação"
);

estudante1.adicionarNota(8);
estudante1.adicionarNota(9);
estudante1.adicionarNota(7);

estudante2.adicionarNota(10);
estudante2.adicionarNota(9);
estudante2.adicionarNota(9);

console.log("Estudantes cadastrados:");
console.log(
    JSON.stringify(estudanteService.listar(), null, 2)
);

console.log(
    "Quantidade de estudantes:",
    estudanteService.listar().length
);

console.log(
    `\nMédia de ${estudante1.nome}: ${
        estudante1.calcularMedia()?.toFixed(2) ?? "Sem notas"
    }`
);

console.log(
    `Média de ${estudante2.nome}: ${
        estudante2.calcularMedia()?.toFixed(2) ?? "Sem notas"
    }`
);

console.log(
    "Média mínima para aprovação:",
    configuracao.mediaMinima
);

// Consulta
const encontrado = estudanteService.buscarPorMatricula(
    "20261014040003"
);

if (encontrado !== null) {
    console.log("\nEstudante encontrado:", encontrado.nome);
}

const inexistente = estudanteService.buscarPorMatricula(
    "9999999"
);

console.log("Estudante inexistente:", inexistente);

// Proteção das notas
const notasExternas = estudante1.listarNotas();

notasExternas.push(0);

console.log("\nNotas retornadas:", notasExternas);
console.log(
    "Notas armazenadas:",
    estudante1.listarNotas()
);

// Turmas
console.log("\n=== TURMAS ===\n");

const turma = turmaService.cadastrar(
    "SI2024-1",
    "Programação Orientada a Objetos"
);

turmaService.matricular(
    turma.codigo,
    estudante1,
    new Date("2026-02-10T12:00:00.000Z")
);

turmaService.matricular(
    turma.codigo,
    estudante2,
    new Date("2026-02-11T12:00:00.000Z")
);

turma.registrarFrequencia("20261014040003", 95);
turma.registrarFrequencia("20261014040030", 80);

console.log(
    JSON.stringify(turma.gerarResumo(), null, 2)
);

// Chamados
console.log("\n=== CHAMADOS ===\n");

const chamado1 = chamadoService.cadastrar(
    101,
    "Problema de acesso ao Moodle",
    estudante1
);

const chamado2 = chamadoService.cadastrar(
    102,
    "Dúvida sobre atividade acadêmica",
    estudante2
);

console.log(chamado1.gerarResumo());
console.log(chamado2.gerarResumo());

// Fila FIFO
console.log("\n=== FILA DE ATENDIMENTO ===\n");

const fila = new FilaAtendimento();

fila.adicionar(chamado1);
fila.adicionar(chamado2);

console.log(
    JSON.stringify(fila.gerarResumo(), null, 2)
);

console.log("Tamanho da fila:", fila.consultarTamanho());

const proximo = fila.retirarProximo();

if (proximo !== null) {
    console.log("\nPróximo chamado:", proximo.id);

    proximo.iniciarAtendimento("Técnico João");

    console.log("Status após iniciar:", proximo.status);

    proximo.finalizar();

    console.log("Status após finalizar:", proximo.status);
}

const segundo = fila.retirarProximo();

console.log(
    "Segundo chamado retirado:",
    segundo?.id ?? null
);

console.log(
    "Retirada de fila vazia:",
    fila.retirarProximo()
);

// Consulta de status
const status: StatusChamado | null =
    chamadoService.consultarStatus("101");

console.log("\nStatus consultado:", status);

// Validação de entrada externa
console.log("\n=== VALIDAÇÃO DE ENTRADA ===\n");

const entradaExterna: unknown = {
    matricula: 2024003,
    nome: "Maria Oliveira",
    curso: "Sistemas de Informação"
};

if (
    typeof entradaExterna === "object" &&
    entradaExterna !== null &&
    !Array.isArray(entradaExterna)
) {
    const dados = entradaExterna as {
        matricula?: unknown;
        nome?: unknown;
        curso?: unknown;
    };

    const resultado = validarEstudante(dados);

    console.log("Resultado da validação:", resultado);
}

// Demonstração de erro esperado
console.log("\n=== TRATAMENTO DE ERROS ===\n");

try {
    turma.matricular(estudante1);
} catch (erro: unknown) {
    if (erro instanceof Error) {
        console.log("Erro esperado:", erro.message);
    } else {
        console.log("Ocorreu um erro desconhecido.");
    }
}

try {
    chamado1.finalizar();
} catch (erro: unknown) {
    if (erro instanceof Error) {
        console.log("Erro esperado:", erro.message);
    }
}

console.log("\n=== FIM DA DEMONSTRAÇÃO ===");