import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-delete-renderer',
  templateUrl: './delete-renderer.component.html',
  styleUrls: ['./delete-renderer.component.scss']
})
export class DeleteRendererComponent  implements ICellRendererAngularComp {
  params: any;
  getLabelFunction: any;
  
  agInit(params: any): void {
    this.params = params;
    this.getLabelFunction = this.params.getLabelFunction;
  }
  
  refresh(params?: any): boolean {
    return true;
  }
  isPopup(): boolean {
    return false;
  }
  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node
        // ...something
      }
      this.params.onClick(params);
  
    }
  }
  }
  