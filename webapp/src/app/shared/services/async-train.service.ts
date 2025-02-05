import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

//let TrainRestAPIUrl = 'http://' + self.location.host.split(':')[0] +':5000'
let TrainRestAPIUrl = 'http://127.0.0.1:5000';
//let TrainRestAPIUrl = 'http://18.117.132.87:8080';

@Injectable({
  providedIn: 'root'
})
export class AsyncTrainService {
  constructor(private http: HttpClient) { }

  byLocation(latitude: number, longitude: number, num: number): Observable<any> {
    let apiUrl = TrainRestAPIUrl + "/by-location";
    let headers = new HttpHeaders();
    let params = new HttpParams();

    params.set("lat", latitude);
    params.set("lon", longitude);
    params.set("num", num);

    return this.executeRequest(apiUrl, headers, params);
  }

  byRoute(route: string): Observable<any> {
    let apiUrl = TrainRestAPIUrl + "/by-route/" + route;
    let headers = new HttpHeaders();
    let params = new HttpParams();

    return this.executeRequest(apiUrl, headers, params);
  }

  byId(ids: any[]): Observable<any> {
    let apiUrl = TrainRestAPIUrl + "/by-id/"
    let headers = new HttpHeaders();
    let params = new HttpParams();

    // construct the correct url for by-id
    for (let i = 0; i < ids.length; i++) {
      if (i == ids.length - 1) {
        apiUrl += ids[i];
      } else {
        apiUrl += ids[i] + ",";
      }
    }

    return this.executeRequest(apiUrl, headers, params);
  }

  routes(): Observable<any> {
    let apiUrl = TrainRestAPIUrl + "/routes";
    let headers = new HttpHeaders();
    let params = new HttpParams();

    return this.executeRequest(apiUrl, headers, params);
  }

  alertByStop(stop: string): Observable<any> {
    let apiUrl = TrainRestAPIUrl + '/alert-by-stop/' + stop;
    let headers = new HttpHeaders();
    let params = new HttpParams();

    return this.executeRequest(apiUrl, headers, params);
  }

  alertByRoute(route: string): Observable<any> {
    let apiUrl = TrainRestAPIUrl + '/alerts-by-route/' + route;
    let headers = new HttpHeaders();
    let params = new HttpParams();

    return this.executeRequest(apiUrl, headers, params);
  }

  allAlertsByRoute(route: string): Observable<any> {
    let apiUrl = TrainRestAPIUrl + '/all-alerts-by-route/' + route;
    let headers = new HttpHeaders();
    let params = new HttpParams();

    return this.executeRequest(apiUrl, headers, params);
  }

  executeRequest(apiUrl: string, headers: any, params: any): Observable<any> {
    return this.http.post<any>(apiUrl, {}, ({params: params}))
      .pipe(map((response: Response) => { return response; }),
        catchError((error: any) => this.handleError(error)))
  }

  private handleError(error: any): Promise<any> {
    console.log("request error")
    console.log(error)
    return Promise.reject(error.error || error)
  }
}
