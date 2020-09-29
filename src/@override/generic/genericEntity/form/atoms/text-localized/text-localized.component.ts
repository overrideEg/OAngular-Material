import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EntitiesService } from '../../../../../utils/entities.service';
import { AbstractField } from '../../../../../utils/interfaces/field';
import { EntityData } from '../../../../../utils/interfaces/entityData';
import { TranslateService } from '@ngx-translate/core';
import { MyErrorStateMatcher } from '@override/utils/my-error-state-matcher';
@Component({
  selector: 'textLocalized',
  templateUrl: './text-localized.component.html',
  styleUrls: ['./text-localized.component.scss']
})
export class TextLocalizedComponent implements OnInit {

  Lang = ['en','ar'];
  @Input() field: AbstractField;
  @Input() form: FormGroup;
  @Input() isArray: boolean;
  constructor(public entities: EntitiesService, private router: Router,public translate: TranslateService) { }

  get isValid() { return this.form.get(this.field.name).valid && this.form.get(this.field.name).touched; }
  get isDirty() { return this.form.get(this.field.name).dirty && this.form.get(this.field.name).touched; }
  entityData: EntityData;

  ngOnInit(): void {
    const url = this.router.url;
    let entity = this.entities.allEntities.find(entity => url.startsWith(entity.route))
    this.entityData = entity;
  }
  date = Date.now()
  matcher = new MyErrorStateMatcher();


}
