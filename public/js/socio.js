var pageSocio = {
    nomeField: document.querySelector('#nomesocio-field'),
    cpfField: document.querySelector('#cpf-field'),
    emailField: document.querySelector('#email-field'),
    telefoneField: document.querySelector('#telefone-field'),
    dataNascimentoField: document.querySelector('#datanascimento-field'),
    btnSalvar: document.querySelector('#save-card-socio')
}

pageSocio.btnSalvar.addEventListener('click', function () {
    var tempSocio = {
        nome: pageSocio.nomeField.value,
        cpf: pageSocio.cpfField.value,
        email: pageSocio.emailField.value,
        telefone: pageSocio.telefoneField.value,
        datanascimento: pageSocio.dataNascimentoField.value
    };

    novoSocio(tempSocio);
})

function novoSocio(tempSocio) {
    if (tempSocio.nome == "") {
        swal("", "Verifique os campos obrigatórios", "error")
    } else {
        swal("", "Sócio cadastrado com sucessso", "success");
        firebase.database().ref('socios/').push(tempSocio);
    }
}