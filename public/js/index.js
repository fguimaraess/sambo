var pageIndex = {
    loginField: document.querySelector('#login-field'),
    passwordField: document.querySelector('#password-field'),
    btnEntrar: document.querySelector('#btn-login-field'),
    database: firebase.database()
}

pageIndex.btnEntrar.addEventListener('click', function(){
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