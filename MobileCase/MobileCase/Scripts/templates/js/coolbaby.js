var $j = jQuery.noConflict();

jQuery(function ($) {
    "use strict"
var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
if (iOS){$j('body').addClass('ios');}

})


jQuery(function ($) {
    "use strict";
    var usualmenu = $j("ul.sf-menu");
    if (usualmenu.length != 0) usualmenu.supersubs({
        minWidth: 18,
        maxWidth: 27,
        extraWidth: 1	
    }).superfish({	
		delay: 0,
		speed: 0,
		speedOut: 0,
		onBeforeShow: function() {
   if($j(this).parents("ul").length > 1){
      var w = $j(window).width();  
      var ul_offset = $j(this).parents("ul").offset();
      var ul_width = $j(this).parents("ul").outerWidth();
      ul_width = ul_width + 50;
      if((ul_offset.left+ul_width > w-(ul_width/2)) && (ul_offset.left-ul_width > 0)) {
         $j(this).addClass('offscreen_fix');
      }
      else {
         $j(this).removeClass('offscreen_fix');
      }
   };
}})
});


jQuery(function ($) {
// countdown ini
if ($j("#countdown1").length > 0){$j('#countdown1').countdown({until: new Date(2015, 7, 1)});}
// customize selects
if ($j(".selectpicker").length > 0){ $j('.selectpicker').selectpicker({});}
});

jQuery(function ($) {
    "use strict"
	if ($j(".chart").length > 0){
		$j('.chart').easyPieChart({
			barColor: '#c69c6d',
			lineWidth: 4,
			size: 93,
			scaleColor: false,
			easing: 'easeOutBounce',
			onStep: function(from, to, percent) {
				$j(this.el).find('.percent').text(Math.round(percent));
			}
		});
}
});

jQuery(function ($) {
    "use strict"
	
if ($j('.video-popup').length > 0){    
$j('.video-popup').magnificPopup({
          disableOn: 700,
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false
});}

  
if ($j('.image-thumbnail a.gallery-group').length > 0){
 $j('.image-thumbnail a.gallery-group').magnificPopup({type:'image', gallery:{
    enabled:true
  }});
}
});

jQuery(function ($) {
$j(document).bind('cbox_open', function() {
    $j('html').css({ overflow: 'hidden' });
}).bind('cbox_closed', function() {
    $j('html').css({ overflow: '' });
});


	// check if RTL mode
	var colorBoxMenuPosL = ($j("body").hasClass('rtl')) ? 'none' : '0';
	var colorBoxMenuPosR = ($j("body").hasClass('rtl')) ? '0' : 'none';

    $j("#off-canvas-menu-toggle").colorbox({
        inline: true,
        opacity: 0.55,
        transition: "none",
        arrowKey: false,
        width: "300",
        height: "100%",
        fixed: true,
        className: 'canvas-menu',
        top: 0,		
		right: colorBoxMenuPosR,
        left: colorBoxMenuPosL,
        colorBoxCartPos: 0
    }) 
	
	// check if RTL mode
	var colorBoxCartPosL = ($j("body").hasClass('rtl')) ? '0' : 'none';
	var colorBoxCartPosR = ($j("body").hasClass('rtl')) ? 'none' : '0';

	$j(".open-cart").colorbox({
        inline: true,
        opacity: 0.55,
        transition: "fade",
		speed: 300,
        arrowKey: false,
        width: "320",
        height: "100%",
        fixed: true,
        top: 0,
		right: colorBoxCartPosR,
        left: colorBoxCartPosL,
        onComplete: function () {
            $j("#cboxClose, #cboxOverlay").on("click", function (e) {
                e.preventDefault();
                $j("#drop-shopcart").find('.animated').removeClass('animated');
            })
        }
    });
    addToCart = function (button) {
        var $link = button.closest('.product-preview').find('.preview-image').clone();
        var $title = button.closest('.product-preview').find('.title a').clone();
        var $price = button.closest('.product-preview').find('span.price:first').clone();
        var $template = $j("#liTemplate > div").clone().appendTo('#drop-shopcart .list');
        $link.find("img.img-second").remove().end().appendTo('#drop-shopcart .list > div:last .image');
        $title.appendTo('#drop-shopcart .list > div:last .description .product-name');
        $price.appendTo('#drop-shopcart .list > div:last .description .price');
        $j('#drop-shopcart .list > div:last .description .price').removeClass('new');
        $j('.remove-from-cart').on("click", function () {
            $j(this).closest('.item').fadeIn().remove();
			if ($j("#drop-shopcart .list > div").length == 0){$j("#drop-shopcart .total").hide(); $j("#drop-shopcart .empty").show();}
        })
        var checkAnimated = function () {
            if ($j("#drop-shopcart .list > div:last").prev("li").hasClass("animated")) {
                $j('#drop-shopcart .list > div:last').addClass('animated');
                clearTimeout(intrvl);
            }
        }
        var intrvl = setInterval(checkAnimated, 300);
    }
    $j(".add-to-cart").on("click", function (e) {
      addToCart($j(this))
 	  if (!$j("#drop-shopcart .total").is(':visible')){$j("#drop-shopcart .total").show();$j("#drop-shopcart .empty").hide();}
   });
    $j('.remove-from-cart').on("click", function (e) {
        e.preventDefault();
        $j(this).closest('.item').fadeIn().remove();
		if ($j("#drop-shopcart .list > div").length == 0){$j("#drop-shopcart .total").hide(); $j("#drop-shopcart .empty").show();}
    })

});

jQuery(function ($) {
    "use strict";
    var brandsImg = $j(".brands-carousel img");
    $j(".brands-carousel a").append('<div class="after"></div>');
});

