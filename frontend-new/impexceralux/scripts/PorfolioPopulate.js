var colectii = null;
var doneConstructingImages = false;
var totalClasses = 1;

function createHtmlImage(id, colectie, descriere, image, classes) {
    let stre = '<div id=' + '"id_'+ id.toString() + '"' + ' + class="post-media pitem item-w1 item-h1 cat' + classes.toString() + '">' +
               '    <a href="uploads/portfolio_07.jpg" data-rel="prettyPhoto[gal]">' +
               '        <img src="' + image + '" alt="" class="img-responsive">' +
               '        <div>' +
               '            <h3>' + colectie + ' <small> ' + descriere + ' </small></h3>' +
               '            <i class="flaticon-unlink"></i>' +
               '        </div>' +
               '    </a>' +
               '</div';
    return createElementFromHTML(stre);
}

function onClickFilter(data) {
    console.log(data);
    //fullRequest("&tip=interior-exterior", 2);
    return false;
}

function createCategories() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/tips',
        data: {},
        success: function( data ) {
            let container = document.getElementById("cateories");
            for(var i = 0; i < data['tips'].length; i++) {
                console.log(data['tips'][i][0]);
                if(i === data['tips'].length - 1) {
                    fullRequest("&tip=" + data['tips'][i][0], (i + 1), 1);
                }
                else {
                    fullRequest("&tip=" + data['tips'][i][0], (i + 1), 0);
                }
                var categ = '<li><a class="btn btn-dark btn-radius btn-brd" data-toggle="tooltip" ' +
                            ' data-placement="top" title="' + data['tips'][i][1].toString() +
                            '" data-filter=".cat' + (i + 1).toString() + '">' + data['tips'][i][0] + '</a></li>';
                container.appendChild(createElementFromHTML(categ));
            }
        },
        dataType: 'json'
    });
}

function fullRequest(requestString, totalClasses, withInit) {
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/portfolio_all?page=1&per_page=13' + requestString,
        data: {},
        success: function( data ) {
            let container = document.getElementById("da-thumbs")
            console.log(data);
            for(var i = 0; i < data.length; i++) {
                if(data[i]['img'] != null) {
                    var element = createHtmlImage(i, data[i]['colectie'], data[i]['descriere'], "../date_impexcera/" + data[i]['img'][0], totalClasses);
                    console.log(element);
                    container.appendChild(element);
                }
            }
            if(withInit) {
                customs();
                queryTransform();
                hoveriing();
            }
        },
        dataType: 'json'
    });
}

