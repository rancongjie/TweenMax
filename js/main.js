/**
 * Created by rancongjie on 16/2/19.
 */
var main = {};
main.timeScroll = null;
main.currentStep = 'step1';
main.init = function () {
  main.resize();
  main.configNavAnimate();
  main.events();
  main.button3D('.start', '.state1', '.state2', 0.3);
  main.button3D('.button1', '.state1', '.state2', 0.3);
  main.button3D('.button2', '.state1', '.state2', 0.3);


  main.configInitScroll();
  twoAnimate.init();
  threeAnimate.init();
  fiveAnimate.init();
};

$(document).ready(main.init);

main.resize = function () {
  $('.scene').height($(window).height());
  $(".scene:not(':first')").css('top', $(window).height());
  main.configInitScroll();
  if ($(window).width() <= 950) {
    $("body").css("height", 8500);
    $("body").removeClass("r780").addClass("r950");
    $(".menu").css("top", 0);
    $(".menu").css("transform", "none");
  } else {
    $("body").removeClass("r780 r950");
    $("body").css("height", 8500);
    $("body").removeClass("r950");
    $(".menu").css("top", 22);
    $(".left_nav").css("left", -300);
  }

};


main.configNavAnimate = function () {
  var initAnimate = new TimelineMax();

  initAnimate.to('.menu', 0.7, {opacity: 1});
  initAnimate.to('.menu', 0.7, {left: 22}, '-=0.3');
  initAnimate.to('.nav', 0.5, {opacity: 1});

  initAnimate.to('.scene1_logo', 0.7, {opacity: 1});
  initAnimate.staggerTo('.scene1_1 img', 1.5, {opacity: 1, rotationX: 0, ease: Elastic.easeOut}, 0.2);
  initAnimate.to(".light_left", 0.5, {rotationZ: 0, ease: Cubic.easeOut}, "-=2");
  initAnimate.to(".light_right", 0.5, {rotationZ: 0, ease: Cubic.easeOut}, "-=2");
  initAnimate.to(".scene1 .controls", 0.5, {bottom: 20, opacity: 1}, '-=1');

  initAnimate.to("body", 0, {"overflow-y": "scroll"});

};
main.nav = function () {
  var navAnimate = new TimelineMax();
  $('.nav a').bind('mouseenter', function () {
    var w = $(this).width();
    var l = $(this).offset().left;

    navAnimate.clear();
    navAnimate.to('.line', 0.5, {opacity: 1, width: w, left: l});
  });

  $('.nav a').bind('mouseleave', function () {
    navAnimate.clear();
    navAnimate.to('.line', 0.5, {opacity: 0});
  });
  var languageAnimate = new TimelineMax();
  $('.language').bind('mouseenter', function () {
    languageAnimate.clear();
    languageAnimate.to('.dropdown', 0.7, {opacity: 1, 'display': 'block'});
  });
  $('.language').bind('mouseleave', function () {
    languageAnimate.clear();
    languageAnimate.to('.dropdown', 0.5, {opacity: 0, 'display': 'block'});
  })

};
main.button3D = function (obj, element1, element2, d) {
  var buttonAnimate = new TimelineMax();
  buttonAnimate.to($(obj).find(element1), 0, {
    rotationX: 0,
    transformPerspective: 600,
    transformOrigin: 'center bottom'
  });
  buttonAnimate.to($(obj).find(element2), 0, {
    rotationX: -90,
    transformPerspective: 600,
    transformOrigin: 'top center'
  });

  $(obj).bind('mouseenter', function () {
    var enterAnimate = new TimelineMax();

    enterAnimate.to($(this).find(element1), d, {rotationX: 90, top: -$(this).find(element1).height()}, 0);
    enterAnimate.to($(this).find(element2), d, {rotationX: 0, top: 0}, 0);

  });
  $(obj).bind('mouseleave', function () {
    var leaveAnimate = new TimelineMax();

    leaveAnimate.to($(this).find(element1), d, {rotationX: 0, top: 0}, 0);
    leaveAnimate.to($(this).find(element2), d, {rotationX: -90, top: $(this).find(element2).height()}, 0);

  });

};

