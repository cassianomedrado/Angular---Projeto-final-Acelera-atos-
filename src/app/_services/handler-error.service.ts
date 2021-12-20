import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IErroHandler } from './erro-handler';

@Injectable({
  providedIn: 'root',
})
export class HandlerErroService {
  private erros: IErroHandler[];

  constructor(private route: Router) {}

  public handler(erroResposta: any): any[] {
    this.erros = [];

    if (typeof erroResposta === 'string') {
      this.erros.push({
        mensagem: erroResposta,
        type: 'danger',
        dismissible: true,
      });
    } else if (
      erroResposta instanceof HttpErrorResponse &&
      erroResposta.status >= 400 &&
      erroResposta.status <= 499
    ) {
      if (erroResposta.status === 401) {
        this.route.navigate(['/nao-autorizado']);
      }

      if (erroResposta.status === 404) {
        this.route.navigate(['/404']);
      }

      try {
        erroResposta.error.errors.forEach(e => {
          this.erros.push({
            mensagem: e.mensagem,
            type: 'danger',
            dismissible: true,
          });
        });
      } catch (e) {}
    } else if (
      erroResposta instanceof HttpErrorResponse &&
      erroResposta.status >= 500 &&
      erroResposta.status <= 599
    ) {
      this.route.navigate(['/500']);
    } else {
      this.erros.push({
        mensagem: 'Erro ao processar serviço remoto. Tente novamente.',
        type: 'danger',
        dismissible: true,
      });
    }

    return this.erros;
  }
  
}
