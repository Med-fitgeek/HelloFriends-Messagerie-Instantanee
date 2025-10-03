import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatPrivateComponent} from '../chat-private-component/chat-private-component';
import { ChatSidebarComponent } from "../chat-sidebar-component/chat-sidebar-component";
import { ChatComponent } from "../chat/chat.component";
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-layout-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatPrivateComponent, ChatSidebarComponent, ChatComponent],
  templateUrl: './chat-layout-component.html',
  styleUrls: ['./chat-layout-component.scss']
})

export class ChatLayoutComponent implements OnInit{
  connectedUsers$!: Observable<string[]>;
  currentConversation: string = 'public'; // public par défaut

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.startConnection(localStorage.getItem("auth_token") || "");
    this.connectedUsers$ = this.chatService.connectedUsers$;
  }

  onSelectConversation(conversation: string) {
    this.currentConversation = conversation;
  }
}
