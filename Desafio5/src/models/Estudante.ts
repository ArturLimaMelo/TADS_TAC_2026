import type {
    ResumoEstudante
} from "../tipos/estudante.js";

export class Estudante {
    readonly #matricula: string;
    readonly #nome: string;
    readonly #curso: string;
    #notas: number[] = [];
    #ativo = true;

    constructor(
        matricula: string,
        nome: string,
        curso: string
    ) {
        if (!matricula.trim()) {
            throw new Error("A matrícula é obrigatória.");
        }

        if (!nome.trim()) {
            throw new Error("O nome é obrigatório.");
        }

        if (!curso.trim()) {
            throw new Error("O curso é obrigatório.");
        }

        this.#matricula = matricula.trim();
        this.#nome = nome.trim();
        this.#curso = curso.trim();
    }

    get matricula(): string {
        return this.#matricula;
    }

    get nome(): string {
        return this.#nome;
    }

    get curso(): string {
        return this.#curso;
    }

    get ativo(): boolean {
        return this.#ativo;
    }

    desativar(): void {
        this.#ativo = false;
    }

    adicionarNota(nota: number): void {
        if (
            !Number.isFinite(nota) ||
            nota < 0 ||
            nota > 10
        ) {
            throw new Error(
                "A nota deve ser um número entre 0 e 10."
            );
        }

        this.#notas.push(nota);
    }

    calcularMedia(): number | null {
        if (this.#notas.length === 0) {
            return null;
        }

        const soma = this.#notas.reduce(
            (total, nota) => total + nota,
            0
        );

        return soma / this.#notas.length;
    }

    listarNotas(): number[] {
        return [...this.#notas];
    }

    gerarResumo(): ResumoEstudante {
        return {
            matricula: this.#matricula,
            nome: this.#nome,
            curso: this.#curso,
            ativo: this.#ativo,
            notas: this.listarNotas(),
            media: this.calcularMedia()
        };
    }
}