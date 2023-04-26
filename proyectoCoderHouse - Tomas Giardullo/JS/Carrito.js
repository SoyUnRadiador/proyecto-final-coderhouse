//Titulos
const Catalogo = document.getElementById("Catalogo")
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
//const alumno = document.getElementById("alumno")
//const comision = document.getElementById("comision")

LogoNombre.innerText="Gaming Word"
inicio.innerText="Inicio"
contacto.innerText = "Contactos"
seguir.innerText = "SIGUENOS"
instagram.innerText = "@Mundo_Gamer"
linkedin.innerText = "@Mundo_Gamer_Empleos"
twitter.innerText = "@Mundo_Gamer"
ayuda.innerText = "AYUDA AL CLIENTE"
telefono.innerText = "TELEFONO: 11-6593-4521"
email.innerText = "GMAIL: MundoGamer@gmail.com"
//alumno.innerText= "Alumnno: Tomas Giardullo"
//comision.innerText= "Comisión JavaScript 39470"

Catalogo.innerText= "Tu carrito"

//Cargar cards del carrito

function CargarJuegosCarrito(){
  let carritoHtml = ""
  let carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || []
  carrito = carritoGuardado

  // Card de carrito vacio
  if (carrito.length === 0) {
    carritoHtml += `<div class='card'>
                    <img src='IMG/carrito-vacio.jpg'><h4>No hay productos seleccionados en el carrito</h4>
                    </div>`
  } else {
    carrito.forEach((juegos)=>{
       carritoHtml += retornoCardCarritoHTML(juegos)
    })
    asignarEventosEliminar()
  }

  contenido.innerHTML = carritoHtml
}

CargarJuegosCarrito()

function retornoCardCarritoHTML(carrito){
  if (carrito && carrito.Imagen) {
      return `<div class="card">
                  <figure>
                      <img src=${carrito.Imagen}>
                  </figure>
                  <div class="contenido">
                      <h3>${carrito.Producto}</h3>
                      <P>$${carrito.Precio}</P>
                      <button class="boton" id="${carrito.ProductoId}">Eliminar</button>
                  </div>
              </div>`
  }
  return ""
}


//Botones Eliminar del carrito

function eliminarProductoDeCarrito(id) {
  carrito = carrito.filter((juegos) => juegos && juegos.ProductoId && juegos.ProductoId !== id)
  //Recupero los datos del local storage
  localStorage.setItem('carrito', JSON.stringify(carrito))
  CargarJuegosCarrito()
}


function asignarEventosEliminar() {
  const botonesEliminar = document.querySelectorAll(".boton")
  for (let i = 0; i < botonesEliminar.length; i++) {
    botonesEliminar[i].addEventListener("click", function() {
      let id = parseInt(this.getAttribute("id"))
      eliminarProductoDeCarrito(id)
    })
  }
}
  
  
  function eliminarProducto(event) {
    const CardId = parseInt(event.target.id)
    eliminarProductoDeCarrito(CardId)
  }
  
  asignarEventosEliminar()

//Boton comprar

const comprar = document.getElementById("ConfirmarCompra")
comprar.addEventListener("click", CalcularPrecio)

function CalcularPrecio() {
  if (carrito.length === 0) {
    Swal.fire(
      "Carrito vacio",
      "Asegurese de agregar productos a su carrito antes de comprar",
      "error"
    )
  } else {
    const total = carrito.reduce((acumulado, juego) => acumulado + juego.Precio, 0)

    //Mostrar formulario de compra
    Swal.fire({
      title: "FORMULARIO DE COMPRA",
      position: "top",
      imageUrl: `IMG/TajetaDeCredito.png`,
      html: `
        <div>
          <label>(Datos ya ingresados a peticion del docente)</lavel>
        <div>
          <label>Numero de tarjeta:</label>
          <input type="text" placeholder="Ingrese el numero de su tarjeta" required value="1234 5678 1234 5678">
        </div>
        <div>
          <label>Fecha de caducidad:</label>
          <input type="text" placeholder="Ingrese la fecha de caducidad de su tarjeta" required value="10/24">
        </div>
        <div>
          <label>Titular de la tarjeta:</label>
          <input type="text" placeholder="Ingrese el titular de la tarjeta" required value="Santiago Osuna Gomez">
        </div>
        <div>
          <label >Emisor de la tarjeta:</label>
          <input type="text" placeholder="Ingrese el emisor" required value="Visa">
        </div>
        <div>
          <label>CVV:</label>
          <input type="text" placeholder="Ingrese el codigo de seguridad de su tarjeta" required value="123">
        </div>
        <div>
          <label>Monto total: $${total}</label>
        </div>
      `,
      confirmButtonText: "Comprar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Realizar compra y mostrar mensaje de éxito
        carrito = []
        localStorage.setItem("carrito", JSON.stringify(carrito))
        CargarJuegosCarrito()

        Swal.fire({
          icon: "success",
          title: "Compra realizada con éxito",
          showConfirmButton: false,
          timer: 3000,
        })
      }
    })
  }
}
