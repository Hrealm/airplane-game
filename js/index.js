/* header */
(function () {
    var $buy = $('#header .h_m_r_buy');
    var $buyA = $buy.find('a.buy');
    var $buyHide = $buy.find('.hide');
    $buy.hover(function(){
        $buyA.addClass('hover');
        $buyHide.stop().slideDown(300);
    },function () {
        $buyHide.stop().slideUp(300,function () {
            $buyA.removeClass('hover');
        });
    })
})();
/* nav hide */
(function () {
    var $product = $('#nav .n_main .n_main_middle .product');
    var $hide = $('#nav .n_main_hide');
    var $hideUl = $('#nav .n_main_hide .n_m_h_main ul');
    $product.hover(function () {
        $hide.stop().slideDown();
        $hideUl.eq($(this).index()).show().siblings().hide();  //siblings()用于查找当前元素的同胞元素，就是拿到当前元素的兄弟节点(不包括自己)。
    },function () {
        $hide.stop().slideUp();
    });
    $hide.hover(function () {
        $(this).stop().slideDown();
    },function () {
        $hide.stop().slideUp();
    })
})();
/* nav-search */
(function () {
    var $input = $('#nav .n_main .n_main_right .n_m_r_searchForm .n_m_r_search');
    var $searchLine = $('#nav .n_main .n_main_right .n_m_r_searchForm .search');
    var $searchHide = $('#nav .n_main .n_main_right .n_m_r_searchForm .searchHide');
    // $input.focus(function () {
    //     $searchLine.addClass('focus');
    //     $searchHide.show();
    // }).blur(function () {
    //     $searchLine.removeClass('focus');
    //     // $searchHide.hide(100);
    // });
    $input.on("focus blur",function () {
        $searchLine.toggleClass('focus');
        $searchHide.fadeToggle(100);
    })
})();
/* banner-main */
(function () {
    var $main = $('#banner .b_main');
    var $pic = $('#banner .b_main .b_m_pic li');
    var $tab = $('#banner .b_main .b_m_tab li');
    var $nextBtn = $('#banner .b_main .b_m_btn .nextBtn');
    var timer = null;
    var length = $pic.length;
    var index = 0;
    var nowTime = 0;
    $pic.eq(0).show();
    $tab.eq(0).addClass('on');
    $tab.click(function () {
        if (new Date() - nowTime > 800 &&  index !== $(this).index()) {
            nowTime = new Date();
            animation(function () {
                index = $(this).index();
            }.bind(this));
        }
    });
    $tab.hover(function () {
        $(this).addClass("on");
    },function () {
        if (index !== $(this).index())$(this).removeClass("on");
    });
    $nextBtn.click(function () {
        if (new Date() - nowTime > 800) {
            nowTime = new Date();
            var i = $(this).index();
            animation(function () {
                if ( i ){
                    index++;
                    index %= length;
                }else {
                    index--;
                    if (index < 0) index = length - 1;
                }
            });
        }
    });
    $main.hover(function () {clearInterval(timer)},auto);
    auto();
    function auto() {
        timer = setInterval(function () {
            animation(function () {
                index++;
                index %= length;
            });
        },5000);
    }
    function animation(fn) {
        $pic.eq(index).fadeOut(800);
        $tab.eq(index).removeClass('on');
        fn();
        $pic.eq(index).fadeIn(800);
        $tab.eq(index).addClass('on');
    }
})();
/* content */
(function () {
    var $aTab = $('#content #c_appliance .c_a_title div ul li');
    var $aUl = $('#c_appliance .c_a_main .c_a_m_right ul');
    var $sTab = $('#content #c_smart .c_s_title div ul li');
    var $sUl = $('#c_smart .c_s_main .c_s_m_right ul');
    fn($aUl,$aTab);
    fn($sUl,$sTab);
    function fn($ul,$tab) {
        $ul.eq(0).show().siblings().hide();
        $tab.eq(0).addClass('hover');
        $tab.mouseenter(function () {
            $(this).addClass('hover').siblings().removeClass('hover');
            $ul.eq($(this).index()).show().siblings().hide();
        })
    }
})();
(function () {
    var $sBtn = $('#content #recommend .c_r_title .c_r_t_btn span');
    var $ul = $('#content #recommend .c_r_main ul');
    var index = 0;
    var index2 = 1;
    var flag = true;
    var flag2 = false;

    $sBtn.click(function () {
        var i = $(this).index();
        if (i === 1 && flag){
            index++;
            if (index === 1) {
                $sBtn.eq(0).addClass('able');
                animate(index);
                flag2 = true;
                index2 = 0;
            }
            if (index === 2) {
                animate(index);
                $(this).removeClass('able');
                index = 0;
                index2 = 1;
                flag = false;
            }
        }
        if (i === 0 && flag2) {
            if (!index2) {
                animate(index2);
                index = 0;
                $(this).removeClass('able');
                flag2 = false;
            }else{
                animate(index2);
                $sBtn.eq(1).addClass('able');
                index2 = 0;
                index = 1;
                flag = true;
            }
        }
        function animate(index) {
            $ul.stop().animate({
                marginLeft: -index * 1240 + 'px'
            }, 500);
        }
    });

})();

