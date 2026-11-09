export class ShiftQueue {
    elementos = [];
    enqueue(elemento) {
        this.elementos.push(elemento);
    }
    dequeue() {
        return this.elementos.shift();
    }
    front() {
        return this.elementos[0];
    }
    isEmpty() {
        return this.elementos.length === 0;
    }
    size() {
        return this.elementos.length;
    }
}
