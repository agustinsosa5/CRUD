
var URL = "";
async function crud(URL) {
  const response = await fetch(URL);  
  if (!response.ok) {
    const mensaje = `Ha ocurrido un error: ${response.status}`;
    alert(mensaje)
    return;  
  }
  const data = await response.json();
  return data;
}

function error(){
  var alertList = document.querySelectorAll('.alert')
alertList.forEach(function (alert) {
  new bootstrap.Alert(alert)
})
}


async function postData(url = "", data = {}) {   
  // Default options are marked with *
  fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .catch(error => alert('Error:', error)) 
}
async function PutData(url = "", data = {}) {
  // Default options are marked with *
  fetch(url, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
.catch(error => alert('Error:', error))
}


function volverAMostrarDatos() {
  document.getElementById("results").innerHTML = "";
  crud("https://6361aae967d3b7a0a6cadddb.mockapi.io/users/").then((data) =>{
    data.forEach(mostrardatos =>{
      document.getElementById("results").innerHTML += `<li>ID: ${mostrardatos.id}</li>` + `<li>Name: ${mostrardatos.name}</li>` + `<li>Lastname: ${mostrardatos.lastname}</li>`
    })
  })
};


function habilitarAgregar(){
  const lastname = document.getElementById("inputPostApellido").value;
  const name = document.getElementById("inputPostNombre").value;
  if (name != "" && lastname != "") {
    document.getElementById("btnPost").disabled = false;
}}

function habilitarModificar(){
  const inputmodificar = document.getElementById("inputPutId").value;  
  if (inputmodificar != "") {
    document.getElementById("btnPut").disabled = false;
}}

function habilitarBtnGuardar(){
  const inputPutNombre = document.querySelector('#inputPutNombre');
  const inputPutApellido = document.querySelector('#inputPutApellido'); 
  if ((inputPutNombre.value != '' || inputPutNombre.value != undefined) && (inputPutApellido.value != '' || inputPutApellido.value != undefined)) {
    document.querySelector('#btnSendChanges').disabled = false;
  };
};
 

document.addEventListener("DOMContentLoaded", () => {                        

//Buscar Usuario
document.getElementById("btnGet1").addEventListener("click", async function () {
    const inp1 = document.getElementById("inputGet1Id");    
    document.getElementById("results").innerHTML = "";        
    crud("https://6361aae967d3b7a0a6cadddb.mockapi.io/users/" + inp1.value).then((data) => {    
        if(inp1.value == ''){
        data.forEach(datosuser => {          
          document.getElementById("results").innerHTML += `<li>ID: ${datosuser.id}</li>` + `<li>Name: ${datosuser.name}</li>` + `<li>Lastname: ${datosuser.lastname}</li>`        
        });
      } else {
        document.getElementById("results").innerHTML += `<li>ID: ${data.id}</li>` + `<li>Name: ${data.name}</li>` + `<li>Lastname: ${data.lastname}</li>`
      };
        

      });
    });


 //Agregar Usuario
 document.getElementById("btnPost").addEventListener("click", () => {
  let lastname = document.getElementById("inputPostApellido").value;
  let name = document.getElementById("inputPostNombre").value;
  let newuser = {
    name: name,
    lastname: lastname
  };
  postData(url = "https://6361aae967d3b7a0a6cadddb.mockapi.io/users/", newuser)
  document.getElementById("inputPostApellido").value = "";
  document.getElementById("inputPostNombre").value = "";
  volverAMostrarDatos();
  
});
  
//Eliminar Usuario
document.getElementById("inputDelete").addEventListener("keyup", async function () { 
  document.getElementById("btnDelete").disabled = false;                      
  const inpdelete = document.getElementById("inputDelete").value;
fetch('https://6361aae967d3b7a0a6cadddb.mockapi.io/users/'+`${inpdelete}` , { method: 'DELETE' });
document.getElementById('btnDelete').addEventListener('click', ()=>{
  document.getElementById("inputDelete").value = ""; 
  volverAMostrarDatos(); 
})

 });

//Obtiene datos (en el modal)
document.getElementById("inputPutId").addEventListener("keyup", async function () {
  document.getElementById("btnPut").disabled = false;
});
document.getElementById("btnPut").addEventListener("click", async function () {
  const inputPutId = document.getElementById("inputPutId").value;
  crud("https://6361aae967d3b7a0a6cadddb.mockapi.io/users/" + inputPutId ).then((data) => {
    document.getElementById("inputPutNombre").value = data.name;
    document.getElementById("inputPutApellido").value = data.lastname;
  });
});

//Modifica y envia los datos (en el modal)
document.getElementById("btnSendChanges").addEventListener("click", async function () {
  const inputPutId = document.getElementById("inputPutId").value;
  const nameput = document.getElementById("inputPutNombre").value;
  const surnameput = document.getElementById("inputPutApellido").value;
  let putuser = {
    name: nameput,
    lastname: surnameput,
  };
  PutData(url = "https://6361aae967d3b7a0a6cadddb.mockapi.io/users/"+`${inputPutId}`, putuser);
  volverAMostrarDatos();
 });
 

});

