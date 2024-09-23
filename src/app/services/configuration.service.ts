import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Configuration} from '../models/configuration.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private apiUrl = 'http://localhost:3000/configurations';

  constructor(private http: HttpClient) {
  }

  createConfiguration(configuration: Configuration): Observable<Configuration> {
    return this.http.post<Configuration>(this.apiUrl, configuration);
  }

  getConfiguration(id: string): Observable<Configuration> {
    return this.http.get<Configuration>(`${this.apiUrl}/${id}`);
  }
}
