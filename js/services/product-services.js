const productList = () => {
    return fetch('http://localhost:3000/Products').then(response => response.json()).catch(error => console.error(error));
}

const createProduct = (nome, valor, imagem) => {
    return fetch('http://localhost:3000/Products', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: nome,
            valor: valor,
            imagem: imagem
        })
    }
    )
    .then(response => response.json())
    .catch(error => console.error(error));
}

const deleteProduct = (id) => {
    return fetch(`http://localhost:3000/Products/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    .then(response => response.json())
    .catch(error => console.error(error));
}

export const serviceProducts = {
    productList,
    createProduct,
    deleteProduct
}