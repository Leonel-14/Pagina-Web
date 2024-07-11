const { createApp } = Vue
createApp({
  data() {
    return {
      urlCafes: "http://localhost:5000",
      urlPedidos: "http://localhost:5000/pedidos",
      datosC: [],
      datosP:[],
      error: false,
      lista:[],
      lista_pedido:[],
    }
  },
  methods: {
    //obtengo los datos de la api
    fetchData(url, targetArray) {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          this[targetArray] = data;
        })
        .catch(error => {
          console.error("Fetch error:", error);
          this.error = true;
        });
    },
    fetchAllData() {
      this.fetchData(this.urlCafes, 'datosC');
      this.fetchData(this.urlPedidos, 'datosP');

},
    agregar_carrito(cafe_nombre,cafe_imagen,cafe_precio,cafe_id){
      //por defecto la cantidad sera indefinida, asi que en ese caso la inicializare en cero
      if(this.cantidad == undefined)
        {
          this.cantidad = 0;
        }
      //inserto los datos en producto y esto genera un formato json
      let producto = {
          id:cafe_id,
          nombre:cafe_nombre,
          precio:cafe_precio,
          cantidad:this.cantidad,
          imagen:cafe_imagen
      }
      //agregro ese json a la lista
      this.lista.push(producto)
      //vuevlo a poner la cantidad en 0 ya que sino se quedara con el valor que se uso al agregar los datos al json
      this.cantidad = 0
      //verifico los datos con la consola
      console.log("Se cargaron en la lista -> 1",this.lista)   
    },
    cargar_lista(){
      console.log("entra a la funcion")
      for(let i = 0; i< this.lista.length; i++){
        this.lista_pedido.push(
          {
          id:this.lista[i].id,
          precio:this.lista[i].precio,
          cantidad:this.lista[i].cantidad
        })
      }
      console.log("sale del primer for -> ",this.lista_pedido)

      for(let i = 0; i< this.lista_pedido.length; i++){
        this.lista_pedido[i] = {
          ...this.lista_pedido[i],
          nombre:this.nombre,
          direccion:this.direccion,
        }
      }
      console.log("Esto se cargara -> ",this.lista_pedido)
    },
    insertar(){
      this.cargar_lista()
      let flag = 0;
      for(let i = 0 ; i<(this.lista_pedido.length); i++)
      {  
      //la forma de la cual se enviara, en json nombre:"leonel"
      console.log("entro al for")
      var options = {
          body:JSON.stringify(this.lista_pedido[i]),
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          redirect: 'follow'
      }
      console.log("Listo para enviar -> ",this.lista_pedido[i])
      fetch(this.urlPedidos, options)
          .then(function () {
            alert((i+1)+" Pedido Registrado")
            location.reload()
          })
          .catch(err => {
              console.error(err);
              alert("Error al Grabar")  // puedo mostrar el error tambien
          })
      }
  },

  eliminar_pedido(id){
    var options = {
        body:JSON.stringify(id),
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
    }
    fetch(this.urlPedidos+"/"+id, options)
        .then(function () {
            alert("Registro Eliminado")
            location.reload()
        })
        .catch(err => {
            console.error(err);
            alert("Error al Grabar")  // puedo mostrar el error tambien
        })
        },
  editar(index){
          document.getElementById(index).disabled = false
      },
  guardar(index){
          document.getElementById(index).disabled = true
          datoooo = document.getElementById(index)
          this.lista[index].cantidad = datoooo.value
          console.log(`En la lista -> ${this.lista[index].cantidad} en el input ${datoooo.value}`)
        },
  eliminar(index){
          this.lista.splice(index,1)
          //elimina el elemento segun el index y la cantidad
      }, 
  },
  mounted() {
    this.fetchAllData();
  }
  }).mount('#app')


/*


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
*/