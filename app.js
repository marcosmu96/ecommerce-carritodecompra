
class Producto {
    constructor(id, nombre, precio, imagen, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = cantidad;
    }
}

const harina = new Producto(1, "Harina", 100, "images/7792180139313_02.webp", 1)
const cerveza = new Producto(2, "Cerveza Quilmes", 150, "images/433505-800-600.webp", 1)
const coca = new Producto(3, "Coca Cola", 175, "images/Coca-Cola-25-L-3-17483.webp", 1)
const galletas = new Producto(4, "Galletas Oreo", 250, "images/galletitas-oreo-venta-ml.jpg", 1)
const leche = new Producto(5, "Leche la Serenisima", 300, "images/leche-3-porciento-la-serenisima-sachet-rojo-1-lt-lacteos-casa-segal-mendoza.png", 1)
const yogurt = new Producto(6, "Yogurt la Serenisima", 234, "images/Yogur-Ls-Cl-sico-C-Frutas-140-Gr-Duraz-Yogur-Ls-Cl-sico-C-Frutas-140-Gr-Durazno-1-869758.webp", 1)

let Arrayproductos = [harina, cerveza, coca, galletas, leche, yogurt]
let carrito = []
const mostrarProductos = document.getElementById("mostrarproductos")

const infototal = document.getElementById("infototal")

function mostrarProductos2() {
    Arrayproductos.forEach((producto) => {
        let card = document.createElement("div")
        card.innerHTML = `<img src="${producto.imagen}" alt="">
        <h3>${producto.nombre}</h3>
        <p>Precio x unidad <br> <span>${producto.precio}$</span></p>
        <a href="#buscador" id="boton${producto.id}">Agregar al Carrito </a>
        `
        mostrarProductos.appendChild(card)

        // AGREGAR PRODUCTOS AL CARRITO

        const botonid = document.getElementById(`boton${producto.id}`);
        botonid.addEventListener("click", () => {
            agregarProducto(producto.id);

            // USO DE LIBRERIAS toastify
            Toastify({
                text: "Producto agregado al carrito",
                duration: 3000,
                gravity: "bottom",
                position: "right",
                style: {
                    background: "linear-gradient(59deg, rgba(101,223,92,1) 0%, rgba(12,117,4,1) 99%)",
                }
            }).showToast();

        })
    });
}

// BUSCADOR DE PRODUCTOS 

let buscador = document.getElementById("buscador");

function buscarProducto() {

    let texto = buscador.value.toLowerCase();
    Arrayproductos.forEach(element => {
        let nombreProd = element.nombre.toLowerCase()
        if (nombreProd.indexOf(texto) != -1) {
            let card = document.createElement("div")
            card.innerHTML = `<img src="${element.imagen}" alt="">
                          <h3>${element.nombre}</h3>
                          <p>Precio x unidad <br> <span>${element.precio}$</span></p>
                          <a href="#buscador" id="boton${element.id}">Agregar al Carrito </a>
                           `
            mostrarProductos.appendChild(card)
            console.log(element)
            // AGREGAR PRODUCTOS 
            let botonid = document.getElementById(`boton${element.id}`);
            botonid.addEventListener("click", () => {
                agregarProducto(element.id);
            })
        }
        // AGREGAR AL CARRITO 
    });
}

if (mostrarProductos.innerHTML === '') {
    mostrarProductos.innerHTML = '<div class="existe"> <h3> No existe el producto maestro</h3></div>'
}

buscador.addEventListener("keyup", () => {
    mostrarProductos.innerHTML = '';
    buscarProducto();

})

// MOSTRAR EL CARRITO 

let mostrarCarrito = document.getElementById("carrito");
let infocarrito = document.getElementById("infocarrito");
let totalCarrito = document.getElementById("totalcarrito");
let vaciarTodo = document.getElementById("vaciarcar");

