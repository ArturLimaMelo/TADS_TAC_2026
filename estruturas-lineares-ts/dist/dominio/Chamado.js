export class Chamado {
    id;
    descricao;
    status;
    constructor(id, descricao, status = "ABERTO") {
        this.id = id;
        this.descricao = descricao;
        this.status = status;
    }
    iniciarAtendimento() {
        if (this.status === "ABERTO") {
            this.status = "EM_ATENDIMENTO";
        }
    }
    finalizar() {
        if (this.status === "EM_ATENDIMENTO") {
            this.status = "FINALIZADO";
        }
    }
}
