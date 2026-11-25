# Climate Intelligence — 1991–1995

Dashboard web para presentar el análisis climático desarrollado en la Fase 1 de Google Colab.

LINK VERCEL: clima-global1991-1995-qfgf6j99g-dalthashark.vercel.app

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


## Datos meteorológicos incorporados

Se añadieron visualizaciones y métricas calculadas desde el archivo fuente `82210-1.xlsx` (hoja `Sheet1`):

- 1,826 registros diarios, del 01/01/1991 al 31/12/1995.
- 20 columnas: fecha desglosada, temperaturas, presión, humedad, precipitación, visibilidad, viento e indicadores de fenómenos.
- Diez visualizaciones interactivas construidas con Recharts a partir de los datos del Excel.
- Los valores `-` se interpretan como faltantes; no se imputan.
- La primera serie muestra promedios mensuales derivados de los registros diarios; el diagrama de dispersión utiliza una muestra de observaciones para facilitar su lectura.

**Importante:** el dashboard presenta análisis exploratorio de datos. El notebook y el Excel no incluyen un modelo predictivo entrenado ni una API de inferencia, por lo que la sección de consumo de IA permanece pendiente hasta disponer de ese modelo.
