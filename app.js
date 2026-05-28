// =========================
// APIs
// =========================

const GEO_API =
  "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_API =
  "https://api.open-meteo.com/v1/forecast";

// =========================
// CONFIG
// =========================

const CACHE_TIME =
  1000 * 60 * 60;

// =========================
// ELEMENTOS
// =========================

const container =
  document.getElementById(
    "weatherContainer"
  );

const button =
  document.getElementById(
    "searchBtn"
  );

const input =
  document.getElementById(
    "cityInput"
  );

const loading =
  document.getElementById(
    "loading"
  );

// =========================
// SANITIZE HTML
// Previene ataques XSS
// =========================

function sanitizeHTML(str){

  return str
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

// =========================
// CACHE
// =========================

function saveCache(key,data){

  localStorage.setItem(
    key,
    JSON.stringify({
      data,
      timestamp:Date.now()
    })
  );
}

function getCache(key){

  const cache =
    localStorage.getItem(key);

  if(!cache){

    return null;
  }

  const parsed =
    JSON.parse(cache);

  const isValid =
    Date.now() - parsed.timestamp
    < CACHE_TIME;

  return isValid
    ? parsed.data
    : null;
}

// =========================
// LIMPIAR CACHE VENCIDO
// =========================

function clearOldCache(){

  Object.keys(localStorage)
    .forEach(key => {

      if(key.startsWith("weather_")){

        const cache =
          getCache(key);

        if(!cache){

          localStorage.removeItem(key);
        }
      }
    });
}

clearOldCache();

// =========================
// FETCH TIMEOUT
// =========================

async function fetchWithTimeout(
  url,
  timeout = 8000
){

  const controller =
    new AbortController();

  const id =
    setTimeout(
      () => controller.abort(),
      timeout
    );

  const response =
    await fetch(url,{
      signal:controller.signal
    });

  clearTimeout(id);

  return response;
}

// =========================
// FECHAS
// =========================

function formatDate(dateString){

  const date =
    new Date(dateString);

  return date.toLocaleDateString(
    "es-CO",
    {
      weekday:"short",
      day:"numeric",
      month:"short"
    }
  );
}

function getCurrentDate(){

  return new Date()
    .toLocaleDateString(
      "es-CO",
      {
        weekday:"long",
        day:"numeric",
        month:"long",
        year:"numeric"
      }
    );
}

// =========================
// ICONOS
// =========================

function getWeatherIcon(temp){

  if(temp <= 10){

    return "🥶";
  }

  if(temp <= 20){

    return "⛅";
  }

  if(temp <= 30){

    return "☀️";
  }

  return "🔥";
}

// =========================
// OBTENER CLIMA
// =========================

async function getWeather(city){

  const cleanCity =
    city.trim().toLowerCase();

  // ======================
  // VALIDACIÓN
  // ======================

  const cityRegex =
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]{2,50}$/;

  if(
    !cityRegex.test(cleanCity)
  ){

    throw new Error(
      "Ingresa una ciudad válida"
    );
  }

  // ======================
  // CACHE
  // ======================

  const cacheKey =
    `weather_${cleanCity}`;

  const cached =
    getCache(cacheKey);

  if(cached){

    return cached;
  }

  try{

    // ======================
    // GEO API
    // ======================

    const geoResponse =
      await fetchWithTimeout(
        `${GEO_API}?name=${encodeURIComponent(cleanCity)}&count=1&language=es&format=json`
      );

    if(!geoResponse.ok){

      throw new Error(
        "Error obteniendo ubicación"
      );
    }

    const geoData =
      await geoResponse.json();

    if(!geoData.results?.length){

      throw new Error(
        `No se encontró ${city}`
      );
    }

    const location =
      geoData.results[0];

    // ======================
    // WEATHER API
    // ======================

    const weatherResponse =
      await fetchWithTimeout(
        `${WEATHER_API}?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=7&timezone=auto`
      );

    if(!weatherResponse.ok){

      throw new Error(
        "Error obteniendo clima"
      );
    }

    const weatherData =
      await weatherResponse.json();

    const forecast =
      weatherData.daily.time.map(
        (date,index)=>({

          date,

          max:
            Math.round(
              weatherData.daily
              .temperature_2m_max[index]
            ),

          min:
            Math.round(
              weatherData.daily
              .temperature_2m_min[index]
            ),

          rain:
            weatherData.daily
            .precipitation_sum[index]
        })
      );

    const result = {

      city:
        sanitizeHTML(location.name),

      country:
        sanitizeHTML(location.country),

      current:{

        temp:
          Math.round(
            weatherData.current
            .temperature_2m
          ),

        sensation:
          Math.round(
            weatherData.current
            .apparent_temperature
          ),

        humidity:
          weatherData.current
          .relative_humidity_2m,

        wind:
          weatherData.current
          .wind_speed_10m,

        rain:
          weatherData.current
          .precipitation
      },

      forecast
    };

    saveCache(
      cacheKey,
      result
    );

    return result;

  }catch(error){

    throw new Error(
      "No fue posible obtener el clima"
    );
  }
}

