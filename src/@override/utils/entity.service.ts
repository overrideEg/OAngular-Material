import { Injectable } from '@angular/core';
import { ApiDataService } from './api-data.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OverrideService } from './override.service';

import { TranslateService } from '@ngx-translate/core';
import { API_URLS } from 'assets/constants/API_URLS';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class EntityService {


  allrecords: any[];
  record: any;

  constructor(
    private APIService: ApiDataService,
    private override: OverrideService,
    private translate: TranslateService,
    private _snackBar: MatSnackBar
  ) { }
  async save(apiSelector: string, body: any, headers?: HttpHeaders, contentType?: any) {
    let url;
    if (!apiSelector.includes('http')) {
      url = API_URLS[apiSelector]['post'];
    }
    else {
      url = apiSelector;
    }
    return await this.APIService.post(url, body, headers, contentType);
  }

  async upload(apiSelector: string, data: any[]) {
    var url = API_URLS[apiSelector]['upload'];
    if (url) {
      return await this.APIService.post(url, data);
    }
  }



  async update(apiSelector: string, body: any, entityId?: any, headers?: HttpHeaders, contentType?: string) {
    let url: string;
    if (API_URLS[apiSelector]['put']) {
      url = API_URLS[apiSelector]['put'];
    }
    else {
      url = API_URLS[apiSelector]['post'];
    }

    if (body) {
      if (entityId) {
        url = url.replace('{entityId}', entityId);
      }
      return await this.APIService.update(url, body, headers, contentType);
    }
  }

  async delete(apiSelector: string, body?: any, entityId?: string, headers?: HttpHeaders, contentType?: string) {
    var url = API_URLS[apiSelector]['delete'];
    if (body) {
      if (entityId) {
        url = url.replace('{entityId}', entityId);
      }
      return await this.APIService.delete(url, body, headers, contentType);
    }
  }

  async getAll(apiSelector: string, page?: number, pageSize?: number, headers?: HttpHeaders, contentType?: string) {
    let url;
    if (!apiSelector.includes('http')) {
      url = API_URLS[apiSelector]['get'];
    }
    else {
      url = apiSelector;
    }
    return await this.APIService.getData(url, headers, contentType);
  }

  async getOne(apiSelector: string, entityId: any, headers?: HttpHeaders, contentType?: string) {
    var url = API_URLS[apiSelector]['getOne'];

    if (entityId) {
      url = url.replace('{entityId}', entityId);
      return await this.APIService.getData(url, headers, contentType);
    }
  }

  async getData(url: string, headers?: HttpHeaders, contentType?: string) {
    return await this.APIService.getData(url, headers, contentType);
  }
  showSuccessToast(type: string) {
    this._snackBar.open(this.translate.instant('record ' + type + ' successfully'), this.translate.instant('Success'), {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  showErrorToast(error?: any, errorString?: string) {
    this._snackBar.open(this.translate.instant(errorString ? errorString : error?.error?.error), this.translate.instant('Error'), {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
