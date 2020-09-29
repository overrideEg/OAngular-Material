import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EntitiesService } from '../../../../../utils/entities.service';
import { AbstractField } from '../../../../../utils/interfaces/field';
import { MyErrorStateMatcher } from '@override/utils/my-error-state-matcher';


@Component({
  selector: 'checkBox',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnInit {


  constructor(public entities: EntitiesService) { }

  @Input() field: AbstractField;
  @Input() form: FormGroup;
  @Input() isArray: boolean;

  get isValid() { return this.form.get(this.field.name).valid && this.form.get(this.field.name).touched; }
  get isDirty() { return this.form.get(this.field.name).dirty && this.form.get(this.field.name).touched; }
  ngOnInit(): void {
  }
  date = Date.now()
  matcher = new MyErrorStateMatcher();
}
