const productList = () => {
    return fetch('https://alura-geek-api-dun.vercel.app/Products').then(response => response.json()).catch(error => console.error(error));
}

const createProduct = (nome, valor, imagem) => {
    return fetch('https://alura-geek-api-dun.vercel.app/Products', 
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
    return fetch(`https://alura-geek-api-dun.vercel.app/Products/${id}`,
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