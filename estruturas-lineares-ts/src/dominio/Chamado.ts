export class Chamado {
    constructor(
        public readonly id: number,
        public readonly descricao: string,
        public status: "ABERTO" | "EM_ATENDIMENTO" | "FINALIZADO" = "ABERTO"
    ) {}

    iniciarAtendimento(): void {
        if (this.status === "ABERTO") {
            this.status = "EM_ATENDIMENTO";
        }
    }

    finalizar(): void {
        if (this.status === "EM_ATENDIMENTO") {
            this.status = "FINALIZADO";
        }
    }
}