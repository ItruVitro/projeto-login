const boxRegister = document.querySelector(".box-register");

export function animetedCard(eixoInicial, visibility, eixoFinal) {

    boxRegister.style.transform = `translateX(${eixoInicial}px)`;
    setTimeout(() => {
        boxRegister.style.visibility = `${visibility}`;
        boxRegister.style.transform = `translateX(${eixoFinal}px)`;
    }, 500);


};