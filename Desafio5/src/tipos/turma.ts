export interface ResumoVinculo {
    readonly matricula: string;
    readonly nome: string;
    readonly curso: string;
    readonly dataEntrada: string;
    readonly frequencia: number;
}

export interface ResumoTurma {
    readonly codigo: string;
    readonly componenteCurricular: string;
    readonly quantidadeMatriculados: number;
    readonly matriculados: readonly ResumoVinculo[];
}