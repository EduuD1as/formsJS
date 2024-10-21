document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var cpf = document.getElementById('cpf').value;
    var dataNascimento = document.getElementById('date').value;

    if (!validarCPF(cpf)) {
        alert("CPF inválido.");
        return;
    }

    if (!validarDataNascimento(dataNascimento)) {
        alert("Data de nascimento inválida. Deve ser maior que 18 anos.");
        return;
    }

    alert("Cadastro realizado com sucesso!");
    this.submit();
});

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }

    var soma = 0, resto;
    for (var i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (var i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

function validarDataNascimento(data) {
    var dataNascimento = new Date(data);
    var hoje = new Date();
    var idade = hoje.getFullYear() - dataNascimento.getFullYear();
    var m = hoje.getMonth() - dataNascimento.getMonth();

    if (m < 0 || (m === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }

    return idade >= 18;
}
