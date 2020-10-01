import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { FakeDbService } from 'app/fake-db/fake-db.service';
import { AppComponent } from 'app/app.component';
import { AppStoreModule } from 'app/store/store.module';
import { LayoutModule } from 'app/layout/layout.module';
import { GenericModule } from '@override/generic/generic.module';
import { RouteGuard } from '@override/utils/route.guard';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AdminGuard } from './guards/admin.guard';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'apps/dashboards/analytics',
        pathMatch: 'full',
    },
    {
        path: 'apps',
        loadChildren: () => import('./main/apps/apps.module').then(m => m.AppsModule),
        canActivate: [AdminGuard]
    },
    {
        path: 'pages',
        loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule),
    },
    {
        path: 'ui',
        loadChildren: () => import('./main/ui/ui.module').then(m => m.UIModule),
        canActivate: [AdminGuard]

    },
    {
        path: 'documentation',
        loadChildren: () => import('./main/documentation/documentation.module').then(m => m.DocumentationModule),
        canActivate: [AdminGuard]

    },
    {
        path: 'generic/:route', loadChildren: () => import('../@override/generic/generic.module').then(m => m.GenericModule),
        canActivate: [AdminGuard, RouteGuard]

    },
    {
        path: '**',
        redirectTo: 'apps/dashboards/analytics'
    }


];

@NgModule({
    declarations: [
        AppComponent,
        ],
    imports: [
        // GenericModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),
        MatBottomSheetModule,


        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        AppStoreModule
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [DatePipe, MatSnackBar],

})
export class AppModule {
}
