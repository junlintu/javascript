//焦点图切换效果 
/*
imgsCon  //运动元素的id或class
iconsCon  //包含按钮的元素的id或class
prevIcon  //向前按钮的元素的id或class
nextIcon   //向后按钮的元素的id或class
chooseIcon   //按钮被选择时增加或删除的class  默认是on     
focusNum  //包含显示当前第几页的元素的id或class
moveTime  //动画运动时间  默认800毫秒
delayTime  //动画延迟时间  默认5000毫秒
isAuto  //是否自动轮换  默认不自动
isCycle  //是否运动到头继续循环  默认不循环
isSingleImg // 是单图刷的轮换还是多图刷刷刷的轮换 默认是刷刷刷的轮换
direction //运动方向 默认是水平运动
step //每次轮的步数 默认是1
imgDescDom //用于存放图片描述信息的id或class
cannotClickClass //左右不能点击时加的class 默认加end
beginPos //适用于起始位置不是left 0 的运动 默认是0
*/
function autoMove(options) {
    var $imgs_c = jq(options.imgsCon),
        $icons_c = jq(options.imgsCon).parent().parent().find(options.iconsCon),
        $imgs = $imgs_c.children(),
        $icons = $icons_c.children(),
        iconsTagName = $icons.eq(0).get(0) ? $icons.eq(0).get(0).tagName.toLowerCase() : 'li',
        $imgDescDom = jq(options.imgDescDom),
        $prevIcon = jq(options.imgsCon).parent().parent().find(options.prevIcon),
        $nextIcon = jq(options.imgsCon).parent().parent().find(options.nextIcon),
        chooseIcon = options.chooseIcon ? options.chooseIcon : 'on',
        step = options.step ? options.step : 1,
        cannotClickClass = options.cannotClickClass || 'end',
        moveTime = options.moveTime ? options.moveTime : 800,
        delayTime = options.delayTime ? options.delayTime : 5000,
        isSingleImg = options.isSingleImg ? options.isSingleImg : false, //是否是单图刷的轮换，默认是刷刷刷的轮换
        isAuto = options.isAuto ? options.isAuto : false,
        isCycle = options.isCycle ? options.isCycle : false,
        directionData = {},
        direction = options.direction ? options.direction : 'left',
        moveDistance = direction === 'left' ? $imgs.eq(0).outerWidth(true) : $imgs.eq(0).outerHeight(true),
        beginPos = options.beginPos ? options.beginPos : 0,
        $focusNum,
        page = 0,
        moveTimer = null,
        showImgLen = $imgs.length,
        move,
        opacity;

    if (options.focusNum) {
        $focusNum = jq(options.focusNum);
    }

    if (showImgLen === step) {
        $prevIcon.addClass(cannotClickClass);
        $nextIcon.addClass(cannotClickClass);
        return;
    } else if (step == 1 && isCycle && !isSingleImg) {
        $imgs_c.append($imgs.eq(0).clone(true));
        if (direction === 'left') {
            $imgs_c.width(moveDistance * (showImgLen + 1));
        }
    } else if (!isSingleImg) {
        if (direction === 'left') {
            $imgs_c.width(moveDistance * showImgLen);
        }
    } else if (isSingleImg) {
        $imgs.eq(0).css(direction, '0px');
    }
    move = function() {
        window.clearTimeout(moveTimer);
        moveDistance = direction === 'left' ? $imgs.eq(0).outerWidth(true) : $imgs.eq(0).outerHeight(true);
        $imgs.eq(page).siblings().css(direction, moveDistance);
        if (!$imgs_c.is(':animated') && !isSingleImg) {
            page++;
            if (page === Math.ceil(showImgLen / step) && isCycle) {
                if ($focusNum) {
                    $focusNum.html(1);
                }
                $icons_c.children().eq(0).addClass(chooseIcon).siblings().removeClass(chooseIcon);
                directionData[direction] = beginPos - moveDistance * step * page;
                $imgs_c.stop().animate(directionData, moveTime, function() {
                    $imgs_c.css(direction, beginPos + 'px');
                    page = 0;
                    if (options.callback) {
                        options.callback(page);
                    }
                    if (isAuto) {
                        moveTimer = window.setTimeout(move, delayTime);
                    }
                });
            } else if (page === Math.ceil(showImgLen / step) && !isCycle) {
                page--;
                return;
            } else {
                if ($focusNum) {
                    $focusNum.html(page + 1);
                }
                directionData[direction] = beginPos - moveDistance * step * page;
                $imgs_c.stop().animate(directionData, moveTime, function() {
                    if (options.callback) {
                        options.callback(page);
                    }
                    if (page + 1 === Math.ceil(showImgLen / step) && !isCycle) {
                        $nextIcon.addClass(cannotClickClass);
                    }
                });
                $icons_c.children().eq(page).addClass(chooseIcon).siblings().removeClass(chooseIcon);
                if (isAuto) {
                    moveTimer = window.setTimeout(move, delayTime);
                }
            }
        } else if (!$imgs.eq(page).is(':animated') && isSingleImg) {
            page++;
            if (page === showImgLen) {
                page = 0;
                directionData[direction] = beginPos - moveDistance;
                $imgs.eq(showImgLen - 1).stop().animate(directionData, moveTime);
            } else {
                directionData[direction] = beginPos - moveDistance;
                $imgs.eq(page - 1).stop().animate(directionData, moveTime);
            }
            directionData[direction] = beginPos;
            $imgs.eq(page).css(direction, moveDistance).stop().animate(directionData, moveTime);
            $icons_c.children().eq(page).addClass(chooseIcon).siblings().removeClass(chooseIcon);
            if (isAuto) {
                moveTimer = window.setTimeout(move, delayTime);
            }
        }

    };
        $imgs_c.on('mouseenter', function(e) {
            window.clearTimeout(moveTimer);
        });

        $imgs_c.on('mouseleave', function(e) {
            if (isAuto) {
                moveTimer = direction==='opacity'? window.setTimeout(opacity, delayTime):window.setTimeout(move, delayTime);
            }
        });

        $icons_c.delegate(iconsTagName, 'mouseover', function(e) {
            window.clearTimeout(moveTimer);
            if (!isSingleImg) {
                page = jq(e.target).index();
                if ($focusNum) {
                    $focusNum.html(page + 1);
                }
                directionData[direction] = beginPos - moveDistance * step * page;
                $imgs_c.stop().animate(directionData, moveTime, function() {
                    if (options.callback) {
                        options.callback(page);
                    }
                });
                jq(e.target).addClass(chooseIcon).siblings().removeClass(chooseIcon);
            } else if (isSingleImg && jq(e.target).index() !== page) {
                if (page > jq(e.target).index()) { //点顺序小于当前的按钮
                    // $imgs.eq(jq(e.target).index()).css(direction, beginPos - moveDistance);
                    directionData[direction] = moveDistance - beginPos;
                    $imgs.eq(page).stop(false, true).animate(directionData, moveTime);
                    page = jq(e.target).index();
                    directionData[direction] = beginPos;
                    $imgs.eq(page).stop().animate(directionData, moveTime);
                    jq(e.target).addClass(chooseIcon).siblings().removeClass(chooseIcon);
                } else {
                    directionData[direction] = beginPos - moveDistance;
                    $imgs.eq(page).stop(false, true).animate(directionData, moveTime);
                    page = jq(e.target).index();
                    directionData[direction] = beginPos;
                    $imgs.eq(page).css(direction, moveDistance).stop().animate(directionData, moveTime);
                    jq(e.target).addClass(chooseIcon).siblings().removeClass(chooseIcon);
                }
            }
        });

        $icons_c.delegate(iconsTagName, 'mouseout', function(e) {
            if (isAuto) {
                moveTimer = window.setTimeout(move, delayTime);
            }
        });

        $prevIcon.click(function() {
            jq(this).next().removeClass(cannotClickClass); //$nextIcon
            if (page === 0 && !isCycle && !isSingleImg) {
                return;
            } else {
                window.clearTimeout(moveTimer);
                if (!$imgs_c.is(':animated') && !isSingleImg) {
                    page--;
                    if (page === -1) {
                        $imgs_c.css(direction, beginPos - moveDistance * step * showImgLen + 'px');
                        page = showImgLen - 1;
                    }
                    if ($focusNum) {
                        $focusNum.html(page + 1);
                    }
                    directionData[direction] = beginPos - moveDistance * step * page;
                    $imgs_c.stop().animate(directionData, moveTime, function() {
                        if (options.callback) {
                            options.callback(page);
                        }
                        if (page === 0 && !isCycle) {
                            $prevIcon.addClass(cannotClickClass);
                        }
                    });
                    $icons_c.children().eq(page).addClass(chooseIcon).siblings().removeClass(chooseIcon);
                    if (isAuto) {
                        moveTimer = window.setTimeout(move, delayTime);
                    }
                } else if (!$imgs.eq(page).is(':animated') && isSingleImg) {
                    page--;
                    if (page === -1) {
                        page = showImgLen - 1;
                        $imgs.eq(page).css(direction, beginPos - moveDistance);
                        directionData[direction] = moveDistance - beginPos;
                        $imgs.eq(0).stop(false, true).animate(directionData, moveTime);
                    } else {
                        $imgs.eq(page).css(direction, beginPos - moveDistance);
                        directionData[direction] = moveDistance - beginPos;
                        $imgs.eq(page + 1).stop(false, true).animate(directionData, moveTime);
                    }
                    directionData[direction] = beginPos;
                    $imgs.eq(page).stop().animate(directionData, moveTime);
                    $icons_c.children().eq(page).addClass(chooseIcon).siblings().removeClass(chooseIcon);
                    if (isAuto) {
                        moveTimer = window.setTimeout(move, delayTime);
                    }
                }
            }
        });

        $nextIcon.click(function() {
            jq(this).prev().removeClass(cannotClickClass); //$prevIcon
            if (page === showImgLen - 1 && !isCycle && !isSingleImg) {
                return;
            } else {
                move();
            }
        });
    opacity = function() {
        window.clearTimeout(moveTimer);
        $imgs.eq(page).siblings().animate({opacity:0}, moveTime).addClass('hidden');
        page++;
            if (page === showImgLen) {
                page = 0;
                $imgs.eq(showImgLen - 1).removeClass('hidden').stop().animate({opacity:1}, moveTime);
            } else {
                $imgs.eq(page - 1).stop().removeClass('hidden').animate({opacity:1}, moveTime);
            }
        if (isAuto) {
            moveTimer = window.setTimeout(opacity, delayTime);
        }
        
    };
    return direction==='opacity'?
        opacity:function(){
        window.setTimeout(move, delayTime);
    };

}