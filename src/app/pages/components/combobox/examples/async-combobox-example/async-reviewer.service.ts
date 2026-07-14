import { Injectable } from '@angular/core';

import { map, type Observable, timer } from 'rxjs';

export interface AsyncReviewer {
  readonly id: string;
  readonly name: string;
}

const ALL_REVIEWERS: readonly AsyncReviewer[] = [
  { id: 'amelia', name: 'Amelia Novak' },
  { id: 'daniel', name: 'Daniel Kowalski' },
  { id: 'harper', name: 'Harper Singh' },
  { id: 'ines', name: 'Ines Delacroix' },
  { id: 'ravi', name: 'Ravi Patel' },
];

@Injectable()
export class AsyncReviewerService {
  public search(query: string): Observable<readonly AsyncReviewer[]> {
    return timer(400).pipe(
      map(() => {
        const normalizedQuery = query.toLocaleLowerCase();

        return normalizedQuery
          ? ALL_REVIEWERS.filter((reviewer) =>
              reviewer.name.toLocaleLowerCase().includes(normalizedQuery),
            )
          : ALL_REVIEWERS;
      }),
    );
  }
}

export { ALL_REVIEWERS };