jQuery(function ($) {
    "use strict";
    $j(".anim-icon").hover(
		function(){
			var newimg = $j(this).find('img').attr('data-hover');
			var oldimg = $j(this).find('img').attr('src'); 
			$j(this).find('img').attr('src', newimg).attr('data-hover',oldimg)
		},
		function(){
			var newimg = $j(this).find('img').attr('data-hover');
			var oldimg = $j(this).find('img').attr('src'); 
			$j(this).find('img').attr('src', newimg).attr('data-hover',oldimg)
		}
	)
});

jQuery(function ($j) {

    var windowWidth = window.innerWidth || document.documentElement.clientWidth;


    if (windowWidth > 991) {
        footerIni()
    }
	
	$j(window).resize(function () {
	
        var windowWidthR = window.innerWidth || document.documentElement.clientWidth;
	
        if ( windowWidthR != windowWidth) {

        var footerCollapsed = $j('#footer-collapsed');

        if (windowWidthR > 991) {
            if (!footerCollapsed.hasClass('ini')) {
                footerIni();
            }
            else {
                var footerStartHeight = 74;
                footerCollapsed.find('.collapsed-block').css({'width': ''});
                footerCollapsed.stop().css({'height': footerStartHeight});
            }
        } else {
            footerCollapsed.css({'height': 'auto'});
            footerCollapsed.find('.collapsed-block').css({'width': ''});
        }
		
            windowWidth = windowWidthR;

        }


    });

})
function footerIni() {
    var footerCollapsed = $j('#footer-collapsed');
    var footerHeight = footerCollapsed.prop('scrollHeight'),
        footerStartHeight = 74,
        collapsedBlockN = footerCollapsed.find('.collapsed-block:visible').length,
        collapsedBlockW = 100 / collapsedBlockN - 1 + '%',
        slideSpeed = 500;

	
	if (footerCollapsed.hasClass('no-popup')) {
			footerCollapsed.css({'height': footerStartHeight});
			footerCollapsed.find('.collapsed-block').css({'width': ''});
		    footerCollapsed.addClass('open').removeClass('closed');
            footerCollapsed.find('.collapsed-block').animate({
                width: collapsedBlockW
            }, slideSpeed);
            footerHeight = footerCollapsed.prop('scrollHeight');
            setTimeout(function () {
                footerHeight = footerCollapsed.prop('scrollHeight');
                footerCollapsed.stop().animate({
                    height: footerHeight
                }, slideSpeed, function () {
                });
            }, 0)
		
		}
	else {
    footerCollapsed.css({'height': footerStartHeight}).removeClass('open').addClass('closed ini');
    footerCollapsed.find('.collapsed-block').css({'width': ''});
    footerCollapsed.find('.link').click(function (e) {
		footerCollapsed.addClass('blockHeader');
        e.preventDefault();
        if (footerCollapsed.hasClass('closed')) {
            footerCollapsed.addClass('open').removeClass('closed');
            footerCollapsed.find('.collapsed-block').animate({
                width: collapsedBlockW
            }, slideSpeed);
            footerHeight = footerCollapsed.prop('scrollHeight');
            setTimeout(function () {
                footerHeight = footerCollapsed.prop('scrollHeight');
                footerCollapsed.stop().animate({
                    height: footerHeight
                }, slideSpeed, function () {
                });
                $j("html, body").animate({
                    scrollTop: $j(document).height()
                }, slideSpeed);
            }, slideSpeed + 200)
        } else {
            footerCollapsed.removeClass('open').addClass('closed');
            footerCollapsed.find('.collapsed-block').each(function () {
                $j(this).stop(true, false).animate({
                    'width': $j(this).find('.inside').prop('scrollWidth')
                }, slideSpeed);
            })
            footerCollapsed.stop().animate({
                height: footerStartHeight
            }, slideSpeed, function () {
            });
        }
	setTimeout(function () {
		footerCollapsed.removeClass('blockHeader');
    }, slideSpeed*4)
    })}
}
function footerStick() {
	var windowH = $j(window).outerHeight();
	var contentH = $j('#outer').outerHeight();
	if (windowH > contentH) {
		$j('footer').css({'paddingTop':windowH-contentH +'px'});
	} else {$j('footer').css({'paddingTop':0});}
}
function slideHoverWidth() {
    var windowWidth = document.documentElement.clientWidth || document.body.clientWidth,
        w = $j(".container").outerWidth(),
        padLR = (windowWidth - w) / 2;

    $j('#hover-left').css({
        width: padLR,
        left: -padLR
    });
    $j('#hover-right').css({
        width: padLR + w * 2 / 3 + 1,
        right: -padLR
    });
}
function equalHeight(container) {
	
var currentTallest = 0,
     currentRowStart = 0,
     rowDivs = new Array(),
     $el,
     topPosition = 0;
 $j(container).each(function() {

   $el = $j(this);
   $j($el).height('auto')
   topPostion = $el.position().top;

   if (currentRowStart != topPostion) {
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
       rowDivs[currentDiv].height(currentTallest);
     }
     rowDivs.length = 0; // empty the array
     currentRowStart = topPostion;
     currentTallest = $el.height();
     rowDivs.push($el);
   } else {
     rowDivs.push($el);
     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
  }
   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
     rowDivs[currentDiv].height(currentTallest);
   }
 });
	

}

