export function fieldValues() {

    const name = document.querySelector("#name-field")?.value;
    const password = document.querySelector("#password-field")?.value;
    const email = document.querySelector("#email-field")?.value;

    return { name, password, email };

};

export function validarCadastro() {

    const { name, password, email } = fieldValues();

    if (!name || !password || !email) {
        console.log("preencha todos os campos");
        return false;
    }
    if ([password, email].some(campo => campo.length < 6)) {
        console.log("Usuário ou senha muito curtos");
        return false;
    }

    return true;
};


export function validarLogin() {

    const { password, email } = fieldValues();

    if (!password || !email) {
        console.log("preencha todos os campos");
        return false;
    }
    if ([password, email].some(campo => campo.length < 6)) {
        console.log("Usuário ou senha muito curtos");
        return false;
    }

    return true;
};