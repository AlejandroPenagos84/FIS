const API = "http://127.0.0.1:8000/users/"

let tokenCheckInterval; // Variable para almacenar el intervalo
let countdownUpdateInterval; // Variable para el contador en tiempo real

// Función para verificar si el token está expirado
function isTokenExpired(token) {
    if (!token) return true;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp < currentTime;
    } catch (error) {
        return true;
    }
}

// Función para obtener el tiempo restante del token en milisegundos
function getTokenTimeRemaining(token) {
    if (!token) return 0;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        const timeRemaining = (payload.exp - currentTime) * 1000; // Convertir a milisegundos
        return Math.max(0, timeRemaining);
    } catch (error) {
        return 0;
    }
}

// Función para formatear el tiempo en mm:ss
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Función para actualizar el contador en tiempo real
function startRealTimeCountdown() {
    // Limpiar cualquier contador anterior
    if (countdownUpdateInterval) {
        clearInterval(countdownUpdateInterval);
    }
    
    const updateCounter = () => {
        const token = localStorage.getItem('token');
        const timeRemainingElement = document.getElementById('timeRemaining');
        
        if (!token || isTokenExpired(token)) {
            if (timeRemainingElement) {
                timeRemainingElement.innerHTML = '<span style="color: #d32f2f;">⚠️ EXPIRADO</span>';
            }
            handleTokenExpiration();
            return;
        }
        
        const timeRemaining = getTokenTimeRemaining(token);
        if (timeRemainingElement) {
            const formattedTime = formatTime(timeRemaining);
            const totalSeconds = Math.floor(timeRemaining / 1000);
            
            // Cambiar color según el tiempo restante
            let color = '#4caf50'; // Verde
            if (totalSeconds <= 60) {
                color = '#d32f2f'; // Rojo
            } else if (totalSeconds <= 120) {
                color = '#ff9800'; // Naranja
            }
            
            timeRemainingElement.innerHTML = `<span style="color: ${color}; font-weight: bold; font-family: monospace;">${formattedTime}</span>`;
        }
    };
    
    // Actualizar inmediatamente
    updateCounter();
    
    // Actualizar cada segundo
    countdownUpdateInterval = setInterval(updateCounter, 1000);
}

