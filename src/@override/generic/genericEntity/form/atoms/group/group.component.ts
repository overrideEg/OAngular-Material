import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { EntitiesService } from '@override/utils/entities.service';
import { AbstractField } from '@override/utils/interfaces/field';
import { FormGroup } from '@angular/forms';
import { MyErrorStateMatcher } from '@override/utils/my-error-state-matcher';

@Component({
  selector: 'group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  constructor(public entities: EntitiesService) { }
 
  @Input() field: AbstractField;
  @Input() form: FormGroup;
  @Input() isArray: boolean;

  get isValid() { return this.form.get(this.field.name).valid && this.form.get(this.field.name).touched;  }
  get isDirty() { return this.form.get(this.field.name).dirty && this.form.get(this.field.name).touched;  }
  ngOnInit(): void {
  }
  date = Date.now()
  matcher = new MyErrorStateMatcher();


}
