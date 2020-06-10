import './pace.min.js';
import gsap from 'gsap';
import barba from '@barba/core';
import '../styles/index.sass';
import LocomotiveScroll from 'locomotive-scroll';

let scroll;

function pageTransition() {
  var tl = gsap.timeline();
  tl.to('ul.transition li', {
    duration: 0.5,
    scaleX: 1,
    transformOrigin: 'top left',
    stagger: 0.2,
  });
  tl.to('ul.transition li', {
    duration: 0.5,
    scaleX: 0,
    transformOrigin: 'top left',
    stagger: 0.1,
    delay: 0.1,
  });
}

function contentAnimation() {
  gsap.from('main', {
    duration: 0.2,
    y: 30,
    autoAlpha: 0,
    delay: 0.5,
  });
}

function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

barba.init({
  sync: true,

  // once({ next }) {
  //   // init LocomotiveScroll on page load

  //   console.log('a');
  // },

  // beforeEnter({ next }) {

  //   console.log('a');
  // },

  to: {
    namespace: ['home'],
  },

  transitions: [
    {
      async leave(data) {
        const done = this.async();

        pageTransition();
        await delay(1000);
        done();
      },

      async beforeEnter({ current, next, trigger }) {
        // destroy the previous scroll
        scroll.destroy();

        // init LocomotiveScroll regarding the next page
        smooth(next.container);
      },
      async enter({ current, next, trigger }) {
        contentAnimation();
        scroll.update();

        if ((next.namespace = 'home')) {
          homeFunctions();
        }

        if ((next.namespace = 'codename') || (next.namespace = 'red') || (next.namespace = 'thorikos')) {
          detailFunctions();
        }
      },

      async once({ current, next, trigger }) {
        // console.log(next.namespace);
        contentAnimation();
        smooth(next.container);

        if ((next.namespace = 'home')) {
          homeFunctions();
        }

        if ((next.namespace = 'codename') || (next.namespace = 'red') || (next.namespace = 'thorikos')) {
          console.log(next);
          detailFunctions();
        }
      },
    },
  ],
});

function smooth(container) {
  scroll = new LocomotiveScroll({
    el: container.querySelector('[data-scroll-container]'),
    smooth: true,
  });
}

function homeFunctions() {
  smoothScroller();
}

function detailFunctions() {
  const vids = document.querySelectorAll('main video');
  vids.forEach((vid) => vid.play());

  const eye = document.querySelector('.case-header__eye');
  eye.addEventListener('mouseenter', function (e) {
    gsap.to('.eye-vis', {
      autoAlpha: 0,
      duration: 0.7,
    });
  });

  eye.addEventListener('mouseleave', function (e) {
    gsap.to('.eye-vis', {
      autoAlpha: 1,
      duration: 0.7,
    });
  });
}

// window.addEventListener('DOMContentLoaded', (event) => {
//   console.log('DOM fully loaded and parsed');

//   const scroll = new LocomotiveScroll({
//     el: document.querySelector('[data-scroll-container]'),
//     smooth: true,
//     // offset: -30000,
//   });

function smoothScroller() {
  const l1 = document.querySelector('#l-1');
  const l1T = document.querySelector('#intro');

  const l2 = document.querySelector('#l-2');
  const l2T = document.querySelector('#casestudies');

  const l3 = document.querySelector('#l-3');
  const l3T = document.querySelector('#about');

  const l4 = document.querySelector('#l-4');
  const l4T = document.querySelector('#sketches');

  const l5 = document.querySelector('#l-5');
  const l5T = document.querySelector('#contact');

  l1.addEventListener('click', function (e) {
    btnScrollTo(l1T, e);
  });

  l2.addEventListener('click', function (e) {
    btnScrollTo(l2T, e);
  });

  l3.addEventListener('click', function (e) {
    btnScrollTo(l3T, e);
  });

  l4.addEventListener('click', function (e) {
    btnScrollTo(l4T, e);
  });

  l5.addEventListener('click', function (e) {
    btnScrollTo(l5T, e);
  });

  const navButtons = document.querySelectorAll('.main-header button');

  function btnScrollTo(target, e) {
    scroll.scrollTo(target, -100);
    navButtons.forEach((btn) => (btn.style.opacity = 0.5));
    e.currentTarget.style.opacity = 1;
  }
}

window.addEventListener('resize', function () {
  scroll.update();
});

setInterval(() => {
  scroll.update();
}, 1000);
