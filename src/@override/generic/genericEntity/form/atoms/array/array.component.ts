import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Input, DoCheck, ViewChild } from '@angular/core';
import { EntitiesService } from '../../../../../utils/entities.service';
import { AbstractField } from '../../../../../utils/interfaces/field';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { OverrideService } from '../../../../../utils/override.service';
import { EntityData } from '../../../../../utils/interfaces/entityData';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss']
})
export class ArrayComponent implements  OnInit {

  constructor(
    public entities: EntitiesService,
    private fb: FormBuilder,
    private translate :TranslateService,
    private router: Router) {
      entities.arrayComponent = this;
     }



  @Input() field: AbstractField;
  @Input() form: FormGroup;
  @Input() isArray: boolean;

  get isValid() { return this.form.get(this.field.name).valid && this.form.get(this.field.name).touched; }
  get isDirty() { return this.form.get(this.field.name).dirty && this.form.get(this.field.name).touched; }
  i = 0;
  entityData: EntityData;

  ngOnInit(): void {
    
    const url = this.router.url;
    let entity = this.entities.allEntities.find(entity => url.startsWith(entity.route))
    this.entityData = entity;
  }


 
  get Forms() {
    return this.form.controls[this.field.name] as FormArray;
  }


  addRow() {
    let ctrls = {}
    let newGroup;
    for (let f of this.field.children) {
      ctrls[f.name] = this.entities.DetectField(f)
      newGroup = this.fb.group(ctrls);
    }
    this.Forms.push(newGroup);
  }
  removeRow(i) {
      if (confirm(this.translate.instant('Are You Sure ?'))){
        this.Forms.removeAt(i);
        if (this.Forms.length === 0)
        this.addRow()
      }
 

  }

  @ViewChild(MatAccordion) accordion: MatAccordion;

}
