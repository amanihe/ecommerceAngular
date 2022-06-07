import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  addAddress(val: any) {
    return this.http.post(this.APIUrl + '/address/', val);
  }

  readonly APIUrl = 'http://127.0.0.1:8000';
  readonly PhotoUrl = "http://127.0.0.1:8000/media/";

  constructor(private http: HttpClient) {}

    getAddress(id:any)
    {
      return this.http.get(this.APIUrl + '/PersonalAddress/' + id);
    }
    removeAddress(id:any)
    {
      return this.http.delete(this.APIUrl + '/address/' + id);
    }
    updateAddress(val: any): Observable<any> {
      return this.http.put(this.APIUrl + '/address/' + val.Adr_Id, val);
    }
    editDefaultAddress(val: any,id:any): Observable<any> {
      return this.http.put(this.APIUrl + '/Adrdefault/' + id, val);
    }

}
