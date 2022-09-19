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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&units=metric&appid=${id}`;

    spinner();

    fetch(url)
        .then( resp => {
            return resp.json();
        })
        .then( datos => {

            limpiarHTML(); // limpio el HTML previo al obtener el resultado.

            if (datos.cod === '404') {
                mostrarError('La ciudad no es válida o no fue encontrada.');
                return;
            }
            // Display en el HTML si todo OK
            mostrarClima(datos);
        })
}

function mostrarClima(datos) {

    const { name, main: { temp, temp_max, temp_min } } = datos;

    const nombreCiudad = document.createElement('P');
    nombreCiudad.textContent = name;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('P');
    actual.textContent = `${parseInt(temp)}°C`;
    actual.classList.add('font-bold', 'text-6xl');

    const min = document.createElement('P');
    min.textContent = `Min: ${parseInt(temp_min)}°C`;
    min.classList.add('text-xl');

    const max = document.createElement('P');
    max.textContent = `Max: ${parseInt(temp_max)}°C`;
    max.classList.add('text-xl');

    const resultadoDiv = document.createElement('DIV');
    resultadoDiv.classList.add('text-white', 'text-center');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(min);
    resultadoDiv.appendChild(max);

    resultado.appendChild(resultadoDiv);
} 

function limpiarHTML () {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner () {
    limpiarHTML();

    const divSpinner = document.createElement('DIV');
    divSpinner.classList.add('spinner');
    divSpinner.innerHTML = `
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
    `
    resultado.appendChild(divSpinner);
}