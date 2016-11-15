# MixtureJS

Mixins is very powerful abstraction addressing cross-cutting concerns, which can dramatically simplify inheritance graph when used wisely.

The toolkit combining React-style mixins, Backbone-style events, and minimal set of Underscore-style object manipulation functions.
Written in TypeScript, works with ES5, ES6, and TypeScript.

Just what you need when you're working in modern ES5/ES6 envorinment, packed in API which you already know.

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

Auto-generated API docs: [here](/docs/index.html)

## Example: enabling React mixins for ES6 class components.

You need to do this one time on app load.

```javascript
import React from 'react'
import { Mixable } from 'mixturejs'

// Instruct React.Component on lifecycle hooks mixin rules...
Mixable.mixTo( React.Component );
React.Component.mixinRules({
    componentWillMount : 'reverse',
    componentDidMount : 'reverse',
    componentWillReceiveProps : 'reverse',
    shouldComponentUpdate : 'some',
    componentWillUpdate : 'reverse',
    componentDidUpdate : 'reverse',
    componentWillUnmount : 'sequence',
});
```

Then, you can use mixins everywhere. Here we adding [events](http://backbonejs.org/#Events) support (on, off, trigger, listenTo, etc.):

```javascript
import React from 'react'
import { mixins, Events } from 'mixturejs'

const UnsubscribeMixin = {
    componentWillUnmount(){
        this.off();
        this.stopListening();
    }
}

@mixins( Events, UnsubscribeMixin )
class EventedComponent extends React.Component {
    // ...
}
```

## Installation

`npm install mixturejs`
