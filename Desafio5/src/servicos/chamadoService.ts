import { Chamado } from "../models/Chamado.js";
import { Estudante } from "../models/Estudante.js";

import type {
    StatusChamado
} from "../tipos/chamado.js";

export class ChamadoService {
    readonly #chamados = new Map<string, Chamado>();

    cadastrar(
        id: string | number,
        titulo: string,
        solicitante: Estudante
    ): Chamado {
        const chave = String(id).trim();

        if (this.#chamados.has(chave)) {
            throw new Error(
                "Já existe um chamado com esse ID."
            );
        }

        const chamado = new Chamado(
            id,
            titulo,
            solicitante
        );

        this.#chamados.set(chamado.id, chamado);

        return chamado;
    }

    buscarPorId(id: string): Chamado | null {
        return this.#chamados.get(id) ?? null;
    }

    listar(): Chamado[] {
        return Array.from(this.#chamados.values());
    }

    consultarStatus(
        id: string
    ): StatusChamado | null {
        const chamado = this.buscarPorId(id);

        if (chamado === null) {
            return null;
        }

        return chamado.status;
    }

    iniciarAtendimento(
        id: string,
        responsavel: string
    ): boolean {
        const chamado = this.buscarPorId(id);

        if (chamado === null) {
            return false;
        }

        chamado.iniciarAtendimento(responsavel);

        return true;
    }

    finalizar(id: string): boolean {
        const chamado = this.buscarPorId(id);

        if (chamado === null) {
            return false;
        }

        chamado.finalizar();

        return true;
    }
}