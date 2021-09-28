var tmax_optionsGlobal = {
  repeat: -1,
  repeatDelay: 0.65,
  yoyo: true
};

CSSPlugin.useSVGTransformAttr = true;

var tl = new TimelineMax(tmax_optionsGlobal),
    path = '#face *',
    stagger_val = 0.009,
    duration = 5;

$.each($(path), function(i, el) {
  tl.set($(this), {
    x: '+=' + getRandom(-1000, 1000 ),
    y: '+=' + getRandom(-1000, 1000 ),
    rotation: '+=' + getRandom(-720, 720),
    scale: 0,
    opacity: 0
  });
});

var stagger_opts_to = {
  x: 0,
  y: 0,
  opacity: 1,
  scale: 1,
  rotation: 0,
  ease: Power4.easeOut
};


tl.staggerTo(path, duration, stagger_opts_to, stagger_val);


function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}