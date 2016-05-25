/* Object+ Extensions
 * (c) Vlad Balin & Volicon, 2015
 * ============================================================ */
(function(){
    // Simple logging control, for easy override in applications
    //----------------------------------------------------------

    function template( pattern ){
        var body = "'" + pattern.replace( "'", "\\'" ).replace( /\$\{(\w+)}/g, "'+c.$1+'" ) + "'";
        body = body.replace( "+''+", "+" ).replace( /^''\+|\+''$/g, '' );
        return new Function( 'c', 'return ' + body );
    }

    function FunctionFactory(){
        this.args = Array.prototype.slice.call( arguments );
    }

    FunctionFactory.prototype = {
        add : function( line ){

        },

        unroll : function( obj, separator ){

        },

        create()
    };

    Function.define = function(){
        return
    }


    Object.log = {
        level : 2,

        error : function(){
            console.error.apply( console, arguments );
        },

        warning : function(){
            this.loglevel > 0 && console.warning.apply( console, arguments );
        },

        info : function(){
            this.loglevel > 1 && console.info.apply( console, arguments );
        },

        debug : function(){
            this.loglevel > 2 && console.log.apply( console, arguments );
        }
    };


    function createFunction( a_args, before, attrSpec, fun, join ){
        var args = a_args.split( /[\s|,]+/ );
        switch( args.length ){
            case 0 : return new Function( body.join( join || '' ) );
            case 1 : return new Function( args[ 0 ], body.join( join || '' ) );
            case 2 : return new Function( args[ 0 ], args[ 1 ], body.join( join || '' ) );
            case 3 : return new Function( args[ 0 ], args[ 1 ], args[ 2 ], body.join( join || '' ) );
        }
    }

    Function.define = function(){

    }

    var Compile = {
        forEach : function( attrSpecs ){
            var forEach = Function.dynamic( 'a', 'f' );

            forEach.add( 'var v;' );

            for( var name in attrSpecs ){
                forEach.add( '( v = a.$1 ) === void 0 || f( v, "$1" );', name );
            }

            return forEach.create();
        },

        Clone : function( attrSpecs ){
            return Function
                    .define( 'x' )
                    .unroll( attrSpecs, 'this.${key} = x.${key};' )
                    .create({ prototype : Object.prototype });
        },

        Transform : function( attrSpecs ){
            return Function
                .define( 'a', 'f' )
                .add( 'var v;' )
                .unroll( attrSpecs, 'this.${key} = ( v = a.${key} ) === void 0 ? void 0 : f( v, "${key}" );' )
                .create({ prototype : Object.prototype });
        }
    };

    var ObjectTools = ( function(){
        function transform( dest, source, fun, context ){
            for( var name in source ){
                if( source.hasOwnProperty( name ) ){
                    var value = fun.call( context, source[ name ], name );
                    value === void 0 || ( dest[ name ] = value );
                }
            }

            return dest;
        }

        function assign( dest ){
            for( var i = 1; i < arguments.length; i++ ){
                _assign( dest, arguments[ i ] );
            }

            return dest;
        }

        function _assign( dest, source ){
            for( var name in source ){
                if( source.hasOwnProperty( name ) ){
                    dest[ name ] = source[ name ];
                }
            }
        }

        function defaults( dest ){
            for( var i = 1; i < arguments.length; i++ ){
                _defaults( dest, arguments[ i ] );
            }
        }

        function _defaults( dest, source ){
            for( var name in source ){
                if( source.hasOwnProperty( name ) && dest[ name ] === void 0 ){
                    dest[ name ] = source[ name ];
                }
            }
        }

        var combinator = {
            defaults : function( a, b ){
                return defaults( {}, a, b );
            },

            assign : function( a, b ){
                return assign( {}, a, b );
            },

            concat : function( a, b ){
                var first  = typeof a === 'string' ? a.split( /\s+/ ) : a,
                    second = typeof b === 'string' ? b.split( /\s+/ ) : b;

                return a.concat( b );
            },

            seq : function( a, b ){
                return function(){
                    b.apply( this, arguments );
                    a.apply( this, arguments );
                }
            },

            or : function( a, b ){
                return function(){
                    return a.apply( this, arguments ) || b.apply( this, arguments );
                }
            },

            and : function( a, b ){
                return function(){
                    return a.apply( this, arguments ) && b.apply( this, arguments );
                }
            },

            pipe : function( a, b ){
                return function( x ){
                    return a.call( this, b.call( this, x ) );
                }
            }
        };

        return {
            assign : assign,
            transform : transform,
            defaults : defaults,

            merge : function( dest, source, rules ){
                return transform( dest, source, function( value, name ){
                    var rule;

                    if( dest[ name ] === void 0 ){
                        return value;
                    }
                    else if( rule = rules[ name ] ){
                        return combinator[ rule ]( existing, toMix );
                    }
                });
            },

            // get property descriptor looking through all prototype chain
            getPropertyDescriptor : function( obj, prop ){
                for( var desc; !desc && obj; obj = Object.getPrototypeOf( obj ) ){
                    desc = Object.getOwnPropertyDescriptor( obj, prop );
                }

                return desc;
            }
        }
    })();

    var Extend = {

        // Loop unrolled iteration and object constructors
        // --------------------------------------------------------------


        // extend function in the fashion of Backbone, with extended features required by NestedTypes
        // - supports native properties definitions
        // - supports forward declarations
        // - mixins
        // - warn in case if base class method is overriden with value. It's popular mistake when working with Backbone.
        extend : (function(){
            var error = {
                overrideMethodWithValue : function( Ctor, name, value ){
                    console.warn( '[Type Warning] Base class method overriden with value in Object.extend({ ' + name +
                                  ' : ' + value + ' }); Object =', Ctor.prototype );
                }
            };

            function Class(){
                this.initialize.apply( this, arguments );
            }

            // Backbone-style extend with native properties and late definition support
            function extend( protoProps, staticProps ){
                var Parent = this === Object ? Class : this,
                    Child;

                if( typeof protoProps === 'function' ){
                    Child      = protoProps;
                    protoProps = null;
                }
                else if( protoProps && protoProps.hasOwnProperty( 'constructor' ) ){
                    Child = protoProps.constructor;
                }
                else{
                    Child = function Constructor(){ return Parent.apply( this, arguments ); };
                }

                Object.defaults( Child, Parent );

                Child.prototype             = Object.create( Parent.prototype );
                Child.prototype.constructor = Child;
                Child.__super__             = Parent.prototype;

                protoProps && Child.define( protoProps, staticProps );

                return Child;
            }

            function warnOnError( value, name ){
                var prop = Object.getPropertyDescriptor( this.prototype, name );

                if( prop ){
                    var baseIsFunction  = typeof prop.value === 'function',
                        valueIsFunction = typeof value === 'function';

                    if( baseIsFunction && !valueIsFunction ){
                        error.overrideMethodWithValue( this, name, prop );
                    }
                }

                return value;
            }

            function preparePropSpec( spec, name ){
                var prop = Object.getPropertyDescriptor( this.prototype, name );

                if( prop && typeof prop.value === 'function' ){
                    error.overrideMethodWithValue( this, name, prop );
                }

                var prepared = spec instanceof Function ? { get : spec } : spec;

                if( prepared.enumerable === void 0 ){
                    prepared.enumerable = true;
                }

                return prepared;
            }

            function createForEachProp( proto ){
                var allProps = {};

                // traverse prototype chain
                for( var p = proto; p; p = Object.getPrototypeOf( p ) ){
                    Object.transform( allProps, p.properties, function( spec, name ){
                        if( !allProps[ name ] && spec.enumerable ){
                            return spec;
                        }
                    } );
                }

                return Object.createForEach( allProps );
            }

            function define( a_protoProps, a_staticProps ){
                var protoProps = a_protoProps || {};
                staticProps    = a_staticProps || {};

                Object.transform( this.prototype, protoProps, warnOnError, this );

                // do not inherit abstract class factory!
                if( !staticProps.create ) staticProps.create = null;
                merge( this, staticProps, { mixing : 'assign' } );

                // process mixins...
                var mixins = a_protoProps.mixins;
                if( mixins ){
                    for( var i = 0; i < mixins.length; i++ ){
                        merge( this.prototype, mixins[ i ], this.mixing );
                    }
                }

                protoProps && Object.defineProperties( this.prototype,
                    Object.transform( {}, protoProps.properties, preparePropSpec, this ) );

                this.prototype.forEachProp = createForEachProp( this.prototype );

                return this;
            }

            function _extend(){}

            extend.attach = function(){
                for( var i = 0; i < arguments.length; i++ ){
                    var Ctor = arguments[ i ];

                    Ctor.extend  = extend;
                    Ctor.define  = define;
                    Ctor.mixing  = { properties : 'defaults' };
                    Ctor._extend = _extend;
                    Ctor.prototype.initialize || ( Ctor.prototype.initialize = function(){} );
                }
            };

            extend.attach( Class );
            extend.Class = Class;

            return extend;
        })(),

        // ES6 metaprogramming decorator
        // -------------------------------------------------------------
        // Invoke Object.extend metaprogramming hooks.
        // @Object.define <- works as forward definition
        // @Object.define({ spec }) <- works as normal extend.
        define : (function(){
            function extend( Class ){
                var ParentProto = Object.getPrototypeOf( Class.prototype ),
                    Parent      = ParentProto.constructor;

                if( Parent._extend ){
                    defaults( Class, Parent );
                    Class.create = void 0;
                }
                else{
                    Object.extend.attach( Class );
                }

                Class.__super__ = ParentProto;
                Class._extend();
            }

            return function( Class, staticProps ){
                if( typeof Class === 'function' ){
                    extend( Class );
                }
                else{
                    var protoProps = Class;
                    return function( Class ){
                        extend( Class );
                        Class.define( protoProps, staticProps );
                    }
                }
            }
        })()
    };

    ObjectTools.defaults( Object, ObjectTools, Extend );
    Object.debug = Debug;
    Object.compile = Compile;
})();