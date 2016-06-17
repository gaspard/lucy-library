declare module 'lucy' {
  export interface Time {
    now: number // [s]
    dt: number  // [s]
  }

  // velocity values from 0-127
  type Note = number[]
  // velocity values from 0-127
  type Ctrl = number[]

  export interface Midi {
    note: Note[] // notes per channel 1-16
    ctrl: Ctrl[] // ctrl per channel 1-16
  }

  export interface Screen {
    width: number  // [px]
    height: number // [px]
    top: number    // [px]
    bottom: number // [px]
    left: number   // [px]
    right: number  // [px]
  }
}
