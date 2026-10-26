import { Estudante } from "../models/Estudante.js";

import type {
    ResumoEstudante
} from "../tipos/estudante.js";

import {
    validarEstudante
} from "../validacao/validarEstudante.js";

export class EstudanteService {
    readonly #estudantes = new Map<string, Estudante>();

    cadastrar(
        matricula: string,
        nome: string,
        curso: string
    ): Estudante {
        const resultado = validarEstudante({
            matricula,
            nome,
            curso
        });

        if (!resultado.valido) {
            throw new Error(resultado.erros.join(" "));
        }

        if (this.#estudantes.has(matricula.trim())) {
            throw new Error(
                "Já existe um estudante com essa matrícula."
            );
        }

        const estudante = new Estudante(
            matricula,
            nome,
            curso
        );

        this.#estudantes.set(
            estudante.matricula,
            estudante
        );

        return estudante;
    }

    buscarPorMatricula(
        matricula: string
    ): Estudante | null {
        return this.#estudantes.get(matricula) ?? null;
    }

    listar(): ResumoEstudante[] {
        return Array.from(
            this.#estudantes.values(),
            estudante => estudante.gerarResumo()
        );
    }

    calcularMedia(
        matricula: string
    ): number | null {
        const estudante = this.buscarPorMatricula(
            matricula
        );

        if (estudante === null) {
            return null;
        }

        return estudante.calcularMedia();
    }
}