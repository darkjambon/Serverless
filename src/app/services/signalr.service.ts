import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { CommentChatModel } from '../_interfaces/commentchat.model'
@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public comments: any[] = [];
  public data: any[] = [];
  public bradcastedData: CommentChatModel[] = [];
  private connected = false;

  private hubConnection: any
  public startConnection = () => {
    if (this.connected == true)
      return;
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/commentchat')
      .build();
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.connected = true;
      })
      .catch((err: any) => console.log('Error while starting connection: ' + err))
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data: any) => {
      this.data = data;
      console.log(data);
    });
  }

  public sendMessage = (Message: string, Pseudo: string, Id: string) => {
    this.hubConnection.invoke('broadcastchartdata', {
      Pseudo: Pseudo,
      Comment: Message,
      Date: "05/01/1999",
      Id: Id
    }).catch((err: any) => console.error(err));
  }

  public addBroadcastChartDataListener = () => {
    this.hubConnection.on('broadcastchartdata', (data: CommentChatModel) => {
      this.comments.push(data);
    })
  }
}
