import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children:
            [
                {
                    path: 'tab1',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: './home/home.module#HomePageModule'
                            }
                        ]
                },
                {
                    path: 'tab2',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: './hotel/hotel.module#HotelPageModule'
                            },
                            {
                                path: 'hotel/:hotelId',
                                loadChildren: './detalles/detalles.module#DetallesPageModule',
                            },
                        ]
                },
                {
                    path: 'tab3',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: './restaurant/restaurant.module#RestaurantPageModule'
                            },
                            {
                                path: 'restaurante/:resId',
                                loadChildren: './detalles/detalles.module#DetallesPageModule',
                            },
                        ]
                },
                {
                    path: 'tab4',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: './fun/fun.module#FunPageModule'
                            },
                            {
                                path: 'actividad/:actividadId',
                                loadChildren: './detalles/detalles.module#DetallesPageModule',
                            },
                        ]
                },
                {
                    path: '',
                    redirectTo: '/home/tabs/tab1',
                    pathMatch: 'full'
                }
            ]
    },
    {
        path: '',
        redirectTo: '/home/tabs/tab1',
        pathMatch: 'full'
    }
];

@NgModule({
    imports:
        [
            RouterModule.forChild(routes)
        ],
    exports:
        [
            RouterModule
        ]
})
export class TabsPageRoutingModule { }
