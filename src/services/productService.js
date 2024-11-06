// services/api.js
export const addProduct = async (productData) => {
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
  