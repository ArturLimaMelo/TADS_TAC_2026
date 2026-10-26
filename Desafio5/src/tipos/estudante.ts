export interface DadosEstudante {
    readonly matricula: string;
    readonly nome: string;
    readonly curso: string;
    ativo: boolean;
}

export type Estudante = DadosEstudante;

export interface ResumoEstudante {
    readonly matricula: string;
    readonly nome: string;
    readonly curso: string;
    readonly ativo: boolean;
    readonly notas: readonly number[];
    readonly media: number | null;
}

export interface DadosEstudanteEntrada {
    nome?: unknown;
    matricula?: unknown;
    curso?: unknown;
}

export interface ResultadoValidacao {
    readonly valido: boolean;
    readonly erros: string[];
}