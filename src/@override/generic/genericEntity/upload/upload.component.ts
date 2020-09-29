import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ExcelService } from '../../../utils/excel.service'
import { EntityService } from '../../../utils/entity.service';
import { EntitiesService } from '../../../utils/entities.service';
import { EntityData } from '../../../utils/interfaces/entityData';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  fileName: any;
  entityData: EntityData;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<UploadComponent>,
    private excel: ExcelService,
    private dataService: EntityService,
    private entities: EntitiesService,
    private router: Router) { }

  ngOnInit(): void {
    const url = this.router.url;
    let entity = this.entities.allEntities.find(entity => url.startsWith(entity.route))
    this.entityData = entity;
  }


  async uploadFile(event) {
    var array: any[];
    this.fileName = event.target.files[0].name;
    await this.excel.fromExcelToJson(event);
    setTimeout(async () => {
      this._bottomSheetRef.dismiss()
      array = this.excel.json;
      let saved = await this.dataService.upload(this.entityData.apiSelector, array)
      this.entities.gridApi.updateRowData({ add: saved });

    })


  }

}
