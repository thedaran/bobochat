import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MessageComponent } from './message/message.component';
import { Message as classMessage } from './message';
import { Message } from '../interfaces/Messages';
import { CommonModule } from '@angular/common';
import { ChatService } from './chat.service';
import { v4 } from 'uuid';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, MessageComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'chat';
  message = "项目开发者：https://github.com/thedaran | made by thedaran-daran with love ;)";
  uuid = v4();
  messages: Message[] = [];

  constructor(private chatService: ChatService) { }

  setmessage(event:Event){
    const target = event.target as HTMLTextAreaElement;
    this.message = target.value;
  }

  sendMessage(destination: "recibed" | "sent"){
    let messageSplit = this.message.split(" ");
    messageSplit = messageSplit.map((i) => {
      if(i.includes("https")){
        return `<a target="_blank" class="text-pink-400 underline" href="${i}">${i.replace("https://", "")}</a>`
      }else{
        return i
      }
    })
    
    const message = new classMessage(messageSplit.join(" "), "recibed", this.uuid)

    this.chatService.sendMessage(JSON.stringify(message));
    this.message = "";
  }

  sendOnEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.message !== "") {
      event.preventDefault();
      this.sendMessage('sent');
    }
  }

  ngOnInit() {
    this.chatService.getMessages().subscribe(message => {
      const messageRecibed: Message = JSON.parse(message);
      messageRecibed.destination = messageRecibed.uuid === this.uuid ? "recibed" : "sent"
      this.messages = [...this.messages, messageRecibed];
    
    });
  
  }
}
