import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TypingPipe } from './pipes/typing.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, FormsModule, NgFor, NgIf, AsyncPipe, TypingPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  userInput = '';

  messagesList: {
    role: string;
    text: string;
  }[] = [];

  fade = false;

  domains = [
    {
      domainId: '000000000000000000000002',
      domainName: 'apis',
    },
    {
      domainId: '000000000000000000000015',
      domainName: 'multiagent rag',
    },
  ];

  @ViewChild('messages') messagesContainer!: ElementRef;

  @ViewChild('textarea') textarea!: ElementRef;

  sendMessage(): void {
    if (!this.userInput.trim()) return;
    this.messagesList.push({ role: 'user', text: this.userInput });
    this.userInput = '';
    this.autoScroll();
    setTimeout(() => {
      const simulatedResponse = this.getSimulatedResponse();
      this.messagesList.push({ role: 'assistant', text: simulatedResponse });
      setTimeout(() => this.autoScroll(), 50);
    }, 500);
  }

  private autoScroll(): void {
    const el = this.messagesContainer.nativeElement;
    el.scrollTop = el.scrollHeight;
  }

  autoResize(event: any): void {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  private getSimulatedResponse(): string {
    const responses = [
      '¡Entendido! He captado perfectamente lo que me has dicho. Dame unos segundos y te preparo una respuesta detallada.',
      'Interesante, cuéntame un poco más sobre ese tema. Creo que puedo ayudarte a profundizar si me das algún detalle adicional.',
      'Lo estoy procesando... mientras tanto, te adelanto que hay varias formas de enfocar eso dependiendo del contexto.',
      'Perfecto, gracias por la información. Con eso ya tengo una idea más clara y puedo darte una mejor respuesta en un momento.',
      'Hmm, eso suena bien. Me gustaría entender un poco mejor tu objetivo para poder orientarte correctamente.',
      'Gracias por compartirlo. Parece que hay bastantes aspectos que podríamos analizar, ¿quieres que te lo resuma o prefieres una explicación más extensa?',
      'Muy buena pregunta. De hecho, ese tema tiene más matices de los que parece, así que te explico paso a paso cómo funciona.',
      'Vale, lo tengo. Déjame organizar los datos mentalmente para darte una respuesta precisa y completa.',
      'Interesante planteamiento. Creo que si lo abordamos desde un punto de vista práctico puede quedar mucho más claro.',
      'Excelente, justo lo que necesitaba para continuar. Enseguida te explico cómo podemos avanzar con eso.',
    ];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }

  hide(): void {
    this.fade = true;
  }
}
