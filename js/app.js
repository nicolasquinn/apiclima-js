const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima (e) {
    e.preventDefault();

    // Validación form.
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        mostrarError('Ambos campos son obligatorios');
        return;
    }

    // API request
    consultarApi(ciudad, pais);
}

function mostrarError (msj) {
    // Crear e insertar alerta.
    const alertaExiste = document.querySelector('div .bg-red-100');
    if (!alertaExiste) {
        const alerta = document.createElement('DIV');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
        alerta.innerHTML = `
            <strong class="font-bold">ERROR</strong>
            <span class="block">${msj}</span>
        `
        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3500);
    }
}

function consultarApi (ciudad, pais) {

    const id = '8a723e3be389251c86a9b8645e4e777f';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${id}`;

    fetch(url)
        .then( resp => {
            return resp.json();
        })
        .then( datos => {
            console.log(datos);
            if (datos.cod === '404') {
                mostrarError('La ciudad no es válida o no fue encontrada.')
            }
        })
}