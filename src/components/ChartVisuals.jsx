import data from '../data/climateData.json'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts'

const mint = '#8bd8bd'
const palette = ['#8bd8bd','#d8b978','#83a9d4','#b99bd8','#d98e91','#8ca7a0']
const axis = { fill:'#82978f', fontSize:10 }
const tooltipStyle = { background:'#14262d', border:'1px solid rgba(193,220,211,.18)', borderRadius:8, color:'#edf5f1', fontSize:11 }
function ChartFrame({number,title,subtitle,children}) {
  return <article className="chart-card">
    <div className="chart-heading"><div><span className="chart-number">{number} / 10</span><h3>{title}</h3><p>{subtitle}</p></div></div>
    <div className="chart-plot">{children}</div>
  </article>
}
function ChartVisuals() {
 return <>
  <ChartFrame number="01" title="Temperatura media diaria" subtitle="Promedio mensual calculado a partir de los registros diarios · 1991–1995">
   <ResponsiveContainer width="100%" height="100%"><LineChart data={data.temperatureTimeline} margin={{top:10,right:12,left:-18,bottom:4}}><CartesianGrid stroke="rgba(193,220,211,.09)" strokeDasharray="3 3"/><XAxis dataKey="date" tick={axis} interval={11}/><YAxis tick={axis}/><Tooltip contentStyle={tooltipStyle}/><Line type="monotone" dataKey="value" name="Temperatura media" stroke={mint} strokeWidth={2} dot={false} activeDot={{r:4}}/></LineChart></ResponsiveContainer>
  </ChartFrame>
  <ChartFrame number="02" title="Proporción de fenómenos meteorológicos" subtitle="Días con ocurrencia registrada por fenómeno">
   <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data.events.filter(x=>x.days>0)} dataKey="days" nameKey="name" innerRadius="48%" outerRadius="76%" paddingAngle={3}>{data.events.filter(x=>x.days>0).map((x,i)=><Cell key={x.name} fill={palette[i%palette.length]}/>)}</Pie><Tooltip contentStyle={tooltipStyle}/></PieChart></ResponsiveContainer>
  </ChartFrame>
  <ChartFrame number="03" title="Temperatura media por mes" subtitle="Promedio del mismo mes considerando los cinco años">
   <ResponsiveContainer width="100%" height="100%"><BarChart data={data.monthly} margin={{top:10,right:12,left:-18,bottom:4}}><CartesianGrid stroke="rgba(193,220,211,.09)" vertical={false}/><XAxis dataKey="month" tick={axis}/><YAxis tick={axis}/><Tooltip contentStyle={tooltipStyle}/><Bar dataKey="temperature" name="Temperatura media" fill={mint} radius={[5,5,0,0]}/></BarChart></ResponsiveContainer>
  </ChartFrame>
  <ChartFrame number="04" title="Frecuencia de fenómenos" subtitle="Número de días registrados para cada fenómeno">
   <ResponsiveContainer width="100%" height="100%"><BarChart data={data.events} layout="vertical" margin={{top:4,right:15,left:18,bottom:4}}><CartesianGrid stroke="rgba(193,220,211,.09)" horizontal={false}/><XAxis type="number" tick={axis}/><YAxis type="category" dataKey="name" tick={{...axis,fontSize:9}} width={118}/><Tooltip contentStyle={tooltipStyle}/><Bar dataKey="days" name="Días" fill="#83a9d4" radius={[0,5,5,0]}/></BarChart></ResponsiveContainer>
  </ChartFrame>
  <ChartFrame number="05" title="Temperatura y humedad relativa" subtitle="Muestra de registros diarios · cada punto representa una observación">
   <ResponsiveContainer width="100%" height="100%"><ScatterChart margin={{top:10,right:15,left:-10,bottom:4}}><CartesianGrid stroke="rgba(193,220,211,.09)"/><XAxis type="number" dataKey="temp" name="Temperatura media" tick={axis}/><YAxis type="number" dataKey="humidity" name="Humedad relativa" tick={axis}/><ZAxis range={[35,35]}/><Tooltip cursor={{strokeDasharray:'3 3'}} contentStyle={tooltipStyle}/><Scatter data={data.scatter} fill={mint} fillOpacity={.7}/></ScatterChart></ResponsiveContainer>
  </ChartFrame>
  <ChartFrame number="06" title="Distribución de temperaturas" subtitle="Cantidad de registros por intervalo de temperatura">
   <ResponsiveContainer width="100%" height="100%"><BarChart data={data.histogram} margin={{top:10,right:12,left:-18,bottom:4}}><CartesianGrid stroke="rgba(193,220,211,.09)" vertical={false}/><XAxis dataKey="range" tick={{...axis,fontSize:9}}/><YAxis tick={axis}/><Tooltip contentStyle={tooltipStyle}/><Bar dataKey="count" name="Registros" fill="#b99bd8" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer>
  </ChartFrame>
  <ChartFrame number="07" title="Velocidad media del viento por año" subtitle="Promedio anual calculado desde los registros disponibles">
   <ResponsiveContainer width="100%" height="100%"><LineChart data={data.yearly} margin={{top:10,right:12,left:-18,bottom:4}}><CartesianGrid stroke="rgba(193,220,211,.09)" strokeDasharray="3 3"/><XAxis dataKey="year" tick={axis}/><YAxis tick={axis}/><Tooltip contentStyle={tooltipStyle}/><Line type="monotone" dataKey="wind" name="Velocidad media del viento" stroke="#d8b978" strokeWidth={2.5} dot={{r:4,fill:'#d8b978'}}/></LineChart></ResponsiveContainer>
  </ChartFrame>
  <ChartFrame number="08" title="Días con y sin precipitación" subtitle="Clasificación según precipitación diaria mayor que cero">
   <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data.precipitationDays} dataKey="days" nameKey="name" innerRadius="48%" outerRadius="76%" paddingAngle={3}>{data.precipitationDays.map((x,i)=><Cell key={x.name} fill={i===0?'#83a9d4':'#8bd8bd'}/>)}</Pie><Tooltip contentStyle={tooltipStyle}/></PieChart></ResponsiveContainer>
  </ChartFrame>
  <ChartFrame number="09" title="Precipitación acumulada por mes" subtitle="Suma de precipitación para cada mes en todo el periodo">
   <ResponsiveContainer width="100%" height="100%"><BarChart data={data.monthly} margin={{top:10,right:12,left:-18,bottom:4}}><CartesianGrid stroke="rgba(193,220,211,.09)" vertical={false}/><XAxis dataKey="month" tick={axis}/><YAxis tick={axis}/><Tooltip contentStyle={tooltipStyle}/><Bar dataKey="rain" name="Precipitación acumulada" fill="#83a9d4" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer>
  </ChartFrame>
  <ChartFrame number="10" title="Precipitación total por año" subtitle="Acumulado anual de precipitación">
   <ResponsiveContainer width="100%" height="100%"><BarChart data={data.yearly} layout="vertical" margin={{top:8,right:15,left:8,bottom:4}}><CartesianGrid stroke="rgba(193,220,211,.09)" horizontal={false}/><XAxis type="number" tick={axis}/><YAxis type="category" dataKey="year" tick={axis}/><Tooltip contentStyle={tooltipStyle}/><Bar dataKey="rain" name="Precipitación total" fill="#8bd8bd" radius={[0,5,5,0]}/></BarChart></ResponsiveContainer>
  </ChartFrame>
 </>
}
export { ChartVisuals, data }
