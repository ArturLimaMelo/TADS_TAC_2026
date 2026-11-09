import { Queue } from "./Queue.js";

export class ShiftQueue<T> implements Queue<T> {
    private elementos: T[] = [];

    enqueue(elemento: T): void {
        this.elementos.push(elemento);
    }

    dequeue(): T | undefined {
        return this.elementos.shift();
    }

    front(): T | undefined {
        return this.elementos[0];
    }

    isEmpty(): boolean {
        return this.elementos.length === 0;
    }

    size(): number {
        return this.elementos.length;
    }
}