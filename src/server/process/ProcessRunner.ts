import { Observable, Subject } from 'rxjs';
import { Process } from './Process';

export class ProcessRunner {

  _period: number;
  _process: Process;
  _observable: Observable<String>;
  _multicast: Observable<{}>;

  constructor(period: number, process: Process) {
    this._period = period;
    this._process = process;

    this._observable = Observable.create(observer => {

      setInterval(async () => {
        const output = await this._process.execute();
        observer.next(output);
      }, period);

    });
    const subject = new Subject();
    this._multicast = this._observable.multicast(subject).refCount();
  }


  subscribe(callback: (value: {}) => void): void {
    this._multicast.subscribe(callback)
  };

}
