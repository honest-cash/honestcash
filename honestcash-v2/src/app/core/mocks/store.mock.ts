import {BehaviorSubject, Observable, of} from 'rxjs';

export class StoreMock<T> {
  private state: BehaviorSubject<T> = new BehaviorSubject(undefined);

  setState(data: T) {
    this.state.next(data);
  }

  select(selector?: any): Observable<any> {
    const value = this.state.getValue();
    if (value) {
      return of(value);
    }
    return of(this.state.getValue());
  }

  dispatch(action: any) {
  }

  resetState() {
    this.state.next(<T>{});
  }
}
