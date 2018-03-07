import {OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse} from "@nestjs/websockets";
import {Component} from "@nestjs/common";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/from";

@WebSocketGateway()
export class EventsGateWay implements  OnGatewayInit{

    @WebSocketServer() server;
    @SubscribeMessage('events')
    onEvent(client, data): WsResponse<any> {
        const event = 'events';
        return { event, data };
    }

    @SubscribeMessage('asyncEvent')
    onAsyncEvent(client, data): Observable<WsResponse<number>> {
        const event = 'asyncEvent';
        const response = [1, 2, 3];

        return Observable.from(response)
            .map((res) => ({ event, data: res }));
    }



    afterInit(server){
        console.log('~~ after init socket.io');
    }
}