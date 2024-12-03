import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1'; // Ajusta la URL de tu API según corresponda

// Función para agregar una reparación
export const addReparacion = async (reparacionData) => {
  try {
    const response = await axios.post(`${API_URL}/reparaciones`, reparacionData);
    return response.data; // Retorna los datos de la reparación registrada
  } catch (error) {
    console.error('Error al agregar la reparación:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Función para obtener todas las reparaciones
export const getReparaciones = async () => {
  try {
    const response = await axios.get(`${API_URL}/reparaciones`);
    return response.data; // Retorna la lista de reparaciones
  } catch (error) {
    console.error('Error al obtener las reparaciones:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Función para obtener una reparación por ID
export const getReparacionById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/reparaciones/${id}`);
    return response.data; // Retorna los datos de la reparación
  } catch (error) {
    console.error('Error al obtener la reparación:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Actualizar una reparación
export const updateReparacion = async (id, reparacionData) => {
  try {
    const response = await axios.put(`${API_URL}/reparaciones/${id}`, reparacionData);
    return response.data; // Retorna los datos actualizados de la reparación
  } catch (error) {
    console.error('Error al actualizar la reparación:', error);
    throw error;
  }
};

export const updateMultipleReparaciones = async (ids, newStatus, tecnicoId) => {
  try {
    const response = await axios.put(`${API_URL}/reparaciones/update-status`, {
      ids,
      newStatus,
      tecnicoId,
    });
    return response.data; // Retorna los datos actualizados
  } catch (error) {
    console.error('Error al actualizar múltiples reparaciones:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};



// Obtener reparaciones agrupadas por marca del día actual
export const getReparacionesPorFechaYMarca = async () => {
  try {
    const response = await axios.get(`${API_URL}/reparaciones/por-fecha-y-marca`);
    return response.data; // Retorna los datos agrupados
  } catch (error) {
    console.error('Error al obtener reparaciones por fecha y marca:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Función para obtener las reparaciones en formato de tabla
export const getTablaReparaciones = async () => {
  try {
    const response = await axios.get(`${API_URL}/reparaciones/tabla`);
    return response.data; // Retorna los datos en formato de tabla
  } catch (error) {
    console.error('Error al obtener las reparaciones en formato de tabla:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Función para eliminar una reparación
export const deleteReparacion = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/reparaciones/${id}`);
    return response.data; // Retorna la respuesta de la eliminación
  } catch (error) {
    console.error('Error al eliminar la reparación:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};


/* Reparaciones por Categoría */
export const getReparacionesPorCategoria = async (fechaInicio, fechaFin) => {
  try {
    const response = await fetch(`http://localhost:4000/api/v1/reparaciones/reparaciones-por-categoria?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener las reparaciones por categoría');
    }

    return response.json();
  } catch (error) {
    console.error('Error al obtener las reparaciones por categoría:', error);
    throw error;
  }
};

/* Reparaciones por Técnico */
export const getReparacionesPorTecnico = async (fechaInicio, fechaFin) => {
  try {
    const response = await fetch(`http://localhost:4000/api/v1/reparaciones/reparaciones-por-tecnico?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener las reparaciones por técnico');
    }

    return response.json();
  } catch (error) {
    console.error('Error al obtener las reparaciones por técnico:', error);
    throw error;
  }
};

/* Reparaciones por Estatus */
export const getReparacionesPorEstatus = async (fechaInicio, fechaFin) => {
  try {
    const response = await fetch(`http://localhost:4000/api/v1/reparaciones/reparaciones-por-estatus?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener las reparaciones por estatus');
    }

    return response.json();
  } catch (error) {
    console.error('Error al obtener las reparaciones por estatus:', error);
    throw error;
  }
};

/* Reparaciones por Falla */
export const getReparacionesPorFalla = async (fechaInicio, fechaFin) => {
  try {
    const response = await fetch(`http://localhost:4000/api/v1/reparaciones/reparaciones-por-falla?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener las reparaciones por falla');
    }

    return response.json();
  } catch (error) {
    console.error('Error al obtener las reparaciones por falla:', error);
    throw error;
  }
};

// Obtener reparaciones por marca
export const getReparacionesPorMarca = async (fechaInicio, fechaFin) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/v1/reparaciones/reparaciones-por-marca?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error('Error al obtener reparaciones por marca');
    }
    return response.json();
  } catch (error) {
    console.error('Error al obtener reparaciones por marca:', error);
    throw error;
  }
};

// Obtener reparaciones por marca
export const getReporteReparaciones = async (fechaInicio, fechaFin) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/v1/reparaciones/reporte-general?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error('Error al obtener reparaciones por marca');
    }
    return response.json();
  } catch (error) {
    console.error('Error al obtener reparaciones por marca:', error);
    throw error;
  }
};


