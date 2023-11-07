let currentCartId = null;

const createCart = async () => {
    const newCartResponse = await fetch('http://localhost:8080/api/carts/', {
        method: 'POST',
    });

    const result = await newCartResponse.json();
    currentCartId = result.data._id;
    console.log('Nuevo carrito creado con ID:', currentCartId);
    return currentCartId;
};

const addToCart = async (productId) => {
    if (!currentCartId) {
        await createCart();
    }

    // Agrega el producto al carrito utilizando el ID del carrito actual
    await fetch(`http://localhost:8080/api/carts/${currentCartId}/product/${productId}`, {
        method: 'POST',
    });

    console.log('Producto agregado al carrito con ID:', currentCartId);
    return currentCartId;
};

