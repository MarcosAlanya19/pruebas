import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from "bootstrap";
import { config } from './config';
import { Dish } from './domain/Dish';

const $btnGuardarCliente = document.querySelector<HTMLButtonElement>('#guardar-cliente')!;
$btnGuardarCliente.addEventListener('click', guardarCliente)

interface Cliente {
  mesa: string,
  hora: string,
  pedido: any[]
}
let cliente: Cliente = {
  mesa: '',
  hora: '',
  pedido: []
}

function guardarCliente() {
  const $mesa = document.querySelector<HTMLInputElement>('#mesa')!;
  const mesaValue = $mesa.value;
  const $hora = document.querySelector<HTMLInputElement>('#hora')!;
  const horaValue = $hora.value;

  // Revisar si hay campos vacios
  const camposVacios = [mesaValue, horaValue].some((campo: any) => campo === '');
  if (camposVacios) {
    // Verificar si ya hay una alerta
    const existeAlerta = document.querySelector<HTMLElement>('.invalid-feedback')!;
    if (!existeAlerta) {
      const alerta = document.createElement('div');
      alerta.classList.add('invalid-feedback', 'd-block', 'text-center')
      alerta.textContent = 'Todos los campos son obligatorios';
      document.querySelector('.modal-body form')?.appendChild(alerta);
      setTimeout(() => {
        alerta.remove();
      }, 3000);
    } return;
  }
  // Asignar datos del formulario al obj
  let mesa = mesaValue;
  let hora = horaValue;
  cliente = { ...cliente, mesa, hora }
  // Ocultar modal
  const $modalFormulario = document.querySelector<HTMLFormElement>('#formulario')!;
  const modalBootstrap = bootstrap.Modal.getInstance($modalFormulario);

  modalBootstrap!.toggle();

  // Mostrar las secciones
  mostrarSecciones();
  // Obetener platillos de la API de JSON-SERVER
  obtenerPlatillos();
}

function mostrarSecciones() {
  const $$seccionesOcultas = document.querySelectorAll<HTMLElement>('.d-none')!;

  $$seccionesOcultas.forEach((seccion) => seccion.classList.remove('d-none'))
}

function obtenerPlatillos() {
  const url = `${config.URL_API}/platillos`;
  fetch(url)
    .then(res => res.json())
    .then(data => mostrarPlatillos(data))
    .catch((err: any) => console.log(err))
}

function mostrarPlatillos(platillos: Dish[]) {
  const $contenido = document.querySelector<HTMLDivElement>('#platillos .contenido')!;
  platillos.forEach((e) => {
    const row = document.createElement('div');
    row.classList.add('row');

    const nombre = document.createElement('div');
    nombre.classList.add('col-md-4');
    nombre.textContent = e.nombre;

    const precio = document.createElement('div');
    precio.classList.add('col-md-3');
    precio.textContent = e.precio.toString();

    row.appendChild(nombre);
    row.appendChild(precio);
    $contenido.appendChild(row);
  })
}