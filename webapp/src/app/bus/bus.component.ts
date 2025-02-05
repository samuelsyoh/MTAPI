import { Component, OnInit } from '@angular/core';
import {BusById, BusByRoute, BusRoutes, BusAllAlertsByRoute, BusAlertByStop} from "../shared/actions/bus.actions";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {TrainById} from "../shared/actions/train.actions";

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent implements OnInit {
  lat: number = 40.7831;
  lng: number = -73.9712;
  selectedRoute: boolean = false;
  chosenRoute: string = "";
  selectedStation: boolean = false;
  chosenStation: string = "";

  center: google.maps.LatLngLiteral = {lat: this.lat, lng: this.lng};

  // routes subscription
  routesSuccess$: Observable<any>;
  routesData: any[] = [];
  routesDataUpdated: any = "";

  routesFail$: Observable<any>;
  routesError: any = "";

  // given route, stations subscription
  stationsByRouteSuccess$: Observable<any>;
  routeStationsData: any[] = [];
  routeStationsDataUpdated: any = "";

  stationsByRouteFail$: Observable<any>;
  routeStationsError: any = "";

  // given station id, get station object
  stationsByIdSuccess$: Observable<any>;
  idStationData: any = [];
  idStationDataUpdated: any = "";

  stationsByIdFail$: Observable<any>;
  idStationError: any = "";

  // given route get all alerts
  allAlertsByRouteSuccess$: Observable<any>;
  allAlertsByRouteData: any[] = [];
  allAlertsByRouteDataUpdated: any = "";

  allAlertsByRouteFail$: Observable<any>;
  allAlertsByRouteError: any = "";

  // given station get alerts
  alertsByStopSuccess$: Observable<any>;
  alertsByStopData: any[] = [];
  alertsByStopDataUpdated: any = "";

  alertsByStopFail$: Observable<any>;
  alertsByStopError: any = "";

  markerOptions: google.maps.MarkerOptions = {draggable: false, icon: "/assets/images/bus-marker.png"};
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(private store: Store<any>) {
    this.routesSuccess$ = this.store.select(s => s.busRoutes.data);
    this.routesSuccess$.subscribe((data: any) => {
      if (data) {
        this.routesData = data.data;
        this.routesDataUpdated = data.updated;
        this.routesError = "";
      } else {
        this.routesData = [];
        this.routesDataUpdated = "";
      }
    })

    this.routesFail$ = this.store.select(s => s.busRoutes.error);
    this.routesFail$.subscribe((error: any) => {
      if (error) {
        this.routesError = error;
        this.routesData = [];
        this.routesDataUpdated = "";
      } else {
        this.routesError = "";
      }
    })

    this.stationsByRouteSuccess$ = this.store.select(s => s.busByRoute.data);
    this.stationsByRouteSuccess$.subscribe((data: any) => {
      if (data) {
        this.routeStationsData = data.data;
        let routeStationsDataCopy = [...this.routeStationsData];

        this.routeStationsData = routeStationsDataCopy.sort((first: any, second: any) => {
          if (first.location[0] < second.location[0]) {
            return -1;
          }
          if (first.location[0] > second.location[0]) {
            return 1;
          }
          return 0;
        });

        this.routeStationsDataUpdated = data.updated;
        this.routeStationsError = "";

        this.constructStationMarkers();
      } else {
        this.routeStationsData = [];
      }
    })

    this.stationsByRouteFail$ = this.store.select(s => s.busByRoute.error);
    this.stationsByRouteFail$.subscribe((error: any) => {
      if (error) {
        this.routeStationsError = error;
        this.routeStationsData = [];
        this.routeStationsDataUpdated = "";
      } else {
        this.routeStationsError = "";
      }
    })

    this.stationsByIdSuccess$ = this.store.select(s => s.busById.data);
    this.stationsByIdSuccess$.subscribe((data: any) => {
      if (data) {
        this.idStationData = data.data;
        this.idStationDataUpdated = data.updated;
        this.idStationError = "";
      } else {
        this.idStationDataUpdated = [];
        this.idStationDataUpdated = "";
      }
    })

    this.stationsByIdFail$ = this.store.select(s => s.busById.error);
    this.stationsByIdFail$.subscribe((error: any) => {
      if (error) {
        this.idStationError = error;
        this.idStationData = [];
        this.idStationDataUpdated = "";
      } else {
        this.idStationError = "";
      }
    })

    this.allAlertsByRouteSuccess$ = this.store.select(s => s.busAllAlertsByRoute.data);
    this.allAlertsByRouteSuccess$.subscribe((data: any) => {
      if (data) {
        this.allAlertsByRouteData = data.data;
        this.allAlertsByRouteDataUpdated = data.updated;
        this.allAlertsByRouteError = "";
      } else {
        this.allAlertsByRouteData = [];
        this.allAlertsByRouteDataUpdated = "";
      }
    })

    this.allAlertsByRouteFail$ = this.store.select(s => s.busAllAlertsByRoute.error);
    this.allAlertsByRouteFail$.subscribe((error: any) => {
      if (error) {
        this.allAlertsByRouteError = error;
        this.allAlertsByRouteData = [];
        this.allAlertsByRouteDataUpdated = "";
      } else {
        this.allAlertsByRouteError = "";
      }
    })

    this.alertsByStopSuccess$ = this.store.select(s => s.busAlertByStop.data);
    this.alertsByStopSuccess$.subscribe((data: any) => {
      if (data) {
        this.alertsByStopData = data.data;
        this.alertsByStopDataUpdated = data.updated;
        this.alertsByStopError = "";
      } else {
        this.alertsByStopData = [];
        this.alertsByStopDataUpdated = "";
      }
    })

    this.alertsByStopFail$ = this.store.select(s => s.busAlertByStop.error);
    this.alertsByStopFail$.subscribe((error: any) => {
      if (error) {
        this.alertsByStopError = error;
        this.alertsByStopData = [];
        this.alertsByStopDataUpdated = "";
      } else {
        this.alertsByStopError = "";
      }
    })


    this.store.dispatch(BusRoutes());
  }

  ngOnInit(): void {
  }

  reload(): void {
    this.store.dispatch(BusById({request: {ids: [this.chosenStation]}}));
  }

  selectRoute(event: any) {
    this.selectedRoute = true;
    this.chosenRoute = event.source.value;

    this.store.dispatch(BusByRoute({request: {route: event.source.value}}));
    this.idStationData = [];
    this.markerPositions = [];

    this.store.dispatch(BusAllAlertsByRoute({request: {route: event.source.value}}));
    this.allAlertsByRouteData = [];
    this.allAlertsByRouteDataUpdated = "";
  }

  selectStation(event: any) {
    this.selectedStation = true;
    this.idStationData = [];
    this.chosenStation = event.source.value.id;
    this.store.dispatch(BusById({request: {ids: [event.source.value.id]}}));
    this.lat = event.source.value.location[0];
    this.lng = event.source.value.location[1];
    this.center = {lat: this.lat, lng: this.lng};

    this.store.dispatch(BusAlertByStop({request: {stop: event.source.value.id}}))
  }

  constructStationMarkers() {
    for (let station of this.routeStationsData) {
      this.markerPositions.push({lat: station.location[0], lng: station.location[1]});
    }
  }
}
