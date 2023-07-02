import { TestBed } from '@angular/core/testing';
import {SignalState} from "./signal-state.service";

describe('SignalState', () => {
  let service: SignalState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
