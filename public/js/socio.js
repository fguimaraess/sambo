var pageSocio = {
    socios: [],
    pagamentos: [],
    idSocioField: document.querySelector('#id-field'),
    nomeField: document.querySelector('#nomesocio-field'),
    cpfField: document.querySelector('#cpf-field'),
    emailField: document.querySelector('#email-field'),
    telefoneField: document.querySelector('#telefone-field'),
    dataNascimentoField: document.querySelector('#datanascimento-field'),
    btnSalvar: document.querySelector('#save-card-socio'),
    btnCancelar: document.querySelector('#cancel-card-socio'),
    bodySocio: document.querySelector('#body-socio'),
    btnSocioMenu: document.querySelector('#socios-dashboard'),
    buscaSocio: document.querySelector('#busca-socio-field'),
    btnBuscaSocio: document.querySelector('#busca-socio-btn'),
    btnClearSocio: document.querySelector('#apagar-busca-socio-btn'),
    tabelaSocio: document.querySelector('#table-socio'),
    btnAddsocio: document.querySelector("#addSocio"),

}
window.addEventListener('load', function () {
    getPagamentosSocios();
});

pageSocio.btnSocioMenu.addEventListener('click', function () {
    getSocio();
    //getPagamentosSocios();
    pageSocio.buscaSocio.value = null;
})

//busca por nome
pageSocio.btnBuscaSocio.addEventListener('click', function () {
    getSocioPorNome(pageSocio.buscaSocio.value);
});

//Apagar busca
pageSocio.btnClearSocio.addEventListener('click', function () {
    pageSocio.buscaSocio.value = "";
    getSocioPorNome(pageSocio.buscaSocio.value);
});

pageSocio.btnCancelar.addEventListener('click', function () {
    $('.socio-div').show();
    $('#campos-socio').show();
    $('#cardAddsocio').hide();
});


pageSocio.btnAddsocio.addEventListener('click', function () {
    $('#campos-socio').hide();
    $('#cardAddsocio').show();
    // não pega o id do editar
    abreCardSocio(null);
})

pageSocio.btnSalvar.addEventListener('click', function () {
    var tempSocio = {
        nome: pageSocio.nomeField.value,
        cpf: pageSocio.cpfField.value,
        email: pageSocio.emailField.value,
        telefone: pageSocio.telefoneField.value,
        datanascimento: pageSocio.dataNascimentoField.value
    };

    if (pageSocio.idSocioField.value) {
        console.log("entrou aqui *")
        salvaAlteracoes(tempSocio);
    } else {
        novoSocio(tempSocio);
    }
    $('#campos-socio').show();
    $('#cardAddsocio').hide();

})

function novoSocio(tempSocio) {
    if (tempSocio.nome == "" || tempSocio.cpf == "") {
        swal("", "Verifique os campos obrigatórios", "error")
    } else {
        swal("", "Sócio cadastrado com sucessso", "success");
        firebase.database().ref('socios/').push(tempSocio);
        getSocio();
        //verificar melhor método de retornar para a div sócios

    }
}

function salvaAlteracoes(tempSocio) {
    idSocio = pageSocio.idSocioField.value;
    tempSocio = {
        nome: pageSocio.nomeField.value,
        cpf: pageSocio.cpfField.value,
        email: pageSocio.emailField.value,
        telefone: pageSocio.telefoneField.value,
        datanascimento: pageSocio.dataNascimentoField.value
    }
    //Doc do firebase pra atualizar
    firebase.database().ref('socios/' + idSocio).update(tempSocio).then(swal("", "cadastro atualizado com sucesso", "success"));
    //socioSel = pageSocio.socios[pageSocio.idSocioField.value];
    //Atualiza tela de sócios
    var sociosNaTela = document.querySelectorAll('.sociosTabela');
    sociosNaTela.forEach(function (socioHtml) {
        if (socioHtml.id == idSocio) {
            socioHtml.id.innerHTML = pageSocio.idSocioField.value;
            socioHtml.querySelector('.nomeSocio').innerHTML = tempSocio.nome;
            socioHtml.querySelector('.cpfSocio').innerHTML = tempSocio.cpf;
            socioHtml.querySelector('.emailSocio').innerHTML = tempSocio.email;
            socioHtml.querySelector('.telefoneSocio').innerHTML = tempSocio.telefone
        }
    });
    
    pageSocio.socios[idSocio] = tempSocio;
    console.log(tempSocio);

}

