import { Queue } from "./Queue.js";

export class IndexQueue<T> implements Queue<T> {
    private elementos: (T | undefined)[] = [];
    private inicio = 0;
    private fim = 0;

    enqueue(elemento: T): void {
        this.elementos[this.fim] = elemento;
        this.fim++;
    }

    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        const elemento = this.elementos[this.inicio];

        this.elementos[this.inicio] = undefined;
        this.inicio++;

        return elemento;
    }

    front(): T | undefined {
        return this.elementos[this.inicio];
    }

    isEmpty(): boolean {
        return this.inicio === this.fim;
    }

    size(): number {
        return this.fim - this.inicio;
    }
}