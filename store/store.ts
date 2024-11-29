import { configureStore } from "@reduxjs/toolkit";
import { cameraApi } from "./api/cameraApi";
// ...

export const store = configureStore({
  reducer: {
    [cameraApi.reducerPath]: cameraApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([cameraApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
