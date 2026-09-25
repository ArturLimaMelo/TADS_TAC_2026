import { criarAluno } from "./aluno.js";

export function criarCadastro() {
    const alunos = [];

    function cadastrar(dados) {
        const matriculaNormalizada = String(dados.matricula)
            .trim()
            .toUpperCase();

        const existe = alunos.some(
            aluno => aluno.matricula === matriculaNormalizada
        );

        if (existe) {
            throw new Error(
                `A matrícula ${matriculaNormalizada} já está cadastrada.`
            );
        }

        const aluno = criarAluno({
            ...dados,
            matricula: matriculaNormalizada
        });

        alunos.push(aluno);

        return aluno;
    }

    function buscarPorMatricula(matricula) {
        const matriculaNormalizada = String(matricula)
            .trim()
            .toUpperCase();

        return alunos.find(
            aluno => aluno.matricula === matriculaNormalizada
        ) ?? null;
    }

    function removerPorMatricula(matricula) {
        const matriculaNormalizada = String(matricula)
            .trim()
            .toUpperCase();

        const indice = alunos.findIndex(
            aluno => aluno.matricula === matriculaNormalizada
        );

        if (indice === -1) {
            return null;
        }

        const removido = alunos.splice(indice, 1)[0];

        return removido;
    }

    function listar() {
        return [...alunos];
    }

    return {
        cadastrar,
        buscarPorMatricula,
        removerPorMatricula,
        listar
    };
}