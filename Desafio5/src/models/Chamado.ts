import type { StatusChamado } from "../tipos/chamado.js";
import type { ResumoChamado } from "../tipos/chamado.js";
import type { Estudante } from "./Estudante.js";

export class Chamado {
    static readonly STATUS = Object.freeze({
        ABERTO: "ABERTO",
        EM_ATENDIMENTO: "EM_ATENDIMENTO",
        FINALIZADO: "FINALIZADO"
    } as const);

    readonly #id: string;
    readonly #titulo: string;
    readonly #solicitante: Estudante;

    #responsavel: string | null = null;
    #status: StatusChamado = "ABERTO";

    constructor(
        id: string | number,
        titulo: string,
        solicitante: Estudante
    ) {
        if (!String(id).trim()) {
            throw new Error("O ID do chamado é obrigatório.");
        }

        if (!titulo.trim()) {
            throw new Error("O título do chamado é obrigatório.");
        }

        this.#id = String(id).trim();
        this.#titulo = titulo.trim();
        this.#solicitante = solicitante;
    }

    get id(): string {
        return this.#id;
    }

    get titulo(): string {
        return this.#titulo;
    }

    get status(): StatusChamado {
        return this.#status;
    }

    get solicitante(): Estudante {
        return this.#solicitante;
    }

    get responsavel(): string | null {
        return this.#responsavel;
    }

    iniciarAtendimento(responsavel: string): void {
        if (this.#status !== "ABERTO") {
            throw new Error(
                "Somente chamados abertos podem iniciar atendimento."
            );
        }

        if (!responsavel.trim()) {
            throw new Error(
                "Informe o nome do responsável pelo atendimento."
            );
        }

        this.#responsavel = responsavel.trim();
        this.#status = "EM_ATENDIMENTO";
    }

    finalizar(): void {
        if (this.#status !== "EM_ATENDIMENTO") {
            throw new Error(
                "Somente chamados em atendimento podem ser finalizados."
            );
        }

        this.#status = "FINALIZADO";
    }

    gerarResumo(): ResumoChamado {
        return {
            id: this.#id,
            titulo: this.#titulo,
            solicitante: {
                matricula: this.#solicitante.matricula,
                nome: this.#solicitante.nome
            },
            responsavel: this.#responsavel,
            status: this.#status
        };
    }
}