function mostrarElCarrito() {

    totalCompra = 0
    infocarrito.innerHTML = "";
    totalCarrito.innerHTML = `Total de compra: ${totalCompra}$`
    carrito.forEach((product) => {
        let carritojson = JSON.stringify(product)
        localStorage.setItem(product.id, carritojson)
        totalCompra += product.precio * product.cantidad;
        let card2 = document.createElement("div")
        let productojson = JSON.parse(localStorage.getItem(product.id))
        console.log(productojson)
        card2.innerHTML = ` <img src="${product.imagen}" alt="">
            <p>${product.nombre}</p>
            <p>Precio: <span>${product.precio}</span> </p>
            <p>Cantidad: <span>${product.cantidad}</span> </p>
              <button id="borrarprod${product.id}">X</button>`
        infocarrito.appendChild(card2)
        totalCarrito.innerHTML = `Total de compra: ${totalCompra}$`
        let botonborrar = document.getElementById(`borrarprod${product.id}`);
        botonborrar.addEventListener("click", () => {
            borraProducto(product.id);
            product.cantidad = 1;
        })
        vaciarTodo.addEventListener("click", () => {
            vaciarCarrito();
            product.cantidad = 1;
        })
    })
}
mostrarCarrito.addEventListener("click", () => {
    infocarrito.classList.toggle("carrito3")
    infocarrito.classList.toggle("cerrarcarrito")
    infototal.classList.toggle("cerrarcarrito")
    infototal.classList.toggle("total")
    mostrarElCarrito();
})
window.onscroll = function (e) {
    let distanciaScroll = document.documentElement.scrollTop;
    if (distanciaScroll > 100) {
        infocarrito.classList.remove("carrito3")
        infototal.classList.remove("total")
        infocarrito.classList.add("cerrarcarrito")
        infototal.classList.add("cerrarcarrito")
    }
}

function agregarProducto(id) {
    let producto = Arrayproductos.find((producto) => producto.id === id)
    const productoEnCarrito = carrito.find((producto) => producto.id === id)
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++
    } else {
        carrito.push(producto);
    }
    mostrarElCarrito();
}

//VACIAR CARRITO

function vaciarCarrito() {
    carrito = [];
    totalCompra = 0;
    totalCarrito.innerHTML = `Total de compra: ${totalCompra}$`;
    infocarrito.classList.remove("carrito3")
    infototal.classList.remove("total")
    infocarrito.classList.add("cerrarcarrito")
    infototal.classList.add("cerrarcarrito")
    localStorage.clear();
}
// BORRAR PRODUCTO INDIVIDUAL

function borraProducto(id) {
    let producto = carrito.find((producto) => producto.id === id)
    indice = carrito.indexOf(producto)
    localStorage.removeItem(producto)
    carrito.splice(indice, 1)
    infocarrito.classList.remove("carrito3")
    infototal.classList.remove("total")
    infocarrito.classList.add("cerrarcarrito")
    infototal.classList.add("cerrarcarrito")

}

//APLICANDO LIBRERIA EN EL BOTON DE PAGAR DEL CARRITO
let pagar = document.getElementById("pagando")
pagar.addEventListener("click", () => {
    Swal.fire('Se envio correctamente tu pedido!',
        'Por tu Email llegara la factura',
        'success')
})

// INICIO DE SESSION CON CONSULTA FETCH A JSON LOCAL
let cuenta = document.getElementById("cuenta")
cuenta.addEventListener("click", () => {
    Swal.fire({
        title: "Login",
        html: `<input type="text" id="email" class="swal2-input" placeholder="Email">
        <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
        confirmButtonText: "Enviar",
        showCancelButton: true,
        CancelButtonText: "Cancelar"
    }).then(result => {
        if (result.isConfirmed) {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const url = "usuarios.json";
             let sesion = false;
            fetch(url)
                .then(Response => Response.json())
                .then(datos => {
                    datos.forEach(usuario => {
                        if (usuario.email == email && usuario.contraseña == password) {
                            cuenta.innerHTML = `<img src="/images/usuario.png" alt="">
                                               <a href=""> ${usuario.nombre} </a> `
                            Swal.fire({
                                title: "Iniciaste Sesion",
                                icon: "success",
                                confirmButtonText: "Aceptar"
                            })


                            //SINTAXIS AVANZADA

                            sesion = usuario.email == email && usuario.contraseña == password  ? true : false
                        } 
                        if( sesion == false) {
                            Swal.fire({
                                title: "Tu Email o Contraseña no Coinciden",
                                icon: "error",
                                confirmButtonText: "Aceptar"
                            })
                        }

                        
                        
                    })
                })
        }
    })
})
mostrarProductos2();