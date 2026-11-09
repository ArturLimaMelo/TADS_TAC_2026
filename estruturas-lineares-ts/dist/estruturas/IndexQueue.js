export class IndexQueue {
    elementos = [];
    inicio = 0;
    fim = 0;
    enqueue(elemento) {
        this.elementos[this.fim] = elemento;
        this.fim++;
    }
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const elemento = this.elementos[this.inicio];
        this.elementos[this.inicio] = undefined;
        this.inicio++;
        return elemento;
    }
    front() {
        return this.elementos[this.inicio];
    }
    isEmpty() {
        return this.inicio === this.fim;
    }
    size() {
        return this.fim - this.inicio;
    }
}
