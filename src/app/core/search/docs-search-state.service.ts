import { Service, signal } from '@angular/core';

@Service()
export class DocsSearchStateService {
  readonly open = signal(false);
  readonly query = signal('');

  show(): void {
    this.open.set(true);
  }

  reset(): void {
    this.open.set(false);
    this.query.set('');
  }
}
