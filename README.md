# Climate Intelligence — 1991–1995

Dashboard web para presentar el análisis climático desarrollado en la Fase 1 de Google Colab.

## Estado

- Interfaz inicial del dashboard.
- Sección de contexto y visualizaciones preparada para incorporar los gráficos reales de Matplotlib.
- Sección de modelo IA preparada para conectar el modelo entrenado.

> Importante: los gráficos, métricas y predicciones reales deben importarse desde el notebook de la Fase 1. No se muestran cifras ficticias como resultados científicos.

## Desarrollo

```bash
npm install
npm run dev
```

## Tecnologías

- React + Vite
- Recharts
- Lucide React
- CSS responsive

## Despliegue

Configurar el proyecto en Vercel con framework Vite y comando de build `npm run build`, directorio de salida `dist`.

## Integración pendiente

Para conectar los resultados reales, añadir los PNG exportados desde Matplotlib y definir el endpoint/API del modelo entrenado en Colab.
