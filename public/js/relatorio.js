/*var pageRelatorio = {
    socioComboRelatorio: document.querySelector('#socio-combo-relatorio'),
    searchBtn: document.querySelector('#search-btn'),
    relatorioSideBtn: document.querySelector('#relatorios-dashboard')
}

pageRelatorio.relatorioSideBtn.addEventListener('click', getSociosCombo);
pageRelatorio.searchBtn.addEventListener('click', function () {

})

function getSociosCombo(){
    $(pageRelatorio.socioComboRelatorio).empty();
    var newOption = document.createElement("option");
    newOption.value = "-";
    newOption.innerHTML = "-";
    pageRelatorio.socioComboRelatorio.options.add(newOption);
    var tempSocio = [];
    tempSocio = pageSocio.socios;
    for (var key in tempSocio){
        preencheComboSocio(tempSocio[key]);
    }
    
}

function preencheComboSocio(tempSocio){
    console.log(tempSocio)
    var newOption = document.createElement("option");
    newOption.value = tempSocio.uid;
    newOption.innerHTML = tempSocio.nome;
    pageRelatorio.socioComboRelatorio.options.add(newOption);
}*/