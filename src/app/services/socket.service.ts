import { Injectable } from "@angular/core";
import { URLS } from "../url.constants";
// import * as Stomp from '../../../node_modules/stompjs/';
// // import * as Stomp from 'stompjs';
// import * as SockJS from '../../../node_modules/sockjs-client';
// // import * as SockJS from 'sockjs-client';
// import * as Rx from 'rxjs/Rx';

declare var SockJS;
declare var Stomp;


@Injectable({
    providedIn: 'root'
  })
export class SocketService{

    baseUrl:string= URLS.apiUrl+"/ws";
    topic:string = "/topic/notifications";
    stompClient:any;
    socketEndPoint:string = this.baseUrl; 


    constructor(){
        console.log("ANA OMT LOL");
        this.connect();
    }

    

    connect(){
        let ws = new SockJS(this.socketEndPoint);
        this.stompClient = Stomp.over(ws);

        const that = this;

        this.stompClient.connect({}, function(frame) {
            that.stompClient.subscribe(this.topic, (message) => {
                console.log(message);
                if (message.body) {
                // that.msg.push(message.body);
                    console.log(message.body)
                    console.log(message);
                }
            });
          },
        //   err =>{}
          );


    }


    create(){
        let ws = new WebSocket(this.baseUrl);
    }

    disconnect(){
        if( this.stompClient !== null ){
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }



}