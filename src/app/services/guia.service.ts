import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class GuiaService {
  

  constructor(private http:HttpClient) { }

  
  getPaises(){
    return this.http.get('http://35.185.216.89/getPais.php');
  }

  createGuia(guia:any){
    return this.http.post('http://35.185.216.89/insertar_guia.php',guia);
  }

  getGuias(){
    return this.http.get('http://35.185.216.89/obtener_guia.php');
  }

  editGuia(guia:any){
    
    return this.http.post('http://35.185.216.89/updateGuia.php',guia);
  }

  getIdiomas(){
    return this.http.get('http://35.185.216.89/getIdioma.php');
  }

  insertarIdiomaGuia(idioma:any){
    delete idioma.id;
    return this.http.post('http://35.185.216.89/setGuiaIdioma.php',idioma);
  }
  deleteIdiomaGuia(idioma:any){
    
    return this.http.post('http://35.185.216.89/deleteGuiaIdioma.php',idioma);
  }

  getTitulos(){
    return this.http.get('http://35.185.216.89/getTitulos.php')
  }

  insertarTituloGuia(titulo:any){
   
    return this.http.post('http://35.185.216.89/setGuiaTitulo.php',titulo);
  }
  deleteTituloGuia(titulo:any){
    
    return this.http.post('http://35.185.216.89/deleteGuiaTitulo.php',titulo);
  }

  getLugares(){
    return this.http.get('http://35.185.216.89/getLugar.php')
  }

  insertarLugarGuia(lugar:any){
    
    return this.http.post('http://35.185.216.89/setGuiaLugar.php',lugar);
  }
  deleteLugarGuia(lugar:any){
    
    return this.http.post('http://35.185.216.89/deleteGuiaLugar.php',lugar);
  }
}
