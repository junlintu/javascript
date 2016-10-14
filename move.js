
/*
1.兼容requestAnimationFrame，（16.7 = 1000 / 60, 即每秒60帧）
2.缓动
2015/7/28 by junlintu
*/
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
    /*
     * Tween
     * t: current time（当前时间）
     * b: beginning value（初始值）
     * c: change in value（变化量）
     * d: duration（持续时间）
    */
    var Tween = {
        Linear: function(t, b, c, d) { return c*t/d + b; },
        Quad: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function(t, b, c, d) {
                return -c *(t /= d)*(t-2) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t-2) - 1) + b;
            }
        },
        Cubic: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function(t, b, c, d) {
                return c * ((t = t/d - 1) * t * t + 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
                return c / 2*((t -= 2) * t * t + 2) + b;
            }
        },
        Quart: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t * t*t + b;
            },
            easeOut: function(t, b, c, d) {
                return -c * ((t = t/d - 1) * t * t*t - 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
            }
        },
        Quint: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut: function(t, b, c, d) {
                return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
                return c / 2*((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        Sine: {
            easeIn: function(t, b, c, d) {
                return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
            },
            easeOut: function(t, b, c, d) {
                return c * Math.sin(t/d * (Math.PI/2)) + b;
            },
            easeInOut: function(t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
            }
        },
        Expo: {
            easeIn: function(t, b, c, d) {
                return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
            },
            easeOut: function(t, b, c, d) {
                return (t==d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if (t==0) return b;
                if (t==d) return b+c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        Circ: {
            easeIn: function(t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut: function(t, b, c, d) {
                return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        Elastic: {
            easeIn: function(t, b, c, d, a, p) {
                var s;
                if (t==0) return b;
                if ((t /= d) == 1) return b + c;
                if (typeof p == "undefined") p = d * .3;
                if (!a || a < Math.abs(c)) {
                    s = p / 4;
                    a = c;
                } else {
                    s = p / (2 * Math.PI) * Math.asin(c / a);
                }
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut: function(t, b, c, d, a, p) {
                var s;
                if (t==0) return b;
                if ((t /= d) == 1) return b + c;
                if (typeof p == "undefined") p = d * .3;
                if (!a || a < Math.abs(c)) {
                    a = c; 
                    s = p / 4;
                } else {
                    s = p/(2*Math.PI) * Math.asin(c/a);
                }
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut: function(t, b, c, d, a, p) {
                var s;
                if (t==0) return b;
                if ((t /= d / 2) == 2) return b+c;
                if (typeof p == "undefined") p = d * (.3 * 1.5);
                if (!a || a < Math.abs(c)) {
                    a = c; 
                    s = p / 4;
                } else {
                    s = p / (2  *Math.PI) * Math.asin(c / a);
                }
                if (t < 1) return -.5 * (a * Math.pow(2, 10* (t -=1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p ) * .5 + c + b;
            }
        },
        Back: {
            easeIn: function(t, b, c, d, s) {
                if (typeof s == "undefined") s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut: function(t, b, c, d, s) {
                if (typeof s == "undefined") s = 1.70158;
                return c * ((t = t/d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut: function(t, b, c, d, s) {
                if (typeof s == "undefined") s = 1.70158; 
                if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                return c / 2*((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        Bounce: {
            easeIn: function(t, b, c, d) {
                return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
            },
            easeOut: function(t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut: function(t, b, c, d) {
                if (t < d / 2) {
                    return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                } else {
                    return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
                }
            }
        }
    }
    Math.tween = Tween;
}());

var funParabola = function(element, target, options) {
    /*
     * 网页模拟现实需要一个比例尺
     * 如果按照1像素就是1米来算，显然不合适，因为页面动不动就几百像素
     * 页面上，我们放两个物体，200~800像素之间，我们可以映射为现实世界的2米到8米，也就是100:1
     * 不过，本方法没有对此有所体现，因此不必在意
    */
    
    var defaults = {
        speed: 80, // 每帧移动的像素大小，每帧（对于大部分显示屏）大约16~17毫秒
        a: 0,  // a实际指焦点到准线的距离，你可以抽象成曲率，这里模拟扔物体的抛物线，因此是开口向下的
        b: 0,
        c: 0,
        progress: function() {},
        complete: function() {}
    };
    
    var params = {}; options = options || {};
    
    for (var key in defaults) {
        params[key] = options[key] || defaults[key];
    }
    
    var exports = {
        mark: function() { return this; },
        position: function() { return this; },
        move: function() { return this; },
        init: function() { return this; }
    };
    
    /* 确定移动的方式 
     * IE6-IE8 是margin位移
     * IE9+使用transform
    */
    var moveStyle = "margin", testDiv = document.createElement("div");
    if ("oninput" in testDiv) {
        ["", "ms", "webkit"].forEach(function(prefix) {
            var transform = prefix + (prefix? "T": "t") + "ransform";
            if (transform in testDiv.style) {
                moveStyle = transform;
            }
        });     
    }
    
    // 根据两点坐标以及曲率确定运动曲线函数（也就是确定a, b的值）
    /* 公式： y = a*x*x + b*x + c;
    */
    // var a = params.curvature, b = 0, c = 0;
    var a = params.a, b = params.b, c = params.c;
    
    // 是否执行运动的标志量
    var flagMove = true;
    
    if (element && target && element.nodeType == 1 && target.nodeType == 1) {
        var rectElement = {}, rectTarget = {};
        
        // 移动元素的中心点位置，目标元素的中心点位置
        var centerElement = {}, centerTarget = {};
        
        // 目标元素的坐标位置
        var coordElement = {}, coordTarget = {};
        
        // 标注当前元素的坐标
        exports.mark = function() {
            if (flagMove == false) return this;
            if (typeof coordElement.x == "undefined") this.position();
            element.setAttribute("data-center", [coordElement.x, coordElement.y].join());
            target.setAttribute("data-center", [coordTarget.x, coordTarget.y].join());
            return this;
        }
        
        exports.position = function() {
            if (flagMove == false) return this;
            
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft,
                scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            
            // 初始位置
            if (moveStyle == "margin") {
                element.style.marginLeft = element.style.marginTop = "0px";
            } else {
                element.style[moveStyle] = "translate(0, 0)";
            }
            
            // 四边缘的坐标
            rectElement = element.getBoundingClientRect();
            rectTarget = target.getBoundingClientRect();
            
            // 移动元素的中心点坐标
            centerElement = {
                x: rectElement.left + (rectElement.right - rectElement.left) / 2 + scrollLeft,
                y: rectElement.top + (rectElement.bottom - rectElement.top) / 2 + scrollTop
            };
            
            // 目标元素的中心点位置
            centerTarget = {
                x: rectTarget.left + (rectTarget.right - rectTarget.left) / 2 + scrollLeft,
                y: rectTarget.top + (rectTarget.bottom - rectTarget.top) / 2 + scrollTop        
            };
            righttopTarget = {
                x: rectTarget.left + (rectTarget.right - rectTarget.left) + scrollLeft,
                y: rectTarget.top + (rectTarget.bottom - rectTarget.top) + scrollTop        
            };
            
            // 转换成相对坐标位置
            coordElement = {
                x: 0,
                y: 0    
            };
            coordTarget = {
                x: -1 * (centerElement.x - centerTarget.x),
                y:  -1 * (centerElement.y - centerTarget.y) 
            };
            
            /*
             * 因为经过(0, 0), 因此c = 0
             * 于是：
             * y = a * x*x + b*x;
             * y1 = a * x1*x1 + b*x1;
             * y2 = a * x2*x2 + b*x2;
             * 利用第二个坐标：
             * b = (y2+ a*x2*x2) / x2
            */
            // 于是
            b = (coordTarget.y - a * coordTarget.x * coordTarget.x) / coordTarget.x;    
            
            return this;
        };      
        
        // 按照这个曲线运动
        exports.move = function() {
            // 如果曲线运动还没有结束，不再执行新的运动
            if (flagMove == false) return this;
            
            var startx = 0, rate = coordTarget.x > 0? 1: -1;
            var start = 0;
            var step = function() {
                // 切线 y'=2ax+b
                var tangent = 2 * a * startx + b; // = y / x
                // y*y + x*x = speed
                // (tangent * x)^2 + x*x = speed
                // x = Math.sqr(speed / (tangent * tangent + 1));
                if(params.speed > 1000) {
                    params.speed = Math.tween.Bounce.easeOut(start,2000,-1000,500);
                    start = start - 10;
                }
                console.log('speed:'+params.speed);
                startx = startx + rate * Math.sqrt(params.speed / (tangent * tangent + 1));
                
                // 防止过界
                if ((rate == 1 && startx > coordTarget.x) || (rate == -1 && startx < coordTarget.x)) {
                    startx = coordTarget.x;
                }
                var x = startx, y = a * x * x + b * x;
                
                // 标记当前位置，这里有测试使用的嫌疑，实际使用可以将这一行注释
                element.setAttribute("data-center", [Math.round(x), Math.round(y)].join());
                
                // x, y目前是坐标，需要转换成定位的像素值
                if (moveStyle == "margin") {
                    element.style.marginLeft = x + "px";
                    element.style.marginTop = y + "px";
                } else {
                    element.style[moveStyle] = "translate("+ [x + "px", y + "px"].join() +")";
                }
                
                if (startx !== coordTarget.x) {
                    params.progress(x, y);
                    window.requestAnimationFrame(step); 
                } else {
                    // 运动结束，回调执行
                    params.complete();
                    flagMove = true;    
                }
            };
            window.requestAnimationFrame(step);
            flagMove = false;
            
            return this;
        };
        
        // 初始化方法
        exports.init = function() {
            this.position().mark().move();
        };
    }
    
    return exports;
};
