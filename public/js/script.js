import { goToWelcome, goToRegister, goToLogin, goToSucess, goToPerfil } from './nav.js';
import { animetedCard } from './animation.js';
import { fieldValues, validarCadastro, validarLogin } from './valida.js';

const boxRegister = document.querySelector(".box-register");
const binding = document.querySelector("#binding");

goToWelcome();

async function criarUsuario() {

    try {
        const { name, password, email } = fieldValues();

        const user = await fetch('http://localhost:3000/users/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, password: password, email: email })
        })

        if (!user.ok) { return false; }

        return true;

    } catch (error) {
        console.log(error);
        return false;
    }

}

async function login() {

    try {
        const { email, password } = fieldValues();

        const user = await fetch('http://localhost:3000/users/login', {

            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })

        });

        if (!user.ok) { return false; }

        const resposta = await user.json();
        const token = resposta.token;

        localStorage.setItem("token", token);

        return true;

    }
    catch (error) {
        console.log(error);
        return false;
    }
};

async function buscarPerfil() {

    const buscarP = await fetch('http://localhost:3000/users/perfil', {

        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }

    });

    console.log(buscarP);

}


boxRegister.addEventListener('click', async (e) => {


    if (e.target.classList.contains("btn-cadastro")) {
        animetedCard(-500, "hidden", 500);
        binding.classList.replace("col-2", "col-3");
        setTimeout(() => {
            goToRegister();
            animetedCard(500, "visible", 0);

        }, 500)

    }

    if (e.target.classList.contains('btn-cadastrar')) {

        if (!validarCadastro()) return;

        const sucesso = await criarUsuario();

        if(!sucesso) return;

        animetedCard(-500, "hidden", 500);
        binding.classList.replace("col-3", "col-2");
        setTimeout(() => {
            goToSucess();
            animetedCard(500, "visible", 0);

        }, 500)

    }

    if (e.target.classList.contains("btn-login")) {

        animetedCard(-500, "hidden", 500);
        binding.classList.replace("col-2", "col-3");
        setTimeout(() => {
            goToLogin();
            animetedCard(500, "visible", 0);

        }, 500)
    }

    if (e.target.classList.contains("btn-entrar")) {

        if(!validarLogin()) return;

        const sucesso = await login();

        if (!sucesso) return;

        await buscarPerfil();

        animetedCard(-1000, "hidden", 1000);

        setTimeout(() => {
            binding.classList.replace("col-3", "col-8");
            binding.classList.replace("auto-h", "h-8");
            goToPerfil();
            animetedCard(1000, "visible", 0);
        }, 500)


    }

    if (e.target.classList.contains("btn-voltar")) {
        animetedCard(500, "hidden", -500);
        binding.classList.replace("col-3", "col-2");
        setTimeout(() => {
            goToWelcome();
            animetedCard(-500, "visible", 0);

        }, 500)
    }

    if (e.target.classList.contains("btn-logout")) {

        localStorage.removeItem("token");

        animetedCard(1000, "hidden", -1000);

        setTimeout(() => {
            binding.classList.replace("col-8", "col-3");
            binding.classList.replace("h-8", "auto-h");
            goToLogin();
            animetedCard(-1000, "visible", 0);
        }, 500)
    }




});

