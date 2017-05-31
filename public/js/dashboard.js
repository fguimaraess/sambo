var pageDash = {
    btnUsuario: document.querySelector('#btn-logout'),
    btnSocio: document.querySelector("#socios-dashboard"),
    btnPgto: document.querySelector("#pagamentos-dashboard"),
    btnRelatorio: document.querySelector("#relatorios-dashboard"),
    logoSambo: document.querySelector("#logo-sambo"),
    birthDate: document.querySelector("#datanascimento-field")
}

window.addEventListener('load', function () {
    getSocio();
    getPagamentosSocios();
});
/*window.addEventListener('load', function () {
        var user = firebase.auth().currentUser;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                window.location = "/dashboard.html";
            }else {
                window.location = "/index.html"
            }
        });
}*/
pageDash.btnSocio.addEventListener('click', function () {
    $('.socio-div').show();
    $('#campos-socio').show();
    $('#cardAddsocio').hide();
    $('.pagamento-div').hide();
    $('.relatorio-div').hide();
});

pageDash.btnPgto.addEventListener('click', function () {
    $('.pagamento-div').show();
    $('#campos-Pgto').show();
    $('#cardAddPgto').hide();
    $('.relatorio-div').hide();
    $('.socio-div').hide();
});

pageDash.btnRelatorio.addEventListener('click', function () {
    $('.relatorio-div').show();
    $('.pagamento-div').hide();
    $('.socio-div').hide();
})



pageDash.logoSambo.addEventListener('click', function () {
    window.location = "/dashboard.html";
})

$(document).ready(function () {
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year

        //altera linguagem do botão de navegação do mês no datepicker
        labelMonthNext: 'Mês seguinte',
        labelMonthPrev: 'Mês anterior',

        //altera linguagem da label no dropdown de mês e ano
        labelMonthSelect: 'Selecione o Mês',
        labelYearSelect: 'Selecione o Ano',

        //altera linguagem dos dias e meses
        monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdaysFull: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        weekdaysLetter: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],

        //altera a linguagem dos botões
        today: 'Hoje',
        clear: 'Limpar',
        close: 'Fechar',

        //Formato de data
        format: 'dd/mm/yyyy'
    });
});




pageDash.btnUsuario.addEventListener('click', function () {
    swal({
        title: "Logout",
        type: "warning",
        text: "Deseja sair do Sambô?",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        showConfirmButton: true,
        confirmButtonText: "Sim",
        closeOnConfirm: false
    }, function () {
        firebase.auth().signOut().then(function () {
             window.location = "/index.html";
        }, function (error) {
            alert(error);
        });
    });
});