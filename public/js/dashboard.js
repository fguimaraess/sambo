var pageDash = {
    btnUsuario: document.querySelector('#btn-logout'),
    btnSocio: document.querySelector("#socios-dashboard"),
    btnPgto: document.querySelector("#pagamentos-dashboard"),
    btnRelatorio: document.querySelector("#relatorios-dashboard"),
    btnAddsocio: document.querySelector("#addSocio"),
    logoSambo: document.querySelector("#logo-sambo")
}
pageDash.btnSocio.addEventListener('click', function(){
    $('.socio-div').show();
    $('.pagamento-div').hide();
    $('.relatorio-div').hide();
    $('#cardAddsocio').hide();
});

pageDash.btnPgto.addEventListener('click', function(){
    $('.pagamento-div').show();
    $('.relatorio-div').hide();
    $('.socio-div').hide();  
    $('#cardAddsocio').hide();  
});

pageDash.btnRelatorio.addEventListener('click', function(){
    $('.relatorio-div').show();
    $('.pagamento-div').hide();
    $('.socio-div').hide();
    $('#cardAddsocio').hide();
})

pageDash.btnAddsocio.addEventListener('click', function(){
    $('#cardAddsocio').show();
    $('.socio-div').hide();
})

pageDash.logoSambo.addEventListener('click', function(){
    window.location = "/dashboard.html";
})
