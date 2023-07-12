console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // clase_update.html?id=1
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        nombre:"",
        diasYHorarios:"",
        imagen:"",
        cupoAlumnos:0,
        precio10Clases:0,
        precio15Clases:0,
        precioClasesLibre:0,
        url:'https://juanalfonso.pythonanywhere.com/clases/'+id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.nombre = data.nombre;
                    this.diasYHorarios = data.diasYHorarios;
                    this.imagen=data.imagen
                    this.cupoAlumnos=data.cupoAlumnos
                    this.precio10Clases=data.precio10Clases
                    this.precio15Clases=data.precio15Clases
                    this.precioClasesLibre=data.precioClasesLibre
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let clase = {
                nombre:this.nombre,
                precio10Clases: this.precio10Clases,
                precio15Clases: this.precio15Clases,
                precioClasesLibre: this.precioClasesLibre,
                cupoAlumnos: this.cupoAlumnos,
                diasYHorarios: this.diasYHorarios,
                imagen: this.imagen
            }
            var options = {
                body: JSON.stringify(clase),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./clases.html"; // navega a clases.html          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')