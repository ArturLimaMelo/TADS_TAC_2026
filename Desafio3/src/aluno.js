function normalizarTexto(texto) {
    return String(texto).trim().replace(/\s+/g, " ");
}

function normalizarNome(nome) {
    return normalizarTexto(nome)
        .toLowerCase()
        .replace(/\b\w/g, letra => letra.toUpperCase());
}

function normalizarEmail(email) {
    return String(email).trim().toLowerCase();
}

function normalizarCurso(curso) {
    return normalizarTexto(curso)
        .toLowerCase()
        .replace(/\b\w/g, letra => letra.toUpperCase());
}

function normalizarMatricula(matricula) {
    return String(matricula).trim().toUpperCase();
}

function validarAluno({ matricula, nome, email, curso, notas }) {
    if (!matricula) {
        throw new Error("A matrícula é obrigatória.");
    }

    if (!nome || nome.length < 3) {
        throw new Error("O nome deve possuir pelo menos 3 caracteres.");
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
        throw new Error("E-mail inválido.");
    }

    if (!curso) {
        throw new Error("O curso é obrigatório.");
    }

    if (!Array.isArray(notas)) {
        throw new Error("Notas devem ser fornecidas em um array.");
    }

    for (const nota of notas) {
        if (
            typeof nota !== "number" ||
            Number.isNaN(nota) ||
            nota < 0 ||
            nota > 10
        ) {
            throw new Error(
                `Nota inválida: ${nota}. As notas devem estar entre 0 e 10.`
            );
        }
    }
}

export function criarAluno({
    id,
    matricula,
    nome,
    email,
    curso,
    notas = []
    }) {
    const aluno = {
        id,
        matricula: normalizarMatricula(matricula),
        nome: normalizarNome(nome),
        email: normalizarEmail(email),
        curso: normalizarCurso(curso),
        notas: [...notas]
    };

    validarAluno(aluno);

    return aluno;
}

export function calcularMedia(aluno) {
    const soma = aluno.notas.reduce(
        (total, nota) => total + nota,
        0
    );

    return soma / aluno.notas.length;
}

export function calcularSituacao(aluno, mediaMinima = 6) {
    const media = calcularMedia(aluno);

    return media >= mediaMinima
        ? "Aprovado"
        : "Reprovado";
}

export function obterAlunoComResultado(
    aluno,
    mediaMinima = 6
) {
    const media = calcularMedia(aluno);
    const situacao = calcularSituacao(aluno, mediaMinima);

    return {
        ...aluno,
        media,
        situacao
    };
}