main.configInitScroll = function () {
  var time = main.timeScroll ? main.timeScroll.time() : 0;
  if (main.timeScroll) main.timeScroll.clear();

  main.timeScroll = new TimelineMax();
  main.timeScroll.to('.scene1',0,{onReverseComplete: function () {
    twoAnimate.twoLine.seek(0,false);
  }},0);
  main.timeScroll.add('step1');
  main.timeScroll.to('.scene2', 0.8, {top: 0, ease: Cubic.easeInOut});
  main.timeScroll.to({}, 0.1, {
    onComplete: function () {
      menu.changeMenu("menu_state2");
    }, onReverseComplete: function () {
      menu.changeMenu("menu_state1");
    }
  }, '-=0.3');
  main.timeScroll.to({},0,{onComplete: function () {
    twoAnimate.twoLine.tweenTo('state1');
  }},'-=0.3');
  main.timeScroll.add('step2');
  main.timeScroll.to({},0,{onComplete: function () {
    twoAnimate.twoLine.tweenTo('state2');
  },onReverseComplete: function () {
    twoAnimate.twoLine.tweenTo('state1')
  }});
  main.timeScroll.to({},0.4,{});
  main.timeScroll.add('point1');

  main.timeScroll.to({},0,{onComplete: function () {
    twoAnimate.twoLine.tweenTo('state3');
  },onReverseComplete: function () {
    twoAnimate.twoLine.tweenTo('state2')
  }});
  main.timeScroll.to({},0.4,{});
  main.timeScroll.add('point2');

  main.timeScroll.to({},0,{onComplete: function () {
    twoAnimate.twoLine.tweenTo('state4');
  },onReverseComplete: function () {
    twoAnimate.twoLine.tweenTo('state3')
  }});
  main.timeScroll.to({},0.4,{});
  main.timeScroll.add('point3');

  main.timeScroll.to('.scene3', 0.8, {top: 0, ease: Cubic.easeInOut,onReverseComplete: function () {
    threeAnimate.threeLine.seek(0,false);
  }});
  main.timeScroll.to({}, 0.1, {
    onComplete: function () {
      menu.changeMenu("menu_state3");
    }, onReverseComplete: function () {
      menu.changeMenu("menu_state2");
    }
  }, "-=0.3");
  main.timeScroll.to({},0.1,{onComplete: function () {
    threeAnimate.threeLine.tweenTo('state1');
  }},'-=0.3');
  main.timeScroll.add('step3');
  main.timeScroll.to({},0,{onComplete: function () {
    threeAnimate.threeLine.tweenTo('state2');
  },onReverseComplete: function () {
    threeAnimate.threeLine.tweenTo('state1');
  }});
  main.timeScroll.to({},0.4,{});
  main.timeScroll.add('threeState');

  main.timeScroll.to('.scene4', 0.8, {top: 0, ease: Cubic.easeInOut});
  main.timeScroll.add('step4');
  main.timeScroll.to('.scene5', 0.8, {top: 0, ease: Cubic.easeInOut,onReverseComplete:function(){
    fiveAnimate.fiveLine.seek(0,false);
  }},"-=0.8");
  main.timeScroll.to({},0.1,{onComplete:function(){
    fiveAnimate.fiveLine.tweenTo("fiveState");
  }},"-=0.2");
  main.timeScroll.add('step5');

  main.timeScroll.stop();
  main.timeScroll.seek(time, false);

};
main.changeStep = function (value) {
  if (value === 'next') {
    var currentTime = main.timeScroll.getLabelTime(main.currentStep);

    var afterCurrentStep = main.timeScroll.getLabelAfter(currentTime);
    if (!afterCurrentStep) return;

    var totalTime = main.timeScroll.totalDuration();

    var afterTime = main.timeScroll.getLabelTime(afterCurrentStep);

    var maxH = $('body').height() - $(window).height();

    var scrollHeight = afterTime / totalTime * maxH;

    var d = Math.abs(main.timeScroll.time() - afterTime);

    var scrollAnimate = new TimelineMax();

    scrollAnimate.to('body,html', d, {scrollTop: scrollHeight});
    //main.timeScroll.tweenTo(afterCurrentStep);
    main.currentStep = afterCurrentStep;
  } else {
    var currentTime = main.timeScroll.getLabelTime(main.currentStep);

    var prevCurrentStep = main.timeScroll.getLabelBefore(currentTime);
    if (!prevCurrentStep) return;

    var totalTime = main.timeScroll.totalDuration();

    var beforeTime = main.timeScroll.getLabelTime(prevCurrentStep);

    var maxH = $('body').height() - $(window).height();

    var scrollHeight = beforeTime / totalTime * maxH;

    var d = Math.abs(main.timeScroll.time() - beforeTime);

    var scrollAnimate = new TimelineMax();

    scrollAnimate.to('body,html', d, {scrollTop: scrollHeight});

    //main.timeScroll.tweenTo(prevCurrentStep);
    main.currentStep = prevCurrentStep;

  }
};
main.scrollStatus = function () {
  var times = main.scale() * main.timeScroll.totalDuration();
  main.timeScroll.seek(times, false);
};
main.scale = function () {
  var scrollT = $(window).scrollTop();
  var maxH = $('body').height() - $(window).height();
  return scrollT / maxH;
};
main.mouseupFn = function () {
  var scale = main.scale();
  var times = scale * main.timeScroll.totalDuration();

  var prevStep = main.timeScroll.getLabelBefore(times);
  var nextStep = main.timeScroll.getLabelAfter(times);

  var prevTime = main.timeScroll.getLabelTime(prevStep);
  var nextTime = main.timeScroll.getLabelTime(nextStep);

  var prevDvalue = Math.abs(prevTime - times);
  var nextDvalue = Math.abs(nextTime - times);
  var step = '';
  if (scale === 0) {
    step = 'step1';
  } else if (scale === 1) {
    step = 'step2';
  } else if (prevDvalue <= nextDvalue) {
    step = prevStep;
  } else {
    step = nextStep;
  }
  main.timeScroll.tweenTo(step);

  var totalTime = main.timeScroll.totalDuration();

  var currentTime = main.timeScroll.getLabelTime(step);

  var maxH = $('body').height() - $(window).height();

  var scrollHeight = currentTime / totalTime * maxH;

  var d = Math.abs(main.timeScroll.time() - currentTime);

  var scrollAnimate = new TimelineMax();

  scrollAnimate.to('body,html', d, {scrollTop: scrollHeight});

  main.currentStep = step;

};
main.events = function () {
  main.nav();
  $(window).resize(main.resize);

  $(window).bind('scroll', scrollFn);
  function scrollFn() {
    $(window).scrollTop(0);
  }

  $(window).bind('scroll', main.scrollStatus);
  $(window).bind('mousedown', function () {
    $(window).unbind('scroll', scrollFn);
  });
  $(window).bind('mouseup', main.mouseupFn);

  $('.wrapper').bind('mousewheel', function (ev) {
    ev.preventDefault();
  });
  $('.wrapper').one('mousewheel', mousewheelFn);
  var timer = null;

  function mousewheelFn(ev, direction) {
    $(window).unbind('scroll', scrollFn);
    if (direction < 1) { //向下
      main.changeStep('next');
    } else {
      main.changeStep('prev');
    }
    clearTimeout(timer);
    timer = setInterval(function () {
      $('.wrapper').one('mousewheel', mousewheelFn);
    }, 1800);
  }
};

