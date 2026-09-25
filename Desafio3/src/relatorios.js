import {
    calcularMedia,
    calcularSituacao
} from "./aluno.js";

export function gerarRelatorio(
    alunos,
    filtrar = () => true,
    formatar = aluno => aluno,
    comparar = null
) {
    if (!Array.isArray(alunos) || alunos.length === 0) {
        return [];
    }

    let resultado = alunos
        .filter(filtrar)
        .map(formatar);

    if (comparar) {
        resultado.sort(comparar);
    }

    return resultado;
}


export function criarFiltro({
    minMedia = null,
    curso = null
    } = {}) {
    return function filtro(aluno) {
        if (minMedia !== null) {
            const media = calcularMedia(aluno);

            if (media === null || media < minMedia) {
                return false;
            }
        }

        if (curso !== null) {
            return aluno.curso === curso;
        }

        return true;
    };
}

export function relatorioAprovados(alunos, mediaMinima = 6) {
    return gerarRelatorio(
        alunos,

        aluno =>
            calcularSituacao(aluno, mediaMinima) === "Aprovado",

        aluno => ({
            matricula: aluno.matricula,
            nome: aluno.nome,
            media: Number(calcularMedia(aluno).toFixed(2)),
            situacao: "Aprovado"
        }),

        (a, b) => a.nome.localeCompare(b.nome)
    );
}

export function relatorioReprovados(
    alunos,
    mediaMinima = 6
) {
    return gerarRelatorio(
        alunos,

        aluno =>
            calcularSituacao(aluno, mediaMinima) === "Reprovado",

        aluno => ({
            matricula: aluno.matricula,
            nome: aluno.nome,
            media: Number(calcularMedia(aluno).toFixed(2)),
            situacao: "Reprovado"
        }),

        (a, b) => a.media - b.media
    );
}

export function relatorioCursoCSV(alunos, curso) {
    const cursoNormalizado = String(curso)
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, letra => letra.toUpperCase());

    const resultado = gerarRelatorio(
        alunos,

        aluno => aluno.curso === cursoNormalizado,

        aluno => ({
            matricula: aluno.matricula,
            nome: aluno.nome,
            email: aluno.email,
            curso: aluno.curso,
            media: calcularMedia(aluno) === null
                ? ""
                : calcularMedia(aluno).toFixed(2)
        }),

        (a, b) => a.nome.localeCompare(b.nome)
    );

    if (resultado.length === 0) {
        return "";
    }

    const cabecalho = [
        "matricula",
        "nome",
        "email",
        "curso",
        "media"
    ].join(",");

    const linhas = resultado.map(aluno =>
        [
            aluno.matricula,
            aluno.nome,
            aluno.email,
            aluno.curso,
            aluno.media
        ].map(valor => `"${valor}"`).join(",")
    );

    return [cabecalho, ...linhas].join("\n");
}


export function resumoPorCurso(alunos) {
    if (!Array.isArray(alunos) || alunos.length === 0) {
        return [];
    }

    const grupos = new Map();

    for (const aluno of alunos) {
        if (!grupos.has(aluno.curso)) {
            grupos.set(aluno.curso, []);
        }

        grupos.get(aluno.curso).push(aluno);
    }

    return [...grupos.entries()]
        .map(([curso, alunosCurso]) => {
            const alunosComNota = alunosCurso
                .map(calcularMedia)
                .filter(media => media !== null);

            const mediaGeral =
                alunosComNota.length === 0
                    ? null
                    : alunosComNota.reduce(
                        (soma, media) => soma + media,
                        0
                    ) / alunosComNota.length;

            return {
                curso,
                quantidade: alunosCurso.length,
                mediaGeral:
                    mediaGeral === null
                        ? null
                        : Number(mediaGeral.toFixed(2))
            };
        })
        .sort((a, b) =>
            a.curso.localeCompare(b.curso)
        );
}