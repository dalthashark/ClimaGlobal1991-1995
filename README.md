# Climate Intelligence — 1991–1995

Dashboard web para explorar registros meteorológicos diarios del periodo 1991–1995.

**Demo:** [Abrir dashboard en Vercel](https://clima-global1991-1995.vercel.app/)

## Funcionalidades

- Resumen del periodo y contexto del análisis.
- Diez visualizaciones interactivas, con navegación individual:
  1. Evolución mensual de la temperatura media.
  2. Frecuencia de fenómenos meteorológicos.
  3. Temperatura media por mes.
  4. Registros por fenómeno meteorológico.
  5. Relación entre temperatura y humedad, con línea de tendencia.
  6. Distribución de temperaturas.
  7. Velocidad media del viento por año.
  8. Días con y sin precipitación.
  9. Precipitación acumulada por mes.
  10. Precipitación total por año.
- Diseño adaptable a móvil y escritorio.

## Datos y metodología

El dashboard carga sus visualizaciones desde [`src/data/climateData.json`](src/data/climateData.json). El conjunto contiene 1,826 registros diarios del 1 de enero de 1991 al 31 de diciembre de 1995. La línea temporal de temperatura contiene 60 promedios mensuales; las comparaciones mensuales resumen los cinco años y las comparaciones anuales muestran cinco valores. El diagrama de temperatura y humedad utiliza una muestra de 97 observaciones.

La documentación previa identifica como fuente el archivo `82210-1.xlsx`, hoja `Sheet1`, y señala que los guiones se tratan como valores faltantes y no se imputan. El archivo Excel y el notebook de Colab no están incluidos en este repositorio, por lo que las transformaciones y la procedencia no pueden reproducirse aquí de forma independiente. Las unidades y la ubicación/cobertura geográfica tampoco están especificadas en el código; consulta la fuente original antes de interpretar o reutilizar las cifras.

Los registros de distintos fenómenos meteorológicos pueden coincidir en un mismo día. Por ello, el gráfico circular de fenómenos compara las ocurrencias registradas por categoría y no representa necesariamente una partición de días únicos.

Este proyecto presenta análisis exploratorio: no incluye un modelo predictivo entrenado ni una API de inferencia.

## Desarrollo local

Requisitos: Node.js y npm, en versiones compatibles con Vite 6.

```bash
npm install
npm run dev
```

Para generar y previsualizar la compilación de producción:

```bash
npm run build
npm run preview
```

## Tecnologías

- React 18
- Vite 6
- Recharts
- Lucide React
- CSS responsive

## Despliegue

El proyecto está desplegado en Vercel. Para desplegar una copia, configura el proyecto con el framework Vite, el comando de compilación `npm run build` y el directorio de salida `dist`.

## Atribuciones

El globo animado del encabezado es [Rotating Earth](https://commons.wikimedia.org/wiki/File:Rotating_earth_(large)_transparent.gif), de Jahobr, bajo licencia [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
