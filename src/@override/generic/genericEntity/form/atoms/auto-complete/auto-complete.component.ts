import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { API_URLS } from '../../../../../../assets/constants/API_URLS';
import { EntitiesService } from '../../../../../utils/entities.service';
import { EntityService } from '../../../../../utils/entity.service';
import { EntityData } from '../../../../../utils/interfaces/entityData';
import { AbstractField } from '../../../../../utils/interfaces/field';
import { MyErrorStateMatcher } from '../../../../../utils/my-error-state-matcher';

@Component({
  selector: 'autoComplete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {
  @Input() field: AbstractField;
  @Input() form: FormGroup;
  @Input() isArray: boolean;
  i = 0;
  entityData: EntityData;
  fieldVal = null;
  selectedOption: any;
  data = [];
  constructor(public entities: EntitiesService, private router: Router, public translate: TranslateService, private _bottomSheet: MatBottomSheet, private dataService: EntityService) { }
  async ngOnInit(): Promise<void> {
    const url = this.router.url;
    let entity = this.entities.allEntities.find(entity => url.startsWith(entity.route))
    this.entityData = entity;

    await this.getAllRowsForEntity()
    this.filteredOptions = this.form.get(this.field.name).valueChanges.pipe(map(value => this._filter(this.getView(value))));
  }
  get isValid() { return this.form.get(this.field.name).valid && this.form.get(this.field.name).touched; }
  get isDirty() { return this.form.get(this.field.name).dirty && this.form.get(this.field.name).touched; }
  date = Date.now()
  matcher = new MyErrorStateMatcher();

  options: string[] = [];


  filteredOptions: Observable<string[]>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  async getAllRowsForEntity() {
    // uri for get
    let getUrl = API_URLS[this.field.selectOptions.fromSelector]['get']
    // path params
    if (this.field.selectOptions.pathParams) {
      let params = this.field.selectOptions.pathParams as [];
      for (let i = 0; i < params.length; i++) {
        const element = params[i];
        if (i == 0)
          getUrl += '?' + element['key'] + '=' + element['value'];
        else
          getUrl += '&' + element['key'] + '=' + element['value'];
      }
    }
    let data = await this.dataService.getAll(getUrl);
    this.data = data;
    for (let j = 0; j < data.length; j++) {
      const element = data[j];
      this.options.push(this.getView(element))
    }
  }
  onSelectionChange(event: string) {
    let record = this.data.find(item => this.getView(item).toLowerCase() === event.toLowerCase())
    this.selectedOption = record;
    this.form.get(this.field.name).patchValue(record);
    this.fieldVal = this.getView(record);

  }


  getView(event: any): string {
    let val = event;

    if (val && Object.prototype.hasOwnProperty.call(event, 'id')) {

      for (let i = 0; i < this.field.selectOptions.options.length; i++) {
        const element = this.field.selectOptions.options[i];
        val = val[element]
      }
    }

    return val || '';
  }

}
