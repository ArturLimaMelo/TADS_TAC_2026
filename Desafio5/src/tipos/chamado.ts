import type { ResumoEstudante } from "./estudante.js";

export type StatusChamado =
    | "ABERTO"
    | "EM_ATENDIMENTO"
    | "FINALIZADO";

export interface ResumoChamado {
    readonly id: string;
    readonly titulo: string;
    readonly solicitante: Pick<
        ResumoEstudante,
        "matricula" | "nome"
    >;
    readonly responsavel: string | null;
    readonly status: StatusChamado;
}