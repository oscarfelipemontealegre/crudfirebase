import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PersonasService } from '../../servicios/personas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-persona',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule
  ],
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit {
[x: string]: any;
  createPersona: FormGroup;
  id: string | null;
  titulo ='Agregar Persona';
  

  constructor(
    private fb: FormBuilder,
    private _personasService: PersonasService,
    private router: Router,
    private toastr: ToastrService,
    private aRoutes: ActivatedRoute
  ) {
    this.createPersona = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      ubicacion: ['', Validators.required],
    });
    this.id = this.aRoutes.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarPersona(): void {
    if (this.createPersona.invalid) {
    return;}
    if (this.id === null ){
      this.agregarPersona();
    } else{
      this.editarPersona(this.id);
    }
  }
  

  agregarPersona(): void {
    if (this.createPersona.valid) {
      const registro = {
        nombre: this.createPersona.value.nombre,
        apellido: this.createPersona.value.apellido,
        celular: this.createPersona.value.celular,
        email: this.createPersona.value.email,
        ubicacion: this.createPersona.value.ubicacion,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      };
  
      this._personasService.agregarPersona(registro)
        .then(() => {
          this.toastr.success('Persona agregada exitosamente.', 'Éxito');
          this.router.navigate(['/list-personas']);
        })
        .catch((error) => {
          this.toastr.error('Error al agregar la persona: ' + error.message, 'Error');
        });
    } else {
      this.toastr.warning('Por favor, completa todos los campos correctamente.', 'Advertencia');
    }
  }
  
  editarPersona(id:string){
    const registro = {
      nombre: this.createPersona.value.nombre,
      apellido: this.createPersona.value.apellido,
      celular: this.createPersona.value.celular,
      email: this.createPersona.value.email,
      ubicacion: this.createPersona.value.ubicacion,
      fechaActualizacion: new Date(),
    };
    this._personasService.actualizarPersona(id, registro ).then(()=>{
      this.toastr.info('los datos de la persona han sido actulizados', 'Perfil Actualizado',{ positionClass: 'toast-bottom-right'})
      this.router.navigate(['/list-personas']);
    })
    
  }

  esEditar(){
    

    if(this.id 
      !== null){
        this.titulo = 'Editar Persona';
        this._personasService.getEmpleado(this.id). subscribe(data =>{
          console.log(data);
          this.createPersona.setValue({
            nombre: data.payload.data()['nombre'],
            apellido: data.payload.data()['apellido'],
            celular: data.payload.data()['celular'],
            email: data.payload.data()['email'],
            ubicacion: data.payload.data()['ubicacion']
          })
        })
      }


    
  }
  
}
