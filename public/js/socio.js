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
    tabelaSocio: document.querySelector('#table-socio')

}
window.addEventListener('load', function () {
    //getSocio();
    getSocioComPgto();
});

//pageSocio.btnSocioMenu.addEventListener('click', function(){
//faz isso
//getSocio();
//})

//busca por nome
pageSocio.btnBuscaSocio.addEventListener('click', function () {
    getSocioPorNome(pageSocio.buscaSocio.value);
    //console.log(pageSocio.buscaSocio.value);
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


pageDash.btnAddsocio.addEventListener('click', function () {
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
        salvaAlteracoes(tempSocio);
        //console.log(tempSocio)
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
        //verificar melhor método de retornar para a div sócios

    }
}

function salvaAlteracoes(tempSocio) {
    idSocio = pageSocio.idSocioField.value;
    //socioSel = pageSocio.socios[pageSocio.idSocioField.value];
    //Doc do firebase pra atualizar
    firebase.database().ref('socios/' + idSocio).update(tempSocio).then(swal("", "cadastro atualizado com sucesso", "success"));
    //console.log(tempSocio)
    pageSocio.socios[idSocio] = tempSocio;
    //Atualiza tela de sócios
    var sociosNaTela = document.querySelectorAll('.sociosTabela');
    sociosNaTela.forEach(function (socioHtml) {
        if (socioHtml.id == idSocio) {
            socioHtml.querySelector('.nomeSocio').innerHTML = tempSocio.nome;
            socioHtml.querySelector('.cpfSocio').innerHTML = tempSocio.cpf;
            socioHtml.querySelector('.emailSocio').innerHtml = tempSocio.email;
            socioHtml.querySelector('.telefoneSocio').innerHTML = tempSocio.telefone

        }
    });

}

/*function getSocio() {
    limparTabela();
    firebase.database().ref('socios/').once('value').then(function (snapshot) {
        snapshot.forEach(function (socioRef) {
            var tempSocio = socioRef.val();
            tempSocio.uid = socioRef.key;
            //preencheTabela(tempSocio);
            pageSocio.socios[socioRef.key] = tempSocio;
        })
    })
}*/

function getSocioComPgto() {
    limparTabela();
    firebase.database().ref('socios/').once('value').then(function (snapshot) {
        snapshot.forEach(function (socioRef) {
            var tempSocio = socioRef.val();
            tempSocio.uid = socioRef.key;
            pageSocio.socios[socioRef.key] = tempSocio;
            firebase.database().ref('pagamentos/').once('value').then(function (snapshot) {
                snapshot.forEach(function (pgtoRef) {
                    var tempPag = pgtoRef.val();
                    if (tempSocio.uid == tempPag.idcliente) {
                        for (var key in tempPag) {
                            var dataAux = ("01/01/1900").split("/");
                            var dataAuxFormat = new Date(dataAux[2], dataAux[1] - 1, dataAux[0]);
                            var dataUltPgto = tempPag.datapagamento.split("/");
                            var dataUltPgtoFormat = new Date(dataUltPgto[2], dataUltPgto[1] - 1, dataUltPgto[0]);
                            //console.log(dataUltPgtoFormat)
                            if (dataUltPgtoFormat > dataAuxFormat) {
                                dataAuxFormat = dataUltPgtoFormat;
                                
                            }
                            pageSocio.socios[tempPag.idcliente].ultpgto = dataUltPgtoFormat;
                        }



                    }
                })
                preencheTabela(tempSocio);
            })

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
    $('#cardAddsocio').show();
    $('#campos-socio').hide();
    if (idSocio) {

        socioSel = pageSocio.socios[idSocio]
        pageSocio.idSocioField.value = socioSel.uid;
        pageSocio.nomeField.value = socioSel.nome;
        pageSocio.cpfField.value = socioSel.cpf;
        pageSocio.emailField.value = socioSel.email;
        pageSocio.telefoneField.value = socioSel.telefone;
        pageSocio.dataNascimentoField.value = socioSel.datanascimento;
    } else {
        pageSocio.idSocioField.value = "";
        pageSocio.nomeField.value = "";
        pageSocio.cpfField.value = "";
        pageSocio.emailField.value = "";
        pageSocio.telefoneField.value = "";
        pageSocio.dataNascimentoField.value = "";
    }
   // console.log(pageSocio.dataNascimentoField.value);
}

function excluirSocio(idSocio) {
    firebase.database().ref('socios/' + idSocio).remove();
    swal("", "Sócio excluido", "success");
}

function limparTabela() {
    var sociosNaTela = document.querySelectorAll('.sociosTabela');
    sociosNaTela.forEach(function () {
        pageSocio.tabelaSocio.querySelector('#body-socio').innerHTML = '';
    });
}