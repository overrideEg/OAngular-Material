import { Injectable } from '@angular/core';
import { EntityData } from './interfaces/entityData';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FieldType } from './interfaces/FieldType.enum';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridApi } from 'ag-grid-community';
import { AbstractField } from './interfaces/field';
import { Lang } from './interfaces/lang.enum';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
  entityData: EntityData;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private fb: FormBuilder,
    private datepipe: DatePipe) { }


  public get isAdd(): boolean {
    return this.router.url.includes('add');
  }
  public get isEdit(): boolean {
    return this.router.url.includes('edit');
  }
  public get isAll(): boolean {
    return this.router.url.includes('all');
  }
  public get isView(): boolean {
    return this.router.url.includes('view');
  }

  entityId: string;
  isEditMode: boolean;
  i: number;
  public allEntities: EntityData[];



  form: FormGroup = new FormGroup({});
  saved: boolean = false;


  gridApi: GridApi;

  DetectField(f: AbstractField) {
    // console.log('fields',f)
    switch (f.type) {

      case FieldType.entity: {
        return this.fb.control({ value: f.initialValue || f.multiple ? [] : {}, disabled: f.disabled }, f.validators ? f.validators : []);
      }
      case FieldType.textLocalized || FieldType.editorLocalized: {

        let ctrl = {};
        if (this.entityData.form.localizedAllFields === true) {
          // tslint:disable-next-line: forin
          // for (const lang in Lang) {

          // }

          ctrl['ar'] = this.fb.control(
            { value: f.initialValue ? f.initialValue : '' || '', disabled: f.disabled }, f.validators ? f.validators : []);
          ctrl['en'] = this.fb.control(
            { value: f.initialValue ? f.initialValue : '' || '', disabled: f.disabled }, f.validators ? f.validators : []);



        } else {

          ctrl[this.translate.currentLang] = this.fb.control(
            {
              value: f.initialValue ? f.initialValue : '' || '',
              disabled: f.disabled,
            },
            f.validators ? f.validators : []
          );


        }
        
        return this.fb.group(ctrl);
      }
      case FieldType.array: {
        let childs = {};
        f.children.forEach(
          (child) => {
            childs[child.name] = this.DetectField(child);
          
            // this.fb.control(
            //   {
            //     value: child.initialValue || '',
            //     disabled: child.disabled,
            //   },
            //   child.validators ? child.validators : []
            // );
          },
          f.validators ? f.validators : []
        );
        let fg = this.fb.group(childs);
        return this.fb.array([fg]);
      }
      case FieldType.checkbox: {
        return this.fb.control(
          { value: f.initialValue || false, disabled: f.disabled, }, f.validators ? f.validators : []
        );
      }
      case FieldType.dropdown: {
        return this.fb.control(
          {
            value: f.multiple ? [f.initialValue] : f.initialValue || f.multiple ? [] : '',
            disabled: f.disabled,
          },
          f.validators ? f.validators : []
        );
      }
      case FieldType.number: {
        return this.fb.control(
          { value: f.initialValue || 0, disabled: f.disabled, },
          f.validators ? f.validators : []
        );
      }
      case FieldType.weekDays: {
        return this.fb.control(
          { value: [f.initialValue] || [], disabled: f.disabled },
          f.validators ? f.validators : []
        );
      }
      case FieldType.date: {
        return this.fb.control(
          {
            value: this.datepipe.transform(f.initialValue, 'dd/MM/yyyy'),
            disabled: f.disabled,
          },
          f.validators ? f.validators : []
        );
      }
      case FieldType.group: {
        let childs = {};

        f.children.forEach((child) => {
          childs[child.name] = this.fb.control(
            {
              value: child.initialValue || '',
              disabled: child.disabled,
            },
            child.validators ? child.validators : []
          );
        });
        return this.fb.group(
          childs,
          f.validators ? f.validators : []
        );
      }

      default: {
        return this.fb.control(
          { value: f.initialValue || '', disabled: f.disabled },
          f.validators ? f.validators : []
        );
      }
    }

  }


}
