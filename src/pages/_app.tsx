// client/src/pages/_app.tsx
import '@/styles/globals.css'; // Asegúrate que tus estilos globales estén importados
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store'; // Importa tu store
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/next"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}> {/* Envuelve la app con el Provider */}
      {/* Speed Insights para métricas de rendimiento */}
      <SpeedInsights />
      <Analytics />
      <Component {...pageProps} />
    </Provider>
  );
}