// Función para mostrar alerta y redirigir al login
function handleTokenExpiration() {
    // Limpiar los intervalos para evitar múltiples alertas
    if (tokenCheckInterval) {
        clearInterval(tokenCheckInterval);
    }
    if (countdownUpdateInterval) {
        clearInterval(countdownUpdateInterval);
    }
    
    // Crear una alerta modal que no se puede cerrar fácilmente
    const modal = document.createElement('div');
    modal.id = 'tokenExpirationModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        font-family: Arial, sans-serif;
    `;
    
    const alertBox = document.createElement('div');
    alertBox.style.cssText = `
        background-color: white;
        padding: 30px;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        width: 90%;
        animation: fadeIn 0.3s ease-in;
    `;
    
    // Agregar animación CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    alertBox.innerHTML = `
        <h2 style="color: #d32f2f; margin-bottom: 20px;">⚠️ Sesión Expirada</h2>
        <p style="margin-bottom: 20px; color: #333;">Tu sesión ha expirado por seguridad. Serás redirigido al login en <span id="countdown">5</span> segundos.</p>
        <button id="redirectBtn" style="
            background-color: #1976d2;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-right: 10px;
        ">Ir al Login Ahora</button>
        <button id="stayBtn" style="
            background-color: #666;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        ">Permanecer (sin funcionalidad)</button>
    `;
    
    modal.appendChild(alertBox);
    document.body.appendChild(modal);
    
    // Contador regresivo
    let countdown = 5;
    const countdownElement = document.getElementById('countdown');
    const countdownTimer = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(countdownTimer);
            redirectToLogin();
        }
    }, 1000);
    
    // Event listeners
    document.getElementById('redirectBtn').onclick = function() {
        clearInterval(countdownTimer);
        redirectToLogin();
    };
    
    document.getElementById('stayBtn').onclick = function() {
        clearInterval(countdownTimer);
        // El usuario puede quedarse pero sin funcionalidad
        alertBox.innerHTML = `
            <h2 style="color: #ff9800; margin-bottom: 20px;">⚠️ Sin Autenticación</h2>
            <p style="margin-bottom: 20px; color: #333;">Puedes permanecer en la página pero no podrás realizar acciones que requieran autenticación.</p>
            <button onclick="redirectToLogin()" style="
                background-color: #1976d2;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
            ">Ir al Login</button>
        `;
    };
}

// Función para redirigir al login
function redirectToLogin() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    window.location.href = 'login.html';
}

// Función para iniciar el monitoreo del token
function startTokenMonitoring() {
    const token = localStorage.getItem('token');
    
    if (!token || isTokenExpired(token)) {
        handleTokenExpiration();
        return;
    }
    
    // Calcular cuando expirará el token
    const timeRemaining = getTokenTimeRemaining(token);
    
    console.log(`Token expirará en ${Math.floor(timeRemaining / 1000)} segundos`);
    
    // Iniciar el contador en tiempo real
    startRealTimeCountdown();
    
    // Configurar un timeout para mostrar la alerta justo cuando expire
    setTimeout(() => {
        // Verificar una vez más si realmente ha expirado
        const currentToken = localStorage.getItem('token');
        if (!currentToken || isTokenExpired(currentToken)) {
            handleTokenExpiration();
        }
    }, timeRemaining);
    
    // También verificar cada 30 segundos por si acaso
    tokenCheckInterval = setInterval(() => {
        const currentToken = localStorage.getItem('token');
        if (!currentToken || isTokenExpired(currentToken)) {
            handleTokenExpiration();
        }
    }, 30000); // Verificar cada 30 segundos
}

// Función para hacer fetch con validación de token
function authenticatedFetch(url, options = {}) {
    const token = localStorage.getItem('token');
    
    // Verificar si el token existe y no está expirado
    if (!token || isTokenExpired(token)) {
        handleTokenExpiration();
        return Promise.reject(new Error('Token expired'));
    }
    
    // Agregar el token a los headers
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
    };
    
    return fetch(url, {
        ...options,
        headers
    })
    .then(response => {
        // Si el servidor responde con 401 (Unauthorized), el token ha expirado
        if (response.status === 401) {
            handleTokenExpiration();
            throw new Error('Token expired');
        }
        return response;
    })
    .catch(error => {
        if (error.message === 'Token expired') {
            throw error;
        }
        // Manejar otros errores de red
        console.error('Error en la petición:', error);
        throw error;
    });
}

// Verificar token al cargar la página e iniciar monitoreo
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    
    if (!token || isTokenExpired(token)) {
        handleTokenExpiration();
        return;
    }
    
    // Iniciar el monitoreo automático del token
    startTokenMonitoring();
    
    // Si el token es válido, hacer la petición
    authenticatedFetch(API + 'users/')
        .then(response => {
            // console.log(localStorage.getItem('token'));
            // Si la respuesta no es OK, lanza un error
            if (!response.ok) {
                // console.log("Error")
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            document.body.innerHTML = `
                <div style="
                    max-width: 600px; 
                    margin: 50px auto; 
                    padding: 20px; 
                    font-family: Arial, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 15px;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                    color: white;
                    text-align: center;
                ">
                    <h1 style="margin-bottom: 20px; font-size: 2.5em;">🎉 ¡Bienvenido!</h1>
                    <p style="font-size: 1.2em; margin-bottom: 30px;">Tu sesión está activa y el token es válido</p>
                    
                    <div style="
                        background: rgba(255,255,255,0.2);
                        padding: 20px;
                        border-radius: 10px;
                        margin: 20px 0;
                        backdrop-filter: blur(10px);
                    ">
                        <h3 style="margin-bottom: 15px;">⏱️ Tiempo Restante de Sesión</h3>
                        <div style="
                            font-size: 2em;
                            font-weight: bold;
                            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                        " id="timeRemaining">
                            Cargando...
                        </div>
                        <p style="margin-top: 10px; font-size: 0.9em; opacity: 0.8;">
                            Se actualizará automáticamente cada segundo
                        </p>
                    </div>
                    
                    <div style="
                        background: rgba(255,255,255,0.1);
                        padding: 15px;
                        border-radius: 8px;
                        margin-top: 20px;
                    ">
                        <p style="margin: 0; font-size: 0.9em;">
                            📱 El sistema te alertará automáticamente cuando la sesión expire
                        </p>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            if (error.message !== 'Token expired') {
                console.error('Error:', error);
                document.body.innerHTML = `
                    <div style="
                        max-width: 400px; 
                        margin: 50px auto; 
                        padding: 20px; 
                        font-family: Arial, sans-serif;
                        background: #f44336;
                        border-radius: 10px;
                        color: white;
                        text-align: center;
                    ">
                        <h2>❌ Error al cargar los datos</h2>
                        <p>Ha ocurrido un error al conectar con el servidor.</p>
                    </div>
                `;
            }
        });
});