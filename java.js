var app = new function() {// controla todo las funciones de la app//
  this.el = document.getElementById('tasks'); //creo una variable el y le asigno tasks
  
    this.tasks = [];//variable tipo array//
   
  
  this.FetchAll = function() {//dependiente del contexto y cambia de metodo en metodo, variable local//
    var data = ''; // vacio //


    if (this.tasks.length > 0) { //longitud de la variable taks//
      for (i = 0; i < this.tasks.length; i++) {
        data += '<tr>'; //inyeccion
        data += '<td>'+(i+1)+". " + this.tasks[i] + '</td>';//i + 0 = 1 cada dato tiene su index, en la posicion 0 hace escribir 1//
        data += '<td><button onclick="app.Edit(' + i + ')"  class="btn btn-warning">Edit</button></td>';//para que se vea boton editar, identificador 0, tipo botton//
        data += '<td><button onclick="app.Delete(' + i + ')"  class="btn btn-danger">Delete</button></td>';
        data += '</tr>';
      }
    }

    this.Count(this.tasks.length);
    return this.el.innerHTML = data; //devolver o establecer sintaxis html//
  };

  this.Add = function () {
    el = document.getElementById('Agregar-todo');
    // Get the value
    var task = el.value;

    if (task) {
      // Add the new value
      this.tasks.push(task.trim());//push agregame task valor del elemento, trim evita espacios al prin y al final //
      localStorage.setItem('Tareas', JSON.stringify(this.tasks)); //Local storage
      // Reset input value
      el.value = '';
      // Dislay the new list
      this.FetchAll();
    }
  };

  this.Edit = function (item) {
    var el = document.getElementById('edit-todo');
    // Display value in the field
    el.value = this.tasks[item];//su identificador item//
    // Display fields
    document.getElementById('caja-editable').style.display = 'block';//referencia al index para establecer que el display se bloquee//
    self = this;//this, es dependiente del contexto en el cual se encuentra y va a ir cambiando de método en método ya que es dinámico. 
            //La técnica de dejar this guardado en self se usa para tener siempre la referencia original al objeto que disparó ese método.

    document.getElementById('save-edit').onsubmit = function() { 
      // Get value	
      var task = el.value;

      if (task) {
        // Edit value
        self.tasks.splice(item, 1, task.trim());
        localStorage.setItem('Tareas', JSON.stringify(self.tasks)); //Local storage
        // Display the new list
        self.FetchAll();//llamar la funcion imprimir la nueva lista//
        
        CloseInput();//cerrar cajita de editar//
      }
    }
  };

  this.Delete = function (item) {
    // Delete the current row
    this.tasks.splice(item, 1);
	
    localStorage.setItem('Tareas', JSON.stringify(this.tasks)) //Local storage llamo ami local y le digo que actualize lista anterior// //Local storage

    // Display the new list
    this.FetchAll();
  };

  this.Count = function(data) { 
    var el   = document.getElementById('contador');
    var name = 'Tareas';

    if (data) { //si existe el dato entonces...
        if(data ==1){//si el dato es igual a 1 entonces...
            name = 'Task' //presentar en panttalla tareas
        }
      el.innerHTML = data + ' ' + name ;//presenta en pantalla "*numero* *tareas* //
    } 
    else {
      el.innerHTML = 'No ' + name;//si no hay tareas, osea datos entonces presenta "no "
    }
  };
  //obtener los valores que estan almacenados localmente
  this.Storage = function() { //creo funcion storage//
    var cat = JSON.parse(localStorage.getItem('Tareas'));//obtener los valores que estan en el local storage referenciando a tareas, jason transforma en array//
    if(cat !== null) { //diferente de nulo si no viene vacio se ve //
      console.log("done");
      this.tasks = cat;    //asigno a cat ami array task
      console.log(this.tasks);
      this.FetchAll();
    }
};
this.Storage(); //corre//
}


app.FetchAll();//lo llamo para que funcione //
//cierra el editable
function CloseInput() {
  document.getElementById('caja-editable').style.display = 'none'; //cierra el editable
}

