import { IndexQueue } from "../estruturas/IndexQueue.js";
import { Chamado } from "../dominio/Chamado.js";

export class FilaChamados {
    private fila = new IndexQueue<Chamado>();

    adicionar(chamado: Chamado): void {
        this.fila.enqueue(chamado);
    }

    atenderProximo(): Chamado | undefined {
        const chamado = this.fila.dequeue();

        if (chamado) {
            chamado.iniciarAtendimento();
        }

        return chamado;
    }

    consultarProximo(): Chamado | undefined {
        return this.fila.front();
    }

    quantidade(): number {
        return this.fila.size();
    }

    estaVazia(): boolean {
        return this.fila.isEmpty();
    }
}