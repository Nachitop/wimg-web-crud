import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, FormControl } from '@angular/forms';
import { GuiaService } from 'src/app/services/guia.service';
import {Pais1, Pais2 } from '../../models/pais.model';
import {  Guia } from 'src/app/models/guia.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; //modal de bootstrap
import { Idioma1 } from 'src/app/models/idioma.model';
import { Titulo1 } from 'src/app/models/titulo.model';
import { Lugar1 } from 'src/app/models/lugar.model';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-crudguia',
  templateUrl: './crudguia.component.html',
  styleUrls: ['./crudguia.component.css']
})
export class CrudguiaComponent implements OnInit {
  closeResult: string;
  id_guia;
  idiomaSelect:string;
  titulosSelect:string;
  lugarSelect:string;
  idiomas:Idioma1;
  titulos:Titulo1;
  lugares:Lugar1;
  pais:Pais1;
  guias:Guia;
  boton:number;
  paises:Pais2[]=[];
  mensaje:string;
  mensajeIdioma:string
  error:number;
  mensajeTitulo: string;
  mensajeLugar: string;
  image: string | ArrayBuffer;
  constructor(private fb:FormBuilder, private guiaService:GuiaService,private modalService: NgbModal) { }
  form:FormGroup;
  ngOnInit() {
    this.iniciarForm();
    this.getGuias();
    this.getPaises();
  }
  iniciarForm(){
   this.form=this.fb.group({
      id:[''],
      nombre:[''],
      apellido:[''],
      email:[''],
      telefono:[''],
      fecha_nacimiento:[''],
      sexo:[''],
      id_pais:[''],
      disponibilidad:[''],
      foto:['']
       });
  }

  getGuias(){
    this.guiaService.getGuias().subscribe(res=>{
      this.guias=res as Guia;
    
    })
  }
  getPaises(){
   this.guiaService.getPaises().subscribe(res=>{
    
      
      this.pais= res as Pais1;
      this.paises=this.pais.Paises
    });
  
  }
  onSubmit(){
    var id;
    id=this.form.get('id').value;
    this.form.patchValue({foto:this.image})
    
    if(id==""|| id==null || id==undefined){
    //delete this.form.controls['id'];
   
    this.guiaService.createGuia(this.form.value).subscribe (async res=>{
      this.mostrarMensaje(res,"Guardado correctamente","Ha ocurrido un problema al guardar");
      await  this.ocultarMensaje();
      await this.getGuias();
     
     
    });
  }else{
    console.log(this.form.value);
    this.guiaService.editGuia(this.form.value).subscribe(async res=>{
      this.mostrarMensaje(res,"Actualizado correctamente","Ha ocurrido un problema al actualizar");
     
      
      await  this.ocultarMensaje();
       
     await this.getGuias();
    
 
    });
  }

  this.form.reset();
  this.image=""
  }
  ocultarMensaje(){
    setTimeout(()=>{
     this.mensaje="";
     this.error=undefined;
    },2000)
    
  }
  mostrarMensaje(res:any, mensaje:string,mensaje2:string){
   
    if(res!=null || res!=undefined){
      this.error=0;
      this.mensaje=mensaje;
    }
    else{
      this.error=1;
      this.mensaje=mensaje2;
    }
  }
  editGuia(guia:any){
    console.log(guia);
    this.image=guia.foto
    this.form.patchValue(guia);
  }
  resetForm(form?:NgForm){
    if(form){
      form.reset();
    }
  }

