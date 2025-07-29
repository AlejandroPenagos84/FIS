const API = "http://127.0.0.1:8000/users/"

function LogIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username == '' || password == '') {
        alert('Debe llenar todos los campos');
        return;
    }
    const user = {
        username: username,
        password: password,
    }
    fetch(API + 'token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (!response.ok) {
                // Si la respuesta no es OK (por ejemplo, estado 4xx o 5xx), lanza un error
                alert('Usuario o contraseña incorrectos');
                throw new Error('Usuario o contraseña incorrectos');
            }
            return response.json();
        })// Procesa la respuesta JSON)
        .then(data => {
            console.log(data)
            localStorage.setItem('token', data['access']);
            console.log(localStorage.getItem('token'));
            alert('Inicio de sesión exitoso');
            window.location.replace("index.html");
        })
}