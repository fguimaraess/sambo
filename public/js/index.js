var pageIndex = {
    loginField: document.querySelector('#login-field'),
    passwordField: document.querySelector('#password-field'),
    btnEntrar: document.querySelector('#btn-login-field'),
    btnEsqueciSenha: document.querySelector('#btn-modal'),
    database: firebase.database(),
    btnReset: document.querySelector('#btn-reset'),
    emailField: document.querySelector('#email-field')
}

pageIndex.btnEntrar.addEventListener('click', function () {
    var user = firebase.auth().signInWithEmailAndPassword(pageIndex.loginField.value, pageIndex.passwordField.value).then(function () {
        swal({
            title: "Sambô",
            text: "Você será direcionado para a página principal",
            type: "success",
            showConfirmButton: true
        }, function () {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    window.location = "/dashboard.html";
                } else {
                    window.location = "/index.html";
                }
            });

        });
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/wrong-password') {
            swal('Erro', 'Senha incorreta.', 'error');
        } else if (errorCode == 'auth/user-not-found') {
            swal('Erro', 'Usuário não encontrado', 'error');
        } else {
            alert(errorMessage);
        }
        //console.log(error);
    });
    var user = firebase.auth().currentUser;
})

pageIndex.btnReset.addEventListener('click', function () {
    var auth = firebase.auth();
    var email = pageIndex.emailField.value

    auth.sendPasswordResetEmail(email).then(function () {
            swal('', 'Email enviado com sucesso', 'success')
        },
        function (error) {
            swal('', "Erro: " + error, 'error')
        }
    );
});

$(document).ready(function () {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});

pageIndex.btnEsqueciSenha.addEventListener('click', function () {
    $('#modalSenha').modal('open');
});


//usar enter para logar
pageIndex.passwordField.addEventListener('keyup', function (event) {
    event.preventDefault();
    if (event.keyCode == 13) pageIndex.btnEntrar.click();
});

//usar enter para o reset de sennha
pageIndex.emailField.addEventListener('keyup', function (event) {
    event.preventDefault();
    if (event.keyCode == 13) pageIndex.btnReset.click();
});

//MÉTODO PARA CADASTRAR USUARIO
/*
firebase.auth().createUserWithEmailAndPassword(pageIndex.loginField.value, pageIndex.passwordField.value).then(function(user){
        saveUser(user);
        swal("", "Usuário Confirmado", "success");
    })
    .then(function(){
        window.location = 'www.google.com';
    })
    .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode == "auth/wrong-password"){
            swal("Erro", "Senha incorreta", "error");
        }
    });
    
})
function saveUser(usuario){
    firebase.database().ref('users/'+usuario.uid).set({
        usuario: pageIndex.loginField.value,
        senha: pageIndex.passwordField.value
    })
*/