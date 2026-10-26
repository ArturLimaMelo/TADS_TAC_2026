import { Turma } from "../models/Turma.js";
import { Estudante } from "../models/Estudante.js";

import type {
    ResumoTurma,
    ResumoVinculo
} from "../tipos/turma.js";

export class TurmaService {
    readonly #turmas = new Map<string, Turma>();

    cadastrar(
        codigo: string,
        componenteCurricular: string
    ): Turma {
        if (this.#turmas.has(codigo.trim())) {
            throw new Error(
                "Já existe uma turma com esse código."
            );
        }

        const turma = new Turma(
            codigo,
            componenteCurricular
        );

        this.#turmas.set(turma.codigo, turma);

        return turma;
    }

    buscarPorCodigo(codigo: string): Turma | null {
        return this.#turmas.get(codigo) ?? null;
    }

    matricular(
        codigoTurma: string,
        estudante: Estudante,
        dataEntrada: Date = new Date()
    ): ResumoVinculo | null {
        const turma = this.buscarPorCodigo(codigoTurma);

        if (turma === null) {
            return null;
        }

        return turma.matricular(estudante, dataEntrada);
    }

    listar(): ResumoTurma[] {
        return Array.from(
            this.#turmas.values(),
            turma => turma.gerarResumo()
        );
    }
}