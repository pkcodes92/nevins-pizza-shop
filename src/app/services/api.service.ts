import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { 
  AddCheeseRequest,
  AddCrustRequest, 
  AddPizzaSauceRequest, 
  UpdateCrustRequest, 
  UpdatePizzaSauceRequest } from '../models/request';
import { Observable } from 'rxjs';
import { 
  AddCheeseResponse,
  AddCrustResponse, 
  AddPizzaSauceResponse, 
  DeleteCrustResponse, 
  DeletePizzaSauceResponse, 
  GetCheesesResponse, 
  GetCrustsResponse, 
  GetPizzaSauceResponse, 
  GetPizzaSaucesResponse, 
  UpdateCrustResponse, 
  UpdatePizzaSauceResponse } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl + 'api';

  constructor(private http: HttpClient) { }

  // #region Adding entities
  addSauce(addSauceRequest: AddPizzaSauceRequest): Observable<AddPizzaSauceResponse> {
    const reqHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<AddPizzaSauceResponse>(this.apiUrl + '/PizzaSauce/AddPizzaSauce', JSON.stringify(addSauceRequest), {headers: reqHeaders});
  }

  addCrust(addCrustRequest: AddCrustRequest): Observable<AddCrustResponse> {
    const reqHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post<AddCrustResponse>(this.apiUrl + '/Crust/AddNewCrust', JSON.stringify(addCrustRequest), { headers: reqHeaders});
  }

  addCheese(addCheeseRequest: AddCheeseRequest) : Observable<AddCheeseResponse> {
    const reqHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<AddCheeseResponse>(this.apiUrl + '/Cheese/AddNewCheese', JSON.stringify(addCheeseRequest), { headers: reqHeaders });
  }
  // #endregion

  // #region Getting entities
  getCheeses(): Observable<GetCheesesResponse> {
    return this.http.get<GetCheesesResponse>(this.apiUrl + '/Cheese/GetAllCheeses');
  }

  getSauces(): Observable<GetPizzaSaucesResponse> {
    return this.http.get<GetPizzaSaucesResponse>(this.apiUrl + '/PizzaSauce/GetAllSauces');
  }

  getCrusts(): Observable<GetCrustsResponse> {
    return this.http.get<GetCrustsResponse>(this.apiUrl + '/Crust/GetAllCrusts');
  }

  getPizzaSauce(id: number): Observable<GetPizzaSauceResponse> {
    return this.http.get<GetPizzaSauceResponse>(this.apiUrl + `/PizzaSauce/GetPizzaSauceById?id=${id}`);
  }
  // #endregion

  // #region Updating entities
  updateSauce(updateSauceRequest: UpdatePizzaSauceRequest): Observable<UpdatePizzaSauceResponse> {
    const reqHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<UpdatePizzaSauceResponse>(this.apiUrl + '/PizzSauce/UpdatePizzaSauce', JSON.stringify(updateSauceRequest), { headers: reqHeaders});
  }

  updateCrust(updateCrustRequest: UpdateCrustRequest): Observable<UpdateCrustResponse> {
    const reqHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<UpdateCrustResponse>(this.apiUrl + '/Crust/UpdateCrust', JSON.stringify(updateCrustRequest), { headers: reqHeaders });
  }
  // #endregion

  // #region Deleting entities
  deleteSauce(id: number): Observable<DeletePizzaSauceResponse> {
    return this.http.delete<DeletePizzaSauceResponse>(this.apiUrl + `/PizzaSauce/DeleteSauce?id=${id}`);
  }

  deleteCrust(id: number): Observable<DeleteCrustResponse> {
    return this.http.delete<DeleteCrustResponse>(this.apiUrl + `/Crust/DeleteCrust?id=${id}`);
  }
  // #endregion
}
