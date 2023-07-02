# SignalState


![StateSignal Image](https://res.cloudinary.com/dba0lbkjf/image/upload/v1688292865/New_Project_olqds9.jpg)

SignalState is an innovative state management library for Angular applications. Leveraging Angular's native signal programming concept, it provides a more granular, dynamic, and efficient way of managing application state, resulting in optimized rendering updates.
with more precise tracking of state usage across your application. This is achieved without adding unnecessary dependencies, and with a small footprint that contributes to the performance and efficiency of your application.

A more native, lightweight, and robust state management solution for Angular applications that leverages Angular's built-in  **( signal, effect, computed , toSignal )** features. It offers a simpler learning curve and eliminates the need for hooks, making your state management easier, more intuitive, and more efficient."
# Features

### Simplified State Management

Unlike traditional state management libraries such as NgRx or Redux which require a steep learning curve, SignalState is extremely easy to use. It employs the signal pattern, a new official feature introduced in Angular, which abstracts away the complexity of state management, making it simple and straightforward. This means you spend less time understanding how to manage state, and more time developing your application.

### Lightweight

One of the major advantages of SignalState is its minimal footprint. The library has zero dependencies, making it an ideal choice for projects where bundle size is a critical concern. Comparatively, NgRx and Redux carry heavier dependencies that can add unnecessary weight to your application.

### Use of Angular Signals

SignalState takes full advantage of Angular's new signals feature, providing an elegant, declarative way of managing state. This simplifies state manipulation and makes your code easier to understand and maintain.

### State History Tracking and Rollback Capabilities

SignalState offers state history tracking and rollback capabilities out-of-the-box. This is especially useful during development and debugging, as it allows developers to see the progression of state changes over time and revert to a previous state if necessary.

### State Selection Utilities

SignalState provides easy-to-use utilities to select specific parts of the state. This ensures that your components subscribe only to the parts of the state they are interested in, resulting in more efficient and performant applications.

### Asynchronous State Updates

With SignalState, handling asynchronous state updates is a breeze. It offers a seamless way to manage asynchronous operations such as API calls, ensuring your state remains consistent and predictable.

### Effects and Computed Properties

SignalState provides powerful effects and computed properties features. An effect is a function that runs in response to state changes, while a computed property is a value derived from the state. This allows you to keep your state logic clean and DRY (Don't Repeat Yourself).

### State Persistence

SignalState has built-in support for state persistence through LocalStorage or SessionStorage, with the flexibility to extend this to other storage mediums. This allows you to maintain your application state even between page reloads or sessions.

### No Additional Learning Curve

Thanks to the intuitive API and the use of familiar Angular patterns, there's virtually no additional learning curve to start using SignalState in your applications. If you're already familiar with Angular, you're ready to get started with SignalState.



## Demo

This project is inspired by the enlightening Angular Signals tutorial by Deborah Kurata ( author, speaker, Microsoft MVP, Google GDE). We've built upon her ideas to demonstrate the capabilities of our library.
[Stackblitz demo](https://stackblitz.com/edit/angular-signals-rxjs-deborah-r2tmfy)


## Installation

Install SignalState via npm:

```bash
npm install  @ngjoy.dev/signal-state
```


# API Reference

**Methods**

- `constructor(initialData: T, shouldTrackHistory = false, historySizeLimit = 20, storage: Storage = localStorage, storageKey = 'signal-state-service')`: Initialize the state signal with the initial state. Also sets up the state history tracking if required.

- `getState(): State<T>`: Returns the current state.

- `setState(newState: T): void`: Set the state.

- `updateState(updateFn: (value: T) => T): void`: Update the state using a callback function.

- `asyncUpdateState(updateFn: (value: T) => Promise<T>): void`: Update the state asynchronously.

- `mutateState(mutatorFn: (value: T) => void): void`: Mutate the state directly.

- `setLoading(isLoading: boolean): void`: Update the loading state.

- `setError(error: ErrorInfo | null): void`: Update the error state.

- `addEffect(effectFn: (state: T) => void)`: Add an effect that depends on the state.

- `compute<U>(computation: (state: State<T>) => U): Signal<U>`: Create a computed signal that depends on the state.

- `getStateHistory(): T[]`: Get the state history.

- `select<K extends keyof T>(key: K): Signal<T[K]>`: Select a piece of state by key.

- `selectMany<K extends keyof T>(...keys: K[]): Signal<Pick<T, typeof keys[number]>>`: Select multiple pieces of state.

- `selectFn<R>(selectorFn: (state: T) => R): Signal<R>`: Select a piece of state using a selector function.

- `toSignalFromObservable<T>(observable$: Observable<T>, initialValue: T): Signal<T>`: Converts an Observable to a Signal.

- `rollbackState(): void`: Rollback state to the previous state.

- `setStorageKey(newKey: string): void`: Set the key for storage.

- `saveState(): void`: Save the current state to a Web Storage (localStorage, sessionStorage).

- `loadState(): void`: Load state from a Web Storage.

**Properties**

- `state: WritableSignal<State<T>>`: The signal that represents the state. This is public and can be accessed directly.

- `storageKey: string`: The key used for storage. This is private.

- `storage: Storage`: The storage method used. It could be localStorage, sessionStorage, or any other that implements the Storage interface. This is private.

**Private Properties**

- `stateHistory: T[]`: The history of states. This is private and can be accessed with the `getStateHistory()` method.

- `historySizeLimit: number`: The maximum number of states that can be stored in the history. This is private.

- `shouldTrackHistory: boolean`: A flag indicating if state history should be tracked. This is private.


**Others**

This service uses `signal`, `effect`, `computed` from the '@angular/core' and `toSignal` from '@angular/core/rxjs-interop' and also uses the `Observable` from the "rxjs". Make sure to have these dependencies in your project.


# Author

**Bledar Ramo**

A seasoned Software Engineer, Angular expert, and open-source contributor with a wealth of experience in front-end development. Authored the book, Practical Advanced TypeScript, and has been passionately crafting performant and scalable solutions for over 15 years.

Connect with me on [LinkedIn](https://www.linkedin.com/in/bledarramo)
[Github](https://www.linkedin.com/in/bledarramo)
[NgJoy](https://ngjoy.dev)

