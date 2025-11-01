import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, FormsModule, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  userInput = '';
  messagesList = [{ role: 'assistant', text: 'Hola, soy el asistente.' }];

  @ViewChild('messages') messagesContainer!: ElementRef;
  @ViewChild('textarea') textarea!: ElementRef;

  sendMessage() {
    if (!this.userInput.trim()) return;

    // Agregar mensaje del usuario
    this.messagesList.push({ role: 'user', text: this.userInput });
    this.userInput = '';
    this.autoScroll();
    setTimeout(() => this.autoScroll(), 50);

    // Simular respuesta del asistente después de 500ms
    setTimeout(() => {
      const simulatedResponse = this.getSimulatedResponse();
      this.messagesList.push({ role: 'assistant', text: simulatedResponse });
      this.autoScroll();
      setTimeout(() => this.autoScroll(), 50);
    }, 500);
  }

  autoScroll() {
    const el = this.messagesContainer.nativeElement;
    el.scrollTop = el.scrollHeight;
  }

  autoResize(event: any) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  getSimulatedResponse(): string {
    const responses = [
      '¡Entendido!',
      'Interesante, cuéntame más.',
      'Lo estoy procesando...',
      'Perfecto, gracias por la información.',
      'Hmm, eso suena bien.',
    ];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }
}
