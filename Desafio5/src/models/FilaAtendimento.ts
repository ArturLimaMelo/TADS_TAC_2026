import type { ResumoChamado } from "../tipos/chamado.js";
import { Chamado } from "./Chamado.js";

export interface ResumoFila {
    readonly tamanho: number;
    readonly vazia: boolean;
    readonly chamados: readonly ResumoChamado[];
}

export class FilaAtendimento {
    readonly #chamados: Chamado[] = [];

    adicionar(chamado: Chamado): void {
        if (!(chamado instanceof Chamado)) {
            throw new Error("Chamado inválido.");
        }

        this.#chamados.push(chamado);
    }

    retirarProximo(): Chamado | null {
        return this.#chamados.shift() ?? null;
    }

    consultarTamanho(): number {
        return this.#chamados.length;
    }

    estaVazia(): boolean {
        return this.#chamados.length === 0;
    }

    gerarResumo(): ResumoFila {
        return {
            tamanho: this.#chamados.length,
            vazia: this.estaVazia(),
            chamados: this.#chamados.map(
                chamado => chamado.gerarResumo()
            )
        };
    }
}