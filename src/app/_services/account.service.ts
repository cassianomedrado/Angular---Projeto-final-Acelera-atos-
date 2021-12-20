import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable  } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(user_nome, user_accessKey) {
        return this.http.post<User>(`${environment.apiUrl}/api/Conta/login`, { user_nome, user_accessKey })
            .pipe(map(user => {
                sessionStorage.clear();
                sessionStorage.setItem('user_nome', user_nome);
                console.log(user_nome);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                // sessionStorage.setItem('user_nome', user.user_nome.toString());
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        sessionStorage.removeItem('user_nome');
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/api/Conta/registrar`, user);
    }

    alterarSenha(user: User) {
        return this.http.patch(`${environment.apiUrl}/api/Conta/alterarSenha`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/api/Conta`);
    }

    // getById(id: string) {
    //     return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    // }

    // update(id, params) {
    //     return this.http.put(`${environment.apiUrl}/users/${id}`, params)
    //         .pipe(map(x => {
    //             // update stored user if the logged in user updated their own record
    //             if (id == this.userValue.id) {
    //                 // update local storage
    //                 const user = { ...this.userValue, ...params };
    //                 localStorage.setItem('user', JSON.stringify(user));

    //                 // publish updated user to subscribers
    //                 this.userSubject.next(user);
    //             }
    //             return x;
    //         }));
    // }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/api/Conta/delete/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.user_id) {
                    this.logout();
                }
                return x;
            }));
    }
}