import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MessageService {

  constructor(private http: HttpClient) { }

  sendMessage(body: any) {
    console.log('in the messaging service: ' + body)
    return this.http.post('http://localhost:3000/sendmail', { information: {body} }).subscribe();
  }
}