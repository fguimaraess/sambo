var pageRelatorio = {
    socioCombo: document.querySelector('#socio-combo'),
    relatorioSideBtn: document.querySelector('#relatorios-dashboard'),
    searchBtn: document.querySelector('#search-btn'),
    bodyRelatorio: document.querySelector('#body-relatorio')
}

pageRelatorio.relatorioSideBtn.addEventListener('click', function(){
    getSociosRelatorio();
});

pageRelatorio.searchBtn.addEventListener('click', function(){
    var idSocio = pageRelatorio.socioCombo.value;
    socioSel = pageSocio.socios[idSocio];
    getPagamentosDoSocio(socioSel);
})

function getPagamentosDoSocio(tempSocio){
    todosPgtos = pageSocio.pagamentos;
    for(var key in todosPgtos){
        if(tempSocio.uid == todosPgtos[key].idcliente)
        {
            preencheTabelaRelatorio(tempSocio, todosPgtos[key])
        }
    }
}

function preencheTabelaRelatorio(tempSocio, tempPagamento){
    var html = '';
    html += '<tr class="sociosNaTabela" id="' + tempSocio.uid + '">';
    html += '<td class="nomeCPFSocio">' + tempSocio.nome + " - " + tempSocio.cpf + '</td>';
    html += '<td class="emailSocio">' + tempSocio.email + '</td>';
    html += '<td class="dataPgto">' + tempPagamento.datapagamento + '</td>';
    html += '<td class="mesRef">' + tempPagamento.mesreferente + '</td>';
    html += '<td class="valorPgto">R$ ' + tempPagamento.valor + '</td>';
    html += '</tr>'
    $('#body-relatorio').append(html);
}

function getSociosRelatorio(){
    $(pageRelatorio.socioCombo).empty();
    var newOption = document.createElement("option");
    newOption.value = "-";
    newOption.innerHTML = "-";
    pageRelatorio.socioCombo.options.add(newOption);
    var tempSocio = [];
    tempSocio = pageSocio.socios;
    for (var key in tempSocio){
        preencheComboSocio(tempSocio[key]);
    }
    
}

function preencheComboSocio(tempSocio){
    var newOption = document.createElement("option");
    newOption.value = tempSocio.uid;
    newOption.innerHTML = tempSocio.nome + " - " + tempSocio.cpf;
    pageRelatorio.socioCombo.options.add(newOption);
    $(pageRelatorio.socioCombo).material_select();
}