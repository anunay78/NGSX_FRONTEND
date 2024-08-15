import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map}  from 'rxjs/operators'
import { Employee } from '../employeeModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  postEmployee(data : any){
    return this.http.post('http://localhost:3000/employees',data)
  }

  getEmployee(){
    return this.http.get('http://localhost:3000/employees')
  }

  getEmployeeById(id:any){
    return this.http.get('http://localhost:3000/employees'+id)
  }
  putEmployee(data: Employee){
    return this.http.put('http://localhost:3000/employees/'+data._id,data).pipe(map((res:any)=>{
      return res
    }))
  }
  deleteEmployee(id:string){
    return this.http.delete('http://localhost:3000/employees/'+id)
  }
}
