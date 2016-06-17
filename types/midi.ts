export type Note = number[] // velocity values 0-127
export type Ctrl = number[] // velocity values 0-127

export interface State {
  note: Note[] // notes per channel 1-16
  ctrl: Ctrl[] // ctrl per channel 1-16
}
