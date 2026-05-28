https://docs.google.com/document/d/1Ol5P31YuxXXO6U2KWwO40ejuhpVnD1Ve/edit?usp=sharing&ouid=103506723966023643049&rtpof=true&sd=true

# ⚡ Nexora Weather

Aplicación web moderna de clima desarrollada con **HTML, CSS y JavaScript Vanilla**, enfocada en una experiencia visual profesional, consumo de APIs en tiempo real y buenas prácticas de seguridad, rendimiento y desarrollo frontend.

---

## 🚀 Características

✅ Consulta del clima en tiempo real  
✅ Pronóstico de los próximos 7 días  
✅ Búsqueda de múltiples ciudades simultáneamente  
✅ Interfaz moderna y responsive  
✅ Sistema de caché con LocalStorage  
✅ Manejo robusto de errores  
✅ Validación segura de entradas  
✅ Protección contra XSS (inyección HTML)  
✅ Optimización de peticiones HTTP con timeout  
✅ Código organizado y escalable  

---

# 🖼️ Vista previa

## 🌍 Pantalla principal

- Diseño moderno tipo glassmorphism
- Gradientes dinámicos
- Tarjetas responsivas
- Información climática detallada

---

# 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica |
| CSS3 | Diseño responsive y UI moderna |
| JavaScript (Vanilla) | Lógica y consumo de APIs |
| Open-Meteo API | Datos climáticos |
| Open-Meteo Geocoding API | Búsqueda de ciudades |

---

# 📂 Estructura del proyecto

```bash
📦 nexora-weather
 ┣ 📜 index.html
 ┣ 📜 style.css
 ┣ 📜 app.js
 ┗ 📜 README.md
```

---

# 🌐 APIs utilizadas

## 📍 Geocoding API

Convierte nombres de ciudades en coordenadas geográficas.

```bash
https://geocoding-api.open-meteo.com/v1/search
```

---

## ☁️ Weather Forecast API

Obtiene clima actual y pronóstico.

```bash
https://api.open-meteo.com/v1/forecast
```

---

# 🔐 Mejoras de seguridad implementadas

Este proyecto fue mejorado siguiendo buenas prácticas de desarrollo seguro y uso responsable de IA.

## ✅ Validación de entradas

Se implementó validación de ciudades para evitar datos inválidos o maliciosos.

```js
const cityRegex =
/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]{2,50}$/;
```

---

## ✅ Protección contra XSS

Se sanitiza contenido dinámico renderizado en pantalla.

```js
function sanitizeHTML(str)
```

Esto evita inyecciones HTML o scripts maliciosos.

---

## ✅ Cache seguro

Se eliminó el uso de:

```js
localStorage.clear()
```

y se reemplazó por limpieza selectiva de caché.

---

## ✅ Timeout en peticiones HTTP

Se implementó `AbortController` para evitar bloqueos si la API tarda demasiado en responder.

```js
fetchWithTimeout()
```

---

# ⚡ Rendimiento y optimización

## 🚀 Sistema de caché

La aplicación almacena temporalmente resultados para:

- Reducir peticiones innecesarias
- Mejorar velocidad
- Optimizar experiencia de usuario

---

## 🚀 Múltiples ciudades

Permite consultar varias ciudades simultáneamente usando:

```js
Promise.all()
```

---

# 🎨 Diseño UI/UX

La interfaz fue diseñada con enfoque moderno y profesional:

✅ Glassmorphism  
✅ Gradientes dinámicos  
✅ Diseño responsive  
✅ Animaciones suaves  
✅ Excelente contraste visual  
✅ Experiencia adaptable a móviles  

---

# 📱 Responsive Design

Compatible con:

- 💻 Desktop
- 📱 Mobile
- 📲 Tablets

---

# ▶️ Cómo ejecutar el proyecto

## 1️⃣ Clonar repositorio

```bash
git clone TU-REPOSITORIO
```

---

## 2️⃣ Abrir carpeta

```bash
cd nexora-weather
```

---

## 3️⃣ Ejecutar

Simplemente abre:

```bash
index.html
```

o usa Live Server en Visual Studio Code.

---

# 📌 Funcionalidades principales

| Función | Descripción |
|---|---|
| Buscar ciudades | Consulta clima por ciudad |
| Pronóstico 7 días | Visualización extendida |
| Multiciudad | Varias búsquedas simultáneas |
| Cache local | Optimización de rendimiento |
| Manejo de errores | Prevención de fallos |
| Validación | Seguridad de entradas |

---

# 🧠 Aprendizajes del proyecto

Durante este proyecto se aplicaron conceptos importantes como:

- Consumo de APIs REST
- Manipulación del DOM
- Programación asíncrona
- Seguridad frontend
- Manejo de errores
- Optimización de rendimiento
- Desarrollo asistido por IA
- Buenas prácticas de código

---

# 🤖 Uso responsable de IA

La IA fue utilizada como herramienta de apoyo para:

- Optimización del código
- Mejoras de UI/UX
- Refactorización
- Detección de posibles riesgos de seguridad

Todo el código generado fue revisado, validado y mejorado manualmente antes de implementarse.

---

# 📈 Posibles mejoras futuras

- 🌍 Geolocalización automática
- 🌙 Modo oscuro/claro
- 📊 Gráficas climáticas
- ⭐ Sistema de favoritos
- 🔔 Alertas meteorológicas
- 🌐 Internacionalización

---

# 👨‍💻 Autor

## Juan David Castro Rubiano

Desarrollador frontend apasionado por la tecnología, el diseño UI/UX y el desarrollo web moderno.

---

# 📄 Licencia

Este proyecto es de uso educativo y académico.
