import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Config } from 'protractor';
import { Observable } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { API_URLS } from 'assets/constants/API_URLS';
import { OverrideService } from './override.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiDataService {
  headers: HttpHeaders;

  config: Config;

  data: any;
  error: any;
  httpOptions: { headers: HttpHeaders; observe: 'response' };
  public online: boolean = navigator.onLine;

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  async post(url: string, body: any[], headers?: HttpHeaders, contentType?: string) {
    if (this.online) {
      this.httpOptions = this.getHeadders();
      if (url && body) {
        return this.http.post<Config>(url, body, this.httpOptions).toPromise().then(res => {
          return res;
        }).catch(err => {
          this.resolveNotAuthrized(err);
          return err;
        });

      }
    } else {
      this.showToast('You Are Offilne, Please Check your Internet Connection');
    }
  }

  async login(url: string, credintials: any) {
    if (this.online) {
      //Basic
      this.httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + environment.clientId,
          // 'content-type': 'application/x-www-form-urlencoded',
        }),
        observe: 'response',
      };
      if (url && credintials) {
        return this.http.post<Config>(url, credintials, this.httpOptions).toPromise().then(res => {
          return res.body;
        }).catch(err => {
          this.showErrToast(err.error.errors, err.error.statusCode);
          return err;
        });
      } else {
        this.showToast('You Are Offilne, Please Check your Internet Connection');
      }

    }
  }


  async update(url: string, body: any, headers?: HttpHeaders, contentType?: string) {
    if (this.online) {
      this.httpOptions = this.getHeadders();

      if (url && body) {
        return await this.http.put(url, body, this.httpOptions).toPromise().then(res => {
          return res;
        }).catch(err => {
          this.resolveNotAuthrized(err);
          return err;
        });

      }
    } else {
      this.showToast('You Are Offilne, Please Check your Internet Connection');
    }

  }

  async delete(url: string, body: any, headers?: HttpHeaders, contentType?: string) {
    this.httpOptions = this.getHeadders();
    if (this.online) {
      if (url) {
        return await this.http
          .request('delete', url, { body: body, headers: this.httpOptions.headers, observe: this.httpOptions.observe, }).toPromise().then(res => {
            return res;
          }).catch(err => {
            this.resolveNotAuthrized(err);
            return err;
          });

      }
    } else {
      this.showToast('You Are Offilne, Please Check your Internet Connection');
    }
  }

  async getData(url: string, headers?: HttpHeaders, contentType?: string) {
    if (this.online) {

      this.httpOptions = this.getHeadders();

      if (url) {
        return this.http.get<Config>(url, this.httpOptions).toPromise().then(res => {
          return res.body;
        }).catch(err => {
          this.resolveNotAuthrized(err);
          return err;
        });

      }
    } else {
      this.showToast('You Are Offilne, Please Check your Internet Connection');
    }
  }
  resolveNotAuthrized(error) {
    if (error.status == 401) {
      this.showErrToast(this.translate.instant(error.error.errors), error.error.statusCode);
      this.router.navigate(['/pages/auth/login']);
    } else {
      this.showErrToast(this.translate.instant(error.error.errors), error.error.statusCode);
      return error;
    }
  }
  showToast(message) {
    this._snackBar.open(this.translate.instant(message), '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
  showErrToast(message, status) {
    this._snackBar.open(this.translate.instant(message), status, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }


  private getHeadders(): { headers: HttpHeaders; observe: 'response' } {
    // console.log(sessionStorage.getItem('token'));
    
    return {
      headers:
        //  headers ? headers  :
        new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        }),
      observe: 'response',
    };
  }


}
