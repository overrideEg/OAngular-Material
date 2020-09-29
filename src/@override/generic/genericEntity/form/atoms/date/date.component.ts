import { Component, OnInit, Input } from '@angular/core';
import { EntitiesService } from '@override/utils/entities.service';
import { AbstractField } from '@override/utils/interfaces/field';
import { FormGroup } from '@angular/forms';
import { MyErrorStateMatcher } from '@override/utils/my-error-state-matcher';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
export const FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: FORMATS},
  ],
})
export class DateComponent implements OnInit {


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
