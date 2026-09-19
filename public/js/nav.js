const boxRegister = document.querySelector(".box-register");

export async function goToWelcome() {

    try {
        const res = await fetch('../public/partials/bemvindo.html');

        if (!res.ok) { throw new Error(`Erro HTTP: ${res.status}`) };

        const campoLogin = await res.text();

        boxRegister.innerHTML = campoLogin;


    } catch (erro) {
        console.log(erro);
    }

}

export async function goToLogin() {

    try {
        const res = await fetch('../public/partials/login.html');

        if (!res.ok) { throw new Error(`Erro HTTP: ${res.status}`) };

        const campoLogin = await res.text();

        boxRegister.innerHTML = campoLogin;


    } catch (erro) {
        console.log(erro);
    }

}

export async function goToRegister() {

    try {
        const res = await fetch('../public/partials/cadastro.html');

        if (!res.ok) { throw new Error(`Erro HTTP: ${res.status}`) };

        const campoLogin = await res.text();

        boxRegister.innerHTML = campoLogin;


    } catch (erro) {
        console.log(erro);
    }

}

export async function goToSucess() {

    try {
        const res = await fetch('../public/partials/sucessfully.html');

        if (!res.ok) { throw new Error(`Erro HTTP: ${res.status}`) };

        const campoLogin = await res.text();

        boxRegister.innerHTML = campoLogin;


    } catch (erro) {
        console.log(erro);
    }

}

export async function goToPerfil() {

    try {
        const res = await fetch('../public/partials/perfil.html');

        if (!res.ok) { throw new Error(`Erro HTTP: ${res.status}`) };

        const campoLogin = await res.text();

        boxRegister.innerHTML = campoLogin;


    } catch (erro) {
        console.log(erro);
    }
}

