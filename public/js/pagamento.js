var pagePgto = {
    pagamentos: [],
    btnCancelar: document.querySelector('#cancel-card-Pgto'),
    btnSalvar: document.querySelector('#save-card-Pgto'),
    btnAddPgto: document.querySelector('#addPagto'),
    salvarPgto: document.querySelector('#save-card-Pgto'),
    socioPgtoField: document.querySelector('#sociopgto-field'),
    valorField: document.querySelector('#valor-field'),
    referenteField: document.querySelector('#referente-field'),
    dataPgtoField: document.querySelector('#datePgto-field')
}

window.addEventListener('load', getPgto);

pagePgto.btnCancelar.addEventListener('click', function () {
    $('#campos-Pgto').show();
    $('#cardAddPgto').hide();
})

pagePgto.btnAddPgto.addEventListener('click', function(){
    $('#campos-Pgto').hide();
    $('#cardAddPgto').show();
    getSociosCombo();
});

pagePgto.salvarPgto.addEventListener('click', function(){
    var tempPag = {
        idcliente: pagePgto.socioPgtoField.value,
        valor: pagePgto.valorField.value,
        mesreferente: pagePgto.referenteField.value,
        datapagamento: pagePgto.dataPgtoField.value,
    };
    novoPagamento(tempPag)
});


function novoPagamento(tempPag) {
    if (tempPag.cpf == "" || tempPag.valor == "") {
        swal("", "Verifique os campos obrigatórios", "error")
    } else {
        swal("", "Pagamento cadastrado com sucessso", "success");
        firebase.database().ref('pagamentos/').push(tempPag);
    }
}

function getPgto() {
    
    limparTabelaPgto();
    firebase.database().ref('pagamentos/').once('value').then(function (snapshot) {
        snapshot.forEach(function (pgtoRef) {
            var tempPag = pgtoRef.val();
            tempPag.uid = pgtoRef.key;
            preencheTabelaPgto(tempPag);
            pagePgto.pagamentos[pgtoRef.key] = tempPag;
        })
    })
}

function preencheTabelaPgto(tempPag) {
    socioSel = pageSocio.socios[tempPag.idcliente]
    var html = '';
    html += '<tr class="pgtosTabela" id="' + tempPag.uid + '">';
    html += '<td class="nomeCliente">' + socioSel.nome + " - " + socioSel.cpf + '</td>';
    html += '<td class="valorPgto">' + "R$" + tempPag.valor + '</td>';
    html += '<td class="mesPgto">' + tempPag.mesreferente + '</td>';
    html += '<td class="dataPgto">' + tempPag.datapagamento + '</td>';
    html += '<td><a onclick="abreCardPgto(\'' + tempPag.uid + '\')" href="#" class="editar-socio"><i class="material-icons">mode_edit</i></a>' + '&nbsp;&nbsp;' + '<a onclick="excluirPgto(\'' + tempPag.uid + '\' )" href="#" class="excluir-socio"><i class="material-icons"><i class="material-icons">remove_circle</i></td>';
    html += '</tr>'
    $('#body-pgto').append(html);
}

function excluirPgto(idPgto) {
    firebase.database().ref('pagamentos/' + idPgto).remove();
    swal("", "Pagamento excluído", "success");
}

function limparTabelaPgto() {
    var pgtosNaTela = document.querySelectorAll('.pgtosTabela');
    pgtosNaTela.forEach(function () {
        pageSocio.tabelaSocio.querySelector('#body-pgto').innerHTML = '';
    });
}

function getSociosCombo(){
    $(pagePgto.socioPgtoField).empty();
    var tempSocio = [];
    tempSocio = pageSocio.socios;
    for(var key in tempSocio){
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