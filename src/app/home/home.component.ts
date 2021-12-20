import { Component } from '@angular/core';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user_nome: string;

    constructor() {
        this.user_nome = sessionStorage.getItem('user_nome');
    }
}