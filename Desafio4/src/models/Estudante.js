export class Estudante {
    #matricula;
    #nome;
    #curso;
    #notas = [];

    constructor(matricula, nome, curso) {
        if (!String(matricula).trim()) {
            throw new Error("A matrícula é obrigatória.");
        }

        if (!String(nome).trim()) {
            throw new Error("O nome é obrigatório.");
        }

        if (!String(curso).trim()) {
            throw new Error("O curso é obrigatório.");
        }

        this.#matricula = String(matricula).trim();
        this.#nome = String(nome).trim();
        this.#curso = String(curso).trim();
    }

    get matricula() {
        return this.#matricula;
    }

    get nome() {
        return this.#nome;
    }

    get curso() {
        return this.#curso;
    }

    adicionarNota(nota) {
        if (
            typeof nota !== "number" ||
            !Number.isFinite(nota) ||
            nota < 0 ||
            nota > 10
        ) {
            throw new Error("A nota deve ser um número entre 0 e 10.");
        }

        this.#notas.push(nota);
    }

    calcularMedia() {
        if (this.#notas.length === 0) {
            return null;
        }

        const soma = this.#notas.reduce(
            (total, nota) => total + nota,
            0
        );

        return soma / this.#notas.length;
    }

    listarNotas() {
        return [...this.#notas];
    }

    gerarResumo() {
        return {
            matricula: this.#matricula,
            nome: this.#nome,
            curso: this.#curso,
            notas: this.listarNotas(),
            media: this.calcularMedia()
        };
    }
}