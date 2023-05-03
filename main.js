//La idea ahora es:
//1- Generar una base de datos alumnos:
//a- podrán gestionar un alta
//b- podrán gestionar baja
//c- podrán realizar una modificación 
//2- Información de clases habilitadas según edad (previo registro alumno):
//a- se debe buscar la edad del alumno previamente registrado:
//1- si el alumno está registrado, continua paso b.
//2- si el alumno no está registrado, se debe registrar
//b- se informa de las clases a las que puede asistir
//3- Elección de frecuencia semanal a asistir
//4- Según esa frecuencia será el importe abonar 
//5- Se registrarán los datos de quien abonará (generación de BD):
//a- nombre
//b- apellido
//c- CI
//6- Se ofrecerá una opción de pago:
//a- T/bancaria
//b- Efectivo en la academia
//c- Mercado pago
//7- Pase libre: (con registro de alumno)
//a- Compra y/o renovación
//b- Vencimiento.  
//8- Finalizado todo, podrá salir del sistema. 

class Alumno {
    constructor(nombre, apellido, edad, ci, celular, mail) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.ci = ci;
        this.celular = celular;
        this.mail = mail;
    }
}
class RespPago {
    constructor(nombre, apellido, ci) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.ci = ci;
    }
}
//Constantes:
const valorClaseHora = 250;
const valorPaseLibre = 2450;
const descUno = 1.2
const descDos = 1.3
const alumnoRicardo = new Alumno("Ricardo", "Graña", 35, 15946783, 099123654, "RG@gmail.com");
const pagaRicardo = new RespPago("Ricardo", "Graña", 15946783);

//Arrays:
const arrayAlumnos = [];
arrayAlumnos.push(alumnoRicardo);
const arrayResponsablePago = [];
arrayResponsablePago.push(pagaRicardo);
const arrayAlumnosDadosDeBaja = [];

//Variables:
let cantidadClasesAsistir = 0;
let ciAlumno = "";
let opcionMenuPrincipal = 0;

