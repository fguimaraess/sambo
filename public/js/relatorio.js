var pageRelatorio = {
    socioField: document.querySelector('#socio-combo'),
    searchBtn: document.querySelector('#search-btn'),
    relatorioSideBtn: document.querySelector('#relatorios-dashboard')
}

pageRelatorio.relatorioSideBtn.addEventListener('click', getSociosCombo);
pageRelatorio.searchBtn.addEventListener('click', function () {

})

function getSociosCombo(){
    $(pageRelatorio.socioField).empty();
    var newOption = document.createElement("option");
    newOption.value = "-";
    newOption.innerHTML = "-";
    pageRelatorio.socioField.options.add(newOption);
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
    pageRelatorio.socioField.options.add(newOption);
}