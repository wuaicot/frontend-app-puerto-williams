import { configureStore } from '@reduxjs/toolkit';
// Importa tus reducers/slices aquí a medida que los crees
// import authReducer from '../features/auth/authSlice'; // Ejemplo

export const store = configureStore({
  reducer: {
    // Añade tus reducers aquí:
    // auth: authReducer, // Ejemplo
  },
  // Middleware predeterminado de Redux Toolkit ya incluye thunk y chequeos de inmutabilidad, etc.
  // Puedes añadir middleware adicional aquí si es necesario
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    // Opcional: Configurar serialización si usas tipos no serializables en el estado (ej: Date),
    // pero es mejor evitarlos en el estado de Redux.
    // serializableCheck: {
    //   ignoredActions: ['your/action/type'],
    //   ignoredPaths: ['some.nested.path'],
    // },
  }),
  devTools: process.env.NODE_ENV !== 'production', // Habilita Redux DevTools solo en desarrollo
});

// Inferir los tipos `RootState` y `AppDispatch` del propio store
export type RootState = ReturnType<typeof store.getState>;
// Tipo recomendado para dispatch, soporta thunks
export type AppDispatch = typeof store.dispatch;