import { midi } from './midi'

export namespace lucy {
  export interface Time {
    // all units in [s]
    // now = 0: start of animation
    now: number
    // Note that 'dt' can be negative if the animation loops.
    dt: number
  }

  // ======== Types for Block definition =======

  type ContextExtension = any

  interface MainContext {
    midi: midi.State
  }

  type Cache = any

  type Context = MainContext & ContextExtension

  interface Children {
    [ key: number ]: Update
    all (): void
  }

  interface Require {
    ( libname: string ): any
  }



  interface Helpers {
    context: Context
    cache: Cache
    children: Children
    detached: boolean
    require: Require
  }

  interface ContextType {
    [ key: string ]: string
  }

  export interface Meta {
    description: string
    tags: string[]
    version: string       // only mandatory in library
    expect?: ContextType
    provide?: ContextType
    update?: string
    children?: string[] | 'all'
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
}
