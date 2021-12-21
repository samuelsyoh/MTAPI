import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {TrainRoutes} from "../shared/actions/train.actions";
import {BusRoutes} from "../shared/actions/bus.actions";

export interface DialogData {
  routes: any[],
  bus_routes: any[]
}

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  routesSuccess$: Observable<any>;
  routesData: any[] = [];
  routesDataUpdated: any = "";

  routesFail$: Observable<any>;
  routesError: any = "";


  busRoutesSuccess$: Observable<any>;
  busRoutesData: any[] = [];
  busRoutesDataUpdated: any = "";

  busRoutesFail$: Observable<any>;
  busRoutesError: any = "";

  constructor(public dialog: MatDialog, private store: Store<any>) {
    this.routesSuccess$ = this.store.select(s => s.trainRoutes.data);
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

    this.routesFail$ = this.store.select(s => s.trainRoutes.error);
    this.routesFail$.subscribe((error: any) => {
      if (error) {
        this.routesError = error;
        this.routesData = [];
        this.routesDataUpdated = "";
      } else {
        this.routesError = "";
      }
    })

    this.busRoutesSuccess$ = this.store.select(s => s.busRoutes.data);
    this.busRoutesSuccess$.subscribe((data: any) => {
      if (data) {
        this.busRoutesData = data.data;
        this.busRoutesDataUpdated = data.updated;
        this.busRoutesError = "";
      } else {
        this.busRoutesData = [];
        this.busRoutesDataUpdated = "";
      }
    })

    this.busRoutesFail$ = this.store.select(s => s.busRoutes.error);
    this.busRoutesFail$.subscribe((error: any) => {
      if (error) {
        this.busRoutesError = error;
        this.busRoutesData = [];
        this.busRoutesDataUpdated = "";
      } else {
        this.busRoutesError = "";
      }
    })

    this.store.dispatch(TrainRoutes());
    this.store.dispatch(BusRoutes());
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CovidSymptomForm, {
      width: '900px',
      height: '900px',
      data: {
        routes: this.routesData,
        bus_routes: this.busRoutesData
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed')
    });
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'covid-symptom-form',
  templateUrl: 'covid-symptom-form.html',
  styleUrls: ['covid-symptom-form.css']
})
export class CovidSymptomForm {
  hasFever: boolean = false;
  hasCough: boolean = false;
  hasShortBreath: boolean = false;
  hasFatigue: boolean = false;
  hasAches: boolean = false;
  hasHeadache: boolean = false;
  hasLossofSmell: boolean = false;
  hasSoreThroat: boolean = false;

  constructor(
      public dialogRef: MatDialogRef<CovidSymptomForm>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
