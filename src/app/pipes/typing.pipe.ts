import { EventEmitter, Output, Pipe, PipeTransform } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { scan, take } from 'rxjs/operators';

@Pipe({
  name: 'typing',
  standalone: true
})
export class TypingPipe implements PipeTransform {
  transform(value: string, speed: number = 25): Observable<string> {
    if (!value) return new Observable<string>(observer => observer.complete());
    return interval(speed).pipe(
      take(value.length),
      scan((acc, i) => acc + value[i], '')
    );
  }
}
