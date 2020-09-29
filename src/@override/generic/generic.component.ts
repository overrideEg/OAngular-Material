import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { EntitiesService } from '../utils/entities.service';
import { Router, ActivationEnd } from '@angular/router';
import { EntityData } from '../utils/interfaces/entityData';
import { FieldType } from '../utils/interfaces/FieldType.enum';
import { EntityService } from '../utils/entity.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UploadComponent } from './genericEntity/upload/upload.component';
import { CsvExportParams } from 'ag-grid-community';

@Component({
  selector: 'OGeneric',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.scss']
})
export class GenericComponent implements OnChanges {

  entityData: EntityData;
  constructor(
    private router: Router,
    public entities: EntitiesService,
    private dataService: EntityService,
    private _bottomSheet: MatBottomSheet) {
    router.events.subscribe((val) => {
      // see also 
      let nav: typeof ActivationEnd
      if (val instanceof ActivationEnd) {
        nav = ActivationEnd
        let route = val.snapshot.params.route
        let entity = this.entities.allEntities.find(entity => entity.route.includes(route))
        this.entityData = entity;        
      }
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

  }


  submit() {
    console.log(this.entities.form.value);
    
    this.entityData.form.fields.forEach((field) => {
      if (field.type === FieldType.number)
        this.entities.form.get(field.name).setValue(+this.entities.form.get(field.name).value);

      // if (field.type === FieldType.entity && this.entities.form.get(field.name).value === '') {
      //   this.entities.form.get(field.name).setValue(null);
      // }
    });
    let value = this.entities.form.value;

    if (this.entities.isEditMode !== true) {
      this.save(value)
    } else {
      this.update(value)
    }
  }

  async save(value: any) {
    let saved = await this.dataService.save(this.entityData.apiSelector, value) 
    if (saved.status === 200 || saved.status === 201) {
      this.entities.form.patchValue(saved);
      setTimeout(() => this.router.navigate([this.entityData.route]), 1000);
    }

  }

  async update(value: any) {
    let saved = await this.dataService.update(this.entityData.apiSelector, value, this.entities.entityId);
    if (saved.status === 200 || saved.status === 201) {
      this.entities.form.patchValue(saved);
      setTimeout(() => this.router.navigate([this.entityData.route]), 1000);
    }


  }
  openBottomSheet() {
    this._bottomSheet.open(UploadComponent);
  }

  // export to CSV
  export() {
    var params: CsvExportParams = {
      fileName: this.entityData.name.plural + "_" + new Date().toLocaleString(),
      allColumns: true,
    }
    this.entities.gridApi.exportDataAsCsv(params)

  }
}
