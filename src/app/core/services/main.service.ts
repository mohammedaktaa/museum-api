import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Department, MuseumObject} from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class MainService {
  objectsMap = new Map<string, MuseumObject>();

  constructor(private http: HttpClient) {
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<{ departments: Department[] }>('departments').pipe(map(data => {
      return data.departments;
    }));
  }

  getObjectsByDepartment(departmentID: number, query: string = ''): Observable<{ total: number, objectIDs: number[] }> {
    return this.http.get<{ total: number, objectIDs: number[] }>(`search?q=${query}&departmentId=${departmentID}`).pipe(map(data => {
      data.objectIDs = data.objectIDs ? data.objectIDs : [];
      return {total: data.total, objectIDs: data.objectIDs && data.objectIDs.length > 6 ? data.objectIDs.slice(0, 5) : data.objectIDs};
    }));
  }

  getObject(id: number): Observable<MuseumObject> {
    const key = 'objects/' + id;
    if (this.objectsMap.has(key)) {
      return of(this.objectsMap.get(key) as MuseumObject);
    }
    return this.http.get<MuseumObject>(key).pipe(tap(object => {
      this.objectsMap.set(key, object);
    }));
  }


}
