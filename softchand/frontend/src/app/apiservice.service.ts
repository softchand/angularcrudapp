import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { }
  // Now connect frontend to backend
  apiurl = "http://localhost:3000/users";
  getAllData(): Observable<any> {
    return this.http.get(`${this.apiurl}`);
  }
  // create data

  createData(data: any): Observable<any> {
    return this.http.post(`${this.apiurl}`, data);
  }

  // delete Data
  deletData(id: any): Observable<any> {
    let ids = id;
    return this.http.delete(`${this.apiurl}/${ids}`)
  }

  updateData(data: any, id: any): Observable<any> {
    let ids = id;
    return this.http.put(`${this.apiurl}/${ids}`, data);
  }

  getSingleData(id: any): Observable<any> {
    let ids = id;
    return this.http.get(`${this.apiurl}/${ids}`);
  }
}
