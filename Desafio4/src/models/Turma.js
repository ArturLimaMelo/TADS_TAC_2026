import { VinculoNaTurma } from "./VinculoNaTurma.js";

export class Turma {
    #codigo;
    #componenteCurricular;
    #vinculos = new Map();

    constructor(codigo, componenteCurricular) {
        if (!String(codigo).trim()) {
            throw new Error("O código da turma é obrigatório.");
        }

        if (!String(componenteCurricular).trim()) {
            throw new Error(
                "O componente curricular é obrigatório."
            );
        }

        this.#codigo = String(codigo).trim();
        this.#componenteCurricular =
            String(componenteCurricular).trim();
    }

    get codigo() {
        return this.#codigo;
    }

    get componenteCurricular() {
        return this.#componenteCurricular;
    }

    matricular(estudante, dataEntrada = new Date()) {
        if (
            !estudante ||
            typeof estudante.matricula !== "string"
        ) {
            throw new Error("Estudante inválido.");
        }

        const matricula = estudante.matricula;

        if (this.#vinculos.has(matricula)) {
            throw new Error(
                `O estudante ${matricula} já está matriculado nesta turma.`
            );
        }

        const vinculo = new VinculoNaTurma(
            estudante,
            dataEntrada
        );

        this.#vinculos.set(matricula, vinculo);

        return vinculo.gerarResumo();
    }

    registrarFrequencia(matricula, percentual) {
        const vinculo = this.#vinculos.get(String(matricula));

        if (!vinculo) {
            throw new Error(
                "Não existe matrícula correspondente nesta turma."
            );
        }

        vinculo.registrarFrequencia(percentual);
    }

    listarMatriculados() {
        return Array.from(
            this.#vinculos.values(),
            vinculo => vinculo.gerarResumo()
        );
    }

    gerarResumo() {
        return {
            codigo: this.#codigo,
            componenteCurricular: this.#componenteCurricular,
            quantidadeMatriculados: this.#vinculos.size,
            matriculados: this.listarMatriculados()
        };
    }
}