var menu = {};

menu.changeMenu = function (stepClass) {
  var oldMenu = $('.menu');
  var newMenu = oldMenu.clone();
  newMenu.removeClass('menu_state1').removeClass('menu_state2').removeClass('menu_state3');
  newMenu.addClass(stepClass);
  oldMenu.addClass('removeClass');

  $('.menu_wrapper').append(newMenu);
  var menuAnimate = new TimelineMax();
  main.nav();
  main.button3D('.start', '.state1', '.state2', 0.3);
  menuAnimate.clear();
  menuAnimate.to(newMenu, 0, {top: 100, rotationX: -90, transformPerspective: 600, transformOrigin: 'top center'});
  menuAnimate.to(oldMenu, 0, {top: 22, rotationX: 0, transformPerspective: 600, transformOrigin: 'center bottom'});
  menuAnimate.to(oldMenu, 0.3, {
    rotationX: 90, top: -55, ease: Cubic.easeInOut, onComplete: function () {
      $('.removeClass').remove();
    }
  });
  menuAnimate.to(newMenu, 0.3, {rotationX: 0, top: 22, ease: Cubic.easeInOut}, '-=0.3');

};

var twoAnimate = {};

twoAnimate.twoLine = new TimelineMax();

twoAnimate.init = function () {
  twoAnimate.twoLine.staggerTo('.scene2_1 img',1.5,{opacity:1,rotationX:0},0.1);

  twoAnimate.twoLine.to('.scene2 .points',0.5,{bottom:20},'-=1');
  twoAnimate.twoLine.to(".scene2 .point0 .text",0.1,{opacity:1});
  twoAnimate.twoLine.to(".scene2 .point0 .point_icon",0,{"background-position":"right top"});

  twoAnimate.twoLine.add('state1');

  twoAnimate.twoLine.staggerTo('.scene2_1 img',0.2,{opacity:0,rotationX:90},0);
  twoAnimate.twoLine.to('.scene2_2 .left',0.4,{opacity:1});
  twoAnimate.twoLine.staggerTo('.scene2_2 .right img',0.3,{opacity:1,rotationX:0},0,'-=0.4');

  twoAnimate.twoLine.to(".scene2 .point .text",0,{opacity:0},"-=0.4");
  twoAnimate.twoLine.to(".scene2 .point1 .text",0.1,{opacity:1});
  twoAnimate.twoLine.to(".scene2 .point .point_icon",0,{"background-position":"left top"},"-=0.4");
  twoAnimate.twoLine.to(".scene2 .point1 .point_icon",0,{"background-position":"right top"},"-=0.4");
  twoAnimate.twoLine.add('state2');

  twoAnimate.twoLine.to('.scene2_2 .left',0.4,{opacity:0});
  twoAnimate.twoLine.staggerTo('.scene2_2 .right img',0.3,{opacity:0,rotationX:90},0,'-=0.4');
  twoAnimate.twoLine.to('.scene2_3 .left',0.4,{opacity:1});
  twoAnimate.twoLine.staggerTo('.scene2_3 .right img',0.3,{opacity:1,rotationX:0},0,'-=0.4');

  twoAnimate.twoLine.to(".scene2 .point .text",0,{opacity:0},"-=0.4");
  twoAnimate.twoLine.to(".scene2 .point2 .text",0.1,{opacity:1});
  twoAnimate.twoLine.to(".scene2 .point .point_icon",0,{"background-position":"left top"},"-=0.4");
  twoAnimate.twoLine.to(".scene2 .point2 .point_icon",0,{"background-position":"right top"},"-=0.4");
  twoAnimate.twoLine.add('state3');

  twoAnimate.twoLine.to('.scene2_3 .left',0.4,{opacity:0});
  twoAnimate.twoLine.staggerTo('.scene2_3 .right img',0.3,{opacity:0,rotationX:90},0,'-=0.4');
  twoAnimate.twoLine.to('.scene2_4 .left',0.4,{opacity:1});
  twoAnimate.twoLine.staggerTo('.scene2_4 .right img',0.3,{opacity:1,rotationX:0},0,'-=0.4');
  twoAnimate.twoLine.to(".scene2 .point .text",0,{opacity:0},"-=0.4");
  twoAnimate.twoLine.to(".scene2 .point3 .text",0.1,{opacity:1});
  twoAnimate.twoLine.to(".scene2 .point .point_icon",0,{"background-position":"left top"},"-=0.4");
  twoAnimate.twoLine.to(".scene2 .point3 .point_icon",0,{"background-position":"right top"},"-=0.4");
  twoAnimate.twoLine.add('state4');

  twoAnimate.twoLine.stop();
};

