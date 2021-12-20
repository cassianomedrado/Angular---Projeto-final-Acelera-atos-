import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            user_nome: ['', Validators.required],
            user_email: ['', Validators.required],
            user_accessKey: ['', [Validators.required, Validators.minLength(6)]],
            user_reSenha: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        if (this.form.controls.user_reSenha.value == this.form.controls.user_accessKey.value) {
            this.loading = true;
            this.accountService.register(this.form.value)
                .pipe(first())
                .subscribe({
                    next: () => {
                        this.alertService.success('Cadastro realizado com sucesso.', { keepAfterRouteChange: true });
                        this.router.navigate(['../login'], { relativeTo: this.route });
                    },
                    error: error => {
                        this.alertService.error(error);
                        this.loading = false;
                    }
                });
        } else {
            this.alertService.error("Senhas são diferentes.");
            this.loading = false;
        }
    }
}