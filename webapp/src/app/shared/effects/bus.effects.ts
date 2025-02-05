import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Observable ,  of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as busActions from '../actions/bus.actions';
import {AsyncBusService} from "../services/async-bus.service";

@Injectable()
export class BusEffects {
    constructor(private actions: Actions,
                private busService: AsyncBusService) {}


    byLocation$ = createEffect(() => {
        return this.actions.pipe(
            ofType(busActions.BUS_BY_LOCATION),
            switchMap(action => {
                return this.busService.byLocation((action as any).request.lat,
                    (action as any).request.lon, (action as any).request.num
                ).pipe(
                    map(byLocationResult => busActions.BusByLocationSuccess({data: byLocationResult})),
                    catchError(byLocationError => of(busActions.BusByLocationFail({error: byLocationError.error})))
                )
            })
        )
    })

    byRoute$ = createEffect(() => {
        return this.actions.pipe(
            ofType(busActions.BUS_BY_ROUTE),
            switchMap(action => {
                return this.busService.byRoute((action as any).request.route).pipe(
                    map(byRouteResult => busActions.BusByRouteSuccess({data: byRouteResult})),
                    catchError(byRouteError => of(busActions.BusByRouteFail({error: byRouteError.error})))
                )
            })
        )
    })


    byIds$ = createEffect(() => {
        return this.actions.pipe(
            ofType(busActions.BUS_BY_IDS),
            switchMap(action => {
                return this.busService.byId((action as any).request.ids).pipe(
                    map(byIdResult => busActions.BusByIdSuccess({data: byIdResult})),
                    catchError(byIdError => of(busActions.BusByIdFail({error: byIdError.error})))
                )
            })
        )
    })


    routes$ = createEffect(() => {
        return this.actions.pipe(
            ofType(busActions.BUS_ROUTES),
            switchMap(action => {
                return this.busService.routes().pipe(
                    map(routesResult => busActions.BusRoutesSuccess({data: routesResult})),
                    catchError(routesError => of(busActions.BusRoutesFail({error: routesError.error})))
                )
            })
        )
    })

    allAlertsByRoute$ = createEffect(() => {
        return this.actions.pipe(
            ofType(busActions.BUS_ALL_ALERTS_BY_ROUTE),
            switchMap(action => {
                return this.busService.allAlertsByRoute((action as any).request.route).pipe(
                    map(allAlertsByRouteResult => busActions.BusAllAlertsByRouteSuccess({data: allAlertsByRouteResult})),
                    catchError(allAlertsByRouteError => of(busActions.BusAllAlertsByRouteFail({error: allAlertsByRouteError.error})))
                )
            })
        )
    })

    alertByRoute$ = createEffect(() => {
        return this.actions.pipe(
            ofType(busActions.BUS_ALERT_BY_ROUTE),
            switchMap(action => {
                return this.busService.alertByRoute((action as any).request.route).pipe(
                    map(alertsByRouteResult => busActions.BusAlertByRouteSuccess({data: alertsByRouteResult})),
                    catchError(alertsByRouteError => of(busActions.BusAlertByRouteFail({error: alertsByRouteError.error})))
                )
            })
        )
    })

    alertByStop$ = createEffect(() => {
        return this.actions.pipe(
            ofType(busActions.BUS_ALERT_BY_STOP),
            switchMap(action => {
                return this.busService.alertByStop((action as any).request.stop).pipe(
                    map(alertsByStopResult => busActions.BusAlertByStopSuccess({data: alertsByStopResult})),
                    catchError(alertsByStopError => of(busActions.BusAlertByRouteFail({error: alertsByStopError.error})))
                )
            })
        )
    })
}
