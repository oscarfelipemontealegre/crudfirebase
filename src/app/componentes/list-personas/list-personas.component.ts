import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Necesario para standalone components
import { PersonasService } from '../../servicios/personas.service';  // Asegúrate de tener el servicio importado
import { RouterModule } from '@angular/router';  // Importar RouterModule si vas a usar navegación
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-personas',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Incluir dependencias necesarias
  templateUrl: './list-personas.component.html',
  styleUrls: ['./list-personas.component.css']  // Corregido a styleUrls
})

export class ListPersonasComponent implements OnInit {
  ingreso: any[] = []; // Array para almacenar las personas

  

  constructor(private _personasService: PersonasService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getRegistro(); // Llamar al método de registro en OnInit
  }

  getRegistro(): void {
    this._personasService.getRegistro().subscribe((personas: any[]) => {
      // Asegúrate de que los datos de Firestore estén bien estructurados
      this.ingreso = personas.map((doc: any) => ({
        id: doc.payload.doc.id,  // Obtiene el ID del documento
        ...doc.payload.doc.data() // Obtiene los datos del documento
      }));
      //console.log(this.ingreso); // Mostrar en consola para verificar
    });
  }

  eliminarPersona(id: string) {
    this._personasService.eliminarPersona(id).then(() => {
      //console.log('Persona eliminada con éxito');
      this.toastr.error('La persona ha sido eliminada', 'Registro eliminado', { positionClass: 'toast-bottom-right' });
    }).catch((error) => {
      console.error('Error al eliminar la persona:', error);
    });
  }
  
  
  
}