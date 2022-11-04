import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {first, Observable, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  getName(): Promise<string> {
    return new Promise((resolve, reject) => {
      const request = this.httpClient.get(
        "https://namey.muffinlabs.com/name.json?count=1&with_surname=true&frequency=common"
      ) as Observable<string[]>;

      request.pipe(first()).subscribe({
        next: (nameList) => resolve(nameList[0]),
        error: (err) => reject(err)
      })
    });
  }
}