function carouselProductNoSpace() {
    var windowWidth = window.innerWidth || document.documentElement.clientWidth,
        containerWidth = $j(".container").width(),
        productInContainer = 5,
        productInRow = Math.ceil(windowWidth * productInContainer / containerWidth),
        productRowWidth = productInRow * 100 / productInContainer,
        productRowLeft = (productInRow - productInContainer) * 0.5 * 100 / productInContainer;

    var $showArrowMulti = false;
	
	$j('section.content .products-nospace-outer .products-nospace .slides').each(function () {
		jQuery(this).parent().parent().parent('section.content').hide();
	})
    $j('.products-nospace .slides').each(function () {

        var $jthis = jQuery(this);
        var countProduct = $jthis.find(".carousel-item").length;
        $jthis.unslick();
		if (countProduct > 0) { 
			$jthis.parent().parent().parent('section.content').show();	
		}
        if (countProduct <= 5) {
            productRowLeft = 0
        }
        $jthis.parent('.products-nospace').css({
            width: productRowWidth + '%',
            marginLeft: -productRowLeft + '%'
        });

        if (countProduct > 5) {
            $showArrowMulti = true;
            var cloneCount = Math.ceil((productInRow + 1) / countProduct) - 1;

            var productsToClone = $jthis.children();

            for (var i = 0; i < cloneCount; i++)
                productsToClone.clone().prependTo($jthis);
        }

        $jthis.slick({
            dots: false,
            infinite: true,
            arrows: false,
            speed: 300,
            slidesToShow: productInRow, // important, don't change
            slidesToScroll: 2,
            centerMode: false,
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    centerMode: false
                }
            }, {
                breakpoint: 769,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    centerMode: true
                }
            }, {
                breakpoint: 481,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    centerMode: true
                }
            }, {
                breakpoint: 321,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true
                }
            }]
        });
    })
    if ($showArrowMulti) {
        $j('#nextSlick').click(function (e) {
            $j(".products-nospace .slides").slickNext();
            e.preventDefault();
        })
        $j('#prevSlick').click(function (e) {
            $j(".products-nospace .slides").slickPrev();
            e.preventDefault();
        })

    } else {
        $j('.slick-arrows').hide().prev('.subtitle.right-space').removeClass('right-space')
    }

}
function carouselAccordionIni() {
    $j('.products-widget.vertical .slides').slick({
        dots: false,
        infinite: true,
        vertical: true,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 2000,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
		touchMove: false
    });
    $j('.blog-widget-small.vertical .slides').slick({
        dots: false,
        infinite: true,
        vertical: true,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 2000,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
		touchMove: false
    });
}

function horisontalAccordion() {
    var w = $j('#mobileAccord').width(),
        panelW = 35,
        slideSpeed = 300,
        panel = $j('#mobileAccord .accord-panel'),
        panelBut = $j("#mobileAccord .vertical_title_outer"),
        panelN = panel.length,
        openPanelW = w - (panelN - 1) * panelW;
	
	panelBut.unbind( "click" );
    panelBut.click(function () {
        $j('#mobileAccord').addClass('historyOpened');
		if ($j(this).parent().hasClass('open')) {
            $j(this).parent().removeClass('open').removeClass('historyOpen').addClass('closed').stop().animate({
                width: panelW
            }, slideSpeed);
        } else {
            $j('#mobileAccord .accord-panel').removeClass('open').removeClass('historyOpen').addClass('closed').stop().animate({
                width: panelW
            }, slideSpeed);
            $j(this).parent().removeClass('closed').addClass('open').addClass('historyOpen').stop().animate({
                width: openPanelW
            }, slideSpeed);
        }
    });
	
    panel.addClass('open').removeAttr("style");
    carouselAccordionIni()
    setTimeout(function () {
        panel.removeClass('open').addClass('closed').animate({
            width: panelW
        }, 0);
		panel.each(function () {
		if( $j(this).hasClass('historyOpen'))  {
			$j(this).removeClass('historyOpen').removeClass('closed').addClass('open').animate({
            width: openPanelW
        }, 0);		}
		});		
		if(!$j('#mobileAccord').hasClass('historyOpened'))		{
        $j('#mobileAccord .accord-panel:first-child').removeClass('closed').addClass('open').animate({
            width: openPanelW
        }, 0);
		}

    }, 100)
}


jQuery(function ($j) {
    "use strict";
    var footerExpander = $j('.expander');
    footerExpander.click(function (e) {
        var top = $j(this).offset().top - 50;
        $j("html, body").animate({scrollTop: top}, 500);
    });
});

jQuery(function ($j) {
    "use strict";
	// Android doesn't support autoplay
	var video = $j('.video-autoplay');
	var isAndroid = /(android)/i.test(navigator.userAgent);
	if(isAndroid) {
		video.hide();
	}
});

jQuery(function ($j) {

    function backgroundScroll(el, width, speed) {
        el.animate({'background-position': '-' + width + 'px'}, speed, 'linear', function () {
            el.css('background-position', '0');
            backgroundScroll(el, width, speed);
        });
    }
	var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)
	if (!isSafari){
		var scrollImageWidth = 1378;
		scrollSpeed = 4; 
		backgroundScroll($j('.no-touch .animate-bg'), scrollImageWidth, scrollSpeed * 10000);
	}
});

jQuery(function ($j) {
    "use strict";
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;


    if (windowWidth < 481) {
       horisontalAccordion();
    } else carouselAccordionIni();


	$j(window).resize(function () {
        var windowWidthR = window.innerWidth || document.documentElement.clientWidth;
        if ( windowWidthR != windowWidth) {
        clearTimeout(window.resizeEvt);
        window.resizeEvt = setTimeout(function () {
            var windowWidth = window.innerWidth || document.documentElement.clientWidth,
                panel = $j('#mobileAccord .accord-panel')
            if (windowWidth < 481) {
                horisontalAccordion();
            } else 
			 { panel.addClass('open').removeClass('close').removeClass('historyOpen').removeAttr("style");
			 $j('#mobileAccord').removeClass('historyOpened');}
        }, 500);
            windowWidth = windowWidthR;
        }    
    });
	
});

