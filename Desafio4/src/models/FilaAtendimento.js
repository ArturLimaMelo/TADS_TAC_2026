export class FilaAtendimento {
    #chamados = [];

    adicionar(chamado) {
        if (
            !chamado ||
            typeof chamado.iniciarAtendimento !== "function" ||
            typeof chamado.gerarResumo !== "function"
        ) {
            throw new Error("Chamado inválido.");
        }

        this.#chamados.push(chamado);
    }

    retirarProximo() {
        if (this.#chamados.length === 0) {
            return null;
        }

        return this.#chamados.shift();
    }

    consultarTamanho() {
        return this.#chamados.length;
    }

    estaVazia() {
        return this.#chamados.length === 0;
    }

    gerarResumo() {
        return {
            tamanho: this.#chamados.length,
            vazia: this.estaVazia(),
            chamados: this.#chamados.map(
                chamado => chamado.gerarResumo()
            )
        };
    }
}