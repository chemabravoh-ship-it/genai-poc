import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { interval, scan, take } from 'rxjs';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-user-message',
  template: ` {{ typingText }} `,
})
export class UserMessageComponent implements OnChanges {
  @Input() text = '';

  typingText = '';

  @Output() finish = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text']) {
      interval(50)
        .pipe(
          take(changes['text'].currentValue.length),
          scan(
            (acc: string, i: number) => acc + changes['text'].currentValue[i],
            ''
          )
        )
        .subscribe((value) => {
          this.typingText = value;
          this.finish.emit();
        });
    }
  }
}
