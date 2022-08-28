import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'

const $btnGuardarCliente = document.querySelector<HTMLButtonElement>('#guardar-cliente')!;
$btnGuardarCliente.addEventListener('click', guardarCliente)

let cliente:object ={
  mesa:'',
  hora:'',
  pedido:[]
}

function guardarCliente(){
  const $mesa = document.querySelector<HTMLInputElement>('#mesa')!;
  const mesaValue = $mesa.value;
  const $hora = document.querySelector<HTMLInputElement>('#hora')!;
  const horaValue = $hora.value;

  // Revisar si hay campos vacios
  const camposVacios = [mesaValue,horaValue].some((campo:any)=> campo==='');
  if(camposVacios){
    // Verificar si ya hay una alerta
    const existeAlerta = document.querySelector<HTMLElement>('.invalid-feedback')!;
    if(!existeAlerta){
      const alerta = document.createElement('div');
      alerta.classList.add('invalid-feedback','d-block','text-center')
      alerta.textContent='Todos los campos son obligatorios';
      document.querySelector('.modal-body form')?.appendChild(alerta);
      setTimeout(() => {
        alerta.remove();
      }, 3000);
    }return;
  }
  // Asignar datos del formulario al obj
  let mesa = mesaValue;
  let hora = horaValue;
  cliente = {...cliente,mesa,hora}
  // Ocultar modal
  const $modalFormulario = document.querySelector<HTMLFormElement>('#formulario')!;
  const modalBootstrap =bootstrap.Modal.getInstance($modalFormulario);
  modalBootstrap.hide();

  // Mostrar las secciones
  mostrarSecciones();
  // Obetener platillos de la API de JSON-SERVER
  obtenerPlatillos();
}

function mostrarSecciones(){
  const $$seccionesOcultas = document.querySelectorAll<HTMLElement>('.d-none')!;

  $$seccionesOcultas.forEach((seccion:any) =>seccion.classList.remove('d-none'))
}

function obtenerPlatillos(){
  const url = 'http://localhost:4000/platillos';
  fetch(url)
    .then(res => res.json())
    .then(data => mostrarPlatillos(data))
    .catch((err:any) => console.log(err))
}

function mostrarPlatillos(platillos:any){
  const $contenido = document.querySelector<HTMLDivElement>('#platillos .contenido')!;  
  platillos.forEach((e:any) => {
    const row = document.createElement('div');
    row.classList.add('row');

    const nombre = document.createElement('div');
    nombre.classList.add('col-md-4');
    nombre.textContent = e.nombre;

    const precio = document.createElement('div');
    precio.classList.add('col-md-3');
    precio.textContent = e.precio;

    row.appendChild(nombre);
    row.appendChild(precio);
    $contenido.appendChild(row);
  })
}