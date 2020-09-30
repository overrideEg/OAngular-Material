import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, NavigationEnd } from '@angular/router';
import { EntitiesService } from '../../../utils/entities.service';
import { OverrideService } from '../../../utils/override.service';
import { EntityService } from '../../../utils/entity.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteRendererComponent } from "./Ag-Grid-Components/delete-renderer/delete-renderer.component";
import { EntityData } from '../../../utils/interfaces/entityData';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnDestroy {

  gridColumnApi: any;
  selectedRows: any[];
  entityData: EntityData;
  constructor(
    private router: Router,
    public entities: EntitiesService,
    private translate: TranslateService,
    public override: OverrideService,
    private entity: EntityService,
    private _snackBar: MatSnackBar) {
    let routeName;

    router.events.subscribe((val) => {
      this.overlayLoadingTemplate =
        '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';


      // see also 
      let nav: typeof ActivationEnd
      if (val instanceof NavigationEnd) {

        this.rowData = [];
        this.loading = true
        this.init();

      }
      if (val instanceof ActivationEnd && !routeName && val.snapshot['_lastPathIndex'] === 1) {
        nav = ActivationEnd
         routeName = val.snapshot.params.route
        let entity = this.entities.allEntities.find(entity => entity.route.includes(routeName))
        this.entityData = entity;
      }
    });

  }
  ngOnDestroy(): void {
    this.rowData = [];
    delete this.entityData;

  }

  init(): void {

    if (this.entityData.delete && !this.entityData.table.columnDefs.find(column => column.cellRenderer === 'deleteRender')) {
      this.entityData.table.columnDefs.push({
        headerName: this.translate.instant("delete"),
        cellRenderer: "deleteRender",
        cellRendererParams: {
          onClick: this.onDeleteClick.bind(this),
        }
      })
    }
    if (!this.entityData.table.rowData)
      this.getData()
  }
  rowData = []

  defaultColDef = {
    editable: false,
    enableRowGroup: true,
    enablePivot: false,
    enableValue: false,
    sortable: true,
    resizable: true,
    filter: true,
    enableCellChangeFlash: true,
  };

  onGridReady(params) {
    this.entities.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  frameworkComponents = {
    deleteRender: DeleteRendererComponent,
    // IdRender: IdRenderComponent,
    // approve: AgGridButtonApproveComponent,
    // resetPasswordRenderer: AgGridResetPasswordComponent,
  };

  async cellEditingStopped(event) {
    const data = event.data;
    event.colDef.type == "number" ? (event.data[event.colDef.field] = +event.data[event.colDef.field]) : event.data[event.colDef.field];
    // if (API_URLS[`${this.entityData.name}`]["put"]) {

    let updated = await this.entity.update(this.entityData.apiSelector, data, data.id)
    this.entities.gridApi.updateRowData({ update: [updated] }).update;


  }
  async onDeleteClick(event) {
    const data = event.rowData.data;
    if (confirm(this.translate.instant("sure?"))) {
      let deleted = await this.entity.delete(this.entityData.apiSelector, data, data.id)
      if (deleted.status == 200)
        this.entities.gridApi.updateRowData({ remove: [data] });
    }
  }

  onSelectionChanged() {
    this.selectedRows = this.entities.gridApi.getSelectedRows();
  }

  rowSelected(event) {
    this.entities.entityId = event.data.id
  }

  onPaginationChanged() { }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  async getData() {
    this.rowData = await this.entity.getAll(this.entityData.apiSelector);
    this.loading = false
  }
  searchValue: any
  filter() {
    this.entities.gridApi.setQuickFilter(this.searchValue)
  }


  loading = true;

  overlayLoadingTemplate;

}

