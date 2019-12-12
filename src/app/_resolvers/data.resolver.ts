import { StatusTableService } from '../_services/status-table.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class DataResolver implements Resolve<any[]> {
  constructor(private dataService: StatusTableService,) {}
 
  resolve(route :ActivatedRouteSnapshot): Observable<any[]> {
    const timeMode = <string>route.paramMap.get('timeMode');
    //const selectedHours =<string>route.paramMap.get('selectedHours');
    return this.dataService.getFarmStatusMonth(route.params.timeMode);
  }
}