  calculateAge(birthday) { // birthday is a date
    
    var b= new Date(Date.parse(birthday));
    var ageDifMs = Date.now() - b.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

convertirSexo(sexo:string){
  if(sexo=="F"){
    return "Femenino"
  }
  else{
    if(sexo=="M"){
      return "Masculino"
    }
  }
}

convertirDisponibilidad(disponibilidad:string){
  if(disponibilidad=="A"){
    return "Activo"
  }
  else{
    if(disponibilidad=="I"){
      return "Inactivo"
    }
    else{
      if(disponibilidad=="R"){
        return "En recorrido"
      }
    }
  }
}
openVerticallyCentered(content, boton,id_guia) {
  this.modalService.open(content, { centered: true });
  this.boton=boton;
  this.id_guia=id_guia;
}

getIdiomas(){
  this.guiaService.getIdiomas().subscribe(res=>{
    this.idiomas=res as Idioma1;
    console.log(this.idiomas);
  
  });
}

insertarIdiomaGuia(id_guia:string){
  let valores={
    idGuia:id_guia,
    idIdioma:this.idiomaSelect
  }
  this.guiaService.insertarIdiomaGuia(valores).subscribe(res=>{
  
    this.mensajeIdioma="Idioma agregado"
   //this.mensajeIdioma=this.ocultarMensaje(this.mensajeIdioma);
  
  
  } ,error => this.mensajeIdioma="Error al guardar idioma, idioma ya existente o problemas con el server");
  this.ocultarMensaje2();
}
deleteIdiomaGuia(id_guia:string){
  let valores={
    idGuia:id_guia,
    idIdioma:this.idiomaSelect
  }
  this.guiaService.deleteIdiomaGuia(valores).subscribe(res=>{
    console.log(res);
    this.mensajeIdioma="Idioma eliminado"
  
  
  
  } ,error => this.mensajeIdioma="Error al eliminar idioma, el idioma no existe o problemas con el server");
  this.ocultarMensaje2();
}

ocultarMensaje2(){
  setTimeout(()=>{
    this.mensajeIdioma="";
    this.mensajeTitulo="";
    this.mensajeLugar="";
   },2000)
   
}


getTitulos(){
  this.guiaService.getTitulos().subscribe(res=>{
    this.titulos= res as Titulo1;
  });
}

insertarTituloGuia(id_guia:string){
  let valores={
    idGuia:id_guia,
    idTitulo:this.titulosSelect
  }
  this.guiaService.insertarTituloGuia(valores).subscribe(res=>{
  
    this.mensajeTitulo="Titulo agregado"

  
  
  } ,error => this.mensajeTitulo="Error al guardar titulo, titulo ya existente o problemas con el server");
  this.ocultarMensaje2();
}
deleteTituloGuia(id_guia:string){
  let valores={
    idGuia:id_guia,
    idTitulo:this.titulosSelect
  }
  this.guiaService.deleteTituloGuia(valores).subscribe(res=>{
    console.log(res);
    this.mensajeTitulo="Titulo eliminado"
  
  
  
  } ,error => this.mensajeTitulo="Error al eliminar titulo, el titulo no existe o problemas con el server");
  this.ocultarMensaje2();
}

getLugares(){
  this.guiaService.getLugares().subscribe(res=>{
    this.lugares= res as Lugar1;
  });
}


insertarLugarGuia(id_guia:string){
  let valores={
    idGuia:id_guia,
    idLugar:this.lugarSelect
  }
  this.guiaService.insertarLugarGuia(valores).subscribe(res=>{
  
    this.mensajeLugar="Lugar agregado"

  
  
  } ,error => this.mensajeLugar="Error al guardar titulo, titulo ya existente o problemas con el server");
  this.ocultarMensaje2();
}
deleteLugarGuia(id_guia:string){
  let valores={
    idGuia:id_guia,
    idLugar:this.lugarSelect
  }
  this.guiaService.deleteLugarGuia(valores).subscribe(res=>{
    
    this.mensajeLugar="Lugar eliminado"
  
  
  
  } ,error => this.mensajeLugar="Error al eliminar lugar, el lugar no existe o problemas con el server");
  this.ocultarMensaje2();
}


changeListener($event) : void {
  this.readThis($event.target);
}

readThis(inputValue: any): void {
  var file:File = inputValue.files[0];
  var myReader:FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image = myReader.result;
    console.log(this.image)
  }
  myReader.readAsDataURL(file);
 
}



}

