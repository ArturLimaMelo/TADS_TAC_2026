import { Estudante } from "./Estudante.js";
import { VinculoNaTurma } from "./VinculoNaTurma.js";

import type {
    ResumoTurma,
    ResumoVinculo
} from "../tipos/turma.js";

export class Turma {
    readonly #codigo: string;
    readonly #componenteCurricular: string;

    readonly #vinculos = new Map<
        string,
        VinculoNaTurma
    >();

    constructor(
        codigo: string,
        componenteCurricular: string
    ) {
        if (!codigo.trim()) {
            throw new Error(
                "O código da turma é obrigatório."
            );
        }

        if (!componenteCurricular.trim()) {
            throw new Error(
                "O componente curricular é obrigatório."
            );
        }

        this.#codigo = codigo.trim();
        this.#componenteCurricular =
            componenteCurricular.trim();
    }

    get codigo(): string {
        return this.#codigo;
    }

    get componenteCurricular(): string {
        return this.#componenteCurricular;
    }

    matricular(
        estudante: Estudante,
        dataEntrada: Date = new Date()
    ): ResumoVinculo {
        if (!(estudante instanceof Estudante)) {
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

    registrarFrequencia(
        matricula: string,
        percentual: number
    ): void {
        const vinculo = this.#vinculos.get(matricula);

        if (!vinculo) {
            throw new Error(
                "Não existe matrícula correspondente nesta turma."
            );
        }

        vinculo.registrarFrequencia(percentual);
    }

    listarMatriculados(): ResumoVinculo[] {
        return Array.from(
            this.#vinculos.values(),
            vinculo => vinculo.gerarResumo()
        );
    }

    gerarResumo(): ResumoTurma {
        return {
            codigo: this.#codigo,
            componenteCurricular:
                this.#componenteCurricular,
            quantidadeMatriculados:
                this.#vinculos.size,
            matriculados: this.listarMatriculados()
        };
    }
}