jQuery(function ($j) {
    "use strict";


    var duration = {
        searchShow: 200,
        searchHide: 200
    }

    $j('header .btn-search').click(function (e) {
        e.preventDefault();
		$j(this).fadeOut(duration.searchShow);
        if (!$j("#openSearch").hasClass('open')) {
            $j("#openSearch").stop(true, false).addClass('open').animate({
                height: 48
            }, duration.searchShow);
        } else {
            $j("#openSearch").stop(true, false).removeClass('open').animate({
                height: 0
            }, duration.searchHide);
        }
    })

    $j('#openSearch .search-close').click(function (e) {
		$j('header .btn-search').fadeIn(duration.searchHide);
        $j("#openSearch").stop(true, false).removeClass('open').animate({
            height: 0
        }, duration.searchHide);
    })

    var hiddenBut = $j('header .btn-group .dropdown-toggle')

    hiddenBut.click(function (e) {
        e.preventDefault();
        e.stopPropagation();
    });


});
(function () {
    var isBootstrapEvent = false;
    if (window.jQuery) {
        var all = jQuery('*');
        jQuery.each(['hide.bs.dropdown',
            'hide.bs.collapse',
            'hide.bs.modal',
            'hide.bs.tooltip'
        ], function (index, eventName) {
            all.on(eventName, function (event) {
                isBootstrapEvent = true;
            });
        });
    }
    var originalHide = Element.hide;
    Element.addMethods({
        hide: function (element) {
            if (isBootstrapEvent) {
                isBootstrapEvent = false;
                return element;
            }
            return originalHide(element);
        }
    });
})();
(function () {
    var viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]'),
        ua = navigator.userAgent,
        gestureStart = function () {
            viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6"
        },
        scaleFix = function () {
            if (viewportmeta && (/iPhone|iPad/.test(ua) && !/Opera Mini/.test(ua))) {
                viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
                document.addEventListener("gesturestart", gestureStart, false)
            }
        };
    scaleFix()
})();

jQuery(function ($j) {
    "use strict";
    var viewGrid = $j(".view-grid"),
        viewList = $j(".view-list"),
        productList = $j(".products-list");
    viewGrid.click(function (e) {
		viewGrid.addClass('active');
		viewList.removeClass('active');
        productList.removeClass("products-list-in-row").addClass("products-list-in-column");
        e.preventDefault()
    });
    viewList.click(function (e) {
		viewList.addClass('active');
		viewGrid.removeClass('active');
        productList.removeClass("products-list-in-column").addClass("products-list-in-row");
        e.preventDefault()
    })
});

jQuery(function ($j) {
    "use strict";
    var calculateProductsInRow = function (row) {
        $j(".product-view-ajax-container.temp").each(function () {
            $j(this).remove()
        });
        var productsInRow = 0;
        $j(row).children(".product-preview-outer").each(function () {
            if ($j(this).prev().length > 0) {
                if ($j(this).position().top != $j(this).prev().position().top) return false;
                productsInRow++
            } else productsInRow++
        });
        $j(row).children(":nth-child(" + productsInRow + "n)").after('<div class="product-view-ajax-container temp"></div>')
    };
    $j(".products-list").each(function () {
        calculateProductsInRow(this)
    });
	
	var windowWidth = window.innerWidth || document.documentElement.clientWidth;
	$j(window).resize(function () {
        var windowWidthR = window.innerWidth || document.documentElement.clientWidth;
        if ( windowWidthR != windowWidth) {
        $j(".products-list").each(function () {
            calculateProductsInRow(this)
        })
            windowWidth = windowWidthR;
        }    
    });
});


