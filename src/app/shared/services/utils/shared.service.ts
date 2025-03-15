import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private dataSubject: ReplaySubject<string> = new ReplaySubject<string>(1);

  setData(data: string): void {
    this.dataSubject.next(data);
  }

  getData$(): Observable<string> {
    return this.dataSubject.asObservable();
  }

  get isMobile() {
    return JSON.parse(sessionStorage.getItem('isMobile'));
  }

  // getPosition(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     navigator.geolocation.getCurrentPosition(resp => {

  //       resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
  //       },
  //       err => {
  //         reject(err);
  //       });
  //   });
  // }

  getCurrentLocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      );
    }).pipe(
      retry(1),
      tap(() => {
          console.log('Got your location');
        }
      ),
      catchError((error) => {
        console.log('failed to get your location');
        return throwError(error);
      })
    );
  }

  _getDistanceFromLatLonInKm(position1: [number, number], position2: [number, number]) {
    const [lat1, lon1] = position1;
    const [lat2, lon2] = position2;
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    const dLon = this.deg2rad(lon2-lon1);
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in km
    return d;
  }
  
  deg2rad(deg: number) {
    return deg * (Math.PI/180)
  }
  
  distanceToString = (distance: number): string => {
    if(distance <= 1) return Math.round(distance * 1000) + 'm';
    else if(distance > 1000) return distance.toFixed(0) + 'km';
    else if(distance > 100) return distance.toFixed(1) + 'km';
    else if(distance > 10) return distance.toFixed(2) + 'km';
    else if(distance > 1) return distance.toFixed(3) + 'km';
    return '--';
  }
  
  getDistanceFromLatLonInKm = (position1: [number, number] | null, position2: [number, number]) => {
    if(position1 !== null) {
      const distance = this._getDistanceFromLatLonInKm(position1, position2);
      return this.distanceToString(distance);
    }
    return '--';
  }
  
}