var threeAnimate = {};

threeAnimate.threeLine = new TimelineMax();

threeAnimate.init = function () {
  threeAnimate.threeLine.to('.scene3 .step img',0,{opacity:0,rotationX:-90,transformPerspective:600,transformOrigin:'center center'});
  threeAnimate.threeLine.staggerTo('.step3_1 img',0.2,{opacity:1,rotationX:0,ease:Cubic.easeInOut},0.1);

  threeAnimate.threeLine.add('state1');
  threeAnimate.threeLine.to('.step3_1 img',0.2,{opacity:0,rotationX:-90,ease:Cubic.easeInOut});
  threeAnimate.threeLine.to(".step3_2 img",0.3,{opacity:1,rotationX:0,ease:Cubic.easeInOut});

  threeAnimate.threeLine.add('state2');

  threeAnimate.threeLine.stop();

};

var fiveAnimate = {};

fiveAnimate.fiveLine = new TimelineMax();

fiveAnimate.init = function () {
  fiveAnimate.fiveLine.to(".scene5 .area_content img, .scene5 .button1,.scene5 .button2",0,{rotationX:-90,transformPerspective:600,transformOrigin:"center center"});
  fiveAnimate.fiveLine.to(".scene5 .scene5_img",0,{top:-220});

  fiveAnimate.fiveLine.to(".scene5 .scene5_img",0.5,{top:0,ease:Cubic.easeInOut});
  fiveAnimate.fiveLine.staggerTo( ".scene5 .button1,.scene5 .button2,.scene5 .area_content img",1.2,{opacity:1,rotationX:0,ease:Elastic.easeOut},0.2 );

  fiveAnimate.fiveLine.to(".scene5 .lines",0.5,{opacity:1});
  fiveAnimate.fiveLine.add("fiveState");

  fiveAnimate.fiveLine.stop();
};
