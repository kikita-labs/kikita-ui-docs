import { Injectable, signal } from '@angular/core';

export interface DocsSectionRegistration {
  readonly id: string;
  readonly label: string;
}

@Injectable({ providedIn: 'root' })
export class DocsSectionRegistryService {
  private readonly sectionsState = signal<readonly DocsSectionRegistration[]>([]);

  public readonly sections = this.sectionsState.asReadonly();

  public register(section: DocsSectionRegistration): () => void {
    this.sectionsState.update((sections) => [
      ...sections.filter((candidate) => candidate.id !== section.id),
      section,
    ]);

    return () => {
      this.sectionsState.update((sections) =>
        sections.filter((candidate) => candidate.id !== section.id),
      );
    };
  }
}
