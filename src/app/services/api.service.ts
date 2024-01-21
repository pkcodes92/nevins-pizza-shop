import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { 
  AddCheeseRequest,
  AddCrustRequest, 
  AddPizzaSauceRequest, 
  AddPizzaSizeRequest, 
  AddToppingRequest, 
  UpdateCheeseRequest, 
  UpdateCrustRequest, 
  UpdatePizzaSauceRequest, 
  UpdateToppingRequest} from '../models/request';
import { Observable } from 'rxjs';
import { 
  AddCheeseResponse,
  AddCrustResponse, 
  AddPizzaSauceResponse, 
  AddPizzaSizeResponse, 
  AddToppingResponse, 
  DeleteCheeseResponse, 
  DeleteCrustResponse, 
  DeletePizzaSauceResponse, 
  DeletePizzaSizeResponse, 
  DeleteToppingResponse, 
  GetCheesesResponse, 
  GetCrustsResponse, 
  GetPizzaSauceResponse, 
  GetPizzaSaucesResponse, 
  GetPizzaSizesResponse, 
  GetToppingTypesResponse, 
  GetToppingsResponse, 
  UpdateCheeseResponse, 
  UpdateCrustResponse, 
  UpdatePizzaSauceResponse, 
  UpdatePizzaSizeResponse,
  UpdateToppingResponse
} from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl + 'api';

  constructor(private http: HttpClient) { }

  // #region Adding entities
  addSauce(addSauceRequest: AddPizzaSauceRequest): Observable<AddPizzaSauceResponse> {
    const reqHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<AddPizzaSauceResponse>(this.apiUrl + '/PizzaSauce/AddSauce', JSON.stringify(addSauceRequest), {headers: reqHeaders});
  }

  addCrust(addCrustRequest: AddCrustRequest): Observable<AddCrustResponse> {
    const reqHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post<AddCrustResponse>(this.apiUrl + '/Crust/AddNewCrust', JSON.stringify(addCrustRequest), { headers: reqHeaders});
  }

  addCheese(addCheeseRequest: AddCheeseRequest) : Observable<AddCheeseResponse> {
    const reqHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<AddCheeseResponse>(this.apiUrl + '/Cheese/AddNewCheese', JSON.stringify(addCheeseRequest), { headers: reqHeaders });
  }

  addSize(addSizeRequest: AddPizzaSizeRequest) : Observable<AddPizzaSizeResponse> {
    const reqHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<AddPizzaSizeResponse>(this.apiUrl + '/PizzaSize/AddNewSize', JSON.stringify(addSizeRequest), { headers: reqHeaders });
  }

  addTopping(addToppingRequest: AddToppingRequest): Observable<AddToppingResponse> {
    const reqHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post<AddToppingResponse>(this.apiUrl + '/Topping/AddTopping', JSON.stringify(addToppingRequest), { headers: reqHeaders });
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

  getSizes(): Observable<GetPizzaSizesResponse> {
    return this.http.get<GetPizzaSizesResponse>(this.apiUrl + '/PizzaSize/GetAllSizes');
  }

  getToppingTypes(): Observable<GetToppingTypesResponse> {
    return this.http.get<GetToppingTypesResponse>(this.apiUrl + '/ToppingType/GetToppingTypes');
  }

  getToppings(): Observable<GetToppingsResponse> {
    return this.http.get<GetToppingsResponse>(this.apiUrl + '/Topping/GetToppings');
  }

  getSauce(id: number): Observable<GetPizzaSauceResponse> {
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

  updateSize(updatePizzaSizeRequest: UpdatePizzaSauceRequest): Observable<UpdatePizzaSizeResponse> {
    const reqHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<UpdatePizzaSizeResponse>(this.apiUrl + '/PizzaSize/UpdatePizzaSize', JSON.stringify(updatePizzaSizeRequest), { headers: reqHeaders });
  }

  updateCheese(updateRequest: UpdateCheeseRequest): Observable<UpdateCheeseResponse> {
    const reqHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<UpdateCheeseResponse>(this.apiUrl + '/Cheese/UpdateCheese', JSON.stringify(updateRequest), { headers: reqHeaders});
  }

  updateTopping(updateRequest: UpdateToppingRequest): Observable<UpdateToppingResponse> {
    const reqHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.put<UpdateToppingResponse>(this.apiUrl + '/Topping/UpdateTopping', JSON.stringify(updateRequest), { headers: reqHeaders });
  }
  // #endregion

  // #region Deleting entities
  deleteSauce(id: number): Observable<DeletePizzaSauceResponse> {
    return this.http.delete<DeletePizzaSauceResponse>(this.apiUrl + `/PizzaSauce/DeleteSauce?id=${id}`);
  }

  deleteCrust(id: number): Observable<DeleteCrustResponse> {
    return this.http.delete<DeleteCrustResponse>(this.apiUrl + `/Crust/DeleteCrust?id=${id}`);
  }

  deleteSize(id: number): Observable<DeletePizzaSizeResponse> {
    return this.http.delete<DeletePizzaSizeResponse>(this.apiUrl + `/PizzaSize/DeletePizzaSize?id=${id}`);
  }

  deleteCheese(id: number): Observable<DeleteCheeseResponse> {
    return this.http.delete<DeleteCheeseResponse>(this.apiUrl + `/Cheese/DeleteCheese?id=${id}`);
  }

  deleteTopping(id: number): Observable<DeleteToppingResponse> {
    return this.http.delete<DeleteToppingResponse>(this.apiUrl + `/Topping/DeleteTopping?id=${id}`);
  }
  // #endregion
}
