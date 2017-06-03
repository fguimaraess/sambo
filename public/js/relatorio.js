var pageRelatorio = {
    socioCombo: document.querySelector('#socio-combo'),
    relatorioSideBtn: document.querySelector('#relatorios-dashboard'),
    searchBtn: document.querySelector('#search-btn'),
    bodyRelatorio: document.querySelector('#body-relatorio'),
    dataInicioField: document.querySelector('#data-inicio-field'),
    dataFimField: document.querySelector('#data-fim-field'),
    btnExport: document.querySelector('#btnExport'),
    limparBtn: document.querySelector('#limpar-relatorio')
}

pageRelatorio.relatorioSideBtn.addEventListener('click', function () {
    limparTabelaRelatorio();
    getSociosRelatorio();
});

pageRelatorio.searchBtn.addEventListener('click', function () {
    var idSocio = pageRelatorio.socioCombo.value;
    getPagamentosDoSocio(idSocio);
});

pageRelatorio.btnExport.addEventListener('click', function(){
    exportRelatorio();
});

function getPagamentosDoSocio(idSocio) {
    limparTabelaRelatorio();
    socioSel = pageSocio.socios[idSocio];
    todosPgtos = pageSocio.pagamentos;
    //Formatar as datas
    var dataInicio = $(pageRelatorio.dataInicioField).val().split("/");
    var dataInicioFormat = new Date(dataInicio[2], dataInicio[1] - 1, dataInicio[0]);
    var dataFim = $(pageRelatorio.dataFimField).val().split("/");
    var dataFimFormat = new Date(dataFim[2], dataFim[1] - 1, dataFim[0]);

    if (dataInicioFormat > dataFimFormat) {
        swal("", "A data final não pode ser menor que a inicial", "error");
    } else {
        //Traz todos os pagamentos - ID do sócio é vazio
        if (idSocio == "-") {
            for (var key in todosPgtos) {
                for (var i in pageSocio.socios) {
                    //Se durante o loop, o id do pagamento for encontrado dentro do obj de socios, ele preenche na tabela
                    if (pageSocio.socios[i].uid == todosPgtos[key].idcliente) {
                        //Formatar a data do pagamento (do banco)
                        var dataPgto = todosPgtos[key].datapagamento.split("/");
                        var dataPgtoFormat = new Date(dataPgto[2], dataPgto[1] - 1, dataPgto[0]);
                        if (dataPgtoFormat >= dataInicioFormat && dataPgtoFormat <= dataFimFormat) {
                            preencheTabelaRelatorio(pageSocio.socios[i], todosPgtos[key])
                        }
                        if (dataInicio == '' && dataFim == '') {
                            preencheTabelaRelatorio(pageSocio.socios[i], todosPgtos[key])
                        }
                    }
                }
            }
            //Traz apenas os pagamentos do usuário selecionado
        } else {
            for (var key in todosPgtos) {
                if (socioSel.uid == todosPgtos[key].idcliente) {
                    //Formatar a data do pagamento (do banco)
                    var dataPgto = todosPgtos[key].datapagamento.split("/");
                    var dataPgtoFormat = new Date(dataPgto[2], dataPgto[1] - 1, dataPgto[0]);
                    if (dataPgtoFormat >= dataInicioFormat && dataPgtoFormat <= dataFimFormat) {
                        preencheTabelaRelatorio(socioSel, todosPgtos[key]);
                    }
                    if (dataInicio == '' && dataFim == '') {
                        preencheTabelaRelatorio(socioSel, todosPgtos[key]);
                    }
                }   
            }
        }
    }
}

function preencheTabelaRelatorio(tempSocio, tempPagamento) {
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

function getSociosRelatorio() {
    $(pageRelatorio.socioCombo).empty();
    var newOption = document.createElement("option");
    newOption.value = "-";
    newOption.innerHTML = "-";
    pageRelatorio.socioCombo.options.add(newOption);
    var tempSocio = [];
    tempSocio = pageSocio.socios;
    for (var key in tempSocio) {
        preencheComboSocio(tempSocio[key]);
    }

}

function preencheComboSocio(tempSocio) {
    var newOption = document.createElement("option");
    newOption.value = tempSocio.uid;
    newOption.innerHTML = tempSocio.nome + " - " + tempSocio.cpf;
    pageRelatorio.socioCombo.options.add(newOption);
    $(pageRelatorio.socioCombo).material_select();
}

function exportRelatorio(){
    pageRelatorio.bodyRelatorio.innerHTML == '';
    if (pageRelatorio.bodyRelatorio.innerHTML == '') {
        swal("", "Selecione uma opção!", "error");
    }
    else {
        var tab_text = "<table border='2px'><tr><th>Nome e CPF</th><th>E-mail</th><th>Data do Pagamento</th><th>Mês Referente</th><th>Valor</th></tr><tr>";
        var textRange;
        var j = 0;
        tab = pageRelatorio.bodyRelatorio; // id of table
        for (j = 0; j < tab.rows.length; j++) {
            tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
            //tab_text=tab_text+"</tr>";
        }
        tab_text = tab_text + "</table>";
        tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, ""); //remove if u want links in your table
        tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
        tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer
        {
            txtArea1.document.open("txt/html", "replace");
            txtArea1.document.write(tab_text);
            txtArea1.document.close();
            txtArea1.focus();
            sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");
        }
        else { //other browser not tested on IE 11
            sa = ('data:application/vnd.ms-excel,' + escape(tab_text));
        }
        var a = document.createElement('a');
        var data_type = sa;
        a.href = data_type;
        //Se nao for selecionado nenhum socio, o nome do arquivo deve ser "Todos_Socios.xls"
        if(pageRelatorio.socioCombo.value == '-')
        {
            a.download = 'Todos_Socios.xls';
        } else {
        a.download = pageSocio.socios[pageRelatorio.socioCombo.value].nome + '.xls';
        }
        a.click();
        return (a);
    }
}

function limparTabelaRelatorio() {
    var sociosTela = document.querySelectorAll('.sociosNaTabela');
    sociosTela.forEach(function () {
        pageRelatorio.bodyRelatorio.innerHTML = '';
    });
}

pageRelatorio.limparBtn.addEventListener('click', function () {
    $(pageRelatorio.socioCombo).val("-");
    $(pageRelatorio.socioCombo).material_select();
    limparTabelaRelatorio();
});