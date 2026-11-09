export class ArrayStack {
    elementos = [];
    push(elemento) {
        this.elementos.push(elemento);
    }
    pop() {
        return this.elementos.pop();
    }
    peek() {
        return this.elementos[this.elementos.length - 1];
    }
    isEmpty() {
        return this.elementos.length === 0;
    }
    size() {
        return this.elementos.length;
    }
}