function hoveriing() {
    ;( function( $, window, undefined ) {

        'use strict';

        $.HoverDir = function( options, element ) {

            this.$el = $( element );
            this._init( options );

        };

        // the options
        $.HoverDir.defaults = {
            speed : 300,
            easing : 'ease',
            hoverDelay : 0,
            inverse : false
        };

        $.HoverDir.prototype = {

            _init : function( options ) {

                // options
                this.options = $.extend( true, {}, $.HoverDir.defaults, options );
                // transition properties
                this.transitionProp = 'all ' + this.options.speed + 'ms ' + this.options.easing;
                // support for CSS transitions
                this.support = Modernizr.csstransitions;
                // load the events
                this._loadEvents();

            },
            _loadEvents : function() {

                var self = this;

                this.$el.on( 'mouseenter.hoverdir, mouseleave.hoverdir', function( event ) {

                    var $el = $( this ),
                        $hoverElem = $el.find( 'div' ),
                        direction = self._getDir( $el, { x : event.pageX, y : event.pageY } ),
                        styleCSS = self._getStyle( direction );

                    if( event.type === 'mouseenter' ) {

                        $hoverElem.hide().css( styleCSS.from );
                        clearTimeout( self.tmhover );

                        self.tmhover = setTimeout( function() {

                            $hoverElem.show( 0, function() {

                                var $el = $( this );
                                if( self.support ) {
                                    $el.css( 'transition', self.transitionProp );
                                }
                                self._applyAnimation( $el, styleCSS.to, self.options.speed );

                            } );


                        }, self.options.hoverDelay );

                    }
                    else {

                        if( self.support ) {
                            $hoverElem.css( 'transition', self.transitionProp );
                        }
                        clearTimeout( self.tmhover );
                        self._applyAnimation( $hoverElem, styleCSS.from, self.options.speed );

                    }

                } );

            },
            // credits : http://stackoverflow.com/a/3647634
            _getDir : function( $el, coordinates ) {

                // the width and height of the current div
                var w = $el.width(),
                    h = $el.height(),

                    // calculate the x and y to get an angle to the center of the div from that x and y.
                    // gets the x value relative to the center of the DIV and "normalize" it
                    x = ( coordinates.x - $el.offset().left - ( w/2 )) * ( w > h ? ( h/w ) : 1 ),
                    y = ( coordinates.y - $el.offset().top  - ( h/2 )) * ( h > w ? ( w/h ) : 1 ),

                    // the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);
                    // first calculate the angle of the point,
                    // add 180 deg to get rid of the negative values
                    // divide by 90 to get the quadrant
                    // add 3 and do a modulo by 4  to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
                    direction = Math.round( ( ( ( Math.atan2(y, x) * (180 / Math.PI) ) + 180 ) / 90 ) + 3 ) % 4;

                return direction;

            },
            _getStyle : function( direction ) {

                var fromStyle, toStyle,
                    slideFromTop = { left : '0px', top : '-100%' },
                    slideFromBottom = { left : '0px', top : '100%' },
                    slideFromLeft = { left : '-100%', top : '0px' },
                    slideFromRight = { left : '100%', top : '0px' },
                    slideTop = { top : '0px' },
                    slideLeft = { left : '0px' };

                switch( direction ) {
                    case 0:
                        // from top
                        fromStyle = !this.options.inverse ? slideFromTop : slideFromBottom;
                        toStyle = slideTop;
                        break;
                    case 1:
                        // from right
                        fromStyle = !this.options.inverse ? slideFromRight : slideFromLeft;
                        toStyle = slideLeft;
                        break;
                    case 2:
                        // from bottom
                        fromStyle = !this.options.inverse ? slideFromBottom : slideFromTop;
                        toStyle = slideTop;
                        break;
                    case 3:
                        // from left
                        fromStyle = !this.options.inverse ? slideFromLeft : slideFromRight;
                        toStyle = slideLeft;
                        break;
                };

                return { from : fromStyle, to : toStyle };

            },
            // apply a transition or fallback to jquery animate based on Modernizr.csstransitions support
            _applyAnimation : function( el, styleCSS, speed ) {

                $.fn.applyStyle = this.support ? $.fn.css : $.fn.animate;
                el.stop().applyStyle( styleCSS, $.extend( true, [], { duration : speed + 'ms' } ) );

            },

        };

        var logError = function( message ) {

            if ( window.console ) {

                window.console.error( message );

            }

        };

        $.fn.hoverdir = function( options ) {

            var instance = $.data( this, 'hoverdir' );

            if ( typeof options === 'string' ) {

                var args = Array.prototype.slice.call( arguments, 1 );

                this.each(function() {

                    if ( !instance ) {

                        logError( "cannot call methods on hoverdir prior to initialization; " +
                        "attempted to call method '" + options + "'" );
                        return;

                    }

                    if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {

                        logError( "no such method '" + options + "' for hoverdir instance" );
                        return;

                    }

                    instance[ options ].apply( instance, args );

                });

            }
            else {

                this.each(function() {

                    if ( instance ) {

                        instance._init();

                    }
                    else {

                        instance = $.data( this, 'hoverdir', new $.HoverDir( options, this ) );

                    }

                });

            }

            return instance;

        };

    } )( jQuery, window );

            $(function() {
                $('.pitem ').each( function() { $(this).hoverdir(); } );
            });
}

function queryTransform() {
    (function ($) {
        var $container = $('.portfolio'),
            colWidth = function () {
                var w = $container.width(),
                    columnNum = 1,
                    columnWidth = 50;
                if (w > 1200) {
                    columnNum  = 5;
                }
                else if (w > 900) {
                    columnNum  = 3;
                }
                else if (w > 600) {
                    columnNum  = 2;
                }
                else if (w > 300) {
                    columnNum  = 1;
                }
                columnWidth = Math.floor(w/columnNum);
                $container.find('.pitem').each(function() {
                    var $item = $(this),
                        multiplier_w = $item.attr('class').match(/item-w(\d)/),
                        multiplier_h = $item.attr('class').match(/item-h(\d)/),
                        width = multiplier_w ? columnWidth*multiplier_w[1]-0 : columnWidth-5,
                        height = multiplier_h ? columnWidth*multiplier_h[1]*1-5 : columnWidth*0.5-5;
                    $item.css({
                        width: width,
                        height: height
                    });
                });
                return columnWidth;
            }
            function refreshWaypoints() {
                setTimeout(function() {
                }, 3000);
            }
            $('nav.portfolio-filter ul a').on('click', function() {
                var selector = $(this).attr('data-filter');
                console.log(selector);
                $container.isotope({ filter: selector }, refreshWaypoints());
                $('nav.portfolio-filter ul a').removeClass('active');
                $(this).addClass('active');
                return false;
            });
            function setPortfolio() {
                setColumns();
                $container.isotope('reLayout');
            }
            $container.imagesLoaded( function() {
                $container.isotope();
            });
            isotope = function () {
                $container.isotope({
                    resizable: true,
                    itemSelector: '.pitem',
                    layoutMode : 'masonry',
                    gutter: 10,
                    masonry: {
                        columnWidth: colWidth(),
                        gutterWidth: 0
                    }
                });
            };
            isotope();
            $(window).smartresize(isotope);
        }(jQuery));
}

