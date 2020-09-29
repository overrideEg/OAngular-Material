import { Component, OnInit, Input } from '@angular/core';
import { EntitiesService } from '../../../../../utils/entities.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup } from '@angular/forms';
import { AbstractField } from '../../../../../utils/interfaces/field';
import { MyErrorStateMatcher } from '@override/utils/my-error-state-matcher';



@Component({
  selector: 'dropDown',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit {


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

