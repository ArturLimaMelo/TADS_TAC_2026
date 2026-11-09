import { IndexQueue } from "../estruturas/IndexQueue.js";
export class FilaChamados {
    fila = new IndexQueue();
    adicionar(chamado) {
        this.fila.enqueue(chamado);
    }
    atenderProximo() {
        const chamado = this.fila.dequeue();
        if (chamado) {
            chamado.iniciarAtendimento();
        }
        return chamado;
    }
    consultarProximo() {
        return this.fila.front();
    }
    quantidade() {
        return this.fila.size();
    }
    estaVazia() {
        return this.fila.isEmpty();
    }
}
