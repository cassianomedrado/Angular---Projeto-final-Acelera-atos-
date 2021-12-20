import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Cliente } from '@app/_models'

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {

  }

  getAll() {
    return this.http.get<Cliente[]>(`${environment.apiUrl}/api/Pessoa`);
  }

  cadastrarCliente(cli: Cliente) {
    return this.http.post(`${environment.apiUrl}/api/Pessoa`, cli);
}

}
