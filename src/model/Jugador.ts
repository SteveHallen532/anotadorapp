export class Jugador{

    _id: number;    
    nombre: string;
    puntos: number;
    puntosToAdd: string;
    
    constructor(id:number, nombre:string){    
        this._id=id;
        this.nombre=nombre
        this.puntos=0;
        this.puntosToAdd='';
    }
}