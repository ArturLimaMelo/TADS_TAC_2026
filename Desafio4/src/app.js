import { configuracao } from "./config/configuracao.js";

import { Estudante } from "./models/Estudante.js";
import { Turma } from "./models/Turma.js";
import { Chamado } from "./models/Chamado.js";
import { FilaAtendimento } from "./models/FilaAtendimento.js";

console.log("ESTUDANTES\n");

const estudante1 = new Estudante(
    "2024001",
    "Ana Silva",
    "Sistemas de Informação"
);

const estudante2 = new Estudante(
    "2024002",
    "Pedro Souza",
    "Sistemas de Informação"
);

estudante1.adicionarNota(8);
estudante1.adicionarNota(9);
estudante1.adicionarNota(7);

estudante2.adicionarNota(5);
estudante2.adicionarNota(6);
estudante2.adicionarNota(8);

console.log(estudante1.gerarResumo());
console.log(estudante2.gerarResumo());

console.log(
    `Média de ${estudante1.nome}: ${estudante1.calcularMedia().toFixed(2)}`
);

console.log(
    `Média de ${estudante2.nome}: ${estudante2.calcularMedia().toFixed(2)}`
);

console.log(
    `Média mínima para aprovação: ${configuracao.mediaMinima}`
);

const notasExternas = estudante1.listarNotas();

notasExternas.push(0);

console.log("\nNotas retornadas após alteração externa:", notasExternas);
console.log("Notas armazenadas no estudante:", estudante1.listarNotas());

console.log("\n\nTURMA\n");

const turma = new Turma(
    "SI2024-1",
    "Programação Orientada a Objetos"
);

turma.matricular(
    estudante1,
    new Date("2026-02-10T12:00:00.000Z")
);

turma.matricular(
    estudante2,
    new Date("2026-02-11T12:00:00.000Z")
);

turma.registrarFrequencia("2024001", 95);
turma.registrarFrequencia("2024002", 80);

console.log(JSON.stringify(turma.gerarResumo(), null, 2));

try {
    turma.matricular(estudante1);
} catch (erro) {
    console.log("\nErro esperado:", erro.message);
}

console.log("\n=== CHAMADOS ===");

const chamado1 = new Chamado(
    101,
    "Problema de acesso ao Moodle",
    estudante1
);

const chamado2 = new Chamado(
    102,
    "Dúvida sobre atividade acadêmica",
    estudante2
);

console.log("Chamado 1:", chamado1.gerarResumo());
console.log("Chamado 2:", chamado2.gerarResumo());


console.log("\n=== FILA DE ATENDIMENTO ===");

const fila = new FilaAtendimento();

fila.adicionar(chamado1);
fila.adicionar(chamado2);

console.log("Fila inicial:");
console.log(JSON.stringify(fila.gerarResumo(), null, 2));

console.log("\nQuantidade na fila:", fila.consultarTamanho());


console.log("\n\nATENDIMENTO\n");

const proximo = fila.retirarProximo();

if (proximo !== null) {
    console.log("Chamado retirado da fila:", proximo.id);

    proximo.iniciarAtendimento("Técnico João");

    console.log(
        "Após iniciar atendimento:",
        JSON.stringify(proximo.gerarResumo(), null, 2)
    );

    proximo.finalizar();

    console.log(
        "Após finalizar:",
        JSON.stringify(proximo.gerarResumo(), null, 2)
    );
}

console.log("\n\nVERIFICAÇÃO FIFO\n");

console.log("Chamados restantes na fila:");

console.log(JSON.stringify(fila.gerarResumo(), null, 2));

const segundo = fila.retirarProximo();

console.log("\nPróximo chamado retirado:", segundo?.id ?? null);

console.log("Tamanho atual da fila:", fila.consultarTamanho());

const inexistente = fila.retirarProximo();

console.log("Retirada de fila vazia:", inexistente);


console.log("\n\nPROTEÇÃO DO ESTADO\n");

console.log("Status do chamado 1:", chamado1.status);

try {
    chamado1.finalizar();
} catch (erro) {
    console.log("Erro esperado:", erro.message);
}

console.log(
    "Campo interno de notas acessível:",
    Object.hasOwn(estudante1, "#notas")
);

console.log(
    "Campo interno de vínculos acessível:",
    Object.hasOwn(turma, "#vinculos")
);

console.log(
    "Campo interno de chamados acessível:",
    Object.hasOwn(fila, "#chamados")
);

console.log("\n\nFIM DA DEMONSTRAÇÃO\n");