import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import lenis from './lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Connect Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Utility function to create fade-in animations
export const createFadeInAnimation = (selector, options = {}) => {
  const defaultOptions = {
    duration: 1.5,
    y: 80,
    opacity: 0,
    ease: "power3.out",
    stagger: 0.15,
    ...options
  };

  gsap.fromTo(selector, 
    { 
      opacity: 0, 
      y: defaultOptions.y,
      scale: 0.95,
      filter: "blur(10px)"
    }, 
    {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: defaultOptions.duration,
      ease: defaultOptions.ease,
      stagger: defaultOptions.stagger,
      scrollTrigger: {
        trigger: selector,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
        scrub: false
      }
    }
  );
};

// Utility function for parallax effects
export const createParallaxAnimation = (selector, speed = 0.5) => {
  gsap.to(selector, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: selector,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
};

// Utility function for scale animations
export const createScaleAnimation = (selector, options = {}) => {
  const defaultOptions = {
    scale: 0.7,
    duration: 1.2,
    ease: "back.out(1.7)",
    ...options
  };

  gsap.fromTo(selector,
    { 
      scale: defaultOptions.scale,
      opacity: 0,
      rotation: -5,
      filter: "blur(5px)"
    },
    {
      scale: 1,
      opacity: 1,
      rotation: 0,
      filter: "blur(0px)",
      duration: defaultOptions.duration,
      ease: defaultOptions.ease,
      scrollTrigger: {
        trigger: selector,
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

// Utility function for text reveal animations
export const createTextRevealAnimation = (selector) => {
  const elements = gsap.utils.toArray(selector);
  
  elements.forEach(element => {
    gsap.fromTo(element.children || element,
      {
        y: 120,
        opacity: 0,
        skewY: 7,
        filter: "blur(8px)"
      },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: element,
          start: "top 92%",
          end: "bottom 8%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
};

// Advanced slide-in animation from different directions
export const createSlideInAnimation = (selector, direction = 'left', options = {}) => {
  const defaultOptions = {
    duration: 1.6,
    ease: "power3.out",
    stagger: 0.1,
    ...options
  };

  const directions = {
    left: { x: -150, y: 0 },
    right: { x: 150, y: 0 },
    top: { x: 0, y: -150 },
    bottom: { x: 0, y: 150 }
  };

  const startPos = directions[direction];

  gsap.fromTo(selector,
    {
      x: startPos.x,
      y: startPos.y,
      opacity: 0,
      scale: 0.9,
      rotation: direction === 'left' ? -10 : direction === 'right' ? 10 : 0
    },
    {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: defaultOptions.duration,
      ease: defaultOptions.ease,
      stagger: defaultOptions.stagger,
      scrollTrigger: {
        trigger: selector,
        start: "top 88%",
        end: "bottom 12%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

// Magnetic hover effect for buttons and cards
export const createMagneticEffect = (selector) => {
  const elements = gsap.utils.toArray(selector);

  elements.forEach(element => {
    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.6,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
  });
};

// Timeline animation for experience section
export const createTimelineAnimation = (selector) => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: selector,
      start: "top 80%",
      end: "bottom 20%",
      scrub: 1
    }
  });

  // Animate the timeline line
  timeline.fromTo(`${selector} .timeline-line`, 
    { height: 0 },
    { height: "100%", duration: 2, ease: "power2.out" }
  );

  // Animate timeline nodes
  gsap.fromTo(`${selector} .timeline-node`,
    { 
      scale: 0,
      opacity: 0,
      rotation: 180
    },
    {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.3,
      scrollTrigger: {
        trigger: `${selector} .timeline-node`,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

// Floating animation for elements
export const createFloatingAnimation = (selector) => {
  gsap.to(selector, {
    y: -20,
    duration: 3,
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1,
    stagger: 0.5
  });
};

const animations = { 
  createFadeInAnimation, 
  createParallaxAnimation, 
  createScaleAnimation, 
  createTextRevealAnimation,
  createSlideInAnimation,
  createMagneticEffect,
  createFloatingAnimation,
  createTimelineAnimation
};

export default animations;
