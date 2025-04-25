// client/store/index.ts
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Ejemplo de slice “dummy” para asegurar que el store tiene al menos un reducer válido.
// Más adelante sustituye o amplia con slices reales (authSlice, userSlice, etc.).
const dummySlice = createSlice({
  name: 'dummy',
  initialState: {},
  reducers: {
    // Por ahora no necesitamos acciones; este slice solo evita el error de “no reducer”
  },
});

export const store = configureStore({
  reducer: {
    dummy: dummySlice.reducer,
    // Aquí irían tus futuros reducers/slices:
    // auth: authReducer,
    // posts: postsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Si en el futuro necesitas ignorar checks de serialización:
      // serializableCheck: {
      //   ignoredActions: ['tu/accion/noSerializable'],
      // },
    }),
});

// Inferimos tipos a partir del store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
