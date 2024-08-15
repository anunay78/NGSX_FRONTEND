import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { AddEmployee, DeleteEmployee, GetEmployee, UpdateEmployee } from "../action/employee.action";
import { ApiService } from "../../services/api.service";
import { tap } from "rxjs";
import { Employee } from "../../employeeModel";

export class EmployeeStateModel {
  employees!: Employee[];
  employeeLoded !: boolean
}

@State<EmployeeStateModel>({
  name: "employees",
  defaults: {
    employees: [],
    employeeLoded: false
  }
})

@Injectable()

export class EmployeeState {
  constructor(private apiService: ApiService) { }
  @Selector()
  static getAllEmployee(state: EmployeeStateModel) {
    return state.employees
  }

  @Selector()
  static employeeLoded(state: EmployeeStateModel) {
    return state.employeeLoded
  }

  @Action(GetEmployee) getEmployees({ getState, setState }: StateContext<EmployeeStateModel>) {
    return this.apiService.getEmployee().pipe(tap((res: any) => {
      const state = getState();
      setState({
        ...state,
        employees: res,
        employeeLoded: true
      })

    }))
  }

  @Action(AddEmployee) addEmployee({ getState, patchState }: StateContext<EmployeeStateModel>, { payload }: AddEmployee) {
    return this.apiService.postEmployee(payload).pipe(tap((res: any) => {
      if (res) {
        alert('Employee Saved Successfully');
        const state = getState();
        patchState({
          employees: [...state.employees, res]
        })
      } else {
        alert('Somthing Went Wrong')
      }
    }))

  }

  @Action(UpdateEmployee) updateEmployee({getState,patchState}: StateContext<EmployeeStateModel>, {payload}: UpdateEmployee){
    return this.apiService.putEmployee(payload).pipe(tap((res:any)=>{
      const state = getState();
      const employeeList = state.employees;
      const index = employeeList.findIndex(emp => emp._id === res._id)
      employeeList[index] = res;
      patchState({
        employees: employeeList
      })
    }))
  }

  @Action(DeleteEmployee) deleteEmployee({getState,setState}:StateContext<EmployeeStateModel>,{id}:DeleteEmployee) {
    return this.apiService.deleteEmployee(id).pipe(tap((res:any)=>{
      const state = getState();
      const employeeList = state.employees.filter(emp=> emp._id !== id);
      setState({
        ...state,
        employees : employeeList
      })

    }))
  }
}
