import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";

// import { AgGridModule } from "ag-grid-angular";
import { AgGridModule } from "ag-grid-angular";

import { TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { GenericComponent } from './generic.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FuseSidebarModule, FuseDemoModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { TableComponent } from './genericEntity/table/table.component';
import { GenericRoutingModule } from './generic-routing.module'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GenericFormComponent } from './genericEntity/form/generic-form/generic-form.component';
import { ViewComponent } from './genericEntity/view/view.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteRendererComponent } from './genericEntity/table/Ag-Grid-Components/delete-renderer/delete-renderer.component';
import { MatInputModule } from '@angular/material/input';
import { FieldBuilderComponent } from './genericEntity/form/field-builder/field-builder.component';
import { TextboxComponent } from './genericEntity/form/atoms/textbox/textbox.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DropDownComponent } from './genericEntity/form/atoms/drop-down/drop-down.component';
import { MatSelectModule } from '@angular/material/select';
import { CheckBoxComponent } from './genericEntity/form/atoms/check-box/check-box.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UploadComponent } from './genericEntity/upload/upload.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ArrayComponent } from './genericEntity/form/atoms/array/array.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TextLocalizedComponent } from './genericEntity/form/atoms/text-localized/text-localized.component';
import { FileComponent } from './genericEntity/form/atoms/file/file.component';
import { SelectEntityComponent } from './genericEntity/form/atoms/select-entity/select-entity.component';
import { SelectComponent } from './genericEntity/form/atoms/select-entity/select/select.component';
import { GroupComponent } from './genericEntity/form/atoms/group/group.component';
import { DateComponent } from './genericEntity/form/atoms/date/date.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
const matModules = [
  MatButtonModule,
  MatIconModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatInputModule,
  MatGridListModule,
  MatSelectModule,
  MatCheckboxModule,
  MatBottomSheetModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatListModule,
   MatProgressSpinnerModule
]
const fuseModules = [
  FuseSidebarModule,
  FuseSharedModule,
  FuseDemoModule
]
@NgModule({
  declarations: [
    GenericComponent,
    TableComponent,
    GenericFormComponent,
    ViewComponent,
    DeleteRendererComponent,
    FieldBuilderComponent,
    TextboxComponent,
    DropDownComponent,
    CheckBoxComponent,
    UploadComponent,
    ArrayComponent,
    TextLocalizedComponent,
    FileComponent,
    SelectEntityComponent,
    SelectComponent,
    GroupComponent,
    DateComponent
  ],
  imports: [
    GenericRoutingModule,
    RouterModule,
    CommonModule,
    TranslateModule.forChild(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    ...matModules,
    ...fuseModules
  ],
  exports: [GenericComponent],
  entryComponents: [SelectComponent],
  providers: [DatePipe],

})
export class GenericModule { }
