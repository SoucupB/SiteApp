var colectii = null;
var doneConstructingImages = false;
var totalClasses = 1;
var containerMap = {};
var paginationIndexes = {};
var catExamples = [];
$.ajaxSetup({async: false});

function createHtmlImage(id, colectie, descriere, image, classes) {
    let stre = '<div id=' + '"id_'+ id.toString() + '"' + ' + class="post-media pitem item-w1 item-h1 cat' + classes.toString() + '">' +
               '    <a href="' + image + '" data-rel="prettyPhoto[gal]">' +
               '        <img src="' + image + '" alt="" class="img-responsive">' + //style="width:300px;height:162px;"
               '        <div>' +
               '            <h3>' + colectie + ' <small> ' + descriere + ' </small></h3>' +
               '            <i class="flaticon-unlink"></i>' +
               '        </div>' +
               '    </a>' +
               '</div';
    return createElementFromHTML(stre);
}

function createCategories() {
    var totalRequests = 0;
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/tips',
        data: {},
        success: function( data ) {
            let container = document.getElementById("cateories");
            for(var i = 0; i < data['tips'].length; i++) {
                totalRequests++;
                fullRequest("&tip=" + data['tips'][i][0], (i + 1));
                var categ = '<li><a class="btn btn-dark btn-radius btn-brd" data-toggle="tooltip" ' +
                            ' data-placement="top" title="' + data['tips'][i][1].toString() +
                            '" data-filter=".cat' + (i + 1).toString() + '">' + data['tips'][i][0] + '</a></li>';
                paginationIndexes[".cat" + (i + 1).toString()] = data['tips'][i][0];
                container.appendChild(createElementFromHTML(categ));
            }
        },
        dataType: 'json'
    });
    console.log(containerMap);
    $.ajaxSetup({async: true});
    beginAnimation();
}

function fullRequest(requestString, classIndex) {
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/portfolio_all?page=1&per_page=8' + requestString,
        data: {},
        success: function( data ) {
            let container = document.getElementById("da-thumbs")
            for(var i = 0; i < data['data'].length; i++) {
                if(data['data'][i]['img'] != null) {
                    var element = createHtmlImage(totalClasses++, data['data'][i]['colectie'], data['data'][i]['descriere'], "../date_impexcera/" + data['data'][i]['img'][0], classIndex);
                    container.appendChild(element)
                }
            }
            containerMap[".cat" + classIndex.toString() + ""] = data['pages'];
        },
        dataType: 'json'
    });
}

function createPaginations(cat_id) {
    var element = document.getElementById("pagi");
    for(var i = 0; i < paginationIndexes.length; i++) {
        document.getElementById(paginationIndexes[i]).remove();
    }
    paginationIndexes = [];
    var pagSize = containerMap[cat_id];
    for(var i = 0; i < pagSize; i++) {
        var cId = "pag_" + i.toString();
        paginationIndexes.push(cId);
        var htmlPagination = '<a id = ' + cId + '>' + (i + 1).toString() + '</a>';
        var pag = createElementFromHTML(htmlPagination);
        element.appendChild(pag)
    }
    element.appendChild(createElementFromHTML("<a id = pag_" + pagSize.toString() + ">&raquo;</a>"))
    paginationIndexes.push("pag_" + pagSize.toString());
    console.log(pagSize);
}

function addCollection(classPoint, colName, colDesc, colPhoto) {
    let container = document.getElementById("da-thumbs");
    //var element = createHtmlImage(classPoint, colName, colDesc, "../date_impexcera/" + colPhoto, prankId++);
    // container.appendChild(element);
    // beginAnimation();
    // for(var i = 1; i <= 44; i++) {
    //     var element = document.getElementById("id_" + i.toString());
    //     if(element) {
    //        element.remove();
    //     }
    // }
}

function beginAnimation() {
    customs();
    queryTransform();
    hoveriing();
}

function hoveriing() {
    ;( function( $, window, undefined ) {
        'use strict';
        $.HoverDir = function( options, element ) {

            this.$el = $( element );
            this._init( options );

        };
        $.HoverDir.defaults = {
            speed : 200,
            easing : 'ease',
            hoverDelay : 0,
            inverse : false
        };
        $.HoverDir.prototype = {
            _init : function( options ) {
                this.options = $.extend( true, {}, $.HoverDir.defaults, options );
                this.transitionProp = 'all ' + this.options.speed + 'ms ' + this.options.easing;
                this.support = Modernizr.csstransitions;
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
            _getDir : function( $el, coordinates ) {
                var w = $el.width(),
                    h = $el.height(),
                    x = ( coordinates.x - $el.offset().left - ( w/2 )) * ( w > h ? ( h/w ) : 1 ),
                    y = ( coordinates.y - $el.offset().top  - ( h/2 )) * ( h > w ? ( w/h ) : 1 ),
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
                        fromStyle = !this.options.inverse ? slideFromTop : slideFromBottom;
                        toStyle = slideTop;
                        break;
                    case 1:
                        fromStyle = !this.options.inverse ? slideFromRight : slideFromLeft;
                        toStyle = slideLeft;
                        break;
                    case 2:
                        fromStyle = !this.options.inverse ? slideFromBottom : slideFromTop;
                        toStyle = slideTop;
                        break;
                    case 3:
                        fromStyle = !this.options.inverse ? slideFromLeft : slideFromRight;
                        toStyle = slideLeft;
                        break;
                };

                return { from : fromStyle, to : toStyle };

            },
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
                columnNum = 4;
                columnWidth = Math.floor(w / columnNum);
                $container.find('.pitem').each(function() {
                    var $item = $(this),
                        multiplier_w = $item.attr('class').match(/item-w(\d)/),
                        multiplier_h = $item.attr('class').match(/item-h(\d)/),
                        width = multiplier_w ? columnWidth * multiplier_w[1] - 0 : columnWidth - 5,
                        height = multiplier_h ? columnWidth * multiplier_h[1] * 1-5 : columnWidth * 0.5 - 5;
                    $item.css({
                        width: width,
                        height: height
                    });
                });
                $container.find('.img-responsive').each(function() {
                    var $item = $(this),
                        multiplier_w = $item.attr('class').match(/item-w(\d)/),
                        multiplier_h = $item.attr('class').match(/item-h(\d)/),
                        width = multiplier_w ? columnWidth * multiplier_w[1] - 0 : columnWidth - 5,
                        height = multiplier_h ? columnWidth * multiplier_h[1] * 1-5 : columnWidth * 0.5 - 5;
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
                createPaginations(selector.toString());
                $container.isotope({ filter: selector }, refreshWaypoints());
                $('nav.portfolio-filter ul a').removeClass('active');
                $(this).addClass('active');
                return false;
            });
            function setPortfolio() {
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

        $(window).load(function() {
            $("#preloader").on(500).fadeOut();
            $(".preloader").on(600).fadeOut("slow");
        });

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
