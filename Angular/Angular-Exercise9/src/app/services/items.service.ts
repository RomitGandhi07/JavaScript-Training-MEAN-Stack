import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable,throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { IToDoItem } from '../shared/toDoItem';
@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  // URL & HTTP Options
  private _url:string='https://jsonplaceholder.typicode.com/todos';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private http:HttpClient) { }

  // This function is responsible for get all the items in TO-DO List
  getItems():Observable<IToDoItem[]>{
    return this.http.get<IToDoItem[]>(this._url)
      .pipe(catchError(this.errorHandler));
  }

  // This function is responsible for adding the item in TO-DO List
  addItem(data):Observable<IToDoItem>{
    return this.http.post<IToDoItem>(this._url,data, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // This function is responsible for deleting the item in TO-DO List
  deleteItem(id):Observable<any>{
    return this.http.delete<any>(`${this._url}/${id}`)
      .pipe(catchError(this.errorHandler));
  } 

  // This function is responsible for updating the item in To-DO List
  updateItem(data):Observable<IToDoItem>{
    return this.http.put<IToDoItem>(`${this._url}/${data.id}`,data, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // This is error handler function
  errorHandler(error:HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }

}
