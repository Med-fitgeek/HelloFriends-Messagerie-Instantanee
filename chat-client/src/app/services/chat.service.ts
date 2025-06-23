import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;

  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/chatHub') // adapte l'URL si besoin
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('[SignalR] Connexion établie'))
      .catch(err => console.error('[SignalR] Erreur de connexion', err));
  }

  public addReceiveMessageListener(callback: (user: string, message: string) => void): void {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  public sendMessage(user: string, message: string): void {
    this.hubConnection.invoke('SendMessage', user, message)
      .catch(err => console.error('[SignalR] Erreur envoi message', err));
  }
}