/* MENU */
jQuery(function ($j) {
    "use strict";
    var duration = {
            menuShow: 400,
            menuCompactShow: 800,
            menuShowShort: 700,
            menuSlide: 400,
            headerTransform: 400,
            switcherFade: 400
        },
        $jheader = $j("header .navbar"),
        $jwindow = $j(window),
        $jbackToTop = $j("header .back-to-top"),
        $jbody = $j("body"),
        $jswitcher = $j(".navbar-switcher", $jheader),
        $jmenu = $j(".navbar-main-menu", $jheader),
        $jmenuItems = $j(".item", $jmenu),
        $jmenuContainer = $j("<div id='menuScrollerWrapper'></div>"),
        $jmenuScrollerOuter = $j("<div class='container' style='overflow: hidden;'></div>"),
        $jmenuScroller = $j("<div style='overflow: hidden;' id='menuScroller'></div>"),
        $jmenuHeight = $j("header .navbar-compact"),
        menuHeightInner = $j("header .navbar-height-inner"),
        menuInner = $j("header .navbar-height-inner").length,
        $jmenuForSlide =
            $jmenuContainer.add($jmenuHeight),
        menuWidth = 0,
        menuActive = false,
        headerHeight = $jheader.outerHeight(),
        latent = $jwindow.scrollTop() >= headerHeight,
        positionHeader = false,
        active = false,
        activeDropHeight = false;

    var reculcPosHeader = function () {
        var headerCompact = false,
            menuShow = false;
        if (menuActive) {
            menuShow = true
        }
        if ($jheader.hasClass("navbar-compact")) {
            headerCompact = true;
            $jheader.removeClass("navbar-compact");
        }
        headerHeight = $jheader.outerHeight();
        positionHeader = 0;
        if (headerCompact) {
            $jheader.addClass("navbar-compact");
        }
        if (menuShow) $jmenuForSlide.show();
        if (parseInt($jheader.css("top")) < -1) {
            $jheader.animate({
                top: positionHeader + "px"
            }, duration.menuCompactShow, 'easeOutBack');
            $jbody.animate({
                'marginTop': headerHeight + "px"
            }, 0);
			if ($j('body').is(':hover')) {
				$j('html, body').animate({
				  scrollTop: $jwindow.scrollTop() + headerHeight
				}, 0);
			}
        }
    };
    if (latent) {
        $jheader.addClass("navbar-compact").animate({
            top: positionHeader + "px"
        }, duration.menuCompactShow, 'easeOutBack');
        $jbody.css({
            'marginTop': headerHeight + "px"
        });
    }

    $j(window).load(function () {
        reculcPosHeader();
    })

    $jbackToTop.click(function () {
        $j("html, body").animate({
            scrollTop: 0
        }, 400)
    });

    $j(window).resize(function () {
        reculcPosHeader();
    });

    var menuTimer;
    $jmenuItems.each(function () {
        var $jthis = $j(this),
            $jdropdown = $jthis.next("dd.item-content");
        if ($jdropdown.length) {
            var pos = menuWidth;
            menuWidth += 100;
            if ($jdropdown.hasClass('content-small')) {
                $jdropdown = $j("<div style='width: 50%; float: left;' class='dropdown-small dropdown dropdown" + pos * 0.01 + "'></div>").append($jdropdown.html());
            } else $jdropdown = $j("<div style='width: 50%; float: left;' class='dropdown dropdown" + pos * 0.01 + "'></div>").append($jdropdown.html());
            $jmenuScroller.append($jdropdown);
            $jthis.addClass("with-sub").mouseenter(function (e) {
                e.preventDefault();
                if (menuTimer) {
                    clearTimeout(menuTimer);
                }
                if (menuActive || menuActive === 0) {

                    if (menuActive !== pos) {
                        var posN = pos / 100;
                        menuActive = pos;

                        if (menuTimer) {
                            clearTimeout(menuTimer);
                        }
                        menuTimer = setTimeout(function () {
                            $jmenuItems.removeClass("active");
                            $jthis.addClass("active");
                            var posClass = '.dropdown' + posN;
                            $jmenuScroller.find('.dropdown').removeClass("active");
                            $jmenuScroller.find(posClass).addClass("active");
                            activeDropHeight = $jmenuScroller.find(posClass).height();
                            $jmenuScroller.css({
                                marginLeft: -pos + "%"
                            });
                            if ($jmenuScroller.find(posClass).hasClass('dropdown-small')) {
                                $j("#menuScrollerWrapper").addClass('color');
                                $j("#menuScrollerWrapper").stop().animate({
                                    height: activeDropHeight
                                }, duration.menuShowShort, function () {
                                    reculcPosHeader();
                                })
                            } else {
                                $j("#menuScrollerWrapper").removeClass('color');
                                $j("#menuScrollerWrapper").stop().animate({
                                    height: activeDropHeight
                                }, duration.menuShow, function () {
                                    reculcPosHeader();
                                })
                            }
                        }, 300);
                    }
                } else {
                    if (menuTimer) {
                        clearTimeout(menuTimer);
                    }
                    menuTimer = setTimeout(function () {

                        $jmenuScroller.css({
                            marginLeft: -pos + "%"
                        });
                        menuActive = pos;
                        $jmenuItems.removeClass("active");
                        $jthis.addClass("active");
                        var posN = pos / 100;
                        $j("#menuScrollerWrapper").css({
                            display: 'block'
                        });
                        $j("#menuScrollerWrapper").css({
                            "height": '0'
                        });
                        var posClass = '.dropdown' + posN;
                        $jmenuScroller.find('.dropdown').removeClass("active");
                        $jmenuScroller.find(posClass).addClass("active");
                        activeDropHeight = $jmenuScroller.find(posClass).height();
                        if (activeDropHeight == 0) {
                            activeDropHeight = $jmenuScroller.parent().css({
                                display: 'block'
                            }).find(posClass).height();
                            $jmenuScroller.parent().css({
                                display: 'none'
                            });
                        }

                        if ($jmenuScroller.find(posClass).hasClass('dropdown-small')) {
                            $j("#menuScrollerWrapper").addClass('color')
                        } else $j("#menuScrollerWrapper").removeClass('color');
                        $j("#menuScrollerWrapper").stop(false, false).animate({
                            height: activeDropHeight
                        }, duration.menuShow, function () {
                            reculcPosHeader();
                        });
                    }, 300);

                }
            }).mouseleave(function (e) {
                if (menuTimer) {
                    clearTimeout(menuTimer);
                }
                menuTimer = setTimeout(function () {
                    $jmenuItems.removeClass("active");
                    $jmenuScroller.find('.dropdown').removeClass("active");
                    $j("#menuScrollerWrapper").stop(false, false).animate({
                        height: 0
                    }, duration.menuShow, function () {
                        reculcPosHeader();
                    });
                    menuActive = false;
                }, 300);
            });
        }
    });
    $jmenuScroller.mouseenter(function (e) {
        if (menuTimer) {
            clearTimeout(menuTimer);
        }
    })
        .mouseleave(function (e) {
            if (menuTimer) {
                clearTimeout(menuTimer);
            }
            menuTimer = setTimeout(function () {
                $jmenuItems.removeClass("active");
                $j("#menuScrollerWrapper").stop().animate({
                    height: 0
                }, duration.menuShow, function () {
                    reculcPosHeader();
                });
                menuActive = false;
            }, 300);
        });

    $jmenuScroller.css("width", menuWidth + "%");
    $jmenuScroller.children("div").css("width", 100 / (menuWidth / 100) + "%");
    $j('.navbar .background').append($jmenuContainer.append($jmenuScrollerOuter.append($jmenuScroller)));
    $jmenuHeight.css({
        height: $jmenuContainer.height() + (menuInner ? 0 : headerHeight - 14) + "px",
        display: "none"
    });
    $jwindow.scroll(function () {
        if (!latent && $jwindow.scrollTop() >= headerHeight) {
		if ( !$j('#footer-collapsed').hasClass('blockHeader')){    
			menuActive = false;
            $jbackToTop.stop().fadeIn(300);
			if ($j('html').hasClass('no-touch')){
			$jheader.addClass("navbar-compact");
            reculcPosHeader();
            $jheader.stop().animate({
                top: positionHeader + "px"
            }, duration.menuCompactShow, 'easeOutBack');}
            latent = true;
		}
      } else if (latent && $jwindow.scrollTop() < headerHeight) {
        if ($j('html').hasClass('no-touch')){
		  	$jheader.stop().css("top", "").removeClass("navbar-compact");
            $jbody.css("marginTop", "")
		  }
            $jbackToTop.stop().fadeOut(300);
            active = false;
            latent = false; 
      }
    });

    var $jmenuClose = $j('.megamenuClose');
    $jmenuClose.on("click", function (e) {
        if (menuTimer) {
            clearTimeout(menuTimer);
        }
        menuTimer = setTimeout(function () {
            $jmenuItems.removeClass("active");
            $j("#menuScrollerWrapper").stop().animate({
                height: 0
            }, duration.menuShow, function () {
                reculcPosHeader();
            });
            menuActive = false;
        }, 300);
    })

});

