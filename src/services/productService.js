// services/api.js
export const addProduct = async (productData) => {
<<<<<<< HEAD
    try {
      const response = await fetch('http://localhost:4000/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      return response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  
  export const uploadImage = async (productId, file) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('productId', productId);
  
    try {
      const response = await fetch('http://localhost:4000/api/v1/products/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Error al subir la imagen');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw error;
    }
<<<<<<< Updated upstream
  };
  
=======

=======
  try {
    const response = await fetch('http://localhost:4000/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    return response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const uploadImage = async (productId, file) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('productId', productId);

  try {
    const response = await fetch('http://localhost:4000/api/v1/products/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error al subir la imagen');
    }

    return response.json();
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    throw error;
  }
};
/* List */
export const getProducts = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/v1/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }

>>>>>>> 1479dc6 (Revert "Revert "solo me falta la categoria y la imagen en la pagina de productEdit"")
    return response.json(); // Devuelve los datos de la respuesta
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await fetch(`http://localhost:4000/api/v1/products/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener el producto');
    }

    return response.json();
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    throw error;
  }
};
export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await fetch(`http://localhost:4000/api/v1/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el producto');
    }

    return response.json();
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    throw error;
  }
};
<<<<<<< HEAD
// services/api.js

export const getCategories = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/v1/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener las categorías');
    }

    return response.json();
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    throw error;
  }
};
>>>>>>> Stashed changes
=======
>>>>>>> 1479dc6 (Revert "Revert "solo me falta la categoria y la imagen en la pagina de productEdit"")
