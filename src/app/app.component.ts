import { Component, OnInit } from '@angular/core';
import { Jugador } from '../model/Jugador';
import Swal from 'sweetalert2'

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
    if(this.jugadores.length>0){
      Swal.fire({
        title: 'Seguro?',
        text: "No se puede deshacer el cambio",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, resetear!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {   
  
          this.jugadores=[];
          localStorage.setItem("Data",JSON.stringify(this.jugadores));
          Swal.fire(
            'Puntos Reseteados',
            '',
            'success'
          )
        }})
        .catch();

    }
   
  }

  eliminarJugador(jugador:Jugador){

    Swal.fire({
      title: 'Seguro?',
      text: "No se puede deshacer el cambio",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {   
        this.jugadores = this.jugadores.filter(j => j._id!=jugador._id);
        localStorage.setItem("Data",JSON.stringify(this.jugadores));
      }})
      .catch();
  }

  agregarJugador(){

    var jugadorExistente = this.jugadores.filter(j=>j.nombre+""==this.newJugador+"");
    if(!(jugadorExistente.length>0)){
      var newJugador= new Jugador(Math.random(),this.newJugador);
      this.jugadores.push(newJugador);
      this.newJugador="";
      localStorage.setItem("Data",JSON.stringify(this.jugadores));
    }
    else{
      Swal.fire(
        'Jugador Existente',
        '',
        'error'
      )
    }

  }

  calcular(jugador:Jugador){
    var jugadorToEdit = this.jugadores.filter(j=>j._id==jugador._id)[0];
    jugadorToEdit.puntos+=Number(jugadorToEdit.puntosToAdd);
    jugadorToEdit.puntosToAdd='';
    localStorage.setItem("Data",JSON.stringify(this.jugadores));
  }

}