function customs() {

    (function($) {
        "use strict";
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 50) {
                $('.header_style_01').addClass('fixed-menu');
            } else {
                $('.header_style_01').removeClass('fixed-menu');
            }
        });


    /* ==============================================
            Scroll to top
        ============================================== */

        if ($('#scroll-to-top').length) {
            var scrollTrigger = 100, // px
                backToTop = function () {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > scrollTrigger) {
                        $('#scroll-to-top').addClass('show');
                    } else {
                        $('#scroll-to-top').removeClass('show');
                    }
                };
            backToTop();
            $(window).on('scroll', function () {
                backToTop();
            });
            $('#scroll-to-top').on('click', function (e) {
                e.preventDefault();
                $('html,body').animate({
                    scrollTop: 0
                }, 700);
            });
        }

        /* ==============================================
        LOADER -->
            =============================================== */

        $(window).load(function() {
            $("#preloader").on(500).fadeOut();
            $(".preloader").on(600).fadeOut("slow");
        });

        /* ==============================================
        FUN FACTS -->
        =============================================== */

        function count($this) {
            var current = parseInt($this.html(), 10);
            current = current + 50; /* Where 50 is increment */
            $this.html(++current);
            if (current > $this.data('count')) {
                $this.html($this.data('count'));
            } else {
                setTimeout(function() {
                    count($this)
                }, 30);
            }
        }
        $(".stat_count, .stat_count_download").each(function() {
            $(this).data('count', parseInt($(this).html(), 10));
            $(this).html('0');
            count($(this));
        });


        /* ==============================================
        FUN FACTS -->
        =============================================== */

        $(".slider-wrapper").owlCarousel({
            items: 1,
            nav: true,
            dots: false,
            autoplay: true,
            loop: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            mouseDrag: false,
            touchDrag: false,
            smartSpeed: 700
        });

        /* ==============================================
        TOOLTIP -->
        =============================================== */
        $('[data-toggle="tooltip"]').tooltip()
        $('[data-toggle="popover"]').popover()

        /* ==============================================
        CONTACT -->
        =============================================== */
        jQuery(document).ready(function() {
            $('#contactform').submit(function() {
                var action = $(this).attr('action');
                $("#message").slideUp(750, function() {
                    $('#message').hide();
                    $('#submit')
                        .after('<img src="images/ajax-loader.gif" class="loader" />')
                        .attr('disabled', 'disabled');
                    $.post(action, {
                            first_name: $('#first_name').val(),
                            last_name: $('#last_name').val(),
                            email: $('#email').val(),
                            phone: $('#phone').val(),
                            select_service: $('#select_service').val(),
                            select_price: $('#select_price').val(),
                            comments: $('#comments').val(),
                            verify: $('#verify').val()
                        },
                        function(data) {
                            document.getElementById('message').innerHTML = data;
                            $('#message').slideDown('slow');
                            $('#contactform img.loader').fadeOut('slow', function() {
                                $(this).remove()
                            });
                            $('#submit').removeAttr('disabled');
                            if (data.match('success') != null) $('#contactform').slideUp('slow');
                        }
                    );
                });
                return false;
            });
        });

        /* ==============================================
        CODE WRAPPER -->
        =============================================== */

        $('.code-wrapper').on("mousemove", function(e) {
            var offsets = $(this).offset();
            var fullWidth = $(this).width();
            var mouseX = e.pageX - offsets.left;

            if (mouseX < 0) {
                mouseX = 0;
            } else if (mouseX > fullWidth) {
                mouseX = fullWidth
            }

            $(this).parent().find('.divider-bar').css({
                left: mouseX,
                transition: 'none'
            });
            $(this).find('.design-wrapper').css({
                transform: 'translateX(' + (mouseX) + 'px)',
                transition: 'none'
            });
            $(this).find('.design-image').css({
                transform: 'translateX(' + (-1 * mouseX) + 'px)',
                transition: 'none'
            });
        });
        $('.divider-wrapper').on("mouseleave", function() {
            $(this).parent().find('.divider-bar').css({
                left: '50%',
                transition: 'all .3s'
            });
            $(this).find('.design-wrapper').css({
                transform: 'translateX(50%)',
                transition: 'all .3s'
            });
            $(this).find('.design-image').css({
                transform: 'translateX(-50%)',
                transition: 'all .3s'
            });
        });

    })(jQuery);
}

function importJsonData() {
    console.log("STarted!");
    $(document).ready(function(){
        $.getJSON("../date_impexcera/dateDB.json", function(data){
            colectii = data.colectii;
            let container = document.getElementById("da-thumbs")
            for(var i = 0; i < colectii.length; i++) {
                if(colectii[i]['img'] != null) {
                    let element = createHtmlImage(i, colectii[i]['colectie'], colectii[i]['descriere'], "../date_impexcera/" + colectii[i]['img'][0]);
                }
            }
            customs();
            queryTransform();
            hoveriing();
        }).fail(function(){
            console.log("An error has occurred.");
        });
    });
}

async function createHeadersPortfolio() {
    while(colectii === null) {
        await sleep(100);
    }
    let container = document.getElementById("da-thumbs")
    for(var i = 0; i < colectii.length; i++) {
        let element = createHtmlImage(i, colectii[i]['colectie'], colectii[i]['descriere']);
    }
    doneConstructingImages = true;
}
createCategories();
//fullRequest("", totalClasses + 3, 1);
