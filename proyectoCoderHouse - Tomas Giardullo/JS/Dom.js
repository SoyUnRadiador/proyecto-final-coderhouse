// Carrito

let carrito = []

//Titulos

const Catalogo = document.getElementById("Catalogo")
//const alumno = document.getElementById("alumno")
//const comision = document.getElementById("comision")
const LogoNombre= document.getElementById("Logo-Nombre")
const inicio = document.getElementById("Inicio")
const contacto = document.getElementById("Contactos")
const seguir = document.getElementById("Seguir-Redes")
const instagram = document.getElementById("Instagram")
const linkedin = document.getElementById("linkedin")
const twitter = document.getElementById("twitter")
const ayuda = document.getElementById("ayuda")
const telefono = document.getElementById("telefono")
const email = document.getElementById("Email")

LogoNombre.innerText = "Gaming Word"
inicio.innerText ="Inicio"
contacto.innerText = "Contactos"
Catalogo.innerText = "CATALOGO DE VIDEOJUEGOS"
seguir.innerText = "SIGUENOS"
instagram.innerText = "@Mundo_Gamer"
linkedin.innerText = "@Mundo_Gamer_Empleos"
twitter.innerText = "@Mundo_Gamer"
ayuda.innerText = "AYUDA AL CLIENTE"
telefono.innerText = "TELEFONO: 11-6593-4521"
email.innerText = "GMAIL: MundoGamer@gmail.com"
//alumno.innerText= "Alumnno: Tomas Giardullo"
//comision.innerText= "Comisión JavaScript 39470"

//Barra de busqueda

const Buscador = document.querySelector("input#Buscador")

Buscador.addEventListener("search", ()=>{
    let Busqueda = videojuegos.filter((juego)=>juego.Producto.includes(Buscador.value))
    if(Busqueda.length > 0){
        CargarJuegos(Busqueda)
    } else {
        CargarJuegos()
    }
});
//Boton ver carrito

const VerCarrito = document.getElementById("boton")
      VerCarrito.addEventListener("click", ()=>{location.href = `Carrito.html`})


//Cargar cards con el array
const videojuegos = []
const URL = 'JS/Array.json'

function ObternetVideojuegos (){
    fetch(URL)
    .then((repuesta)=>repuesta.json())
    .then((datos)=>videojuegos.push(...datos))
    .then(()=>{
        CargarJuegos(videojuegos)
        BotonesDeCards()
    })
}
ObternetVideojuegos()


function CargarJuegos(juegos = videojuegos){
    contenido.innerHTML = ''
    juegos.forEach((juego)=>{
       contenido.innerHTML += retornoCardHTML(juego)
    })
}
CargarJuegos()


function retornoCardHTML(videojuegos){
    return `<div class="card">
                <figure>
                    <img src=${videojuegos.Imagen}>
                </figure>
                <div class="contenido">
                    <h3>${videojuegos.Producto}</h3>
                    <P>$${videojuegos.Precio}</P>
                    <button class="boton" id="${videojuegos.ProductoId}">Agregar al carrito</button>
                </div>
            </div>`
}

//Botones Agrregar al carrito

function BotonesDeCards(){
    const AgregarAlCarrito = document.querySelectorAll("button.boton")
    for(boton of AgregarAlCarrito) {
        boton.addEventListener("click",(info)=>{
            let CardId = parseInt(info.target.id)
            let resultado = videojuegos.find((juegos) => juegos.ProductoId === CardId)
            carrito.push(resultado)
            //Guardo al local storage
            localStorage.setItem("carrito", JSON.stringify(carrito))
            //Mostrar notificacion de agregado al carrito
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) =>{
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              Toast.fire({
                icon: 'success',
                title: 'Producto agregado al carrito!'
              })
        })
    }
}

