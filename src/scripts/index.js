import './pace.min.js';
import gsap from 'gsap';
import barba from '@barba/core';
import '../styles/index.sass';

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
      },

      async once({ current, next, trigger }) {
        console.log(next.namespace);
        contentAnimation();
        smooth(next.container);
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

import LocomotiveScroll from 'locomotive-scroll';
// window.addEventListener('DOMContentLoaded', (event) => {
//   console.log('DOM fully loaded and parsed');

//   const scroll = new LocomotiveScroll({
//     el: document.querySelector('[data-scroll-container]'),
//     smooth: true,
//     // offset: -30000,
//   });

//   // const l1 = document.querySelector('#l-1');
//   // const l1T = document.querySelector('#intro');

//   // const l2 = document.querySelector('#l-2');
//   // const l2T = document.querySelector('#casestudies');

//   // const l3 = document.querySelector('#l-3');
//   // const l3T = document.querySelector('#about');

//   // const l4 = document.querySelector('#l-4');
//   // const l4T = document.querySelector('#sketches');

//   // const l5 = document.querySelector('#l-5');
//   // const l5T = document.querySelector('#contact');

//   // l1.addEventListener('click', function (e) {
//   //   scroll.scrollTo(l1T, -100);
//   // });

//   // l2.addEventListener('click', function (e) {
//   //   scroll.scrollTo(l2T, -100);
//   // });

//   // l3.addEventListener('click', function (e) {
//   //   scroll.scrollTo(l3T, -100);
//   // });

//   // l4.addEventListener('click', function (e) {
//   //   scroll.scrollTo(l4T, -100);
//   // });

//   // l5.addEventListener('click', function (e) {
//   //   scroll.scrollTo(l5T, -100);
//   // });
// });

window.addEventListener('resize', function () {
  scroll.update();
});

setInterval(() => {
  scroll.update();
}, 1000);
