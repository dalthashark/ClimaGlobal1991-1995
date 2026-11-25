import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis, Legend
} from 'recharts'
import data from '../data/climateData.json'

const mint = '#8bd8bd'
const palette = ['#8bd8bd', '#d8b978', '#83a9d4', '#b99bd8', '#d98e91', '#8ca7a0']
const axis = { fill: '#a9bcb4', fontSize: 11 }
const tooltipStyle = {
  background: '#ffffff',
  border: '1px solid #d7e2df',
  borderRadius: 9,
  color: '#20343b',
  fontSize: 12,
  boxShadow: '0 8px 24px rgba(20,38,45,.14)'
}
const tooltipItemStyle = { color: '#20343b', padding: '2px 0' }
const tooltipLabelStyle = { color: '#526b70', fontWeight: 600, marginBottom: 4 }
const legendStyle = { fontSize: 11, color: '#b6c8bf', paddingTop: 10 }
const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

function formatMonth(value) {
  const [year, month] = value.split('-')
  return `${monthNames[Number(month) - 1]} '${year.slice(2)}`
}

function ChartFrame({ number, title, subtitle, explanation, children }) {
  return (
    <article className="chart-card">
      <div className="chart-heading">
        <div className="chart-heading-copy">
          <span className="chart-number">GRÁFICO {number} / 10</span>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <span className="chart-kind">DATOS 1991–1995</span>
      </div>
      <div className="chart-plot">{children}</div>
      <div className="chart-explanation">
        <span className="explanation-label">LECTURA BREVE</span>
        <p>{explanation}</p>
      </div>
    </article>
  )
}