jQuery(function ($j) {
    "use strict";
    $j(".social-widgets .item").each(function () {
        var $jthis = $j(this),
            timer;
        $jthis.on("mouseenter", function () {
            var $jthis = $j(this);
            if (timer) clearTimeout(timer);
            timer = setTimeout(function () {
                $jthis.addClass("active")
            }, 200)
        }).on("mouseleave", function () {
            var $jthis = $j(this);
            if (timer) clearTimeout(timer);
            timer = setTimeout(function () {
                $jthis.removeClass("active")
            }, 100)
        }).on("click", function (e) {
            e.preventDefault()
        })
    })
});
jQuery(function ($j) {
    "use strict";
    $j(".live-chat").each(function () {
        var $jthis = $j(this),
            timer;
        $jthis.on("mouseenter", function () {
            var $jthis = $j(this);
            if (timer) clearTimeout(timer);
            timer = setTimeout(function () {
                $jthis.addClass("active")
            }, 200)
        }).on("mouseleave", function () {
            var $jthis = $j(this);
            if (timer) clearTimeout(timer);
            timer = setTimeout(function () {
                $jthis.removeClass("active")
            }, 100)
        }).on("click", function (e) {
            e.preventDefault()
        })
    })
});
jQuery(function ($j) {
    "use strict";
    var $jsliderRange = $j(".slider-range");
    if ($jsliderRange.length > 0) {
        $jsliderRange.noUiSlider({
            start: [0, 320],
            connect: true,
            range: {
                'min': 0,
                'max': 400
            }
        });

        $jsliderRange.Link('lower').to($j("#value-lower"));

        $jsliderRange.Link('upper').to($j("#value-upper"));
    }
});
jQuery(function ($j) {
    "use strict";
    $j(".expander-list").find("ul").hide().end().find(" .expander").text("+").end().find(".active").each(function () {
        $j(this).parents("li ").each(function () {
            var $jthis = $j(this),
                $jul = $jthis.find("> ul"),
                $jname = $jthis.find("> .name a"),
                $jexpander = $jthis.find("> .name .expander");
            $jul.show();
            $jname.css("font-weight", "bold");
            $jexpander.html("&minus;")
        })
    }).end().find(" .expander").each(function () {
        var $jthis = $j(this),
            hide = $jthis.text() === "+",
            $jul = $jthis.parent(".name").next("ul"),
            $jname = $jthis.next("a");
        $jthis.click(function () {
            if ($jul.css("display") ==
                "block") $jul.slideUp("slow");
            else $jul.slideDown("slow");
            $j(this).html(hide ? "&minus;" : "+");
            $jname.css("font-weight", hide ? "bold" : "normal");
            hide = !hide
        })
    })
});
jQuery(function ($j) {
    "use strict";
    $j(".collapsed-block .expander").click(function (e) {
        var collapse_content_selector = $j(this).attr("href");
        var expander = $j(this);
        if (!$j(collapse_content_selector).hasClass("open")) expander.addClass("open").html("&minus;");
        else expander.removeClass("open").html("+");
        if (!$j(collapse_content_selector).hasClass("open")) $j(collapse_content_selector).addClass("open").slideDown("normal");
        else $j(collapse_content_selector).removeClass("open").slideUp("normal");
        e.preventDefault()
    })
});

