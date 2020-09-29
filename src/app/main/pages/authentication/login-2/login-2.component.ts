import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { API_URLS } from 'assets/constants/API_URLS';
import { Router } from '@angular/router';
import { ApiDataService } from '@override/utils/api-data.service';

@Component({
    selector: 'login-2',
    templateUrl: './login-2.component.html',
    styleUrls: ['./login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class Login2Component implements OnInit {
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private data: ApiDataService,
        private router: Router
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    login() {
        this.data.login(API_URLS.auth.auth, this.loginForm.value).then(data => {
            // console.log(res);
            sessionStorage.setItem(btoa('email'), btoa(data.user.email));
            let authorities = '';
            if (data.authorities) {

                data.authorities.forEach(record => {
                    if (authorities != '')
                        authorities += ', ' + record.authority;
                    else
                        authorities += record.authority;
                });
            }
            sessionStorage.setItem(btoa('userType'), btoa(data.user.userType));
            sessionStorage.setItem(btoa('user.id'), btoa(data.user.id));
            sessionStorage.setItem(btoa('email'), btoa(data.user.email));
            sessionStorage.setItem('token', data.token);

            // sessionStorage.setItem('token', 'JHro6wFO4j0GtXcAPfSjd8mlzGSHm2jUzB6tXz5PHVjYIlolo4us3FBsbhXm944wt0NgnITUu3J0cXcrQuHJZ8Z1eMbdE5yYTb26KMR2DoSD9UUPdpm2m9RqJSreLP2u');
            if (data.user.userType === 'admin' || data.user.userType === 'company') {
                this.data.showToast('Logged In Successfully');

            } else {
                this.data.showToast('You are not Admin');

            }
            setTimeout(() => {
                this.router.navigate(['/apps/dashboards/project']);
            }, 500);
        });

    }
}
