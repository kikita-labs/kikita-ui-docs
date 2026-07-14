import { Service, signal } from '@angular/core';

@Service()
export class DocsSearchStateService {
  public readonly open = signal(false);
  public readonly query = signal('');

  public show(): void {
    this.open.set(true);
  }

  public reset(): void {
    this.open.set(false);
    this.query.set('');
  }
}
