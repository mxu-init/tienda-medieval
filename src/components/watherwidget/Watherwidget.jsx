import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Watherwidget.css';

// Coordenadas de respaldo si el usuario no da permiso de ubicación (Madrid)
const fallbackCoords = { latitude: 40.4168, longitude: -3.7038 };

// Traduce el "weathercode" que devuelve la API a un texto y un ícono simple
const getWeatherInfo = (code) => {
    if (code === 0) return { label: 'Despejado', icon: 'sun' };
    if ([1, 2].includes(code)) return { label: 'Mayormente despejado', icon: 'sun' };
    if (code === 3) return { label: 'Nublado', icon: 'cloud' };
    if ([45, 48].includes(code)) return { label: 'Neblina', icon: 'fog' };
    if ([51, 53, 55, 56, 57].includes(code)) return { label: 'Llovizna', icon: 'rain' };
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { label: 'Lluvia', icon: 'rain' };
    if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: 'Nieve', icon: 'snow' };
    if ([95, 96, 99].includes(code)) return { label: 'Tormenta', icon: 'storm' };
    return { label: 'Clima variable', icon: 'cloud' };
};

// Íconos mínimos en SVG (sin librerías externas, para no añadir dependencias)
const WeatherIcon = ({ type }) => {
    const icons = {
        sun: (
            <svg viewBox="0 0 24 24" width="20" height="20">
                <circle cx="12" cy="12" r="5" fill="#d4af6a" />
                <g stroke="#d4af6a" strokeWidth="1.5">
                    <line x1="12" y1="1" x2="12" y2="4" />
                    <line x1="12" y1="20" x2="12" y2="23" />
                    <line x1="1" y1="12" x2="4" y2="12" />
                    <line x1="20" y1="12" x2="23" y2="12" />
                    <line x1="4.2" y1="4.2" x2="6.3" y2="6.3" />
                    <line x1="17.7" y1="17.7" x2="19.8" y2="19.8" />
                    <line x1="4.2" y1="19.8" x2="6.3" y2="17.7" />
                    <line x1="17.7" y1="6.3" x2="19.8" y2="4.2" />
                </g>
            </svg>
        ),
        cloud: (
            <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M7 18a4.5 4.5 0 0 1-.4-9 5.5 5.5 0 0 1 10.6-1.6A4 4 0 0 1 17 18H7z" fill="#c9b98c" />
            </svg>
        ),
        rain: (
            <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M7 15a4.5 4.5 0 0 1-.4-9 5.5 5.5 0 0 1 10.6-1.6A4 4 0 0 1 17 15H7z" fill="#c9b98c" />
                <g stroke="#8ba4c9" strokeWidth="1.5" strokeLinecap="round">
                    <line x1="8" y1="18" x2="7" y2="21" />
                    <line x1="12" y1="18" x2="11" y2="21" />
                    <line x1="16" y1="18" x2="15" y2="21" />
                </g>
            </svg>
        ),
        snow: (
            <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M7 15a4.5 4.5 0 0 1-.4-9 5.5 5.5 0 0 1 10.6-1.6A4 4 0 0 1 17 15H7z" fill="#c9b98c" />
                <g stroke="#e8f0fa" strokeWidth="1.5" strokeLinecap="round">
                    <line x1="8" y1="18" x2="8" y2="21" />
                    <line x1="12" y1="18" x2="12" y2="21" />
                    <line x1="16" y1="18" x2="16" y2="21" />
                </g>
            </svg>
        ),
        storm: (
            <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M7 13a4.5 4.5 0 0 1-.4-9 5.5 5.5 0 0 1 10.6-1.6A4 4 0 0 1 17 13H7z" fill="#a89b7d" />
                <polygon points="13,13 9,19 12,19 10,23 16,16 13,16" fill="#d4af6a" />
            </svg>
        ),
        fog: (
            <svg viewBox="0 0 24 24" width="20" height="20">
                <g stroke="#c9b98c" strokeWidth="1.6" strokeLinecap="round">
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="3" y1="13" x2="21" y2="13" />
                    <line x1="3" y1="17" x2="21" y2="17" />
                </g>
            </svg>
        ),
    };

    return icons[type] || icons.cloud;
};

const WeatherWidget = ({ place = 'Tu villa' }) => {
    const [now, setNow] = useState(new Date());
    const [weather, setWeather] = useState(null);
    const [hasError, setHasError] = useState(false);

    // Reloj: actualiza la hora mostrada cada minuto
    useEffect(() => {
        const clockTimer = setInterval(() => setNow(new Date()), 60000);
        return () => clearInterval(clockTimer);
    }, []);

    // Clima: pide la ubicación del navegador y consulta Open-Meteo (gratis, sin API key)
    useEffect(() => {
        const fetchWeather = async ({ latitude, longitude }) => {
            try {
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
                const response = await axios.get(url);
                setWeather(response.data.current_weather);
            } catch (error) {
                console.error('No se pudo obtener el clima:', error);
                setHasError(true);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => fetchWeather(position.coords),
                () => fetchWeather(fallbackCoords) // si el usuario no da permiso, se usa la ciudad de respaldo
            );
        } else {
            fetchWeather(fallbackCoords);
        }
    }, []);

    const timeLabel = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    if (hasError || !weather) {
        return (
            <div className="weatherWidget">
                <span className="weatherMainLine">{timeLabel}</span>
            </div>
        );
    }

    const { label, icon } = getWeatherInfo(weather.weathercode);

    return (
        <div className="weatherWidget">
            <WeatherIcon type={icon} />
            <div className="weatherText">
                <span className="weatherMainLine">
                    {timeLabel} · {Math.round(weather.temperature)}°C
                </span>
                <span className="weatherSubLine">
                    {label} · {place}
                </span>
            </div>
        </div>
    );
};

export default WeatherWidget;
