import { Component, OnInit, Input } from '@angular/core';
import { AbstractField } from '../../../../utils/interfaces/field';
import { EntitiesService } from '../../../../utils/entities.service';
import { OverrideService } from '../../../../utils/override.service';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'field-builder',
  templateUrl: './field-builder.component.html',
  styleUrls: ['./field-builder.component.scss']
})
export class FieldBuilderComponent  {
  @Input() field: AbstractField;
  @Input() isArray: boolean;
  @Input() form: FormGroup
  constructor(
    public entities: EntitiesService,
    public override: OverrideService) { }

  

 
}