jQuery(function ($j) {
    "use strict";
    if ($j(".no-touch .cloudzoom").length) {
        CloudZoom.quickStart();
    }
});
jQuery(function ($j) {
    "use strict";

    carouselProductNoSpace();

    var $jmainContainer = $j(".container"),
        $jsection = $j(".products-list"),
        $jlinks = $j(".quick-view:not(.fancybox)"),
        $jview = $j(".product-view-ajax"),
        $jcontainer = $j(".product-view-container", $jview),
        $jloader = $j(".ajax-loader", $jview),
        $jlayar = $j(".layar", $jview),
        $jslider;
    var initProductView = function ($jproductView) {
        var $jclose = $j(".close-view", $jproductView);
        $jclose.click(function (e) {
            e.preventDefault();
            $jcontainer.slideUp(500, function () {
                $jcontainer.empty();
                $jview.hide();
                $jcontainer.show()
            })
            setTimeout(function () {
                $j('html, body').animate({
                    scrollTop: $j(".product-preview.active").offset().top - 70
                }, 500, function () {
                    $j(".product-preview.active").removeClass('active');
                });
            }, 500)
        })
    };
    $jlinks.click(function (e) {
        if ($j(".hidden-xs").is(":visible")) {
            e.preventDefault();
            var $jthis = $j(this),
                url = $jthis.attr("href");
            $jthis.closest(".product-preview").addClass('active');
            if ($jthis.closest(".product-carousel").length > 0) {
                $jthis.closest(".product-carousel").next(".product-view-ajax-container").first().append($jview);
            }
            else if ($jthis.closest(".products-nospace-outer.products-list").length > 0) {
                $jthis.closest(".listing-row").nextAll('.product-view-ajax-container:first').append($jview);
            }
            else if ($jthis.closest(".products-list").length > 0) {
                $jthis.closest(".product-preview-outer").nextAll('.product-view-ajax-container:first').append($jview);
            }
            else if ($jthis.closest(".products-nospace-outer").length > 0) {
                $jthis.closest(".products-nospace-outer").nextAll('.product-view-ajax-container:first').append($jview);
            }
            else {
                $jthis.parent().parent().nextAll('.product-view-ajax-container:first').append($jview);
            }
            $jview.show();
            $jlayar.show();
            $jloader.show();
            $j('html, body').animate({
                scrollTop: $jthis.closest(".product-preview").offset().top
            }, 500);
            setTimeout(function () {
                $j.ajax({
                    url: url,
                    cache: false,
                    success: function (data) {
                        var $jdata = $j(data);
                        initProductView($jdata);
                        $jloader.hide();
                        $jlayar.hide();
                        if (!$jcontainer.text()) {
                            $jdata.hide();
                            $jcontainer.empty().append($jdata);
                            $jdata.slideDown(500)
                        } else $jcontainer.empty().append($jdata)
                    },
                    complete: function () {
                        console.log("ajax complete");
                        $j('html, body').animate({
                            scrollTop: $jview.offset().top - 100
                        }, 500);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $jloader.hide();
                        $jcontainer.html(textStatus)
                    }
                })

            }, 1000);
        }
    });
    initProductView();

    var productCarousel = $j(".product-carousel");

    productCarousel.slick({
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        responsive: [{
            breakpoint: 1199,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5
            }
        }, 
		{
            breakpoint: 992,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        }, {
            breakpoint: 769,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        }, {
            breakpoint: 481,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 321,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });


    $j(".single-product-carousel").slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.slider-nav',
        responsive: [{
            breakpoint: 481,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false
            }
        }, {
            breakpoint: 321,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false
            }
        }]
    })

    $j('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.single-product-carousel',
        speed: 300,
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true,
        responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: false
            }

        }]
    });

    $j(".single-product").slick({
        dots: false,
        infinite: true,
        speed: 300,
		fade: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.slider-nav-simple',
        responsive: [{
            breakpoint: 481,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false
            }
        }, {
            breakpoint: 321,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false
            }
        }]
    })

    $j('.slider-nav-simple').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.single-product',
        speed: 300,
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true,
        responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: false
            }

        }]
    });


    $j('.testimonials-widget .slides').slick({
        dots: false,
        infinite: false,
        vertical: true,
        arrows: true,
        autoplay: false,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 1,
		touchMove: false
        //variableWidth: true
    });

	
    $j(".circle_banners .row").slick({
        dots: false,
        infinite: false,
		draggable: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 769,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
				arrows: false,
				draggable: true
            }
        }
		]
    });

    $j(".blog-widget .slides").slick({
        dots: false,
        infinite: false,
		draggable: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 769,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 681,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 321,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });

    //	category banner  carousel

    var categoryCarousel = $j('.category-slider');
    categoryCarousel.slick({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    });


    //	news carousel

    var newsCarousel = $j('#newsCarousel');
    newsCarousel.slick({
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    //	news marquee
    $j('#newsCarousel .marquee').liMarquee();

    $j(".blog-widget .slides button").hover(function () {
        $j(this).parent().find(".slick-list").toggleClass('nav-hover')
    });


    var brandsCarousel = $j(".brands-carousel .slides");

    brandsCarousel.slick({
        dots: false,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 2000,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 4
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 3
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2
            }
        }]
    });

    $j('.slick-slider').each(function () {
        var $jthis = $j(this);
        if (!$jthis.find('button').length) {
			console.log('no');
           $jthis.parent().prev('.right-space').addClass('no-right-space');
           $jthis.parent().prev().prev('.right-space').addClass('no-right-space');
        }
    })
	
		var windowWidth = window.innerWidth || document.documentElement.clientWidth;	
		$j(window).resize(function () {
        var windowWidthR = window.innerWidth || document.documentElement.clientWidth;
        if ( windowWidthR != windowWidth) {
        clearTimeout(window.resizeEvt);
        window.resizeEvt = setTimeout(function () {
			$j('.slick-slider').each(function () {
				var $jthis = $j(this);
				if (!$jthis.find('button').length) {
					console.log('no');
					$jthis.parent().prev('.right-space').addClass('no-right-space');
					$jthis.parent().prev().prev('.right-space').addClass('no-right-space');
				} else {
					console.log('yes');
					$jthis.parent().prev('.right-space').removeClass('no-right-space');
					$jthis.parent().prev().prev('.right-space').removeClass('no-right-space');
				}
			})
        }, 500);
            windowWidth = windowWidthR;
        }    
    });	
});

