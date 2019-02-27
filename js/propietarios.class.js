class Mascota{
    constructor(nombre, tipo, fecha){
        this.nombre = nombre;
        this.tipo = tipo;
        this.fecha = fecha;
    }
}


class Propietario {
    constructor(nombres, apellidos, direccion,  telefono) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.direccion = direccion;
        this.telefono = telefono;
        this.mascotas = [];
    }
}