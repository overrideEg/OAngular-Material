import { TranslateService } from '@ngx-translate/core';
import { FieldType } from '@override/utils/interfaces/FieldType.enum';
import { Validators } from '@angular/forms';
import { EntityData } from '@override/utils/interfaces/entityData';
import { UtilsService } from '@override/utils/utils.service';
import { DatePipe } from '@angular/common';
import { UserType } from './user-type.enum';

export class AllEntities {
    constructor(
        private _translateService: TranslateService,
        private utils: UtilsService,
        private datePipe: DatePipe

    ) { }
    public entities: EntityData[] = [

    ];
}
