import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { EntitiesService } from '../../../../utils/entities.service';
import { OverrideService } from '../../../../utils/override.service';
import { EntityData } from '../../../../utils/interfaces/entityData';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EntityService } from '../../../../utils/entity.service';
import { isArray } from 'lodash';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html'
})
export class GenericFormComponent implements OnInit, DoCheck, OnDestroy {

  entityData: EntityData;
  form: FormGroup;
  isEditMode: boolean;
  constructor(
    private router: Router,
    public entities: EntitiesService,
    public override: OverrideService,
    private dataService: EntityService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {

      this.entities.i = 1;
      let routeName ;
     this.router.events.subscribe( (val) => {
        // see also 
           
        if (val instanceof ActivationEnd && ! routeName && val.snapshot['_lastPathIndex'] === 1) {
          routeName = val.snapshot.params.route;
          
          let entity = this.entities.allEntities.find(entity => entity.route.includes(routeName))
          this.entityData = entity;
  
          if (this.entities.isEdit) {
            this.isEditMode = true;
            setTimeout(async () => {
              this.entities.entityId = this.route.snapshot.paramMap.get('entityId');
              if (this.entities.entityId && this.entities.i === 1) {
                this.entities.isEditMode = true;
                await this.getFormData();
              }
            });
          }
        }
      });
    
  
  }
  ngOnDestroy(): void {
    this.entities.isEditMode = false;
    this.entities.saved = false;
    this.entities.i = undefined;
    this.entities.entityId = undefined;
  }

  ngDoCheck(): void {
    this.entities.form = this.form
  }
  ngOnInit(): void {

    this.entities.saved = false;
    // create form group
    this.createForm();

  }

  createForm() {
    let fieldsCtrls = {}
    this.entities.entityData = this.entityData;
    for (let f of this.entityData.form.fields) {

      if (!f.displayIf) {
        fieldsCtrls[f.name] = this.entities.DetectField(f)

      } else {

        if (f.displayIf.call(null)) {
          fieldsCtrls[f.name] = this.entities.DetectField(f)
        }

      }

    }

    this.form = this.fb.group(fieldsCtrls);
  }

  dataLoaded = false;
  async getFormData() {
    if (this.entities.i === 1 && !this.dataLoaded) {
      let record = await this.dataService.getOne(this.entityData.apiSelector, this.entities.entityId)
      if (record) {
        this.dataLoaded = true;
        this.entities.i++;
        this.checkFields(record)
        this.form.patchValue(record);
      }
    }
  }
  checkFields(record: any) {
    for (const key in record) {
      if (Object.prototype.hasOwnProperty.call(record, key)) {
        const element = record[key];

        if (isArray(element) && element.length > 0 && Object.prototype.hasOwnProperty.call(element[0], 'id') && this.form.get(key).value.length < element.length) {
          for (let i = 0; i < element.length - 1; i++) {
            this.entities.arrayComponent.addRow()
          }
        }

      }
    }
  }


}
