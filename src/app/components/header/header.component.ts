import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/share/server/server.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  change: any;
  blob: any;

  constructor(private router: Router, public server: Service) {

  }

  generate() {
    // Supongamos que "responseFromServer" contiene la respuesta del servidor en forma de texto.

    this.server.getChanges().subscribe(data => {
      this.change = data;

      // Extraer y formatear los campos de cada objeto
      const formattedData = this.change.map((change: any) => {
        const formattedAddressPrevious = 'Dirección del cambio: ' + change.previousAddress;
        const formattedDate = 'Fecha del cambio: ' + change.dateChange;
        const formattedUser = 'Usuario que realizo el cambio: ' + change.user.idUser;
        const formattedAddress = 'Id de la dirección a la cual se le realizo el cambio: ' + change.address.idAddress;
        return `${formattedAddress}, ${formattedDate}, ${formattedAddressPrevious}, ${formattedUser}`;
      });

      // Convertir la parte de los datos en una cadena de texto
      const file = formattedData.join('\n');

      // Crear un Blob con la respuesta del servidor
      const blob = new Blob([file], { type: 'text/plain' });

      // Crear una URL (objeto URL) para el Blob
      const url = window.URL.createObjectURL(blob);

      // Crear un elemento <a> para la descarga
      const a = document.createElement('a');
      a.href = url;
      a.download = 'archivo.txt'; // Nombre del archivo que se descargará

      // Simular un clic en el enlace para iniciar la descarga
      a.click();

      // Liberar el objeto URL
      window.URL.revokeObjectURL(url);

    })

  }

  back() {
    this.server.logout();
    this.router.navigate(['/']);
  }

}
