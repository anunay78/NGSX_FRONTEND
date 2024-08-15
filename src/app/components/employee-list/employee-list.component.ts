import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from '../../employeeModel';
import { ApiService } from '../../services/api.service';
import { Select, Store } from '@ngxs/store';
import { AddEmployee, DeleteEmployee, GetEmployee, UpdateEmployee } from '../../store/action/employee.action';
import { Observable, Subscription } from 'rxjs';
import { EmployeeState } from '../../store/state/employee.state';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  @Select(EmployeeState.getAllEmployee) $employees!: Observable<Employee[]>;
  @Select(EmployeeState.employeeLoded) employeeLoded$ !: Observable <boolean>
  employeeLodedSub !: Subscription;

  employeeForm !: FormGroup;
  employeeObjModel : Employee = new  Employee();
  showAdd !:boolean;
  showUpdate!:boolean;




  constructor(private formBuilder:FormBuilder, private apiService : ApiService, private store : Store) { }

  ngOnInit(): void {
    this.employeeForm= this.formBuilder.group({
      _id:[""],
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      salary:['']
    })
    this.getAllEmployee()
  }
  clickAddEMployee(){
     this.employeeForm.reset();
     this.showAdd= true;
     this.showUpdate= false

  }
  addEmployee(){
    this.store.dispatch(new AddEmployee(this.employeeForm.value))
  }

  getAllEmployee(){
    this.employeeLodedSub = this.employeeLoded$.subscribe((res=>{
      if(!res){
        this.store.dispatch(new GetEmployee())
      }
    }))
  }

  deleteEmployee(row:Employee){
    this.store.dispatch(new DeleteEmployee(row._id))

  }

  editEmployee(row:Employee){
    this.showAdd= false;
    this.showUpdate= true
    this.employeeForm.patchValue(row)
  }
 updateEmployee(){
  this.store.dispatch(new UpdateEmployee(this.employeeForm.value))
 }

 ngOnDestroy(): void {
   this.employeeLodedSub.unsubscribe();
 }

}
