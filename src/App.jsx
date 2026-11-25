import { useState } from 'react'
import {
  Activity, ArrowDownRight, ArrowUpRight, BrainCircuit, CalendarDays,
  ChartNoAxesCombined, ChevronDown, CircleHelp, CloudSun, Database,
  Download, ExternalLink, Gauge, Globe2, LayoutDashboard, Menu,
  MessageSquareText, Search, ShieldCheck, Sparkles, ThermometerSun,
  Waves, X
} from 'lucide-react'

const sections = [
  { id: 'overview', label: 'Resumen general', icon: LayoutDashboard },
  { id: 'context', label: 'Contexto climático', icon: Globe2 },
  { id: 'charts', label: 'Visualizaciones', icon: ChartNoAxesCombined },
  { id: 'model', label: 'Modelo de IA', icon: BrainCircuit },
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

function EmptyChart({ title, subtitle, icon: Icon }) {
  return <div className="chart-card">
    <div className="chart-heading"><div><h3>{title}</h3><p>{subtitle}</p></div><button className="icon-button" aria-label="Información"><CircleHelp size={17}/></button></div>
    <div className="empty-chart">
      <div className="empty-icon"><Icon size={25}/></div>
      <strong>Visualización pendiente de datos</strong>
      <p>Se incorporará aquí el gráfico original exportado desde Google Colab (Matplotlib).</p>
      <span className="data-tag"><span/> ESPERANDO DATOS DE FASE 1</span>
    </div>
  </div>
}

function App() {
  const [active, setActive] = useState('overview')
  const [menuOpen, setMenuOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [notice, setNotice] = useState(false)

  const navigate = (id) => {
    setActive(id)
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const askModel = (event) => {
    event.preventDefault()
    setNotice(true)
  }

  return <div className="app-shell">
    {menuOpen && <button className="scrim" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú"/>}
    <Sidebar active={active} onNavigate={navigate} open={menuOpen} onClose={() => setMenuOpen(false)}/>
    <main className="main-content">
      <header className="topbar">
        <div className="topbar-left"><button className="icon-button menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Abrir menú"><Menu size={20}/></button><span>Workspace</span><span className="crumb">/</span><strong>Climate overview</strong></div>
        <div className="topbar-right"><span className="live-status"><i/> PROYECTO EN DESARROLLO</span><div className="avatar">CI</div></div>
      </header>

      <div className="page-wrap">
        <section className="hero" id="overview">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line"/> OBSERVATORIO CLIMÁTICO GLOBAL</div>
            <h1>Comprender el clima.<br/><em>Anticipar el cambio.</em></h1>
            <p>Un espacio de análisis y visualización de datos climáticos correspondientes al periodo 1991–1995, con apoyo de herramientas de inteligencia artificial.</p>
            <div className="hero-meta"><span><CalendarDays size={15}/> 1991 — 1995</span><span><Globe2 size={15}/> Perspectiva global</span></div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
            <div className="globe"><div className="globe-grid"/><div className="globe-shine"/></div>
            <div className="float-chip chip-top"><ThermometerSun size={16}/><span>CLIMATE DATA</span></div>
            <div className="float-chip chip-bottom"><Activity size={16}/><span>DATA ANALYSIS</span></div>
          </div>
        </section>

        <section className="section-block" aria-label="Indicadores del proyecto">
          <div className="section-intro"><div><div className="eyebrow">VISTA RÁPIDA</div><h2>Estado del análisis</h2></div><span className="muted-caption">Información del proyecto</span></div>
          <div className="stats-grid">
            <article className="stat-card"><div className="stat-top"><span>Periodo analizado</span><CalendarDays size={18}/></div><div className="stat-value">1991–95</div><div className="stat-foot">Cinco años de observación</div></article>
            <article className="stat-card"><div className="stat-top"><span>Fuente de análisis</span><Database size={18}/></div><div className="stat-value stat-text">Google Colab</div><div className="stat-foot">Notebook de la Fase 1</div></article>
            <article className="stat-card"><div className="stat-top"><span>Visualizaciones</span><ChartNoAxesCombined size={18}/></div><div className="stat-value">Por integrar</div><div className="stat-foot">Gráficos originales de Matplotlib</div></article>
            <article className="stat-card"><div className="stat-top"><span>Modelo de IA</span><BrainCircuit size={18}/></div><div className="stat-value">Por conectar</div><div className="stat-foot">Integración con el modelo entrenado</div></article>
          </div>
        </section>

        <section className="section-block context-section" id="context">
          <div className="section-intro"><div><div className="eyebrow">01 · CONTEXTO</div><h2>¿Qué estamos investigando?</h2></div><span className="section-index">01 / 03</span></div>
          <div className="context-grid">
            <article className="context-main">
              <div className="context-icon"><Globe2 size={22}/></div>
              <h3>El clima como sistema global</h3>
              <p>El análisis climático permite estudiar cómo varían las condiciones atmosféricas a lo largo del tiempo. Este proyecto presenta los datos y resultados obtenidos para el periodo 1991–1995, de acuerdo con el trabajo desarrollado en la Fase 1.</p>
              <div className="context-callout"><Sparkles size={17}/><span>El objetivo de este dashboard es transformar los resultados técnicos en información visual, clara y accesible.</span></div>
            </article>
            <article className="context-side">
              <div className="mini-icon"><Waves size={20}/></div><h3>¿Qué encontrarás aquí?</h3>
              <ul><li><span>01</span> Contexto del problema y periodo de estudio</li><li><span>02</span> Gráficos originales generados en Colab</li><li><span>03</span> Resultados del modelo de inteligencia artificial</li></ul>
            </article>
          </div>
        </section>

        <section className="section-block" id="charts">
          <div className="section-intro"><div><div className="eyebrow">02 · EXPLORACIÓN DE DATOS</div><h2>Visualizaciones del análisis</h2><p className="section-description">Espacio reservado para presentar los gráficos de Matplotlib generados durante la Fase 1.</p></div><span className="section-index">02 / 03</span></div>
          <div className="charts-grid">
            <EmptyChart title="Evolución de variables climáticas" subtitle="Comportamiento durante 1991–1995" icon={ChartNoAxesCombined}/>
            <EmptyChart title="Distribución de los datos" subtitle="Patrones identificados en el conjunto de datos" icon={Gauge}/>
          </div>
          <div className="integration-hint"><div className="hint-icon"><Download size={18}/></div><div><strong>¿Cómo se completará esta sección?</strong><p>Exportaremos las figuras desde Colab en formato PNG y las integraremos aquí sin alterar sus resultados.</p></div></div>
        </section>

        <section className="section-block model-section" id="model">
          <div className="section-intro"><div><div className="eyebrow">03 · INTELIGENCIA ARTIFICIAL</div><h2>Explora el modelo de IA</h2><p className="section-description">Interfaz preparada para consumir el modelo entrenado en la Fase 1.</p></div><span className="section-index">03 / 03</span></div>
          <div className="model-panel">
            <div className="model-visual"><div className="neural-orbit"><BrainCircuit size={42}/><span/><i/><b/></div><div className="model-label"><span/> MODELO PENDIENTE DE CONEXIÓN</div></div>
            <div className="model-content"><div className="model-kicker"><Sparkles size={15}/> CLIMATE AI</div><h3>Consulta el modelo</h3><p>Cuando se conecte la API del modelo, esta sección permitirá enviar datos de entrada y mostrar la respuesta generada por la inteligencia artificial.</p>
              <form className="model-form" onSubmit={askModel}><label htmlFor="model-question">Consulta o dato de entrada</label><div className="input-wrap"><Search size={17}/><input id="model-question" value={question} onChange={e => {setQuestion(e.target.value);setNotice(false)}} placeholder="La integración se habilitará al conectar el modelo..." disabled/><button type="submit" disabled><ArrowUpRight size={17}/></button></div></form>
              {notice && <div className="form-note">La API todavía no está configurada. No se generó ninguna predicción.</div>}
              <div className="model-foot"><ShieldCheck size={15}/> Los resultados se mostrarán cuando la conexión esté validada.</div>
            </div>
          </div>
        </section>

        <footer className="footer"><div className="footer-brand"><CloudSun size={18}/><strong>ClimateIQ</strong><span>·</span><span>Dashboard académico</span></div><span>Proyecto de análisis climático · 1991–1995</span></footer>
      </div>
    </main>
  </div>
}

export default App