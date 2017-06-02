var pagePgto = {
    pagamentos: [],
    menuPagamentos: document.querySelector('#pagamentos-dashboard'),
    idPgtoField: document.querySelector('#id-field-Pgto'),
    btnCancelar: document.querySelector('#cancel-card-Pgto'),
    btnAddPgto: document.querySelector('#addPagto'),
    salvarPgto: document.querySelector('#save-card-Pgto'),
    socioPgtoField: document.querySelector('#sociopgto-field'),
    valorField: document.querySelector('#valor-field'),
    referenteField: document.querySelector('#referente-field'),
    dataPgtoField: document.querySelector('#datePgto-field'),
    btnBuscaPgto: document.querySelector("#busca-pgto-btn"),
    btnClearPgto: document.querySelector("#apagar-busca-pgto-btn"),
    buscaPgto: document.querySelector("#busca-pgto-field"),
    tabelaPgto: document.querySelector("#table-pgto"),
    bodyPgto: document.querySelector("#body-pgto")

}

window.addEventListener('load', getSocio);
pagePgto.menuPagamentos.addEventListener('click', function () {
    getSocio();
    getPgto();
    getSociosCombo();
})

pagePgto.btnCancelar.addEventListener('click', function () {
    $('#campos-Pgto').show();
    $('#cardAddPgto').hide();
})

pagePgto.btnAddPgto.addEventListener('click', function () {
    $('#campos-Pgto').hide();
    $('#cardAddPgto').show();
    getSociosCombo();
    abreCardPgto(null);
});

pagePgto.btnBuscaPgto.addEventListener('click', function () {
    getPgtoPorNome(pagePgto.buscaPgto.value);
});

//Apagar busca
/*pageSocio.btnClearPgto.addEventListener('click', function () {
    pageSocio.buscaPgto.value = "";
    getPgtoPorNome(pageSocio.buscaPgto.value);
});*/


pagePgto.salvarPgto.addEventListener('click', function () {
    var tempPag = {
        uid: pagePgto.idPgtoField.value,
        idcliente: pagePgto.socioPgtoField.value,
        valor: pagePgto.valorField.value,
        mesreferente: pagePgto.referenteField.value,
        datapagamento: pagePgto.dataPgtoField.value,
    };
    if (pagePgto.idPgtoField.value) {
        salvaAltPag(tempPag);
    } else {
        novoPagamento(tempPag);
    }
    $('#campos-Pgto').show();
    $('#cardAddPgto').hide();
});


function novoPagamento(tempPag) {
    if (tempPag.datapagamento == "" || tempPag.valor == "") {
        swal("", "Verifique os campos obrigatórios", "error")
    } else {
        swal("", "Pagamento cadastrado com sucessso", "success");
        firebase.database().ref('pagamentos/').push(tempPag);
        getPgto();
    }

}

function salvaAltPag(tempPag) {
    idPgto = pagePgto.idPgtoField.value;
    firebase.database().ref('pagamentos/' + idPgto).update(tempPag).then(swal("", "Pagamento atualizado com sucesso", "success"));
    pagePgto.pagamentos[idPgto] = tempPag;
    var pagNaTela = document.querySelectorAll('.pgtosTabela');
    pagNaTela.forEach(function (pagtoHtml) {
        if (pagtoHtml.id == idPgto) {
            //pagtoHtml.querySelector('.nomeClientePgto').innerHTML = tempPag.nome;
            pagtoHtml.querySelector('.valorPgto').innerHTML = "R$" + tempPag.valor;
            pagtoHtml.querySelector('.mesPgto').innerHTML = tempPag.mesreferente;
            pagtoHtml.querySelector('.dataPgto').innerHTML = tempPag.datapagamento;
        }
    });
}

function getPgto() {
    limparTabelaPgto();
    firebase.database().ref('pagamentos/').once('value').then(function (snapshot) {
        snapshot.forEach(function (pgtoRef) {
            var tempPag = pgtoRef.val();
            tempPag.uid = pgtoRef.key;
            pagePgto.pagamentos[pgtoRef.key] = tempPag;
            preencheTabelaPgto(tempPag);
        })
    })
}

