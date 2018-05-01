import SmoothScroll from 'smooth-scroll';

let smoothScroll = new SmoothScroll('a[href*="#"]');
window.smoothScroll = smoothScroll.animateScroll; 