import { Injectable } from '@angular/core';
import { EntityData } from '@override/utils/interfaces/entityData';
import { AbstractField } from '@override/utils/interfaces/field';
import { FormGroup } from '@angular/forms';
import { API_URLS } from 'assets/constants/API_URLS';
import { EntityService } from '@override/utils/entity.service';
import { TranslateService } from '@ngx-translate/core';
import { ColDef, GridApi } from 'ag-grid-community';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SelectComponent } from './select/select.component';

@Injectable({
  providedIn: 'root'
})
export class SelectService {
}