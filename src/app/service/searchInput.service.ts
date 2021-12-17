import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchInputService {
    private subject = new Subject<string>();

    addQuery(searchQuery: string) {
        this.subject.next(searchQuery);
    }

    clearQuery() {
        this.subject.next('');
    }

    getQuery(): Observable<string> {
        return this.subject.asObservable();
    }
}