$j(window).load(function () {
	
    var loadcontainer = $j('.facebook-widget').find(".loading");
        $j.ajax({
        url: $j('.facebook-widget a').attr("href"),
        cache: false,
        success: function (data) {
        setTimeout(function () {
            loadcontainer.html(data)
			}, 1000)
		}
    });

    slideHoverWidth();
	
	equalHeight('.rect-equal-height');
	
	setTimeout(function() {
	 if ($j('#popup-box').length) {
	   $j.magnificPopup.open({
		items: {
			src: '#popup-box' 
		},
		mainClass: 'mfp-fade',
		closeBtnInside:true,
		closeMarkup: '<button title="%title%" class="mfp-close">&times;</button>',
		type: 'inline'
		  });
	   }
	 }, 1000);

    $j('#menuScrollerWrapper').css({
        display: 'block'
    });
    $j('.header-product-carousel').slick({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    $j('#menuScrollerWrapper').css({
        display: 'none'
    });


    $j("body").width($j("body").width() + 1).width("auto");

    var windowWidth = window.innerWidth || document.documentElement.clientWidth;
    var animate = $j(".animate");
    var animateDelay = $j(".animate-delay-outer");
    var animateDelayItem = $j(".animate-delay");
    if (windowWidth > 767) {
        animate.bind("inview", function (event, visible) {
            if (visible && !$j(this).hasClass("animated")) $j(this).addClass("animated")
        });
        animateDelay.bind("inview", function (event, visible) {
            if (visible && !$j(this).hasClass("animated")) {
                var j = -1;
                var $jthis = $j(this).find(".animate-delay");
                $jthis.each(function () {
                    var $jthis = jQuery(this);
                    j++;
                    setTimeout(function () {
                        $jthis.addClass("animated")
                    }, 200 * j)
                });
                $j(this).addClass("animated")
            }
        })
    } else {
        animate.each(function () {
            $j(this).removeClass("animate")
        });
        animateDelayItem.each(function () {
            $j(this).removeClass("animate-delay")
        })
    }

    var counter = $j(".counter")

    if (counter.length > 0) {
        $j('.counter').countTo();
    }

    var tabsLeftTabs = $j(".responsive .tabs-left .nav-tabs"),
        tabsLeftContent = $j('.responsive .tabs-left .tab-content');

    if (tabsLeftContent.length > 0) {
        tabsLeftContent.css({
            'min-height': tabsLeftTabs.height() - 3
        });
    }


    $j(".preview.hover-slide .preview-image").each(function () {
        var imageHeight = $j(this).find("img").height();
        $j(this).css({
            "height": imageHeight
        })
    });
    $j("body > .loader").fadeOut("slow");
    if ($j(".no-touch .parallax").length > 0) $j(".no-touch .parallax").parallax({
        speed: 0,
        axis: "y"
    });

/*var $jisotop = $j(".products-nospace.products-isotope")
if ($jisotop.length) {
        $jisotop.isotope({
            itemSelector: ".product-preview,.banner",
			masonry: {
			  columnWidth: function() {
				// 5 columns
				return this.size.innerWidth / 5;
			  }
			}
        });}

*/
    var $jisotop = $j(".products-isotope")
    if ($jisotop.length) {
	if($jisotop.children().length == 0) { 
		$jisotop.parent().parent('section.content').hide();
	}
	else { 
		// add columnWidth function to Masonry
		var MasonryMode = Isotope.LayoutMode.modes.masonry;
		MasonryMode.prototype._getMeasurement = function( measurement, size ) {
		  var option = this.options[ measurement ];
		  var elem;
		  if ( !option ) {
			// default to 0
			this[ measurement ] = 0;
		  } else if ( typeof option === 'function' ) {
			this[ measurement ] = option.call( this );
		  } else {
			// use option as an element
			if ( typeof option === 'string' ) {
			  elem = this.element.querySelector( option );
			} else if ( isElement( option ) ) {
			  elem = option;
			}
			// use size of element, if element
			this[ measurement ] = elem ? getSize( elem )[ size ] : option;
		  }
		};
			
			$jisotop.isotope({
				itemSelector: ".product-preview,.banner,.item",
				masonry: {
				  columnWidth: function() {
					return this.size.innerWidth / 60;
				  }
				}
			});
			var $optionSets = $j(".filters-by-category .option-set"),
				$optionLinks = $optionSets.find("a");
			$optionLinks.click(function () {
				var $this = $j(this);
				if ($this.hasClass("selected")) return false;
				var $optionSet = $this.parents(".option-set");
				$optionSet.find(".selected").removeClass("selected");
				$this.addClass("selected");
				var options = {},
					key = $optionSet.attr("data-option-key"),
					value = $this.attr("data-option-value");
				value = value === "false" ? false : value;
				options[key] = value;
				if (key === "layoutMode" && typeof changeLayoutMode === "function") changeLayoutMode($this, options);
				else $jisotop.isotope(options);
				return false
			})
		}
	 }

	var $jisotopPost = $j(".blog-posts")
    if ($jisotopPost.length) {
        $jisotopPost.isotope({
            itemSelector: ".blog-post"
        });
        var $optionSets = $j(".filters-by-category .option-set"),
            $optionLinks = $optionSets.find("a");
        $optionLinks.click(function () {
            var $this = $j(this);
            if ($this.hasClass("selected")) return false;
            var $optionSet = $this.parents(".option-set");
            $optionSet.find(".selected").removeClass("selected");
            $this.addClass("selected");
            var options = {},
                key = $optionSet.attr("data-option-key"),
                value = $this.attr("data-option-value");
            value = value === "false" ? false : value;
            options[key] = value;
            if (key === "layoutMode" && typeof changeLayoutMode === "function") changeLayoutMode($this, options);
            else $jisotopPost.isotope(options);
            return false
        })

    }
		$j('.marina .product-preview .preview-image, .marina .products-widget .preview-image, .marina .blog-widget-small .preview-image, .marina .single-product-wrapper, .marina .elevatezoom-gallery, .marina .video-link .img-outer').each(function() {
			$j(this).height($j(this).width());
		});
		
	footerStick();
	

	if ($j(".product-images-cell").length){
		 var productViewHeight =  $j(".product-images-cell").height();
		 $j(".product-view").css({'min-height': productViewHeight+'px'});
	}

	var windowWidth = window.innerWidth || document.documentElement.clientWidth;
	$j(window).resize(function () {
		footerStick();
        var windowWidthR = window.innerWidth || document.documentElement.clientWidth;
        if ( windowWidthR != windowWidth) {
			$j('.marina .product-preview .preview-image, .marina .products-widget .preview-image, .marina .blog-widget-small .preview-image, .marina .single-product-wrapper, .marina .elevatezoom-gallery, .marina .video-link .img-outer').each(function() {
				$j(this).height($j(this).width());
			});
			carouselProductNoSpace();
			slideHoverWidth();
			if ($j("#popup-box").length > 0 && $j("#colorbox").is(":visible")) {
				$j.colorbox({inline: true, href: "#popup-box", preloading: false, fixed: true, opacity: 0.75});
			}
			setTimeout(function () {
				if ($j(".product-images-cell").length){
					$j(".product-view").css({'min-height': 0 });
					var productViewHeight =  $j(".product-images-cell").height();
					$j(".product-view").css({'min-height': productViewHeight+'px'});
				}		
			}, 500)
            windowWidth = windowWidthR;
        } 
    });	
});