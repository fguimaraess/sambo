var pageDash = {
    btnUsuario: document.querySelector('#btn-logout'),
    btnSocio: document.querySelector("#socios-dashboard"),
    btnPgto: document.querySelector("#pagamentos-dashboard"),
    btnRelatorio: document.querySelector("#relatorios-dashboard")
}
pageDash.btnSocio.addEventListener('click', function(){
    $('.socio-div').show();
    $('.pagamento-div').hide();
    $('.relatorio-div').hide();
});

pageDash.btnPgto.addEventListener('click', function(){
    $('.pagamento-div').show();
    $('.relatorio-div').hide();
    $('.socio-div').hide();    
});

pageDash.btnRelatorio.addEventListener('click', function(){
    $('.relatorio-div').show();
    $('.pagamento-div').hide();
    $('.socio-div').hide();
})

