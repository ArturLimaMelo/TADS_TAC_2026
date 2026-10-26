import type { ResumoVinculo } from "../tipos/turma.js";
import type { Estudante } from "./Estudante.js";

export class VinculoNaTurma {
    readonly #estudante: Estudante;
    readonly #dataEntrada: Date;

    #frequencia = 0;

    constructor(
        estudante: Estudante,
        dataEntrada: Date = new Date()
    ) {
        if (
            !(dataEntrada instanceof Date) ||
            Number.isNaN(dataEntrada.getTime())
        ) {
            throw new Error("A data de entrada é inválida.");
        }

        this.#estudante = estudante;
        this.#dataEntrada = new Date(
            dataEntrada.getTime()
        );
    }

    get matricula(): string {
        return this.#estudante.matricula;
    }

    registrarFrequencia(percentual: number): void {
        if (
            !Number.isFinite(percentual) ||
            percentual < 0 ||
            percentual > 100
        ) {
            throw new Error(
                "A frequência deve estar entre 0 e 100."
            );
        }

        this.#frequencia = percentual;
    }

    gerarResumo(): ResumoVinculo {
        return {
            matricula: this.#estudante.matricula,
            nome: this.#estudante.nome,
            curso: this.#estudante.curso,
            dataEntrada: this.#dataEntrada.toISOString(),
            frequencia: this.#frequencia
        };
    }
}