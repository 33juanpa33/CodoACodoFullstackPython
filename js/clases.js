const { createApp } = Vue
  createApp({
    data() {
      return {
        clases:[],
        //url:'http://localhost:5000/clases', 
   // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
        url:'https://juanalfonso.pythonanywhere.com/clases',   // si ya lo subieron a pythonanywhere
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        id:0,
        nombre:"", 
        imagen:"",
        diasYHorarios:"",
        cupoAlumnos:0,
        precio10Clases:0,
        precio15Clases:0,
        precioClasesLibre:0,
    }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.clases = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        eliminar(id) {
            const url = this.url+'/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
			 alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },
        grabar(){
            let clase = {
                nombre:this.nombre,
                precio10Clases: this.precio10Clases,
                precio15Clases: this.precio15Clases,
                precioClasesLibre: this.precioClasesLibre,
                cupoAlumnos: this.cupoAlumnos,
                diasYHorarios: this.diasYHorarios,
                imagen:this.imagen
            }
            var options = {
                body:JSON.stringify(clase),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./clases.html";  // recarga clases.html
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")  // puedo mostrar el error tambien
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
