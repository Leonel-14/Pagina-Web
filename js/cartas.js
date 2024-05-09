const menuCafes = [
    {
        id: 1,
        nombre: "Cafe Americano",
        precio: 1000,
        imagen: "./img/cafe-americano.jpg"
    },
    {
        id: 2,
        nombre: "Cafe Cappucino",
        precio: 3000,
        imagen: "./img/cafe-cappucino.jpg"
    },
    {
        id: 3,
        nombre: "Cafe Expreso",
        precio: 2000,
        imagen: "./img/cafe-expreso.jpg"
    },
    {
        id: 4,
        nombre: "Cafe Helado",
        precio: 2400,
        imagen: "./img/cafe-helado.jpg"
    },
    {
        id: 5,
        nombre: "Cafe Irlandes",
        precio: 4000,
        imagen: "./img/cafe-irlandes.jpg"
    },
    {
        id: 6,
        nombre: "Cafe Latte",
        precio: 3500,
        imagen: "./img/cafe-latte.jpg"
    },
    {
        id: 7,
        nombre: "Cafe Machiato",
        precio: 2800,
        imagen: "./img/cafe-machiato.jpg"
    },
    {
        id: 8,
        nombre: "Cafe Mocha",
        precio: 3500,
        imagen: "./img/cafe-mocha.jpg"
    }
];

let card_coffe = ``; 
let element;

for(element of menuCafes){
    card_coffe += `
        <div class="element animate__animated animate__fadeInDown">
            <div class="img-coffee-card"><img src=${element.imagen} alt="${element.nombre}"></div>
                <p>${element.nombre}</p>
            <hr>
            <p class="price">$${element.precio}</p>
        </div>   
    `
};

document.querySelector(".container-products").innerHTML = card_coffe;