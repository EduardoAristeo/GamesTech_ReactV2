import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userProfile: {
    id: '',
    department: '',
    nombre: '',
    apellido: '',
    email: '',
    fecha_ingreso: '',
  },
};

export const UserProfileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userProfile = {
        id: action.payload.id || '',
        department: action.payload.department || '',
        nombre: action.payload.nombre || '',
        apellido: action.payload.apellido || '',
        email: action.payload.email || '',
        fecha_ingreso: action.payload.fecha_ingreso || '',
      };
    },
    clearUser: (state) => {
      state.userProfile = initialState.userProfile; // Restablece a los valores iniciales
    },
  },
});

export const { setUser, clearUser } = UserProfileSlice.actions;

export default UserProfileSlice.reducer;
