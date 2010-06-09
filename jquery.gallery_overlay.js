/*jslint adsafe: false, bitwise: true, browser: true, cap: false, css: false,
  debug: false, devel: true, eqeqeq: true, es5: false, evil: false,
  forin: false, fragment: false, immed: true, laxbreak: false, newcap: true,
  nomen: false, on: false, onevar: true, passfail: false, plusplus: true,
  regexp: true, rhino: true, safe: false, strict: false, sub: false,
  undef: true, white: false, widget: false, windows: false */
  /*global jQuery: false, $: false, window: false */
"use strict";


/**
* @module jQuery
*/

/**
* A simple jQuery/jQTools gallery overlay. Used on collections of thumbnails
* which link to larger images. Example call:
* <code>$( "#gallery_items a" ).galleryOverlay();</code>
* 
* @class    galleryOverlay
* @extends  jQuery
* @requires jQuery Tools
* @static
* @author   Carlo Zottmann, carlo@municode.de, http://municode.de/
*/

jQuery.fn.galleryOverlay = function() {
  var elements = $.makeArray( this );
  
	// loop through all elements
	return this.each( function() {
		// get handle to tabs API.
		var i = elements.indexOf( this ),
		  api = $( this ).overlay({
        target: "#gallery",

        onBeforeLoad: function() {
          var overlay = this.getOverlay(),
            imgURL = this.getTrigger().attr( "href" );

          function clearBG() {
            overlay.css({
              "background-image": "none",
              "background-repeat": "no-repeat"
            })
            .find( ".progress" ).attr( "src", "/images/overlay/loading.gif" ).show();
          }

          if ( i > 0 ) {
            clearBG();

            overlay.find( ".prev" )
              .show()
              .unbind( "click" )
              .click( function( evt ) {
                $( elements[ i - 1 ] ).data( "overlay" ).load();
              });
          }
          else {
            overlay.find( ".prev" ).hide();
          }

          if ( i < ( elements.length - 1 ) ) {
            clearBG();

            overlay.find( ".next" )
              .show()
              .unbind( "click" )
              .click( function( evt ) {
                $( elements[ i + 1 ] ).data( "overlay" ).load();
              });
          }
          else {
            overlay.find( ".next" ).hide();
          }

          $( "<img/>" )
            .attr( "src", imgURL )
            .css( "visibility", "hidden" )
            .bind( "load", function() {
              var img = $( this ),
                width = img[ 0 ].width,
                height = img[ 0 ].height,
                left = Math.floor( ( $( window ).width() - width ) / 2 );

              $( overlay )
                .animate({
                  width: width,
                  height: height,
                  left: left
                })
                .css({
                  backgroundImage: "url(" + imgURL + ")"
                })
                .find( ".progress" ).hide();
            });
          }
      });

	});
};
