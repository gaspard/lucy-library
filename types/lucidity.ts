import { State as MidiState } from './midi'

export type ContextExtension = any

export interface MainContext {
  midi: MidiState
}

export type Cache = any

export type Context = MainContext & ContextExtension

export interface Children {
  [ key: number ]: Update
  all (): void
}

export interface Require {
  ( libname: string ): any
}

export interface Helpers {
  context: Context
  cache: Cache
  children: Children
  detached: boolean
  require: Require
}

export interface ContextType {
  [ key: string ]: string
}

export interface Meta {
  // only mandatory in the official library
  description: string
  tags: string[]
  author: string
  origin: string
  version: string
  // end mandatory
  expect?: ContextType
  provide?: ContextType
  children?: string[] | 'all'
  update?: string
}

export interface Init {
  ( h: Helpers ): ContextExtension | void
}

export interface Update {
  ( ... any ): any
}

export interface Block {
  init: Init
  update: Update
  meta: Meta
}