// =========================
// MULTICIUDADES
// =========================

async function getMultipleWeather(cities){

  loading.classList.remove(
    "hidden"
  );

  button.disabled = true;

  container.innerHTML = "";

  try{

    const results =
      await Promise.all(
        cities.map(city =>
          getWeather(city)
        )
      );

    renderWeather(results);

  }catch(error){

    renderError(
      error.message
    );

  }finally{

    loading.classList.add(
      "hidden"
    );

    button.disabled = false;
  }
}

// =========================
// ERROR
// =========================

function renderError(message){

  container.innerHTML = `

    <article class="weather-card">

      <h2>
        ❌ Error
      </h2>

      <p>
        ${sanitizeHTML(message)}
      </p>

    </article>

  `;
}

// =========================
// RENDER
// =========================

function renderWeather(data){

  container.innerHTML =
    data.map(city => `

      <article class="weather-card">

        <div class="weather-top">

          <div>

            <h2>
              ${city.city}
            </h2>

            <p>
              ${city.country}
            </p>

          </div>

          <div class="weather-icon">

            ${getWeatherIcon(
              city.current.temp
            )}

          </div>

        </div>

        <div class="temp">

          ${city.current.temp}°C

        </div>

        <div class="current-date">

          📅 ${getCurrentDate()}

        </div>

        <div class="details">

          <div class="detail">

            <span>
              💧 Humedad
            </span>

            <strong>
              ${city.current.humidity}%
            </strong>

          </div>

          <div class="detail">

            <span>
              🌬️ Viento
            </span>

            <strong>
              ${city.current.wind} km/h
            </strong>

          </div>

          <div class="detail">

            <span>
              🌧️ Precipitación
            </span>

            <strong>
              ${city.current.rain} mm
            </strong>

          </div>

          <div class="detail">

            <span>
              🌡️ Sensación
            </span>

            <strong>
              ${city.current.sensation}°C
            </strong>

          </div>

        </div>

        <section class="forecast">

          <h3>
            📅 Pronóstico próximos 7 días
          </h3>

          <div class="forecast-grid">

            ${city.forecast.map(day => `

              <div class="forecast-day">

                <strong>

                  ${formatDate(day.date)}

                </strong>

                <p>
                  ⬆️ ${day.max}°
                </p>

                <p>
                  ⬇️ ${day.min}°
                </p>

                <p>
                  🌧️ ${day.rain} mm
                </p>

              </div>

            `).join("")}

          </div>

        </section>

      </article>

    `).join("");
}

// =========================
// BUSCAR
// =========================

function searchWeather(){

  const cities =
    input.value
      .split(",")
      .map(city =>
        city.trim()
      )
      .filter(Boolean);

  if(!cities.length){

    renderError(
      "Ingresa al menos una ciudad"
    );

    return;
  }

  getMultipleWeather(cities);
}

// =========================
// EVENTOS
// =========================

button.addEventListener(
  "click",
  searchWeather
);

input.addEventListener(
  "keydown",
  e => {

    if(e.key === "Enter"){

      searchWeather();
    }
  }
);