//***Funciones utilizadas: ***//
//De Menú:
function menuPrincipal() {
    alert("Bienvenido a YouDance");
    let opciones;
    do {
        opciones = parseInt(prompt(`Ingrese una opción: 
    1- Menú Alumno 
    2- Menú Responsable Pago 
    3- Clases Habilitadas 
    4- Compra o recarga cuponera 
    5- Compra o Renovación Pase Libre 
    6- Salir`));
    } while (isNaN(opciones) || opciones < 1 || opciones > 6);
    return opciones;
};
function menuAlumno() {
    let opciones;
    do {
        opciones = parseInt(prompt(`Menú Alumnos 
    Ingrese una opción:
    1- Alta de un alumno 
    2- Baja de un alumno 
    3- Modificar datos (Con registro previo) 
    4- Volver`));
        if (isNaN(opciones) || opciones < 1 || opciones > 4) {
            alert("Opción inválida. Por favor, ingrese una opción válida.");
        }
    } while (isNaN(opciones) || opciones < 1 || opciones > 4);
    return opciones;
};
function menuRespPago() {
    let opciones;
    do {
        opciones = parseInt(prompt(`Menú Responsable de Pagos
    Ingrese una opción: 
    1- Alta 
    2- Baja 
    3- Consulta 
    4- Volver`));
    } while (isNaN(opciones) || opciones < 1 || opciones > 4);
    return opciones;
};
//De gestión de datos
function altaAlumno() {
    let nombre = prompt("Ingrese el nombre completo del alumno");
    while (nombre === "") { nombre = prompt("Ingrese el nombre completo del alumno"); }
    console.log(nombre);
    let apellido = prompt("Ingrese el apellido completo del alumno");
    while (apellido === "") { apellido = prompt("Ingrese el apellido completo del alumno"); }
    console.log(apellido);
    let edad;
    do {
        edad = (parseInt(prompt("Ingrese la edad del alumno (en años)")));
    } while (isNaN(edad) || edad === null)
    console.log(edad)
    let ci = parseInt(prompt("Ingrese la CI del alumno"));
    while (ci === "") {
        ci = parseInt(prompt("Ingrese la CI del alumno"));
    }
    if (arrayAlumnos.some(alumno => alumno.ci === ci)) {
        alert(`Le persona con CI ${ci} ya existe en la base de datos`)
    }
    let celular = "";
    while (celular === "" || !validarNumeroCel(celular)) {
        celular = prompt("Ingrese el número de celular del alumno (099123456)");
    }
    console.log(celular);
    let mail = prompt("Ingrese el mail del alumno");
    while (mail === "" || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail)) {
        mail = prompt("Ingrese el mail del alumno válido");
    }
    console.log(mail);
    let alumno = new Alumno(nombre, apellido, edad, ci, celular, mail);
    arrayAlumnos.push(alumno);
    console.log(arrayAlumnos);
};
function bajaAlumno() {
    let bajaCi = parseInt(prompt("Ingrese la CI del Alumno: "));
    let index = arrayAlumnos.findIndex(alumno => alumno.ci === bajaCi);
    if (index === -1) {
        alert("El alumno con CI: " + bajaCi + " no existe en la base de datos")
    } else {
        let alumnoBaja = arrayAlumnos.splice(index, 1)[0];
        arrayAlumnosDadosDeBaja.push(alumnoBaja);
        console.log("Alumno dado de baja");
        console.log("Alumno/s dados de baja :", alumnoBaja);
        console.log("Lista de alumnos Actualizada: ", arrayAlumnos);
        alert("Baja realizada con éxito");
    }
};
function modificarAlumno() {
    let ciAlumnoMod = parseInt(prompt("Ingrese la CI del Alumno: "));
    let alumno = arrayAlumnos.find(alumno => alumno.ci === ciAlumnoMod);
    if (!alumno) {
        alert("No se encontró registro")
        return;
    }
    let indice = arrayAlumnos.indexOf(alumno);
    let edad = (parseInt(prompt("Ingrese la edad del alumno (en años)")));
    while (isNaN(edad)) {
        edad = (parseInt(prompt("Ingrese la edad del alumno (en años)")));
    }
    console.log(edad)
    let celular = "";
    while (celular === "" || !validarNumeroCel(celular)) {
        celular = prompt("Ingrese el número de celular del alumno (099123456)");
    }
    console.log(celular);
    let mail = prompt("Ingrese el mail del alumno");
    while (mail === "" || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail)) {
        mail = prompt("Ingrese el mail del alumno válido");
    }
    console.log(mail);
    const alumnoModificado = new Alumno(
        alumno.nombre,
        alumno.apellido,
        edad,
        ciAlumnoMod,
        celular,
        mail
    );
    arrayAlumnos.splice(indice, 1, alumnoModificado);
    console.log("Alumno modificado: ", alumnoModificado);
    console.log("Lista de alumnos actualizada: ", arrayAlumnos);
    alert("Datos actualizados con éxito.")
}
function buscarAlumno() {
    let cIBuscada;
    do {
        cIBuscada = parseInt(prompt("Ingrese la CI del Alumno: "));
    } while (isNaN(cIBuscada) || cIBuscada === null);
    let alumnoBuscado = arrayAlumnos.find(alumno => alumno.ci === cIBuscada);
    if (!alumnoBuscado) {
        if (confirm(`El alumno con CI: ${cIBuscada} no existe en la base de datos`)) {
            altaAlumno();
            return;
        } else {
            return;
        }
    } else {
        alert(`El alumno con CI indicada es: ${alumnoBuscado.nombre} ${alumnoBuscado.apellido}`);
        let edadAlumno = alumnoBuscado.edad;
        console.log(edadAlumno);
        horariosHabilitados(edadAlumno);
        return;
    }
}
function altaRespPago() {
    let nombre = "";
    while (nombre === "") {
        nombre = prompt("responsable el nombre completo del alumno");
    }
    let apellido = "";
    while (apellido === "") {
        apellido = prompt("responsable el apellido completo del alumno");
    }
    let ci = null;
    while (ci === null || isNaN(ci)) {
        ci = parseInt(prompt("Ingrese la CI del responsable de pago"));
    }
    let paga = new RespPago(nombre, apellido, ci);
    arrayResponsablePago.unshift(paga);
    console.log(`Responsable de pago agregado: ${paga.nombre} ${paga.apellido} - CI: ${paga.ci}`);
}
function bajaRespPago() {
    let bajaCi = parseInt(prompt("Ingrese la CI del responsable de pago: "));
    let respBaja = arrayResponsablePago.find(respPago => respPago.ci === bajaCi);
    while (!respBaja) {
        alert("la persona con CI: " + bajaCi + " no existe en la base de datos");
        return;
    }
    let indice = arrayResponsablePago.indexOf(respBaja);
    respBaja = arrayResponsablePago.splice(indice, 1)[0];
    console.log("Dado de baja :", respBaja);
    console.log("Lista actualizada: ", arrayResponsablePago);
    alert("Baja realizada con éxito")
}
function consultaRespPago() {
    let cIBuscada;
    do {
        cIBuscada = parseInt(prompt("Ingrese la CI del responsable de pago: "));
    } while (isNaN(cIBuscada) || cIBuscada === null);
    let respPago = arrayResponsablePago.find(respPago => respPago.ci === cIBuscada);
    if (!respPago) {
        if (confirm(`La persona con CI:  ${cIBuscada} no existe en la base de datos
        Ingrese el responsable en nuestra Base de datos`)) {
            altaRespPago();
        } else {
            return;
        }
    } else {
        alert(`La persona con CI indicada es: ${respPago.nombre} ${respPago.apellido}
        Puede realizar el pago ahora o ir a las opciones 4 y 5 del Menú Principal`);
    }
    return respPago;
}
function horariosHabilitados(edadAlumno) {
    if (edadAlumno >= 6 && edadAlumno <= 18) {
        alert(`Horarios Disponibles:
        - Introducción a la Danza - 18hs Lunes y Miercoles 
        - Ritmos Adolescentes - 19hs Lunes y Miercoles 
        - Ritmos para niños - 18hs Martes y Jueves`);
    } else if (edadAlumno >= 19 && edadAlumno <= 79) {
        alert(`Horarios Disponibles: 
        - Bachata Nivel 2 - 20Hs Lunes y Miercoles 
        - Salsa Nivel 2 - 21hs Lunes y Miercoles 
        - Bachata Nivel 1 - 20Hs Martes y Jueves 
        - Salsa Nivel 1 - 21Hs Martes y Jueves 
        - Estilos Femeninos - 19Hs Martes, Jueves y Viernes`);
    } else {
        alert("No contamos aún con clases para la edad registrada");
    }
}
//Con cálculos integrados:
function recargaCompraCuponera() {
    alert(`Recordando las clases que tiene habiltiada el alumno,
    indique a continuación el numero de clases a las que asistirá por semana`);
    cantidadClasesAsistir = parseInt(prompt("Indique el número de clases a las que asistirá por semana: "));
    console.log(cantidadClasesAsistir);
    let totalAPagar = ValorCuponera()
    alert(`El costo a abonar es de: ${totalAPagar.toFixed(2)}`);
    let respPago = consultaRespPagoResumida();
    if (totalAPagar > 0) {
        let formaPago = parseInt(prompt(`¿Como desea abonar? (Solo ingrese 1, 2 o 3) 
        1 -Trasnferencia Bancaria 
        2- Efectivo 
        3- Mercado Pago`));
        while (![1, 2, 3].includes(formaPago)) {
            if (formaPago === 1) {
                alert("Error en la elección de medio de pago, por favor, vuelva a intentarlo")
                formaPago = parseInt(prompt(`¿Como desea abonar? (Solo ingrese 1, 2 o 3)
            1 -Trasnferencia Bancaria 
            2- Efectivo 
            3- Mercado Pago`));
            }
        }
        alert(`Gracias por realizar la compra o recarga ${respPago.nombre} ${respPago.apellido}, el costo abonado fue de: $${totalAPagar.toFixed(2)}`)
    } else {
        alert("No se realizó ninguna compra o recarga")
    }
}
function ValorCuponera() {
    let costoAPagar;
    if (cantidadClasesAsistir <= 2) {
        costoAPagar = (valorClaseHora * cantidadClasesAsistir * 4);
    } else if (cantidadClasesAsistir > 2 && cantidadClasesAsistir <= 4) {
        costoAPagar = ((valorClaseHora * cantidadClasesAsistir * 4)) / descUno;
    } else if (cantidadClasesAsistir > 4 && cantidadClasesAsistir <= 6) {
        costoAPagar = ((valorClaseHora * cantidadClasesAsistir * 4)) / descDos;
    } else {
        costoAPagar = valorPaseLibre;
    }
    return costoAPagar;
}
function compraPaseLibre() {
    let alumnoBuscado = buscarAlumno();
    let resPago = consultaRespPagoResumida();
    const formasPagoValidas = [1, 2, 3];
    valorPaseLibre;
    alert(`El valor del pase libre es de: $${valorPaseLibre} para el alumno ${alumnoBuscado.nombre} ${alumnoBuscado.apellido}
    El responsable de pago es: ${resPago.nombre} ${resPago.apellido}`);
    let formaPago = parseInt(prompt(`¿Como desea abonar? (Solo ingrese 1, 2 o 3) 
    1 -Trasnferencia Bancaria 
    2- Efectivo 
    3- Mercado Pago`));
    while (!formasPagoValidas.includes(formasPago)) {
        alert("Error en la elección de medio de pago, por favor, vuelva a intentarlo")
        formaPago = parseInt(prompt(`¿Como desea abonar? (Solo ingrese 1, 2 o 3) 
        1 -Trasnferencia Bancaria 
        2- Efectivo 
        3- Mercado Pago`));
    }
    switch (formaPago) {
        case 1:
            alert("Vaya a la web de su banca electrónica y haga la transferencia a 123-456789.");
            break;
        case 2:
            alert("Te esperamos en la academia para realizar el cobro.");
            break;
        case 3:
            alert("Buscanos en Mercado Pago como YouDance, realiza el pago ym manda captura al 099456789");
            break;
    }
    let fechaCompra = new Date();
    let vencimientoPL = new Date(fechaCompra.getTime() + (31 * 24 * 60 * 60 * 1000));
    alert("Gracias por renovar el Pase Libre, su próximo vencimiento es el: " + vencimientoPL.toLocaleString());
}
//funciones auxiliares:
function validarNumeroCel(numero) {
    if (typeof numero !== 'string' || numero === null || numero === undefined) {
        throw new Error('Ingrese el número de celular del alumno con formato 099123456')
    };
    // Expresión regular que solo acepta números del 0 al 9
    let regex = /^09[0-9]{7}$/;
    // Comprobar si el número cumple con la expresión regular
    return regex.test(numero);
}
function consultaRespPagoResumida() {
    let cIBuscada = parseInt(prompt("Ingrese la CI del responsable de pago: "));
    let respPago = arrayResponsablePago.find(respPago => respPago.ci === cIBuscada);
    if (!respPago) {
        alert(`La persona con CI: ${cIBuscada} + " no existe en la base de datos`);
        alert("Ingrese el responsable en nuestra Base de datos");
        altaRespPago();
    } else {
        alert(`La persona con CI indicada es: ${respPago.nombre} ${respPago.apellido}`);
    }
    return respPago
}

