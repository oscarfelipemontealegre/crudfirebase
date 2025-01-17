import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  personas(id: string) {
    throw new Error('Method not implemented.');
  }
  ingreso(id: string) {
    throw new Error('Method not implemented.');
  }
  http: any;
  url: string | undefined;
  
  eliminarPersona(id: string):Promise<any> {
    return this.firestore.collection('personas').doc(id).delete();
  }
  constructor(private firestore: AngularFirestore) {}

  // Método para agregar una persona
  agregarPersona(persona: any): Promise<any> {
    if (typeof persona !== 'object' || persona === null) {
      throw new Error('El dato enviado a agregarPersona debe ser un objeto válido.');
    }
    return this.firestore.collection('personas').add(persona);
  }

  // Método para obtener personas
  getRegistro(): Observable<any> {
    return this.firestore.collection('personas').snapshotChanges();
  }
  
  getEmpleado(id:string): Observable<any> {
    return this.firestore.collection('personas').doc(id).snapshotChanges();
  }
  
  actualizarPersona(id:string, data: any): Promise<any>{
    return this.firestore.collection('personas').doc(id).update(data);
  }
}
