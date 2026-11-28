import { useState } from 'react'
import { ChartVisuals, data as climateData } from './components/ChartVisuals.jsx'
import {
  Activity, CalendarDays,
  ChartNoAxesCombined, ChevronDown, CircleHelp, CloudSun, Database,
  Download, ExternalLink, Gauge, Globe2, LayoutDashboard, Menu,
  ShieldCheck, Sparkles, ThermometerSun,
  Waves, X
} from 'lucide-react'

const sections = [
  { id: 'overview', label: 'Resumen general', icon: LayoutDashboard },
  { id: 'context', label: 'Contexto climático', icon: Globe2 },
  { id: 'charts', label: 'Visualizaciones', icon: ChartNoAxesCombined },
]

function Sidebar({ active, onNavigate, open, onClose }) {
  return <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
    <div className="brand">
      <div className="brand-mark"><CloudSun size={22} /></div>
      <div><strong>Climate<span>IQ</span></strong><small>DATA INTELLIGENCE</small></div>
      <button className="icon-button mobile-close" onClick={onClose} aria-label="Cerrar menú"><X size={19}/></button>
    </div>
    <div className="workspace-label">ESPACIO DE TRABAJO</div>
    <nav>
      {sections.map(item => {
        const Icon = item.icon
        return <button key={item.id} className={active === item.id ? 'nav-item active' : 'nav-item'} onClick={() => onNavigate(item.id)}>
          <Icon size={18}/><span>{item.label}</span>{active === item.id && <i/>}
        </button>
      })}
    </nav>
    <div className="sidebar-bottom">
      <div className="period-card">
        <div className="period-icon"><CalendarDays size={17}/></div>
        <div><small>PERIODO DE ESTUDIO</small><strong>1991 — 1995</strong></div>
      </div>
      <div className="sidebar-note"><ShieldCheck size={15}/><span>Panel académico · Fase 2</span></div>
    </div>
  </aside>
}

function App() {
  const [active, setActive] = useState('overview')
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = (id) => {
    setActive(id)
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return <div className="app-shell">
    {menuOpen && <button className="scrim" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú"/>}
    <Sidebar active={active} onNavigate={navigate} open={menuOpen} onClose={() => setMenuOpen(false)}/>
    <main className="main-content">
      <header className="topbar">
        <div className="topbar-left"><button className="icon-button menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Abrir menú"><Menu size={20}/></button><span>Observatorio</span><span className="crumb">/</span><strong>Análisis climático</strong></div>
        <div className="topbar-right"><span className="live-status"><i/> ESTUDIO HISTÓRICO</span><div className="avatar">CI</div></div>
      </header>

      <div className="page-wrap">
        <section className="hero" id="overview">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line"/> OBSERVATORIO CLIMÁTICO GLOBAL</div>
            <h1>Clima global.<br/><em>1991 — 1995.</em></h1>
            <p>Análisis exploratorio de datos meteorológicos diarios de 1991–1995. El notebook utiliza Pandas para limpiar y preparar el archivo 82210-1.xlsx, y Matplotlib para estudiar temperatura, humedad, presión, viento, precipitación y fenómenos meteorológicos.</p>
            <div className="hero-meta"><span><CalendarDays size={15}/> 1991 — 1995</span><span><Globe2 size={15}/> Perspectiva global</span></div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
            <div className="globe-stage"><div className="globe-halo"/><img className="globe-gif" src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Rotating_earth_(large)_transparent.gif" alt="" loading="eager"/><div className="globe-scan"/></div>
            <div className="float-chip chip-top"><ThermometerSun size={16}/><span>CLIMATE DATA</span></div>
            <div className="float-chip chip-bottom"><Activity size={16}/><span>DATA ANALYSIS</span></div>
          </div>
        </section>

        <section className="section-block" aria-label="Indicadores del proyecto">
          <div className="section-intro"><div><div className="eyebrow">VISTA RÁPIDA</div><h2>Estado del análisis</h2></div><span className="muted-caption">Información del proyecto</span></div>
          <div className="stats-grid">
            <article className="stat-card"><div className="stat-top"><span>Registros analizados</span><CalendarDays size={18}/></div><div className="stat-value">1,826</div><div className="stat-foot">Registros diarios · 1991–1995</div></article>
            <article className="stat-card"><div className="stat-top"><span>Temperatura media</span><Database size={18}/></div><div className="stat-value stat-text">{climateData.stats.temp_avg}</div><div className="stat-foot">Temperatura media del periodo</div></article>
            <article className="stat-card"><div className="stat-top"><span>Visualizaciones</span><ChartNoAxesCombined size={18}/></div><div className="stat-value">10</div><div className="stat-foot">Visualizaciones calculadas del Excel</div></article>
          </div>
        </section>

        <section className="section-block context-section" id="context">
          <div className="section-intro"><div><div className="eyebrow">01 · CONTEXTO</div><h2>¿Qué estamos investigando?</h2></div><span className="section-index">01 / 02</span></div>
          <div className="context-grid">
            <article className="context-main">
              <div className="context-icon"><Globe2 size={22}/></div>
              <h3>El clima como sistema global</h3>
              <p>Este proyecto realiza un análisis exploratorio de registros meteorológicos diarios del periodo 1991–1995. Según el notebook, los datos se cargan desde el archivo 82210-1.xlsx, se limpian con Pandas (los guiones se convierten en valores nulos y las variables meteorológicas a formato numérico) y se organizan mediante una columna Fecha para analizarlos con Matplotlib.</p>
              <div className="context-callout"><Sparkles size={17}/><span>Variables estudiadas: temperatura media, máxima y mínima; presión atmosférica; humedad relativa; precipitación; visibilidad; velocidad del viento y registros de fenómenos como niebla, lluvia, nieve, granizo, tormentas y tornados.</span></div>
            </article>
            <article className="context-side">
              <div className="mini-icon"><Waves size={20}/></div><h3>¿Qué encontrarás aquí?</h3>
              <ul><li><span>01</span> Contexto del problema y periodo de estudio</li><li><span>02</span> Gráficos y resultados del análisis exploratorio</li></ul>
            </article>
          </div>
        </section>

        <section className="section-block" id="charts">
          <div className="section-intro"><div><div className="eyebrow">02 · EXPLORACIÓN DE DATOS</div><h2>Visualizaciones del análisis</h2><p className="section-description">Selecciona cualquier gráfico o avanza en orden. Activa el modo exposición para proyectar los resultados y consulta la interpretación debajo de cada gráfico.</p></div><span className="section-index">02 / 02</span></div>
          <div className="charts-viewer"><ChartVisuals /></div>
          <div className="integration-hint"><div className="hint-icon"><Database size={18}/></div><div><strong>Visualizaciones calculadas desde 82210-1.xlsx</strong><p>Los gráficos muestran agregaciones y muestras calculadas desde los 1,826 registros diarios. Los promedios y acumulados se calcularon con Pandas; los valores faltantes no se imputaron.</p></div></div>
        </section>

        <footer className="footer"><div className="footer-brand"><CloudSun size={18}/><strong>ClimateIQ</strong><span>·</span><span>Dashboard académico</span></div><div className="footer-credits"><span>Análisis meteorológico · 82210-1.xlsx · 1991–1995</span><a href="https://commons.wikimedia.org/wiki/File:Rotating_earth_(large)_transparent.gif" target="_blank" rel="noreferrer">Globo animado: Jahobr / Wikimedia Commons · CC BY-SA 3.0</a></div></footer>
      </div>
    </main>
  </div>
}

export default App