function getPagamentosSocios() {
    firebase.database().ref('pagamentos/').once('value').then(function (snapshot) {
        snapshot.forEach(function (pgtoRef) {
            var tempPag = pgtoRef.val();
            tempPag.uid = pgtoRef.key;
            pageSocio.pagamentos[pgtoRef.key] = tempPag;
        })
    })
}

function getSocio() {
    limparTabela();
    firebase.database().ref('socios/').once('value').then(function (snapshot) {
        snapshot.forEach(function (socioRef) {
            var tempSocio = socioRef.val();
            tempSocio.uid = socioRef.key;
            var tempPagamentos = pageSocio.pagamentos;
            tempSocio.ultpgto = "";
            for (var key in tempPagamentos) {
                if (tempPagamentos[key].idcliente == tempSocio.uid) {
                    if (tempPagamentos[key].datapagamento > tempSocio.ultpgto)
                        tempSocio.ultpgto = tempPagamentos[key].datapagamento;
                }
                pageSocio.socios[socioRef.key] = tempSocio;
            }
            preencheTabela(tempSocio);
        })
    })

}



function getSocioPorNome(nomeSocio) {
    limparTabela();
    for (var key in pageSocio.socios) {
        var str = pageSocio.socios[key];
        var strNome = str.nome.toLowerCase();
        var strUid = str.uid;
        if (strNome.search(nomeSocio.toLowerCase()) != -1) {
            socioSel = pageSocio.socios[strUid];
            preencheTabela(socioSel);
        }
    }
}


function preencheTabela(tempSocio) {
    var html = '';
    html += '<tr class="sociosTabela" id="' + tempSocio.uid + '">';
    html += '<td class="cpfSocio">' + tempSocio.cpf + '</td>';
    html += '<td class="nomeSocio">' + tempSocio.nome + '</td>';
    html += '<td class="emailSocio">' + tempSocio.email + '</td>';
    html += '<td class="telefoneSocio">' + tempSocio.telefone + '</td>';
    //html += '<td class="dataSocio">' + tempSocio.datanascimento + '</td>';
    html += '<td class="ultPgto">' + tempSocio.ultpgto + '</td>';
    html += '<td><a onclick="abreCardSocio(\'' + tempSocio.uid + '\')" href="#" class="editar-socio"><i class="material-icons">mode_edit</i></a>' + '&nbsp;&nbsp;' + '<a onclick="excluirSocio(\'' + tempSocio.uid + '\' )" href="#" class="excluir-socio"><i class="material-icons"><i class="material-icons">remove_circle</i></td>';
    html += '</tr>'
    $('#body-socio').append(html);

}

function abreCardSocio(idSocio) {
    pageSocio.idSocioField.value = idSocio;
    $('#cardAddsocio').show();
    $('#campos-socio').hide();
    if (idSocio) {
        socioSel = pageSocio.socios[idSocio]
        //Nessa linha abaixo, estava "socioSel.uid", e no banco nao é gravado o uid dentro do socio, apenas fora
        pageSocio.idSocioField.value = idSocio;
        pageSocio.nomeField.value = socioSel.nome;
        pageSocio.cpfField.value = socioSel.cpf;
        pageSocio.emailField.value = socioSel.email;
        pageSocio.telefoneField.value = socioSel.telefone;
        pageSocio.dataNascimentoField.value = socioSel.datanascimento;
    } else {
        pageSocio.idSocioField.value = null;
        pageSocio.nomeField.value = null;
        pageSocio.cpfField.value = null;
        pageSocio.emailField.value = null;
        pageSocio.telefoneField.value = null;
        pageSocio.dataNascimentoField.value = null;
    }
}

function excluirSocio(idSocio) {
    var pagamentosAtuais = pageSocio.pagamentos;
    var exclui = true;
    for (var i in pagamentosAtuais) {
        if (idSocio == pagamentosAtuais[i].idcliente) {
            exclui = false;
            console.log(pagamentosAtuais[i])
            swal("", "Não é permitido excluir um sócio que possua pagamento", "error");
        }
    }
    if (exclui) {
        //exclui valor do array socios
        delete pageSocio.socios[idSocio];
        //excluir o elemento HTML sócio
        var tempSocio = pageSocio.bodySocio.querySelector('#' + idSocio)
        firebase.database().ref('socios/' + idSocio).remove();
        swal("", "Sócio excluido", "success");
        pageSocio.bodySocio.removeChild(tempSocio);
    }
}

function limparTabela() {
    var sociosNaTela = document.querySelectorAll('.sociosTabela');
    sociosNaTela.forEach(function () {
        pageSocio.tabelaSocio.querySelector('#body-socio').innerHTML = '';
    });
}