var pagePgto = {
    pagamentos: [],
    btnCancelar: document.querySelector('#cancel-card-Pgto'),
    btnSalvar: document.querySelector('#save-card-Pgto')
}

pagePgto.btnCancelar.addEventListener('click', function(){
    $('#campos-Pgto').show();
    $('#cardAddPgto').hide();
})