//Ejecuto el programa:
do {
    opcionMenuPrincipal = menuPrincipal();
    switch (opcionMenuPrincipal) {   
        case 1:
            let opcionMenuAlumno = menuAlumno();
            switch (opcionMenuAlumno) {
                case 1:
                    altaAlumno();
                    break;
                case 2:
                    bajaAlumno();
                    break;
                case 3:
                    modificarAlumno();
                    break;
                case 4:
                    opcionMenuPrincipal = 0;
                    break;
                default:
                    alert("Opción no válida, intente de nuevo");
                    break;
            }
            break;
        case 2:
            let opcionMenuRespPago = menuRespPago();
            switch (opcionMenuRespPago) {
                case 1:
                    altaRespPago();
                    break;
                case 2:
                    bajaRespPago();
                    break;
                case 3:
                    consultaRespPago();
                    break;
                case 4:
                    opcionMenuPrincipal = 0;
                    break;
                default:
                    alert("Opción no valida, intente de nuevo");
                    break;
            }
            break;
        case 3:
            buscarAlumno();
            break;
        case 4:
            recargaCompraCuponera();
            break;
        case 5:
            compraPaseLibre();
            break;
        case 6:
            alert("Gracias por usar el sistema YouDance \n Versión 1.0 \n Created by Ricardo Graña");
            break;
        default:
            alert("Opción no válida, intente de nuevo");
            break;
    };
} while (opcionMenuPrincipal !== 6) 
