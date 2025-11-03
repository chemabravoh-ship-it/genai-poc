import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { TypingPipe } from '../../pipes/typing.pipe';
import { AsyncPipe } from '@angular/common';
import { WidgetService } from '../../services/widget.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [TypingPipe, AsyncPipe],
  templateUrl: 'intro.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IntroComponent {
  private readonly widgetService = inject(WidgetService);

  private readonly router = inject(Router);

  widgetMode = this.widgetService.widgetMode;

  toggleWidget(): void {
    this.widgetService.widgetMode = !this.widgetService.widgetMode;
  }

  fade = false;

  hide(): void {
    this.fade = true;
    this.router.navigateByUrl('/chat');
  }
}
