# Object+

This is the core toolkit used by Type-R, NestedTypes, and NestedReact. Written in TypeScript, works with ES5, ES6, and TypeScript.

## Status

Pending. Awaiting Type-R to be released, then will be factored out and placed here.

## Features

- Mixins, in React style:
    - ES6 decorators support.
    - Fine-grained control over member merge rules.
    - Can mix in both classes and plain objects.
- `Mixable` base class, for dynamic mixins injection on inheritance.
- ES5 compatible `Object.extend`.
    - 100% backward compatible with Backbone `extend()`.
    - Native properties declatations (`properties` specification).
    - Mixins.  
- Events, in Backbone style:
    - Can be used as mixin.
    - 100% backward API compatibility with Backbone Events (passes Backbone 1.2.x unit test)
    - Much faster than Backbone events.
    - High-performance low-level API to be used by libraries.
- Object tools:
    - Simple logging wrapper around `console` with variable log-level and overridable functions.
    - Object manipulation tools (`assign`, `defaults`, `mapObject`, etc).