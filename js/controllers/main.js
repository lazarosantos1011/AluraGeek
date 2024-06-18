import { serviceProducts } from "../services/product-services.js";

const productContainer = document.querySelector('[data-product-list]');
const btnLimpar = document.querySelector('#botao-limpar');
const form = document.querySelector('[data-form]');


function createElement(nome, preco, imagem, id) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <div class="img-container">
            <img class="img__container__imagem" src="${imagem}" alt="${nome}">
        </div>

        <div class="card-container--info">
            <p class="card-container--nome">${nome}</p>
            <div class="card-container--valor">
                <p>Valor: $ ${preco}</p>
                <button class="card-container__delete-button" data-id="${id}">
                    <img src="./assets/Vector.svg" alt="Ícone de exclusão">
                </button>
            </div>
        </div>
    `

    productContainer.appendChild(card);

    const btnDeletar = card.querySelector('.card-container__delete-button');
    btnDeletar.addEventListener('click', (event) => {
        const id = event.target.closest('.card').querySelector('.card-container__delete-button').dataset.id;

        serviceProducts.deleteProduct(id)
        .then((response) => {
            console.log(response)
            
            // Remove o card do DOM após a exclusão
            card.remove();
        })
        .catch((error) => console.error(error));
    });

    return card;
}

const render = async () => {
    try {
        const listProduct = await serviceProducts.productList();
        
        listProduct.forEach(product => {
            productContainer.appendChild(createElement(product.nome, product.valor, product.imagem, product.id));
        })
    } catch (error) {
        console.log(error);
    }
};

render();

form.addEventListener('submit', () => {

    const nome = document.querySelector('[data-nome]').value;
    const valor = document.querySelector('[data-valor]').value;
    const imagem = document.querySelector('[data-imagem]').value;

    serviceProducts.createProduct(nome, valor, imagem).then((response) => console.log(response)).catch((error) => console.error(error));
});

btnLimpar.addEventListener('click', (event) => {
    event.preventDefault();
    form.reset();
});

