import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1'; // Ajusta la URL según tu configuración

// Función para agregar un cliente
export const addCliente = async (clienteData) => {
  try {
    const response = await axios.post(`${API_URL}/clients`, clienteData);
    return response.data; // Retorna los datos del cliente registrado
  } catch (error) {
    console.error('Error al agregar el cliente:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Función para buscar un cliente
export const findCliente = async (query) => {
  try {
    const response = await axios.post(`${API_URL}/clients/search`, query);
    return response.data; // Retorna los datos del cliente encontrado
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // Si no se encuentra el cliente, retorna null
    }
    console.error('Error al buscar el cliente:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Función para obtener todos los clientes
export const getClients = async () => {
  try {
    const response = await axios.get(`${API_URL}/clients`);
    return response.data; // Retorna la lista de clientes
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Función para obtener un cliente por ID
export const getClienteById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/clients/${id}`);
    return response.data; // Retorna los datos del cliente
  } catch (error) {
    console.error('Error al obtener el cliente:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Función para actualizar un cliente
export const updateCliente = async (id, clienteData) => {
  try {
    const response = await axios.put(`${API_URL}/clients/${id}`, clienteData);
    return response.data; // Retorna los datos actualizados del cliente
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Función para eliminar un cliente
export const deleteCliente = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/clients/${id}`);
    return response.data; // Retorna la respuesta de la eliminación
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

