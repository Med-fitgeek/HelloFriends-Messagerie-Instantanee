import { Component, NgModule, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Message {
  from: string;
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  currentUser: string = localStorage.getItem('username') || 'me';
  currentMessage = '';
  messages: Message[] = [];


  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.startConnection(localStorage.getItem("auth_token") || "");
    this.chatService.addReceiveMessageListener((user, message) => {
      this.messages.push({ 
        from: user, 
        content: message, 
        timestamp: new Date() });
    });
  }

  sendMessage(): void {
    if (this.currentMessage.trim()) {
      this.chatService.sendMessage(this.currentUser, this.currentMessage);
      this.currentMessage = '';
    }
  }
}
