# MixtureJS

Mixins is very powerful abstraction addressing cross-cutting concerns, which can dramatically simplify inheritance graph when used wisely.

MixtureJS is the toolkit combining React-style mixins, Backbone-style events, and minimal set of Underscore-style object manipulation functions. Just what you need when you're working in modern ES5/ES6 envorinment, packed in API which you already know.

Written in TypeScript, works with ES5, ES6, and TypeScript.

API docs: [here](http://volicon.github.io/mixturejs/)

## Events Performance

MixtureJS _implements_ [Backbone API for Events](http://backbonejs.org/#Events), but internally it's entirely different. Here's the results of the typical
run of the [performance tests](/tests) enclosed.

![performance](/perf-chart.jpg)

## Features

- `Mixable`, React-style mixins implementation.
    - Fine-grained control over member merge rules.
    - Can mix both classes and plain objects.
    - Works with and without ES6 class decorators.
- `Object.extend` to simulate classes in ES5.
    - 100% backward compatible with Backbone `.extend()`.
    - Complete `Mixable` support.
    - Native properties declatations (`properties` specification).
- `Messenger`, synchronous events.
    - Can be used as mixin and as a base class.
    - 100% backward API compatibility with [Backbone Events](http://backbonejs.org/#Events) (passes Backbone 1.2.x unit test)
    - Much faster than Backbone events.
- `tools`
    - Object manipulation tools (`assign`, `defaults`, `mapObject`, etc).
    - Simple logging API with variable log-level and overridable functions. Defaults to the `console`.
