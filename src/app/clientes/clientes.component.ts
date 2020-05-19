import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import {ClienteService} from './cliente.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent {

  clientes: Cliente[];


  constructor(private clienteService:ClienteService) { }
ngOnInit() {
  this.clienteService.getClientes().subscribe(
    (clientes) => this.clientes=clientes
  );
}

delete(cliente: Cliente): void{
  swal.fire({
  title: 'Esta seguro?',
  text: `Desea eliminar el usuario! ${cliente.nombre}`,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, eliminar!'
}).then((result) => {
  if (result.value) {
    this.clienteService.delete(cliente.id).subscribe(
      response =>{
        this.clientes=this.clientes.filter(cli =>cli !==cliente)
        swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    )

  }
})

}



}