function ChartVisuals() {
  const [activeIndex, setActiveIndex] = useState(0)

  const charts = [
    <ChartFrame
      key="temperature-timeline"
      number="01"
      title="Evolución de la temperatura media"
      subtitle="Promedio mensual calculado a partir de los registros diarios · 1991–1995"
      explanation="La temperatura sube hacia la mitad del año y desciende al inicio y al final. El patrón permite reconocer la variación estacional durante los cinco años."
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.temperatureTimeline} margin={{ top: 18, right: 24, left: 4, bottom: 12 }}>
          <CartesianGrid stroke="rgba(193,220,211,.12)" strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={axis} tickFormatter={formatMonth} interval={5} minTickGap={12} />
          <YAxis tick={axis} />
          <Tooltip contentStyle={tooltipStyle} itemStyle={tooltipItemStyle} labelStyle={tooltipLabelStyle} labelFormatter={formatMonth} />
          <Line type="monotone" dataKey="value" name="Temperatura media" stroke={mint} strokeWidth={3} dot={false} activeDot={{ r: 6, stroke: '#0f2028', strokeWidth: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>,

    <ChartFrame
      key="weather-events-share"
      number="02"
      title="Proporción de fenómenos meteorológicos"
      subtitle="Distribución de los días con ocurrencia registrada por fenómeno"
      explanation="La lluvia o llovizna es el fenómeno más frecuente. La niebla y las tormentas aparecen con menor frecuencia; no se registraron tornados en este conjunto."
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data.events.filter(item => item.days > 0)} dataKey="days" nameKey="name" innerRadius="48%" outerRadius="72%" paddingAngle={3} stroke="none">
            {data.events.filter(item => item.days > 0).map((item, index) => (
              <Cell key={item.name} fill={palette[index % palette.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} itemStyle={tooltipItemStyle} labelStyle={tooltipLabelStyle} />
          <Legend verticalAlign="bottom" align="center" wrapperStyle={legendStyle} />
        </PieChart>
      </ResponsiveContainer>
    </ChartFrame>,

    <ChartFrame
      key="monthly-temperature"
      number="03"
      title="Temperatura media por mes"
      subtitle="Promedio de cada mes considerando los cinco años"
      explanation="Julio y agosto presentan las temperaturas medias más altas. Enero y febrero muestran los promedios más bajos del periodo."
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data.monthly} margin={{ top: 18, right: 24, left: 4, bottom: 12 }}>
          <CartesianGrid stroke="rgba(193,220,211,.12)" vertical={false} />
          <XAxis dataKey="month" tick={axis} />
          <YAxis tick={axis} />
          <Tooltip contentStyle={tooltipStyle} itemStyle={tooltipItemStyle} labelStyle={tooltipLabelStyle} />
          <Bar dataKey="temperature" name="Temperatura media" fill={mint} radius={[7, 7, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>,

    <ChartFrame
      key="weather-events-frequency"
      number="04"
      title="Frecuencia de fenómenos meteorológicos"
      subtitle="Cantidad de días registrados para cada fenómeno"
      explanation="La lluvia o llovizna acumula 430 registros, por encima de la niebla y las tormentas. El gráfico permite comparar rápidamente la frecuencia de cada evento."
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data.events} layout="vertical" margin={{ top: 12, right: 28, left: 18, bottom: 12 }}>
          <CartesianGrid stroke="rgba(193,220,211,.12)" horizontal={false} />
          <XAxis type="number" tick={axis} />
          <YAxis type="category" dataKey="name" tick={{ ...axis, fontSize: 11 }} width={150} />
          <Tooltip contentStyle={tooltipStyle} itemStyle={tooltipItemStyle} labelStyle={tooltipLabelStyle} />
          <Bar dataKey="days" name="Días registrados" fill="#83a9d4" radius={[0, 7, 7, 0]} maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>,

    <ChartFrame
      key="temperature-humidity"
      number="05"
      title="Relación entre temperatura y humedad"
      subtitle="Muestra de observaciones diarias · cada punto representa un registro"
      explanation="En la muestra se observa una tendencia general: los días más cálidos suelen presentar menor humedad relativa, aunque existen variaciones entre observaciones."
    >
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 18, right: 24, left: 8, bottom: 12 }}>
          <CartesianGrid stroke="rgba(193,220,211,.12)" />
          <XAxis type="number" dataKey="temp" name="Temperatura media" tick={axis} />
          <YAxis type="number" dataKey="humidity" name="Humedad relativa" tick={axis} />
          <ZAxis range={[42, 42]} />
          <Tooltip cursor={{ strokeDasharray: '4 4' }} contentStyle={tooltipStyle} itemStyle={tooltipItemStyle} labelStyle={tooltipLabelStyle} />
          <Scatter data={data.scatter} fill={mint} fillOpacity={0.78} />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartFrame>,

    <ChartFrame
      key="temperature-distribution"
      number="06"
      title="Distribución de temperaturas"
      subtitle="Cantidad de registros agrupados por intervalo de temperatura"
      explanation="La mayor concentración de registros está entre 5 y 15 grados, especialmente en el intervalo de 5 a 10. Los valores extremos aparecen con menor frecuencia."
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data.histogram} margin={{ top: 18, right: 24, left: 4, bottom: 12 }}>
          <CartesianGrid stroke="rgba(193,220,211,.12)" vertical={false} />
          <XAxis dataKey="range" tick={{ ...axis, fontSize: 10 }} />
          <YAxis tick={axis} />
          <Tooltip contentStyle={tooltipStyle} itemStyle={tooltipItemStyle} labelStyle={tooltipLabelStyle} />
          <Bar dataKey="count" name="Registros" fill="#b99bd8" radius={[7, 7, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>,

    <ChartFrame
      key="yearly-wind"
      number="07"
      title="Velocidad media del viento por año"
      subtitle="Promedio anual calculado con los registros disponibles"
      explanation="El promedio anual del viento aumenta gradualmente: pasa de 8.88 en 1991 a 9.92 en 1995. La diferencia entre años es moderada."
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.yearly} margin={{ top: 18, right: 24, left: 4, bottom: 12 }}>
          <CartesianGrid stroke="rgba(193,220,211,.12)" strokeDasharray="3 3" />
          <XAxis dataKey="year" tick={axis} />
          <YAxis tick={axis} />
          <Tooltip contentStyle={tooltipStyle} itemStyle={tooltipItemStyle} labelStyle={tooltipLabelStyle} />
          <Line type="monotone" dataKey="wind" name="Velocidad media del viento" stroke="#d8b978" strokeWidth={3} dot={{ r: 5, fill: '#d8b978', stroke: '#0f2028', strokeWidth: 2 }} activeDot={{ r: 7 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>,

    <ChartFrame
      key="precipitation-days"
      number="08"
      title="Días con y sin precipitación"
      subtitle="Clasificación según la precipitación diaria registrada"
      explanation="Se registraron 298 días con precipitación y 1,526 sin precipitación. Por lo tanto, predominan claramente los días secos en el conjunto analizado."
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data.precipitationDays} dataKey="days" nameKey="name" innerRadius="48%" outerRadius="72%" paddingAngle={3} stroke="none">
            {data.precipitationDays.map((item, index) => (
              <Cell key={item.name} fill={index === 0 ? '#83a9d4' : mint} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} itemStyle={tooltipItemStyle} labelStyle={tooltipLabelStyle} />
          <Legend verticalAlign="bottom" align="center" wrapperStyle={legendStyle} />
        </PieChart>
      </ResponsiveContainer>
    </ChartFrame>,

    <ChartFrame
      key="monthly-precipitation"
      number="09"
      title="Precipitación acumulada por mes"
      subtitle="Suma de la precipitación registrada en cada mes durante los cinco años"
      explanation="Octubre y noviembre concentran los mayores acumulados mensuales. Julio y agosto presentan los valores más bajos en el periodo."
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data.monthly} margin={{ top: 18, right: 24, left: 4, bottom: 12 }}>
          <CartesianGrid stroke="rgba(193,220,211,.12)" vertical={false} />
          <XAxis dataKey="month" tick={axis} />
          <YAxis tick={axis} />
          <Tooltip contentStyle={tooltipStyle} itemStyle={tooltipItemStyle} labelStyle={tooltipLabelStyle} />
          <Bar dataKey="rain" name="Precipitación acumulada" fill="#83a9d4" radius={[7, 7, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>,

    <ChartFrame
      key="yearly-precipitation"
      number="10"
      title="Precipitación total por año"
      subtitle="Acumulado anual de precipitación registrado entre 1991 y 1995"
      explanation="1995 registra la mayor precipitación anual, con 559.80. El menor acumulado corresponde a 1994, con 276.35."
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data.yearly} layout="vertical" margin={{ top: 16, right: 28, left: 8, bottom: 12 }}>
          <CartesianGrid stroke="rgba(193,220,211,.12)" horizontal={false} />
          <XAxis type="number" tick={axis} />
          <YAxis type="category" dataKey="year" tick={axis} />
          <Tooltip contentStyle={tooltipStyle} itemStyle={tooltipItemStyle} labelStyle={tooltipLabelStyle} />
          <Bar dataKey="rain" name="Precipitación total" fill={mint} radius={[0, 7, 7, 0]} maxBarSize={34} />
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  ]

  const goToPrevious = () => setActiveIndex(current => Math.max(0, current - 1))
  const goToNext = () => setActiveIndex(current => Math.min(charts.length - 1, current + 1))
  const progress = ((activeIndex + 1) / charts.length) * 100

  return (
    <>
      {charts[activeIndex]}
      <nav className="chart-navigation" aria-label="Navegación de gráficos">
        <button className="chart-nav-button" type="button" onClick={goToPrevious} disabled={activeIndex === 0}>
          <ChevronLeft size={17} />
          <span>Anterior</span>
        </button>
        <div className="chart-progress" aria-live="polite">
          <div className="chart-progress-meta">
            <span>GRÁFICO {String(activeIndex + 1).padStart(2, '0')} DE {charts.length}</span>
            <strong>{Math.round(progress)}%</strong>
          </div>
          <div className="chart-progress-track">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
        <button className="chart-nav-button chart-next-button" type="button" onClick={goToNext} disabled={activeIndex === charts.length - 1}>
          <span>Siguiente</span>
          <ChevronRight size={17} />
        </button>
      </nav>
    </>
  )
}

export { ChartVisuals, data }
