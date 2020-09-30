import { Component, OnInit, Input, DoCheck, ViewChild, TemplateRef } from '@angular/core';
import { AbstractField } from '@override/utils/interfaces/field';
import { FormGroup } from '@angular/forms';
import { EntitiesService } from '@override/utils/entities.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EntityData } from '@override/utils/interfaces/entityData';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SelectComponent } from './select/select.component';
import { SelectService } from './select.service';
import { MyErrorStateMatcher } from '@override/utils/my-error-state-matcher';
import { ColDef, GridApi } from 'ag-grid-community';

@Component({
  selector: 'entity',
  templateUrl: './select-entity.component.html',
  styleUrls: ['./select-entity.component.scss']
})
export class SelectEntityComponent implements OnInit {

  @Input() field: AbstractField;
  @Input() form: FormGroup;
  @Input() isArray: boolean;
  i = 0;
  entityData: EntityData;
  fieldVal = null;
  constructor(public entities: EntitiesService, private router: Router, public translate: TranslateService, private _bottomSheet: MatBottomSheet) { }
  ngOnInit(): void {
    const url = this.router.url;
    let entity = this.entities.allEntities.find(entity => url.startsWith(entity.route))
    this.entityData = entity;
  }

  ngDoCheck(): void {
    if (this.form.get(this.field.name) != undefined && this.entities.isEditMode) {
      if (!this.field.multiple) {
        if (this.form.value)
          if (this.form.value[this.field.name][this.field.selectOptions.optionName]) {
            this.fieldVal = this.form.value[this.field.name][this.field.selectOptions.optionName][this.translate.currentLang];
          }
      }
      else {
        let value = this.form.value[this.field.name];
        let optionValue = [];
        if (value)
          value.forEach((val) => {
            optionValue.push(
              val[this.field.selectOptions.optionName][this.translate.currentLang],
            );
          });
        this.fieldVal = optionValue.toString();
      }
    }
    this.i++;
  }
  date = Date.now()

  matcher = new MyErrorStateMatcher();

  openBottomSheet() {
    if (!this.field.readonly && !this.field.disabled) {

      let btmRef = this._bottomSheet.open(SelectComponent,
        {
          data:
            { entityData: this.entityData, form: this.form, field: this.field },
          direction: this.translate.currentLang === 'ar' ? 'rtl' : 'ltr',
      

        });


      btmRef.afterDismissed().subscribe((data) => {
        this.form = data.form;
        this.fieldVal = data.fieldVal[this.translate.currentLang];
        
        this.entities.form = data.form;
        // this.fieldVal = data[this.translate.currentLang];
        // console.log('Bottom sheet has been dismissed.', data);
      });

    }
  }


}
