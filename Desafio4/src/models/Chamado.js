export class Chamado {
    static STATUS = Object.freeze({
        ABERTO: "ABERTO",
        EM_ATENDIMENTO: "EM_ATENDIMENTO",
        FINALIZADO: "FINALIZADO"
    });

    #id;
    #titulo;
    #solicitante;
    #responsavel = null;
    #status = Chamado.STATUS.ABERTO;

    constructor(id, titulo, solicitante) {
        if (
            id === null ||
            id === undefined ||
            String(id).trim() === ""
        ) {
            throw new Error("O ID do chamado é obrigatório.");
        }

        if (!String(titulo).trim()) {
            throw new Error("O título do chamado é obrigatório.");
        }

        if (
            !solicitante ||
            typeof solicitante.matricula !== "string"
        ) {
            throw new Error(
                "O solicitante deve ser um estudante válido."
            );
        }

        this.#id = String(id).trim();
        this.#titulo = String(titulo).trim();
        this.#solicitante = solicitante;
    }

    get id() {
        return this.#id;
    }

    get titulo() {
        return this.#titulo;
    }

    get status() {
        return this.#status;
    }

    get solicitante() {
        return this.#solicitante;
    }

    get responsavel() {
        return this.#responsavel;
    }

    iniciarAtendimento(responsavel) {
        if (this.#status !== Chamado.STATUS.ABERTO) {
            throw new Error(
                "Somente chamados abertos podem iniciar atendimento."
            );
        }

        if (
            typeof responsavel !== "string" ||
            !responsavel.trim()
        ) {
            throw new Error(
                "Informe o nome do responsável pelo atendimento."
            );
        }

        this.#responsavel = responsavel.trim();
        this.#status = Chamado.STATUS.EM_ATENDIMENTO;
    }

    finalizar() {
        if (this.#status !== Chamado.STATUS.EM_ATENDIMENTO) {
            throw new Error(
                "Somente chamados em atendimento podem ser finalizados."
            );
        }

        this.#status = Chamado.STATUS.FINALIZADO;
    }

    gerarResumo() {
        return {
            id: this.#id,
            titulo: this.#titulo,
            solicitante: {
                matricula: this.#solicitante.matricula,
                nome: this.#solicitante.nome
            },
            responsavel: this.#responsavel,
            status: this.#status
        };
    }
}