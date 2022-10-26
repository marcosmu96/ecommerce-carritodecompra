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

Arrayproductos = [harina, cerveza, coca, galletas, leche, yogurt]

let carrito = []
const mostrarProductos = document.getElementById("mostrarproductos")
function mostrarProductos2() {
    Arrayproductos.forEach((producto) => {
        let card = document.createElement("div")
        card.innerHTML = `<img src="${producto.imagen}" alt="">
        <h3>${producto.nombre}</h3>
        <p>Precio x unidad <br> <span>${producto.precio}$</span></p>
        <button id="boton${producto.id}">Agregar al Carrito</button> 
        `
        mostrarProductos.appendChild(card)

        // AGREGAR PRODUCTOS 
        const botonid = document.getElementById(`boton${producto.id}`);

        botonid.addEventListener("click", () => {

            agregarProducto(producto.id);
        })
    });
}
// BUSCADOR DE PRODUCTOS 

let buscador = document.getElementById("buscador");

function buscarProducto() {
    let texto = buscador.value.toLowerCase();
    Arrayproductos.forEach((producto) => {
        let nombreProd = producto.nombre.toLowerCase();
        if (nombreProd.indexOf(texto) != -1) {
            let card = document.createElement("div")
            card.innerHTML = `<img src="${producto.imagen}" alt="">
            <h3>${producto.nombre}</h3>
            <p>Precio x unidad <br> <span>${producto.precio}$</span></p>
            <button id="boton${producto.id}">Agregar al Carrito</button> 
        `
            mostrarProductos.appendChild(card)
            console.log(producto)
            // AGREGAR PRODUCTOS 
            let botonid = document.getElementById(`boton${producto.id}`);
            botonid.addEventListener("click", () => {
                agregarProducto(producto.id);
            })
        }
        // AGREGAR AL CARRITO 
    })
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
mostrarCarrito.addEventListener("click", () => {
    infocarrito.classList.toggle("carrito3")
    infocarrito.classList.toggle("cerrarcarrito")
    infocarrito.innerHTML = `
   
    Pagar
    Vaciar Carrito
        `;
    total = document.getElementById("total");
    let totalCompra = 0;
    carrito.forEach((product) => {
        totalCompra += product.precio * product.cantidad;
        let card2 = document.createElement("div")
        card2.innerHTML = `<img src="${product.imagen}" alt="">
        <p>${product.nombre}</p>
        <p>Precio: <span>${product.precio}</span> </p>
        <p>Cantidad: <span>${product.cantidad}</span> </p>
          <button>X</button>
        `
        infocarrito.appendChild(card2)
        total.innerHTML = `El total de la Compra: $${totalCompra}`
    })
})
window.onscroll = function (e) {
    let distanciaScroll = document.documentElement.scrollTop;
    if (distanciaScroll > 100) {
        infocarrito.classList.remove("carrito3")

        infocarrito.classList.add("cerrarcarrito")
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
}
mostrarProductos2();