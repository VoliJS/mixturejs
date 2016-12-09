# MixtureJS

Mixins is very powerful abstraction addressing cross-cutting concerns, which can dramatically simplify inheritance graph when used wisely.

MixtureJS is the toolkit combining React-style mixins, Backbone-style events, and minimal set of Underscore-style object manipulation functions. Just what you need when you're working in modern ES5/ES6 envorinment, packed in API which you already know.

Written in TypeScript, works with ES5, ES6, and TypeScript.

## Events Performance and BackboneJS compatibility 

Athough MixtureJS _implements_ [Backbone API for Events](http://backbonejs.org/#Events) for events, implementation is different.
Event subscription is abour 4 times faster in all browsers, and event triggering is 4.5 times faster in IE.

Features of [Backbone Events API](http://backbonejs.org/#Events) which are _not_ supported:

- `source.trigger( 'ev1 ev2 ev3' )` is not supported. Use `source.trigger( 'ev1' ).trigger( 'ev2' ).trigger( 'ev3' )` instead.
- `source.trigger( 'ev', a, b, ... )` doesn't support more than 5 event parameters.
- `source.on( 'ev', callback )` - callback will _not_ be called in the context of `source` by default.

That's it. Other stuff works.

Chrome:

| Test | BackboneJS 1.2 | MixtureJS | Improvement |
|------|----------------|-----------|-------------|
| on/off | 4.6 sec |  1.2 sec | x3.8 faster |
| trigger | 0.16 sec |  0.12 sec | same |
| listenTo/stopListening | 21 sec |  5 sec | x4.2 faster |

Firefox: 

| Test | BackboneJS 1.2 | MixtureJS | Improvement |
|------|----------------|-----------|-------------|
| on/off | 5.5 sec |  1.4 sec | x3.9 faster |
| trigger | 0.16 sec |  0.16 sec | same |
| listenTo/stopListening | 34 sec |  7.5 sec | x4.5 faster |

IE11:

| Test | BackboneJS 1.2 | MixtureJS | Improvement |
|------|----------------|-----------|-------------|
| on/off | 19.8 sec |  4.9 sec | x4.0 faster |
| trigger | 4.5 sec |  1.0 sec | x4.5 faster |
| listenTo/stopListening | 48.4 sec |  12.9 sec | x3.75 faster |

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

In a simple case, you may just import `@mixins` decorator and use it on any class. If you want to simulate behavior of the React mixins,
you need to do something just a bit more sophisticated.

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

## Supported Merge Rules

Mixin merge rules can be defined using the `@mixinRules({ attr : rule })` class decorator. Rule is the string from the following list.

- *merge* - assume property to be an object, which members taken from mixins must be merged.
- *pipe* - property is the function `( x : T ) => T` transforming the value. Multiple functions joined in pipe.
- *sequence* - property is the function. Multiple functions will be called in sequence.
- *reverse* - same as *sequence*, but functions called in reverse sequence.
- *mergeSequence* - merge the object returned by functions, executing them in sequence.
- *every* - property is the function `( ...args : any[] ) => boolean`. Resulting method will return true if every single function returns true.
- *some* - same as previous, but method will return true when at least one function returns true.

If merge rule is an object, the corresponding member is expected to be an object and the rule defines the merge rules for its members.

## Installation

`npm install mixturejs`
