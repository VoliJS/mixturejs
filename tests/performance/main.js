define( function( require, exports, module ){
    var Mixture   = require( '../../index.js' ),
        Backbone = require( 'backbone' );

    describe( 'Events ', function(){
        this.timeout( 100000 );

        describe( 'Mixture (five lisneners)', function(){
            var FlatModel = Mixture.Messenger;
            
            it( 'simple on/off', function(){
                var source = new FlatModel(),
                    d1 = new FlatModel(), d2 = new FlatModel(),
                    d3 = new FlatModel(), d4 = new FlatModel(), d5 = new FlatModel();

                function callback(){ this._counter++; }

                for( var i = 0; i < 1000000; i++ ){
                    source.on( 'change', callback, d1 )
                        .on( 'change', callback, d2 )
                        .on( 'change', callback, d3 )
                        .on( 'change', callback, d4 )
                        .on( 'change', callback, d5 );

                    source.off( 'change', callback, d1 )
                        .off( 'change', callback, d2 )
                        .off( 'change', callback, d3 )
                        .off( 'change', callback, d4 )
                        .off( 'change', callback, d5 );
                }
            });

            it( 'trigger', function(){
                var source = new FlatModel(),
                    d1 = new FlatModel(), d2 = new FlatModel(),
                    d3 = new FlatModel(), d4 = new FlatModel(), d5 = new FlatModel();

                function callback(){ this._counter++; }

                source.on( 'change', callback, d1 )
                        .on( 'change', callback, d2 )
                        .on( 'change', callback, d3 )
                        .on( 'change', callback, d4 )
                        .on( 'change', callback, d5 );

                for( var i = 0; i < 1000000; i++ ){
                    source.trigger( 'change', source, {} );
                }
            });

            it( 'listentTo/stopListening', function(){
                var source = new FlatModel(),
                    d1 = new FlatModel(), d2 = new FlatModel(),
                    d3 = new FlatModel(), d4 = new FlatModel(), d5 = new FlatModel();

                function callback(){ this._counter++; }

                for( var i = 0; i < 1000000; i++ ){
                    d1.listenTo( source, 'change', callback );
                    d2.listenTo( source, 'change', callback );
                    d3.listenTo( source, 'change', callback );
                    d4.listenTo( source, 'change', callback );
                    d5.listenTo( source, 'change', callback );

                    d1.stopListening( source );
                    d2.stopListening( source );
                    d3.stopListening( source );
                    d4.stopListening( source );
                    d5.stopListening( source );
                }
            });
        } );

        describe( 'Backbone (five lisneners)', function(){
            var FlatModel = Backbone.Model;

            it( 'simple on/off', function(){
                var source = new FlatModel(),
                    d1 = new FlatModel(), d2 = new FlatModel(),
                    d3 = new FlatModel(), d4 = new FlatModel(), d5 = new FlatModel();

                function callback(){ this._counter++; }

                for( var i = 0; i < 1000000; i++ ){
                    source.on( 'change', callback, d1 )
                        .on( 'change', callback, d2 )
                        .on( 'change', callback, d3 )
                        .on( 'change', callback, d4 )
                        .on( 'change', callback, d5 );

                    source.off( 'change', callback, d1 )
                        .off( 'change', callback, d2 )
                        .off( 'change', callback, d3 )
                        .off( 'change', callback, d4 )
                        .off( 'change', callback, d5 );
                }
            });

            it( 'trigger', function(){
                var source = new FlatModel(),
                    d1 = new FlatModel(), d2 = new FlatModel(),
                    d3 = new FlatModel(), d4 = new FlatModel(), d5 = new FlatModel();

                function callback(){ this._counter++; }

                source.on( 'change', callback, d1 )
                        .on( 'change', callback, d2 )
                        .on( 'change', callback, d3 )
                        .on( 'change', callback, d4 )
                        .on( 'change', callback, d5 );

                for( var i = 0; i < 1000000; i++ ){
                    source.trigger( 'change', source, {} );
                }
            });

            it( 'listentTo/stopListening', function(){
                var source = new FlatModel(),
                    d1 = new FlatModel(), d2 = new FlatModel(),
                    d3 = new FlatModel(), d4 = new FlatModel(), d5 = new FlatModel();

                function callback(){ this._counter++; }

                for( var i = 0; i < 1000000; i++ ){
                    d1.listenTo( source, 'change', callback );
                    d2.listenTo( source, 'change', callback );
                    d3.listenTo( source, 'change', callback );
                    d4.listenTo( source, 'change', callback );
                    d5.listenTo( source, 'change', callback );

                    d1.stopListening( source );
                    d2.stopListening( source );
                    d3.stopListening( source );
                    d4.stopListening( source );
                    d5.stopListening( source );
                }
            });
        } );
    });
});
