import { Component, OnInit } from '@angular/core';
import { Jugador } from '../model/Jugador';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'anotador';

  jugadores: Jugador[];
  newJugador:string;

  constructor(){
    this.jugadores=[];
    this.newJugador="";
  }

  ngOnInit(): void {
    if(localStorage.getItem("Data")!=undefined){
      this.jugadores=JSON.parse(localStorage.getItem("Data")+"");
    }
    else{
      this.jugadores=[];
    }
  }

  resetear(){
    this.jugadores=[];
  }

  eliminarJugador(jugador:Jugador){
   this.jugadores = this.jugadores.filter(j => j._id!=jugador._id);
   localStorage.setItem("Data",JSON.stringify(this.jugadores));
  }

  agregarJugador(){
    var newJugador= new Jugador(Math.random(),this.newJugador);
    this.jugadores.push(newJugador);
    this.newJugador="";
    localStorage.setItem("Data",JSON.stringify(this.jugadores));
  }

  calcular(jugador:Jugador){
    var jugadorToEdit = this.jugadores.filter(j=>j._id==jugador._id)[0];
    jugadorToEdit.puntos+=Number(jugadorToEdit.puntosToAdd);
    jugadorToEdit.puntosToAdd='';
    localStorage.setItem("Data",JSON.stringify(this.jugadores));
  }

}
