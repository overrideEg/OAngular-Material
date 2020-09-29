import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenericComponent } from './generic.component';
import { TableComponent } from "./genericEntity/table/table.component";
import { GenericFormComponent } from './genericEntity/form/generic-form/generic-form.component';
import { ViewComponent } from './genericEntity/view/view.component';
import { AdminGuard } from '../../app/guards/admin.guard';

const routes: Routes = [{
    path: '', component: GenericComponent,
    children: [
        { path: '', component: TableComponent },
        { path: 'all', component: TableComponent },
        { path: 'add', component: GenericFormComponent },
        { path: 'edit/:entityId', component: GenericFormComponent },
        { path: 'view/:entityId', component: ViewComponent }
    ]
},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GenericRoutingModule { }