//Verifica isso 
function getPgtoPorNome(socioPgto) {
    limparTabela();
    for (var key1 in pagePgto.pagamento) {
        var str = pagePgto.pagamentos[key1];
        var strIdCliente = str.idcliente;
        console.log(strIdCliente);
    }
    for (var key2 in pageSocio.socios) {
        var name = pageSocio.socios[key2];
        var nameSocio = name.nome.toLowerCase();
        console.log(nameSocio);
    }
    /*var nameSocio = name.nome.toLowerCase();
    if (strNome.search(socioPgto.toLowerCase()) != -1) {
        socioPgtoSel = pagePgto.pagamentos[strUid];
        preencheTabelaPgto(socioPgtoSel);
    }*/
}


function preencheTabelaPgto(tempPag) {
    socioSel = pageSocio.socios[tempPag.idcliente]
    //console.log(socioSel.nome + " - " + socioSel.cpf);
    var html = '';
    html += '<tr class="pgtosTabela" id="' + tempPag.uid + '">';
    html += '<td class="nomeClientePgto">' + socioSel.nome + " - " + socioSel.cpf + '</td>';
    html += '<td class="valorPgto">' + "R$" + tempPag.valor + '</td>';
    html += '<td class="mesPgto">' + tempPag.mesreferente + '</td>';
    html += '<td class="dataPgto">' + tempPag.datapagamento + '</td>';
    html += '<td><a onclick="abreCardPgto(\'' + tempPag.uid + '\')" href="#" class="editar-socio"><i class="material-icons">mode_edit</i></a>' + '&nbsp;&nbsp;' + '<a onclick="excluirPgto(\'' + tempPag.uid + '\' )" href="#" class="excluir-socio"><i class="material-icons"><i class="material-icons">remove_circle</i></td>';
    html += '</tr>'
    $('#body-pgto').append(html);
}

function excluirPgto(idPgto) {
    var tempPag = pagePgto.bodyPgto.querySelector('#' + idPgto)
    console.log(idPgto)
    firebase.database().ref('pagamentos/' + idPgto).remove();
    swal("", "Pagamento excluído", "success");
    pagePgto.bodyPgto.removeChild(tempPag);
}

function limparTabelaPgto() {
    var pgtosNaTela = document.querySelectorAll('.pgtosTabela');
    pgtosNaTela.forEach(function () {
        pagePgto.tabelaPgto.querySelector('#body-pgto').innerHTML = '';
    });
}

function getSociosCombo() {
    $(pagePgto.socioPgtoField).empty();
    var tempSocio = [];
    tempSocio = pageSocio.socios;
    for (var key in tempSocio) {
        preencheCombo(tempSocio[key]);
    }
}

function preencheCombo(tempSocio) {
    var newOption = document.createElement("option");
    newOption.value = tempSocio.uid;
    newOption.innerHTML = tempSocio.nome + " - " + tempSocio.cpf;
    pagePgto.socioPgtoField.options.add(newOption);
    $(pagePgto.socioPgtoField).material_select();
}

function abreCardPgto(idPgto) {
    pagePgto.idPgtoField.value = idPgto;
    $('#cardAddPgto').show();
    $('#campos-Pgto').hide();
    if (idPgto) {
        pgtoSel = pagePgto.pagamentos[idPgto]
        socioSele = pageSocio.socios[pgtoSel.idcliente]
        pagePgto.idPgtoField.value = pgtoSel.uid;
        pagePgto.valorField.value = pgtoSel.valor;
        pagePgto.referenteField.value = pgtoSel.mesreferente;
        pagePgto.dataPgtoField.value = pgtoSel.datapagamento;
        $(pagePgto.socioPgtoField).empty();
        var newOption = document.createElement('option');
        newOption.value = socioSele.uid;
        newOption.innerHTML = socioSele.nome;
        pagePgto.socioPgtoField.options.add(newOption);
        $(pagePgto.socioPgtoField).material_select();
    } else {
        pagePgto.idPgtoField.value = "";
        pagePgto.valorField.value = "";
        pagePgto.referenteField.value = "";
        pagePgto.dataPgtoField.value = "";
    }

}