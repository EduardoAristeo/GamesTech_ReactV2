import axios from 'src/utils/axios';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  nombre: '',
  apellido: '',
  department: '',
  email: '',
  
};

export const UserProfileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Actualiza el estado con los datos del usuario proporcionados en la acción
      state.nombre = action.payload.nombre;
      state.apellido = action.payload.apellido;
      state.department = action.payload.department;
      state.email = action.payload.email;
      
    },
    clearUser: (state) => {
      // Restablece el estado a los valores iniciales
      state.nombre = '';
      state.apellido = '';
      state.department = '';
      state.email = '';
      
    },
  },
});

export const { setUser, clearUser } = UserProfileSlice.actions;

// Acción asíncrona para obtener la información del usuario
export const fetchUser = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/data/user/${userId}`);
    dispatch(setUser(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

// Otra acción asíncrona si quieres actualizar datos del usuario
export const updateUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/data/user/${userData.id}`, userData);
    dispatch(setUser(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export default UserProfileSlice.reducer;
