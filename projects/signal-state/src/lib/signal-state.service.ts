import {signal, effect, computed, Signal, WritableSignal } from '@angular/core';
import {Observable} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {ErrorInfo, ErrorType, State} from "./model";
import {toErrorWithMessage} from "./utils";

export class SignalState<T> {
  // Define the signal for state
  public state: WritableSignal<State<T>>;

  // Define the state history
  private stateHistory: T[] = [];
  private readonly historySizeLimit: number;
  private readonly shouldTrackHistory: boolean;
  private storageKey!: string;
  private storage: Storage;

  constructor(initialData: T, shouldTrackHistory = false, historySizeLimit = 20, storage: Storage = localStorage, storageKey = 'signal-state-service') {
    // Initialize the state signal with the initial state
    this.state = signal({
      data: initialData,
      loading: false,
      error: null
    });
    this.shouldTrackHistory = shouldTrackHistory;
    this.historySizeLimit = historySizeLimit;
    this.storage = storage;
    this.setStorageKey(storageKey);
  }



  // Method to get the current state
  getState(): State<T> {
    return this.state();
  }

  // Method to set the state
  setState(newState: T): void {
    this.state.set({
      data: newState,
      loading: false,
      error: null
    });
    if (this.shouldTrackHistory) {
      this.addToHistory(newState);
    }
  }

  // Method to update the state
  updateState(updateFn: (value: T) => T): void {
    this.state.update(state => {
      let newData = updateFn(state.data);
      if(this.shouldTrackHistory){
        this.addToHistory(newData);
      }
      return {...state, data: newData}
    });
  }

// Method to update the state asynchronously
  asyncUpdateState(updateFn: (value: T) => Promise<T>): void {
    this.setLoading(true);
    updateFn(this.getState().data)
      .then(updatedData => {
        this.state.update(state => {
          if (this.shouldTrackHistory) {
            this.addToHistory(updatedData);
          }
          return {
            ...state,
            data: updatedData,
            loading: false,
            error: null
          };
        });
      })
      .catch(err => {
        const errorWithMessage = toErrorWithMessage(err);
        this.state.update(state => {
          return {
            ...state,
            loading: false,
            error: {
              type: ErrorType.UnknownError,
              message: errorWithMessage.message,
              originalError: err
            }
          };
        });
      });
  }

  // Method to mutate the state
  mutateState(mutatorFn: (value: T) => void): void {
    this.state.mutate(state => {
      mutatorFn(state.data);
      if(this.shouldTrackHistory){
        this.addToHistory(state.data);
      }
    });
  }

  // Method to update loading state
  setLoading(isLoading: boolean): void {
    this.state.update(state => ({
      ...state,
      loading: isLoading

    }));
  }

  // Method to update error state
  setError(error: ErrorInfo | null): void {
    this.state.update(state => ({
      ...state,
      error: error
    }));
  }


  // Method to add an effect that depends on the state
  addEffect(effectFn: (state: T) => void) {
    return effect(() => effectFn(this.getState().data));
  }



  // Method to create a computed signal that depends on the state
  compute<U>(computation: (state: State<T>) => U): Signal<U> {
    return computed(() => computation(this.getState()));
  }

  private addToHistory(state: T): void {
    if (this.shouldTrackHistory) {
      // Remove the oldest state if we've reached the limit
      if (this.stateHistory.length >= this.historySizeLimit) {
        this.stateHistory.shift();
      }
      this.stateHistory.push(state);
    }
  }

  // Method to get state history
  getStateHistory(): T[] {
    return [...this.stateHistory];
  }


  select<K extends keyof T>(key: K): Signal<T[K]> {
    return computed(() => this.getState().data[key]);
  }

  selectMany<K extends keyof T>(...keys: K[]): Signal<Pick<T, typeof keys[number]>> {
    return computed(() => {
      const state = this.getState().data;
      const newState = {} as Pick<T, typeof keys[number]>;
      keys.forEach(key => {
        newState[key] = state[key];
      });
      return newState;
    });
  }

  selectFn<R>(selectorFn: (state: T) => R): Signal<R> {
    return computed(() => selectorFn(this.getState().data));
  }

  toSignalFromObservable<T>(
    observable$: Observable<T>,
    initialValue: T
  ): Signal<T> {
    return toSignal<T, T>(observable$, { initialValue });
  }

  rollbackState(): void {
    console.log("rollbackState", this.stateHistory.length)
    if (!this.shouldTrackHistory || this.stateHistory.length < 2) {
      console.error("Cannot roll back state: History is not enabled or there's no previous state.");
      return;
    }
    const previousState = this.stateHistory[this.stateHistory.length - 2]; // Get the second last state as the last one is the current state.
    this.stateHistory.splice(-2, 2); // Remove the last two states (current and the duplicate in history)
    this.setState(previousState);
  }

  setStorageKey(newKey: string) {
    this.storageKey = newKey;
    this.loadState();
  }

  saveState(): void {
    const state = this.getState();
    const serializedState = JSON.stringify(state);
    this.storage.setItem(this.storageKey, serializedState);
  }

  private loadState(): void {
    const serializedState = this.storage.getItem(this.storageKey);
    if (serializedState !== null) {
      const state: State<T> = JSON.parse(serializedState);
      this.state.set(state);
    }
  }

}
