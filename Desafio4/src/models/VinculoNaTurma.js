export class VinculoNaTurma {
    #estudante;
    #dataEntrada;
    #frequencia;

    constructor(estudante, dataEntrada = new Date()) {
        if (
            !estudante ||
            typeof estudante.matricula !== "string"
        ) {
            throw new Error("O vínculo exige um estudante válido.");
        }

        if (
            !(dataEntrada instanceof Date) ||
            Number.isNaN(dataEntrada.getTime())
        ) {
            throw new Error("A data de entrada é inválida.");
        }

        this.#estudante = estudante;
        this.#dataEntrada = new Date(dataEntrada.getTime());
        this.#frequencia = 0;
    }

    get matricula() {
        return this.#estudante.matricula;
    }

    registrarFrequencia(percentual) {
        if (
            typeof percentual !== "number" ||
            !Number.isFinite(percentual) ||
            percentual < 0 ||
            percentual > 100
        ) {
            throw new Error(
                "A frequência deve estar entre 0 e 100."
            );
        }

        this.#frequencia = percentual;
    }

    gerarResumo() {
        return {
            matricula: this.#estudante.matricula,
            nome: this.#estudante.nome,
            curso: this.#estudante.curso,
            dataEntrada: this.#dataEntrada.toISOString(),
            frequencia: this.#frequencia
        };
    }
}