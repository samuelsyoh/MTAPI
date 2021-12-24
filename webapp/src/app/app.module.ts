import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TrainComponent } from './train/train.component';
import { BusComponent } from './bus/bus.component';
import { AsyncTrainService} from "./shared/services/async-train.service";
import {AsyncBusService} from "./shared/services/async-bus.service";
import {HttpClientModule} from "@angular/common/http";
import {reducers} from "./shared/reducers";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {TrainEffects} from "./shared/effects/train.effects";
import {BusEffects} from "./shared/effects/bus.effects";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {GoogleMapsModule} from "@angular/google-maps";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDividerModule} from "@angular/material/divider";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MatSliderModule} from "@angular/material/slider";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { TopBarComponent } from './top-bar/top-bar.component';
import {CovidSymptomForm} from "./top-bar/top-bar.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatStepperModule} from "@angular/material/stepper";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    TrainComponent,
    BusComponent,
    TopBarComponent,
    CovidSymptomForm
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([TrainEffects, BusEffects]),
        BrowserAnimationsModule,
        MatTabsModule,
        MatToolbarModule,
        MatIconModule,
        GoogleMapsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        FlexLayoutModule,
        FormsModule,
        MatExpansionModule,
        MatDividerModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        MatSliderModule,
        MatRadioModule,
        MatCheckboxModule,
        MatDialogModule,
        MatStepperModule,
        MatButtonToggleModule,
        MatTableModule,
        ReactiveFormsModule,
        SocialLoginModule
    ],
  providers: [AsyncBusService, AsyncTrainService, {
      provide: 'SocialAuthServiceConfig',
      useValue: {
          autoLogin: false,
          providers: [
              {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider(
                      '183135657631-kf2oo1eib05rkdejhenqn0f99q70olq1.apps.googleusercontent.com'
                  )
              }
          ]
      } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
