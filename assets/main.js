const accordionAnimation = {
  accordionItems: null,
  activeItem: null,
  init() {
    this.accordion = document.querySelector(".accordion");
    this.accordionItems = document.querySelectorAll(".accordion-item");
    this.activeItem = null;
    this.accordionItems.forEach((item) => {
      const action = item.querySelector(".accordion-action");
      const content = item.querySelector(".accordion-content");
      if (item.classList.contains("active-accordion")) {
        content.classList.remove("hidden");
        content.style.height = "auto";
        this.activeItem = item;
        this.setOpenState(item);
      } else {
        content.classList.add("hidden");
        this.setClosedState(item);
      }
      action.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.activeItem && this.activeItem !== item) {
          this.closeAccordion(this.activeItem);
        }
        if (this.activeItem === item) {
          this.closeAccordion(item);
          this.activeItem = null;
        } else {
          this.openAccordion(item);
          this.activeItem = item;
        }
      });
    });
    this.initAnimation();
  },
  setOpenState(item) {
    const plusIconSpans = item.querySelectorAll(".accordion-plus-icon span");
    const accordionArrow = item.querySelector(".accordion-arrow svg");
    const accordionArrowSpan = item.querySelector(".accordion-arrow");
    if (plusIconSpans.length > 0) {
      plusIconSpans[1].style.transform = "rotate(90deg)";
      plusIconSpans[1].setAttribute("data-state", "true");
    }
    if (accordionArrow) {
      accordionArrow.style.transform = "rotate(180deg)";
      accordionArrow.setAttribute("data-state", "true");
    }
    if (accordionArrowSpan) {
      accordionArrowSpan.setAttribute("data-state", "true");
    }
  },
  setClosedState(item) {
    const plusIconSpans = item.querySelectorAll(".accordion-plus-icon span");
    const accordionArrow = item.querySelector(".accordion-arrow svg");
    const accordionArrowSpan = item.querySelector(".accordion-arrow");
    if (plusIconSpans.length > 0) {
      plusIconSpans[1].setAttribute("data-state", "false");
    }
    if (accordionArrow) {
      accordionArrow.setAttribute("data-state", "false");
    }
    if (accordionArrowSpan) {
      accordionArrowSpan.setAttribute("data-state", "false");
    }
  },
  initAnimation() {
    this.accordionItems.forEach((item, index) => {
      gsap.set(item, {
        opacity: 0,
        y: 50,
        filter: "blur(20px)",
        overflow: "hidden"
      });
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 50,
          filter: "blur(20px)"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "top 50%",
            scrub: false,
            once: true
          }
        }
      );
    });
  },
  openAccordion(item) {
    const content = item.querySelector(".accordion-content");
    const plusIconSpans = item.querySelectorAll(".accordion-plus-icon span");
    const accordionArrow = item.querySelector(".accordion-arrow svg");
    const accordionArrowSpan = item.querySelector(".accordion-arrow");
    content.classList.remove("hidden");
    content.style.height = "auto";
    const contentHeight = content.scrollHeight;
    content.style.height = "0px";
    gsap.to(content, {
      height: contentHeight,
      opacity: 1,
      duration: 0.3
    });
    if (plusIconSpans.length > 0) {
      gsap.to(plusIconSpans[1], {
        rotation: 90,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          plusIconSpans[1].setAttribute("data-state", "true");
        }
      });
    }
    if (accordionArrow) {
      accordionArrow.setAttribute("data-state", "true");
      gsap.to(accordionArrow, {
        rotation: -180,
        duration: 0.3,
        ease: "power2.out"
      });
    }
    if (accordionArrowSpan) {
      accordionArrowSpan.setAttribute("data-state", "true");
    }
  },
  closeAccordion(item) {
    const content = item.querySelector(".accordion-content");
    const plusIconSpans = item.querySelectorAll(".accordion-plus-icon span");
    const accordionArrow = item.querySelector(".accordion-arrow svg");
    const accordionArrowSpan = item.querySelector(".accordion-arrow");
    content.style.height = "auto";
    const contentHeight = content.scrollHeight;
    content.style.height = contentHeight + "px";
    gsap.to(content, {
      height: 0,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        content.classList.add("hidden");
        content.style.height = "0px";
      }
    });
    if (plusIconSpans.length > 0) {
      gsap.to(plusIconSpans[1], {
        rotation: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          plusIconSpans[1].setAttribute("data-state", "false");
        }
      });
    }
    if (accordionArrow) {
      accordionArrow.setAttribute("data-state", "false");
      gsap.to(accordionArrow, {
        rotation: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    }
    if (accordionArrowSpan) {
      accordionArrowSpan.setAttribute("data-state", "false");
    }
  }
};
if (typeof window !== "undefined") {
  accordionAnimation.init();
}
document.addEventListener("DOMContentLoaded", function() {
  if (typeof gsap === "undefined") {
    console.error("GSAP is not loaded.");
    return;
  }
  gsap.registerPlugin(MotionPathPlugin);
  const gradientAnimation = {
    init() {
      const paths = [
        "curve-path-1",
        "curve-path-2",
        "curve-path-3",
        "curve-path-4",
        "curve-path-5",
        "curve-path-6",
        "curve-path-7",
        "curve-path-8"
      ];
      paths.forEach((pathId, index) => {
        const path = document.getElementById(pathId);
        function interpolateColor(color1, color2, factor) {
          const r1 = parseInt(color1.slice(1, 3), 16);
          const g1 = parseInt(color1.slice(3, 5), 16);
          const b1 = parseInt(color1.slice(5, 7), 16);
          const r2 = parseInt(color2.slice(1, 3), 16);
          const g2 = parseInt(color2.slice(3, 5), 16);
          const b2 = parseInt(color2.slice(5, 7), 16);
          const r = Math.round(r1 + (r2 - r1) * factor);
          const g = Math.round(g1 + (g2 - g1) * factor);
          const b = Math.round(b1 + (b2 - b1) * factor);
          return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
        }
        if (index === 0) {
          const duration = gsap.utils.random(3, 6);
          const delay = gsap.utils.random(0, 2);
          for (let i = 1; i <= 60; i++) {
            const rect = document.getElementById(`rect-1-${i}`);
            if (path && rect) {
              const factor = (i - 1) / 59;
              const gradientColor = interpolateColor("#83E7EE", "#F9EB57", factor);
              rect.setAttribute("fill", gradientColor);
              gsap.to(rect, {
                motionPath: {
                  path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false
                },
                duration,
                // Same duration for all
                ease: "power1.inOut",
                repeat: -1,
                delay: delay + i * 2e-3
                // Slight stagger to create continuous line
              });
            }
          }
        } else if (index === 1) {
          const duration = gsap.utils.random(3, 6);
          const delay = gsap.utils.random(0, 2);
          for (let i = 1; i <= 60; i++) {
            const rect = document.getElementById(`rect-2-${i}`);
            if (path && rect) {
              const factor = (i - 1) / 59;
              const gradientColor = interpolateColor("#F9EB57", "#83E7EE", factor);
              rect.setAttribute("fill", gradientColor);
              gsap.to(rect, {
                motionPath: {
                  path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false
                },
                duration,
                // Same duration for all
                ease: "power1.inOut",
                repeat: -1,
                delay: delay + i * 2e-3
                // Slight stagger to create continuous line
              });
            }
          }
        } else if (index === 2) {
          const duration = gsap.utils.random(3, 6);
          const delay = gsap.utils.random(0, 2);
          for (let i = 1; i <= 60; i++) {
            const rect = document.getElementById(`rect-3-${i}`);
            if (path && rect) {
              const factor = (i - 1) / 59;
              const gradientColor = interpolateColor("#83E7EE", "#F9EB57", factor);
              rect.setAttribute("fill", gradientColor);
              gsap.to(rect, {
                motionPath: {
                  path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false
                },
                duration,
                // Same duration for all
                ease: "power1.inOut",
                repeat: -1,
                delay: delay + i * 2e-3
                // Slight stagger to create continuous line
              });
            }
          }
        } else if (index === 3) {
          const duration = gsap.utils.random(3, 6);
          const delay = gsap.utils.random(0, 2);
          for (let i = 1; i <= 60; i++) {
            const rect = document.getElementById(`rect-4-${i}`);
            if (path && rect) {
              const factor = (i - 1) / 59;
              const gradientColor = interpolateColor("#83E7EE", "#F9EB57", factor);
              rect.setAttribute("fill", gradientColor);
              gsap.to(rect, {
                motionPath: {
                  path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false
                },
                duration,
                // Same duration for all
                ease: "power1.inOut",
                repeat: -1,
                delay: delay + i * 2e-3
                // Slight stagger to create continuous line
              });
            }
          }
        } else if (index === 4) {
          const duration = gsap.utils.random(3, 6);
          const delay = gsap.utils.random(0, 2);
          for (let i = 1; i <= 60; i++) {
            const rect = document.getElementById(`rect-5-${i}`);
            if (path && rect) {
              const factor = (i - 1) / 59;
              const gradientColor = interpolateColor("#F9EB57", "#83E7EE", factor);
              rect.setAttribute("fill", gradientColor);
              gsap.to(rect, {
                motionPath: {
                  path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false
                },
                duration,
                // Same duration for all
                ease: "power1.inOut",
                repeat: -1,
                delay: delay + i * 2e-3
                // Slight stagger to create continuous line
              });
            }
          }
        } else if (index === 5) {
          const duration = gsap.utils.random(3, 6);
          const delay = gsap.utils.random(0, 2);
          for (let i = 1; i <= 60; i++) {
            const rect = document.getElementById(`rect-6-${i}`);
            if (path && rect) {
              const factor = (i - 1) / 59;
              const gradientColor = interpolateColor("#83E7EE", "#F9EB57", factor);
              rect.setAttribute("fill", gradientColor);
              gsap.to(rect, {
                motionPath: {
                  path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false
                },
                duration,
                // Same duration for all
                ease: "power1.inOut",
                repeat: -1,
                delay: delay + i * 2e-3
                // Slight stagger to create continuous line
              });
            }
          }
        } else if (index === 6) {
          const duration = gsap.utils.random(3, 6);
          const delay = gsap.utils.random(0, 2);
          for (let i = 1; i <= 60; i++) {
            const rect = document.getElementById(`rect-7-${i}`);
            if (path && rect) {
              const factor = (i - 1) / 59;
              const gradientColor = interpolateColor("#F9EB57", "#83E7EE", factor);
              rect.setAttribute("fill", gradientColor);
              gsap.to(rect, {
                motionPath: {
                  path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false
                },
                duration,
                // Same duration for all
                ease: "power1.inOut",
                repeat: -1,
                delay: delay + i * 2e-3
                // Slight stagger to create continuous line
              });
            }
          }
        } else if (index === 7) {
          const duration = gsap.utils.random(3, 6);
          const delay = gsap.utils.random(0, 2);
          for (let i = 1; i <= 60; i++) {
            const rect = document.getElementById(`rect-8-${i}`);
            if (path && rect) {
              const factor = (i - 1) / 59;
              const gradientColor = interpolateColor("#83E7EE", "#F9EB57", factor);
              rect.setAttribute("fill", gradientColor);
              gsap.to(rect, {
                motionPath: {
                  path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false
                },
                duration,
                // Same duration for all
                ease: "power1.inOut",
                repeat: -1,
                delay: delay + i * 2e-3
                // Slight stagger to create continuous line
              });
            }
          }
        }
      });
    },
    // Method to pause all animations
    pause() {
      gsap.globalTimeline.pause();
    },
    // Method to resume all animations
    resume() {
      gsap.globalTimeline.resume();
    },
    // Method to restart all animations
    restart() {
      gsap.globalTimeline.restart();
    }
  };
  gradientAnimation.init();
  window.gradientAnimation = gradientAnimation;
});
const headerAnimation = {
  headerOne() {
    const header = document.querySelector(".header-one");
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          header.style.transition = "all 0.5s ease-in-out";
          header.classList.add("scroll-header");
        } else {
          header.classList.remove("scroll-header");
        }
      });
    }
  },
  headerTwo() {
    const header = document.querySelector(".header-two");
    const headerBtn = document.querySelector(".header-btn");
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 150) {
          header.style.transition = "all 0.5s ease-in-out";
          header.style.top = "20px";
          header.classList.add("header-two-scroll");
          headerBtn.classList.remove("btn-secondary");
          headerBtn.classList.add("btn-white");
        } else {
          header.classList.remove("header-two-scroll");
          headerBtn.classList.remove("btn-white");
          headerBtn.classList.add("btn-secondary");
          header.style.top = "50px";
        }
      });
    }
  },
  headerThree() {
    const header = document.querySelector(".header-three");
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          header.style.transition = "all 0.5s ease-in-out";
          header.classList.add("header-three-scroll");
        } else {
          header.classList.remove("header-three-scroll");
        }
      });
    }
  },
  headerFour() {
    const header = document.querySelector(".header-four");
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          header.style.transition = "all 0.5s ease-in-out";
          header.classList.add("header-four-scroll");
        } else {
          header.classList.remove("header-four-scroll");
        }
      });
    }
  },
  headerFive() {
    const header = document.querySelector(".header-five");
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 25) {
          header.style.transition = "all 0.5s ease-in-out";
          header.classList.add("header-five-scroll");
        } else {
          header.classList.remove("header-five-scroll");
        }
      });
    }
  },
  headerSix() {
    const header = document.querySelector(".header-six");
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          header.style.transition = "all 0.5s ease-in-out";
          header.classList.add("header-six-scroll");
        } else {
          header.classList.remove("header-six-scroll");
        }
      });
    }
  }
};
if (typeof window !== "undefined") {
  headerAnimation.headerOne();
  headerAnimation.headerTwo();
  headerAnimation.headerThree();
  headerAnimation.headerFour();
  headerAnimation.headerFive();
  headerAnimation.headerSix();
}
document.addEventListener("DOMContentLoaded", function() {
  if (typeof InfiniteMarquee === "undefined") {
    return;
  }
  const animation = {
    infiniteLeft() {
      if (document.querySelector(".logos-marquee-container")) {
        new InfiniteMarquee({
          element: ".logos-marquee-container",
          speed: 4e4,
          smoothEdges: true,
          direction: "left",
          gap: "32px",
          duplicateCount: 1,
          mobileSettings: {
            direction: "top",
            speed: 5e4
          },
          on: {
            beforeInit: () => {
            },
            afterInit: () => {
            }
          }
        });
      }
    },
    infiniteRight() {
      if (document.querySelector(".logos-right-marquee-container")) {
        new InfiniteMarquee({
          element: ".logos-right-marquee-container",
          speed: 4e4,
          smoothEdges: true,
          direction: "right",
          gap: "32px",
          duplicateCount: 1,
          mobileSettings: {
            direction: "right",
            speed: 5e4
          },
          on: {
            beforeInit: () => {
            },
            afterInit: () => {
            }
          }
        });
      }
    },
    infiniteIconRight() {
      if (document.querySelector(".icon-right-marquee-container")) {
        new InfiniteMarquee({
          element: ".icon-right-marquee-container",
          speed: 2e3,
          smoothEdges: true,
          direction: "right",
          gap: "32px",
          duplicateCount: 1,
          mobileSettings: {
            direction: "right",
            speed: 5e4
          },
          on: {
            beforeInit: () => {
            },
            afterInit: () => {
            }
          }
        });
      }
    },
    initHover() {
      if (document.querySelector(".cards-marquee-container")) {
        new InfiniteMarquee({
          element: ".cards-marquee-container",
          speed: 14e4,
          smoothEdges: true,
          direction: "left",
          gap: "32px",
          pauseOnHover: true,
          on: {
            beforeInit: () => {
            },
            afterInit: () => {
            }
          }
        });
      }
    },
    initHoverRight() {
      if (document.querySelector(".cards-right-marquee-container")) {
        new InfiniteMarquee({
          element: ".cards-right-marquee-container",
          speed: 14e4,
          smoothEdges: true,
          direction: "right",
          gap: "32px",
          pauseOnHover: true,
          on: {
            beforeInit: () => {
            },
            afterInit: () => {
            }
          }
        });
      }
    },
    infiniteTop() {
      if (document.querySelector(".top-marquee-container")) {
        new InfiniteMarquee({
          element: ".top-marquee-container",
          speed: 4e4,
          smoothEdges: true,
          direction: "top",
          gap: "32px",
          pauseOnHover: true,
          duplicateCount: 0,
          mobileSettings: {
            direction: "top",
            speed: 5e4
          },
          on: {
            beforeInit: () => {
            },
            afterInit: () => {
            }
          }
        });
      }
    },
    infiniteBottom() {
      if (document.querySelector(".bottom-marquee-container")) {
        new InfiniteMarquee({
          element: ".bottom-marquee-container",
          speed: 4e4,
          smoothEdges: true,
          direction: "bottom",
          pauseOnHover: true,
          gap: "32px",
          duplicateCount: 0,
          mobileSettings: {
            direction: "bottom",
            speed: 5e4
          },
          on: {
            beforeInit: () => {
            },
            afterInit: () => {
            }
          }
        });
      }
    },
    initTopNavMarquee() {
      if (document.querySelector(".top-nav-marquee")) {
        new InfiniteMarquee({
          element: ".top-nav-marquee",
          speed: 7e4,
          smoothEdges: true,
          pauseOnHover: true,
          direction: "left",
          gap: "16px",
          duplicateCount: 2,
          mobileSettings: {
            direction: "left",
            speed: 5e4
          },
          on: {
            beforeInit: () => {
            },
            afterInit: () => {
            }
          }
        });
      }
    }
  };
  animation.infiniteLeft();
  animation.infiniteRight();
  animation.initHover();
  animation.initHoverRight();
  animation.infiniteTop();
  animation.infiniteBottom();
  animation.infiniteIconRight();
  animation.initTopNavMarquee();
});
class ModalAnimation {
  constructor() {
    this.modalAction = null;
    this.modalOverlay = null;
    this.modalCloseBtn = null;
    this.modalContent = null;
    this.isModalOpen = false;
    this.animationConfig = {
      open: {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      },
      close: {
        opacity: 0,
        y: -50,
        duration: 0.2,
        ease: "power2.in"
      }
    };
  }
  init() {
    this.cacheElements();
    this.bindEvents();
  }
  cacheElements() {
    this.modalAction = document.querySelector(".modal-action");
    this.modalOverlay = document.querySelector(".modal-overlay");
    this.modalCloseBtn = document.querySelector(".modal-close-btn");
    this.modalContent = document.querySelector(".modal-content");
  }
  bindEvents() {
    var _a, _b, _c;
    (_a = this.modalAction) == null ? void 0 : _a.addEventListener("click", () => this.openModal());
    (_b = this.modalCloseBtn) == null ? void 0 : _b.addEventListener("click", () => this.closeModal());
    (_c = this.modalOverlay) == null ? void 0 : _c.addEventListener("click", (e) => {
      if (e.target === this.modalOverlay) {
        this.closeModal();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isModalOpen) {
        this.closeModal();
      }
    });
  }
  async closeModal() {
    if (!this.isModalOpen || !this.modalOverlay) return;
    this.isModalOpen = false;
    document.body.style.overflow = "auto";
    try {
      if (this.modalContent) {
        await gsap.to(this.modalContent, {
          ...this.animationConfig.close,
          onComplete: () => {
            this.modalOverlay.classList.remove("modal-open");
            this.modalOverlay.classList.add("modal-close");
          }
        });
      } else {
        this.modalOverlay.classList.remove("modal-open");
        this.modalOverlay.classList.add("modal-close");
      }
    } catch (error) {
      console.error("Error closing modal:", error);
    }
  }
  openModal() {
    if (this.isModalOpen || !this.modalOverlay) return;
    this.isModalOpen = true;
    document.body.style.overflow = "hidden";
    this.modalOverlay.classList.remove("modal-close");
    this.modalOverlay.classList.add("modal-open");
    if (this.modalContent) {
      gsap.set(this.modalContent, {
        opacity: 0,
        y: -50
      });
      gsap.to(this.modalContent, this.animationConfig.open);
    }
  }
}
const modalAnimation = new ModalAnimation();
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      modalAnimation.init();
    });
  } else {
    modalAnimation.init();
  }
}
const sidebarAnimation = {
  elements: null,
  init() {
    try {
      this.cacheElements();
      this.bindEvents();
    } catch (error) {
      console.error("Sidebar animation initialization failed:", error);
    }
  },
  cacheElements() {
    this.elements = {
      navHamburger: document.querySelector(".nav-hamburger"),
      navHamburgerClose: document.querySelector(".nav-hamburger-close"),
      sidebar: document.querySelector(".sidebar"),
      subMenu: document.querySelectorAll(".sub-menu")
    };
  },
  bindEvents() {
    const { navHamburger, navHamburgerClose, subMenu } = this.elements;
    if (navHamburger) {
      navHamburger.addEventListener("click", () => {
        this.elements.sidebar.classList.add("show-sidebar");
        document.body.classList.add("overflow-hidden");
      });
    }
    if (navHamburgerClose) {
      navHamburgerClose.addEventListener("click", () => {
        this.elements.sidebar.classList.remove("show-sidebar");
        document.body.classList.remove("overflow-hidden");
      });
    }
    subMenu.forEach((menu) => {
      menu.addEventListener("click", () => {
        menu.classList.toggle("active-menu");
        menu.nextElementSibling.classList.toggle("hidden");
        menu.children[1].classList.toggle("rotate-90");
        subMenu.forEach((otherMenu) => {
          if (otherMenu !== menu) {
            otherMenu.nextElementSibling.classList.add("hidden");
            otherMenu.children[1].classList.remove("rotate-90");
            otherMenu.classList.remove("active-menu");
          }
        });
      });
    });
  }
};
if (typeof window !== "undefined") {
  sidebarAnimation.init();
}
const testimonials = [
  {
    name: "Jessica Lee",
    position: "Head of customer Success",
    image: "images/avatar/avatar-9.png",
    quote: "The investment insights are clear, easy to understand and follow. I love the automation and feel like I'm making real progress every day."
  },
  {
    name: "Mark Thompson",
    position: "Marketing Director",
    image: "images/avatar/avatar-10.png",
    quote: "This platform helps our team move faster, stay aligned, and reduce errors. It's a powerful tool that boosts productivity all around."
  },
  {
    name: "Amina Yusuf",
    position: "Product Manager",
    image: "images/avatar/avatar-11.png",
    quote: "Our planning is finally clear and consistent. I feel more confident in how my team executes tasks and reaches project goals on time."
  },
  {
    name: "Leo Chen",
    position: "Founder, ScaleX",
    image: "images/avatar/avatar-13.png",
    quote: "The design is clean and the interface is effortless to use. It saves time, improves clarity, and just makes everything run smoother."
  },
  {
    name: "John Doe",
    position: "CEO",
    image: "images/avatar/avatar-14.png",
    quote: "A great platform for managing projects with clarity and speed. It's intuitive, efficient, and keeps everyone on the same page easily."
  }
];
const sliderAnimation = {
  init() {
    let currentIndex = 0;
    const avatarImgs = document.querySelectorAll(".testimonial-avatar");
    const quoteEl = document.querySelector("#testimonial-quote h3");
    const nameEl = document.querySelector("#testimonial-info h4");
    const positionEl = document.querySelector("#testimonial-info p");
    if (avatarImgs.length < 5 || !quoteEl || !nameEl || !positionEl) {
      return;
    }
    function updateAvatarImages() {
      for (let i = 0; i < 5; i++) {
        const avatarIndex = (currentIndex + i - 2 + testimonials.length) % testimonials.length;
        const testimonial = testimonials[avatarIndex];
        const imgEl = avatarImgs[i];
        if (!imgEl) continue;
        imgEl.src = testimonial.image;
        imgEl.alt = `${testimonial.name}'s avatar`;
        gsap.fromTo(
          imgEl,
          {
            opacity: 1,
            scale: 1.1
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            delay: i * 0.05,
            ease: "power2.out"
          }
        );
      }
    }
    function updateTextContent() {
      const t = testimonials[currentIndex];
      if (quoteEl) {
        gsap.to(quoteEl, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          onComplete: () => {
            quoteEl.textContent = `"${t.quote}"`;
            gsap.to(quoteEl, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
      }
      if (nameEl) {
        gsap.to(nameEl, {
          opacity: 0,
          y: 5,
          duration: 0.2,
          onComplete: () => {
            nameEl.textContent = t.name;
            gsap.to(nameEl, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
      }
      if (positionEl) {
        gsap.to(positionEl, {
          opacity: 0,
          y: 5,
          duration: 0.2,
          onComplete: () => {
            positionEl.textContent = t.position;
            gsap.to(positionEl, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
      }
    }
    function updateTestimonial() {
      updateAvatarImages();
      updateTextContent();
    }
    updateTestimonial();
    setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateTestimonial();
    }, 3e3);
  }
};
if (typeof window !== "undefined") {
  sliderAnimation.init();
}
const svgDraw = () => {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
  const selectors = ["#svg-one", "#svg-two", "#svg-three"];
  gsap.set(selectors.join(", "), { visibility: "visible" });
  if (selectors.length > 0) {
    selectors.forEach((selector) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: selector,
          start: "top 80%"
        }
      });
      tl.from(selector, {
        duration: 1,
        drawSVG: 1,
        delay: 0.5,
        ease: "power2.out"
      });
    });
  }
};
if (typeof window !== "undefined") {
  svgDraw();
}
function initReviewsSwiper() {
  const reviewsSwiper = new Swiper(".reviews-swiper", {
    slidesPerView: 1,
    padding: 10,
    spaceBetween: 70,
    loop: true,
    centeredSlides: true,
    speed: 1500,
    effect: "slide",
    autoplay: {
      delay: 3e3,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: ".reviews-next",
      prevEl: ".reviews-prev"
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
        centeredSlides: true
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 32,
        centeredSlides: true
      }
    },
    on: {
      slideChange: function() {
        const slides = this.slides;
        slides.forEach((slide, index) => {
          if (index === this.activeIndex) {
            slide.style.transition = "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          } else {
            slide.style.transition = "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          }
        });
      },
      slideChangeTransitionStart: function() {
        const activeSlide = this.slides[this.activeIndex];
        if (activeSlide) {
          const elements = activeSlide.querySelectorAll(
            ".review-text, .review-name, .review-title, .avatar-ring"
          );
          elements.forEach((el) => {
            el.style.animation = "none";
            el.offsetHeight;
            el.style.animation = null;
          });
        }
      }
    }
  });
  const singleCardReviewsSwiper = new Swiper(".single-card-reviews-swiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    centeredSlides: true,
    speed: 1100,
    allowTouchMove: false,
    autoplay: {
      delay: 4e3,
      disableOnInteraction: true
    },
    navigation: {
      nextEl: ".single-card-reviews-next",
      prevEl: ".single-card-reviews-prev"
    },
    on: {
      init: function() {
        const activeSlide = this.slides[this.activeIndex];
        if (activeSlide) {
          activeSlide.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          activeSlide.style.transform = "scale(1)";
          activeSlide.style.opacity = "1";
          activeSlide.style.filter = "blur(0)";
        }
      },
      slideChange: function() {
        const slides = this.slides;
        slides.forEach((slide) => {
          slide.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          slide.style.transform = "scale(0.8)";
          slide.style.opacity = "0.3";
          slide.style.filter = "blur(3px)";
        });
      },
      slideChangeTransitionStart: function() {
        const activeSlide = this.slides[this.activeIndex];
        if (activeSlide) {
          activeSlide.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          activeSlide.style.transform = "scale(1)";
          activeSlide.style.opacity = "1";
          activeSlide.style.filter = "blur(0)";
        }
      }
    }
  });
  const reviewsFadeInSwiper = new Swiper(".reviews-fade-in-swiper", {
    // modules: [Navigation, Pagination, Autoplay, EffectFade],
    slidesPerView: 1,
    spaceBetween: 70,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    speed: 1e3,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    navigation: {
      nextEl: ".reviews-fade-in-next",
      prevEl: ".reviews-fade-in-prev"
    },
    pagination: {
      el: ".reviews-fade-in-pagination",
      clickable: true,
      dynamicBullets: true
    },
    on: {
      init: function() {
        const style = document.createElement("style");
        style.textContent = `
              .reviews-fade-in-swiper .swiper-slide {
                transition: opacity 0.8s ease-out, transform 0.8s ease-out, filter 0.8s ease-out;
                opacity: 0;
                transform: scale(0.6);
                filter: blur(7px);
              }
              .reviews-fade-in-swiper .swiper-slide-active {
                opacity: 1;
                transform: scale(1);
                filter: blur(0);
              }
              .reviews-fade-in-swiper .swiper-slide-prev,
              .reviews-fade-in-swiper .swiper-slide-next {
                opacity: 0;
                transform: scale(0.6);
                filter: blur(7px);
              }
              .reviews-fade-in-swiper .swiper-slide .review-text,
              .reviews-fade-in-swiper .swiper-slide .review-name,
              .reviews-fade-in-swiper .swiper-slide .review-title,
              .reviews-fade-in-swiper .swiper-slide .avatar-ring {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.4s ease-out, transform 0.4s ease-out;
              }
              .reviews-fade-in-swiper .swiper-slide-active .review-text,
              .reviews-fade-in-swiper .swiper-slide-active .review-name,
              .reviews-fade-in-swiper .swiper-slide-active .review-title,
              .reviews-fade-in-swiper .swiper-slide-active .avatar-ring {
                opacity: 1;
                transform: translateY(0);
              }
            `;
        document.head.appendChild(style);
      },
      slideChangeTransitionStart: function() {
        const slides = this.slides;
        slides.forEach((slide) => {
          const elements = slide.querySelectorAll(
            ".review-text, .review-name, .review-title, .avatar-ring"
          );
          elements.forEach((el) => {
            el.style.animation = "none";
            el.style.transition = "none";
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
          });
        });
      },
      slideChangeTransitionEnd: function() {
        const activeSlide = this.slides[this.activeIndex];
        if (activeSlide) {
          const elements = activeSlide.querySelectorAll(
            ".review-text, .review-name, .review-title, .avatar-ring"
          );
          elements.forEach((el) => {
            el.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";
          });
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, index * 100);
          });
        }
      }
    }
  });
  const customStyles = document.createElement("style");
  customStyles.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(customStyles);
  const blogArticleSwiper = new Swiper(".blog-article-swiper", {
    slidesPerView: 1,
    spaceBetween: 40,
    loop: true,
    effect: "slide",
    speed: 1e3,
    autoplay: {
      delay: 4e3,
      disableOnInteraction: false
    },
    pagination: {
      el: ".pagination-bullets",
      clickable: true,
      type: "bullets"
    },
    on: {
      slideChange: function() {
        const slides = this.slides;
        slides.forEach((slide, index) => {
          if (index === this.activeIndex) {
            slide.style.transition = "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          } else {
            slide.style.transition = "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          }
        });
      }
    }
  });
  return {
    reviewsSwiper,
    singleCardReviewsSwiper,
    reviewsFadeInSwiper,
    blogArticleSwiper
  };
}
initReviewsSwiper();
const tabAnimation = {
  // Configuration
  config: {
    animation: {
      duration: 0.3,
      delay: 0.05,
      ease: "power2.out",
      y: 20
    },
    mobile: {
      activeBg: "#864ffe",
      activeColor: "white",
      activeBorder: "#5a19be",
      scale: 1.05
    }
  },
  // State
  state: {
    currentIndex: 0,
    isInitialized: false
  },
  // Cached elements
  elements: {
    tabBarBtns: null,
    tabContent: null,
    activeTabBar: null,
    mobileTabBtns: null
  },
  init() {
    try {
      if (this.state.isInitialized) {
        return;
      }
      this.cacheElements();
      if (!this.hasRequiredElements()) {
        return;
      }
      this.validateElements();
      this.setupEventListeners();
      this.initializeFirstTab();
      this.setupResizeHandler();
      this.state.isInitialized = true;
    } catch (error) {
      console.error("Tab animation initialization failed:", error);
    }
  },
  cacheElements() {
    this.elements = {
      tabBarBtns: document.querySelectorAll(".tab-bar button"),
      tabContent: document.querySelectorAll(".tab-content"),
      activeTabBar: document.querySelector(".active-tab-bar"),
      mobileTabBtns: document.querySelectorAll(".tab-mobile button")
    };
  },
  hasRequiredElements() {
    const { tabBarBtns, mobileTabBtns, tabContent } = this.elements;
    const hasButtons = tabBarBtns.length > 0 || mobileTabBtns.length > 0;
    const hasContent = tabContent.length > 0;
    return hasButtons && hasContent;
  },
  validateElements() {
    const { tabBarBtns, mobileTabBtns } = this.elements;
    if (!tabBarBtns.length && !mobileTabBtns.length) {
      throw new Error("Tab elements not found");
    }
  },
  setupEventListeners() {
    this.setupDesktopTabs();
    this.setupMobileTabs();
  },
  setupDesktopTabs() {
    const { tabBarBtns } = this.elements;
    if (!tabBarBtns.length) return;
    this.setupAccessibility(tabBarBtns);
    tabBarBtns.forEach((btn, index) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.switchToTab(index);
      });
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.switchToTab(index);
        }
      });
    });
  },
  setupMobileTabs() {
    const { mobileTabBtns } = this.elements;
    if (!mobileTabBtns.length) return;
    this.setupAccessibility(mobileTabBtns, "mobile-tab");
    mobileTabBtns.forEach((btn, index) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.switchToMobileTab(index);
      });
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.switchToMobileTab(index);
        }
      });
    });
  },
  setupAccessibility(buttons, idPrefix = "tab") {
    buttons.forEach((btn, index) => {
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-controls", `${idPrefix}-${index}`);
      btn.setAttribute("id", `${idPrefix}-${index}`);
    });
  },
  initializeFirstTab() {
    const { tabBarBtns, mobileTabBtns } = this.elements;
    if (tabBarBtns.length > 0) {
      this.updateButtonStates(tabBarBtns, 0);
      this.updateActiveTabBar(tabBarBtns[0]);
      this.switchTabContent(0, -1);
    }
    if (mobileTabBtns.length > 0) {
      this.updateMobileButtonStates(mobileTabBtns, 0);
      this.switchTabContent(0, -1);
    }
  },
  setupResizeHandler() {
    const { activeTabBar, tabBarBtns } = this.elements;
    if (!activeTabBar || !tabBarBtns.length) return;
    const handleResize = () => {
      if (tabBarBtns[this.state.currentIndex]) {
        this.updateActiveTabBar(tabBarBtns[this.state.currentIndex]);
      }
    };
    window.addEventListener("resize", handleResize);
  },
  updateButtonStates(buttons, activeIndex) {
    buttons.forEach((btn, index) => {
      const isActive = index === activeIndex;
      btn.setAttribute("data-state", isActive ? "selected" : "");
      btn.setAttribute("aria-selected", isActive);
      btn.setAttribute("tabindex", isActive ? "0" : "-1");
    });
  },
  updateMobileButtonStates(buttons, activeIndex) {
    const { mobile } = this.config;
    buttons.forEach((btn, index) => {
      const isActive = index === activeIndex;
      if (isActive) {
        btn.classList.add("mobile-tab-active");
        Object.assign(btn.style, {
          backgroundColor: mobile.activeBg,
          color: mobile.activeColor,
          borderColor: mobile.activeBorder,
          transform: `scale(${mobile.scale})`
        });
      } else {
        btn.classList.remove("mobile-tab-active");
        Object.assign(btn.style, {
          backgroundColor: "",
          color: "",
          borderColor: "",
          transform: ""
        });
      }
      btn.setAttribute("aria-selected", isActive);
      btn.setAttribute("tabindex", isActive ? "0" : "-1");
    });
  },
  updateActiveTabBar(activeButton) {
    const { activeTabBar } = this.elements;
    if (!activeTabBar || !activeButton) return;
    const left = activeButton.offsetLeft - activeTabBar.offsetLeft;
    const width = activeButton.offsetWidth;
    activeTabBar.style.setProperty("--_left", `${left}px`);
    activeTabBar.style.setProperty("--_width", `${width}px`);
  },
  switchTabContent(targetIndex, previousIndex) {
    const { tabContent } = this.elements;
    const { animation } = this.config;
    tabContent.forEach((content, index) => {
      if (targetIndex === index) {
        const displayType = content.getAttribute("data-display") || "flex";
        content.style.display = displayType;
        content.setAttribute("aria-hidden", "false");
        if (previousIndex !== targetIndex && typeof gsap !== "undefined") {
          gsap.fromTo(
            content,
            {
              opacity: 0,
              y: animation.y
            },
            {
              opacity: 1,
              y: 0,
              duration: animation.duration,
              delay: animation.delay,
              ease: animation.ease
            }
          );
        }
      } else {
        content.style.display = "none";
        content.setAttribute("aria-hidden", "true");
      }
    });
  },
  switchToTab(targetIndex) {
    const { tabBarBtns } = this.elements;
    if (targetIndex < 0 || targetIndex >= tabBarBtns.length) return;
    const previousIndex = this.state.currentIndex;
    this.state.currentIndex = targetIndex;
    this.updateButtonStates(tabBarBtns, targetIndex);
    this.updateActiveTabBar(tabBarBtns[targetIndex]);
    this.switchTabContent(targetIndex, previousIndex);
  },
  switchToMobileTab(targetIndex) {
    const { mobileTabBtns } = this.elements;
    if (targetIndex < 0 || targetIndex >= mobileTabBtns.length) return;
    const previousIndex = this.state.currentIndex;
    this.state.currentIndex = targetIndex;
    this.updateMobileButtonStates(mobileTabBtns, targetIndex);
    this.switchTabContent(targetIndex, previousIndex);
  }
};
function isDOMReady() {
  return document.readyState === "loading" ? false : true;
}
function waitForDOM() {
  return new Promise((resolve) => {
    if (isDOMReady()) {
      resolve();
    } else {
      document.addEventListener("DOMContentLoaded", resolve);
    }
  });
}
async function initializeTabAnimation() {
  try {
    await waitForDOM();
    const hasDesktopButtons = !!document.querySelector(".tab-bar button");
    const hasMobileButtons = !!document.querySelector(".tab-mobile button");
    const hasContent = !!document.querySelector(".tab-content");
    if ((hasDesktopButtons || hasMobileButtons) && hasContent && !tabAnimation.state.isInitialized) {
      tabAnimation.init();
    }
  } catch (error) {
    console.error("Failed to initialize tab animation:", error);
  }
}
if (typeof window !== "undefined") {
  initializeTabAnimation();
}
let tabFilterInitialized = false;
const tabFilter = {
  init() {
    if (tabFilterInitialized) return;
    const tabBarBtns = document.querySelectorAll(".tab-bar button");
    const activeTabBar = document.querySelector(".active-tab-bar");
    const mobileTabBtns = document.querySelectorAll(
      ".flex.items-center.flex-wrap.md\\:hidden button"
    );
    const blogArticles = document.querySelectorAll("article");
    if (!tabBarBtns.length && !mobileTabBtns.length) {
      return;
    }
    if (!blogArticles.length) {
      return;
    }
    let currentIndex = 0;
    const getArticleCategory = (article) => {
      const badge = article.querySelector(".badge");
      if (!badge) return "";
      return badge.textContent.trim().toLowerCase();
    };
    const getFilterCategories = (buttons) => {
      return Array.from(buttons).map((btn) => {
        const text = btn.textContent.trim().toLowerCase();
        return text === "ai software" ? "ai software" : text;
      });
    };
    const updateButtonStates = (buttons, activeIndex) => {
      buttons.forEach((btn, index) => {
        const isActive = index === activeIndex;
        btn.setAttribute("data-state", isActive ? "selected" : "");
        btn.setAttribute("aria-selected", isActive);
        btn.setAttribute("tabindex", isActive ? "0" : "-1");
        if (isActive) {
          btn.classList.add("filter-active");
        } else {
          btn.classList.remove("filter-active");
        }
      });
    };
    const updateMobileButtonStates = (buttons, activeIndex) => {
      buttons.forEach((btn, index) => {
        const isActive = index === activeIndex;
        if (isActive) {
          btn.classList.add("mobile-filter-active");
          btn.style.backgroundColor = "#864ffe";
          btn.style.color = "white";
          btn.style.borderColor = "#5a19be";
          btn.style.transform = "scale(1.05)";
        } else {
          btn.classList.remove("mobile-filter-active");
          btn.style.backgroundColor = "";
          btn.style.color = "";
          btn.style.borderColor = "";
          btn.style.transform = "";
        }
        btn.setAttribute("aria-selected", isActive);
        btn.setAttribute("tabindex", isActive ? "0" : "-1");
      });
    };
    const updateActiveTabBar = (activeButton) => {
      if (!activeTabBar || !activeButton) return;
      const left = activeButton.offsetLeft - activeTabBar.offsetLeft;
      const width = activeButton.offsetWidth;
      activeTabBar.style.setProperty("--_left", `${left}px`);
      activeTabBar.style.setProperty("--_width", `${width}px`);
    };
    const filterArticles = (articles, filterCategory) => {
      const filtered = [];
      const hidden = [];
      articles.forEach((article) => {
        const articleCategory = getArticleCategory(article);
        const shouldShow = filterCategory === "all" || articleCategory === filterCategory || filterCategory === "ai software" && articleCategory === "ai software";
        if (shouldShow) {
          filtered.push(article);
        } else {
          hidden.push(article);
        }
      });
      return { filtered, hidden };
    };
    const animateFilter = async (filtered, hidden) => {
      const allArticles = [...filtered, ...hidden];
      const allContainers = allArticles.map((article) => article.closest(".col-span-12")).filter(Boolean);
      const canAnimate = typeof gsap !== "undefined" && gsap && typeof gsap.to === "function";
      if (!canAnimate) {
        hidden.forEach((article) => {
          const container = article.closest(".col-span-12");
          if (container) {
            container.style.display = "none";
            container.setAttribute("aria-hidden", "true");
          }
        });
        filtered.forEach((article) => {
          const container = article.closest(".col-span-12");
          if (container) {
            container.style.display = "block";
            container.setAttribute("aria-hidden", "false");
            container.style.opacity = "1";
            container.style.transform = "none";
            container.style.filter = "none";
          }
        });
        return;
      }
      const fadeOutTweens = allContainers.map(
        (container) => gsap.to(container, {
          opacity: 0,
          scale: 0.95,
          filter: "blur(4px)",
          duration: 0.3,
          ease: "power2.inOut"
        })
      );
      await Promise.all(fadeOutTweens.map((tween) => tween.then()));
      hidden.forEach((article) => {
        const container = article.closest(".col-span-12");
        if (container) {
          container.style.display = "none";
          container.setAttribute("aria-hidden", "true");
        }
      });
      filtered.forEach((article) => {
        const container = article.closest(".col-span-12");
        if (container) {
          container.style.display = "block";
          container.setAttribute("aria-hidden", "false");
          container.style.opacity = "0";
          container.style.transform = "scale(0.95)";
          container.style.filter = "blur(4px)";
        }
      });
      const filteredContainers = filtered.map((article) => article.closest(".col-span-12")).filter(Boolean);
      const fadeInTweens = filteredContainers.map(
        (container, index) => gsap.to(container, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.5,
          delay: index * 0.1,
          ease: "power2.out"
        })
      );
      await Promise.all(fadeInTweens.map((tween) => tween.then()));
    };
    const applyFilter = async (articles, filterCategory) => {
      const { filtered, hidden } = filterArticles(articles, filterCategory);
      await animateFilter(filtered, hidden);
      const filterEvent = new CustomEvent("blogFiltered", {
        detail: {
          category: filterCategory,
          filteredCount: filtered.length,
          totalCount: articles.length
        }
      });
      document.dispatchEvent(filterEvent);
    };
    const switchToFilter = async (targetIndex, buttons, articles) => {
      if (targetIndex < 0 || targetIndex >= buttons.length) return;
      const categories = getFilterCategories(buttons);
      const targetCategory = categories[targetIndex];
      currentIndex = targetIndex;
      if (buttons[0].closest(".tab-bar")) {
        updateButtonStates(buttons, targetIndex);
        updateActiveTabBar(buttons[targetIndex]);
      } else {
        updateMobileButtonStates(buttons, targetIndex);
      }
      await applyFilter(articles, targetCategory);
    };
    const setupAccessibility = (buttons, idPrefix = "filter") => {
      buttons.forEach((btn, index) => {
        btn.setAttribute("role", "tab");
        btn.setAttribute("aria-controls", `${idPrefix}-${index}`);
        btn.setAttribute("id", `${idPrefix}-${index}`);
      });
    };
    if (tabBarBtns.length > 0) {
      setupAccessibility(tabBarBtns, "filter");
      tabBarBtns.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          switchToFilter(index, tabBarBtns, blogArticles);
        });
        btn.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            switchToFilter(index, tabBarBtns, blogArticles);
          }
        });
      });
      updateButtonStates(tabBarBtns, 0);
      updateActiveTabBar(tabBarBtns[0]);
      applyFilter(blogArticles, getFilterCategories(tabBarBtns)[0]);
    }
    if (mobileTabBtns.length > 0) {
      setupAccessibility(mobileTabBtns, "mobile-filter");
      mobileTabBtns.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          switchToFilter(index, mobileTabBtns, blogArticles);
        });
        btn.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            switchToFilter(index, mobileTabBtns, blogArticles);
          }
        });
      });
      updateMobileButtonStates(mobileTabBtns, 0);
      applyFilter(blogArticles, getFilterCategories(mobileTabBtns)[0]);
    }
    if (activeTabBar && tabBarBtns.length > 0) {
      const handleResize = () => {
        if (tabBarBtns[currentIndex]) {
          updateActiveTabBar(tabBarBtns[currentIndex]);
        }
      };
      window.addEventListener("resize", handleResize);
    }
    const filterCSS = `
      .filter-active {
        transition: all 0.3s ease;
      }
      
      .grid {
        position: relative;
      }
      
      .grid > div {
        will-change: opacity, transform, filter;
      }
      
      .grid > div[aria-hidden="true"] {
        opacity: 0;
        transform: scale(0.95);
        filter: blur(4px);
        pointer-events: none;
      }
      
      .grid > div[aria-hidden="false"] {
        opacity: 1;
        transform: scale(1);
        filter: blur(0px);
        pointer-events: auto;
      }
      
      /* Smooth transitions for tab bar */
      .tab-bar button {
        transition: color 0.3s ease, background-color 0.3s ease;
      }
      
      /* Mobile filter button styles */
      .flex.items-center.flex-wrap.md\\:hidden button {
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        position: relative;
        overflow: hidden;
      }
      
      .flex.items-center.flex-wrap.md\\:hidden button:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
      
      /* Ensure proper stacking context for animations */
      .grid > div article {
        transform-origin: center;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }
      
      /* Reduce motion for users who prefer it */
      @media (prefers-reduced-motion: reduce) {
        .grid > div,
        .flex.items-center.flex-wrap.md\\:hidden button {
          transition: none;
          transform: none !important;
        }
      }
    `;
    if (!document.querySelector("#tab-filter-styles")) {
      const style = document.createElement("style");
      style.id = "tab-filter-styles";
      style.textContent = filterCSS;
      document.head.appendChild(style);
    }
    tabFilterInitialized = true;
  }
};
if (typeof window !== "undefined") {
  const checkAndInit = () => {
    const hasDesktopButtons = !!document.querySelector(".tab-bar button");
    const hasMobileButtons = !!document.querySelector(
      ".flex.items-center.flex-wrap.md\\:hidden button"
    );
    if ((hasDesktopButtons || hasMobileButtons) && !tabFilterInitialized) {
      tabFilter.init();
    }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkAndInit);
  } else {
    checkAndInit();
  }
}
function dividerExpand(divider) {
  gsap.to(divider, {
    scrollTrigger: {
      trigger: divider,
      start: "top 100%",
      end: "top 50%",
      scrub: false,
      toggleActions: "play none none none"
    },
    width: "100%",
    duration: 1,
    delay: 0.7,
    ease: "power2.out"
  });
}
const commonAnimation = {
  init() {
    const divider = document.querySelector(".divider");
    const footerDivider = document.querySelector(".footer-divider");
    const progressContainer = document.querySelector(".progress-container");
    const progressLine = document.querySelectorAll(".progress-line");
    const scrollExpand = document.querySelector(".scroll-expand");
    const stepLine = document.querySelectorAll(".step-line");
    const splitTextTeamTitle = document.querySelector(".split-text-team-title");
    const heroPerspective = document.querySelector(".hero-perspective");
    const heroLines = document.querySelectorAll("[data-hero-line]");
    const featureCard1 = document.querySelector(".feature-card-1");
    const featureCard2 = document.querySelector(".feature-card-2");
    const featureCard3 = document.querySelector(".feature-card-3");
    if (divider) {
      dividerExpand(divider);
    }
    if (footerDivider) {
      dividerExpand(footerDivider);
    }
    if (progressLine.length > 0) {
      gsap.set(progressLine, { width: "0%" });
      const progressTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: progressContainer,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
      progressLine.forEach((line, index) => {
        progressTimeline.to(
          line,
          {
            width: "100%",
            duration: 2,
            ease: "power2.inOut"
          },
          index * 2
          // Each animation starts after the previous one completes (2 seconds duration)
        );
      });
    }
    if (scrollExpand) {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        gsap.set(scrollExpand, { minWidth: "auto" });
      } else {
        gsap.set(scrollExpand, { minWidth: "500px" });
        ScrollTrigger.create({
          trigger: scrollExpand,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => {
            gsap.to(scrollExpand, {
              minWidth: "950px",
              duration: 0.5,
              ease: "power2.out"
            });
          },
          onEnterBack: () => {
            gsap.to(scrollExpand, {
              minWidth: "950px",
              duration: 0.5,
              ease: "power2.out"
            });
          },
          onLeaveBack: () => {
            gsap.to(scrollExpand, {
              minWidth: "500px",
              duration: 0.5,
              ease: "power2.out"
            });
          }
        });
      }
    }
    if (stepLine.length > 0) {
      gsap.set(stepLine, { height: "0px" });
      stepLine.forEach((line, index) => {
        gsap.to(line, {
          height: "380px",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: line,
            start: "top 75%",
            end: "top 15%",
            toggleActions: "play none none reverse",
            // Add a small stagger delay for sequential feel
            onEnter: () => {
              gsap.delayedCall(index * 0.15, () => {
                gsap.to(line, {
                  height: "380px",
                  duration: 1.5,
                  ease: "power3.out"
                });
              });
            }
          }
        });
      });
    }
    if (splitTextTeamTitle) {
      gsap.registerPlugin(SplitText);
      const splitType = splitTextTeamTitle.getAttribute("data-split-type") || "chars";
      let split = SplitText.create(".split-text-team-title", { type: splitType });
      gsap.from(split[splitType], {
        scrollTrigger: {
          trigger: splitTextTeamTitle,
          start: "top 80%",
          end: "top 20%",
          scrub: true
        },
        opacity: 0.1,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
      });
    }
    if (heroPerspective) {
      gsap.set(heroPerspective, {
        opacity: 0,
        filter: "blur(20px)",
        transform: "perspective(1200px) scale(0.896871) rotateX(14.4381deg)"
      });
      ScrollTrigger.create({
        trigger: heroPerspective,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(heroPerspective, {
            opacity: 1,
            filter: "blur(0px)",
            transform: "perspective(1200px) scale(1) rotateX(0deg)",
            duration: 0.8,
            delay: 0.7,
            ease: "power2.out"
          });
        }
      });
    }
    if (heroLines.length > 0) {
      heroLines.forEach((line) => {
        gsap.to(line, {
          height: "100%",
          duration: 0.8,
          delay: 0.7,
          ease: "power2.out"
        });
      });
    }
    if (featureCard1) {
      gsap.from(featureCard1, {
        x: 100,
        rotation: 0,
        duration: 0.8,
        delay: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featureCard1,
          start: "top 90%",
          end: "bottom 20%",
          scrub: 2
        }
      });
    }
    if (featureCard2) {
      gsap.from(featureCard2, {
        rotation: 10,
        duration: 0.8,
        delay: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featureCard1,
          start: "top 90%",
          end: "bottom 20%",
          scrub: 2
        }
      });
    }
    if (featureCard3) {
      gsap.from(featureCard3, {
        x: -100,
        rotation: 0,
        duration: 0.8,
        delay: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featureCard1,
          start: "top 90%",
          end: "bottom 20%",
          scrub: 2
        }
      });
    }
  }
};
if (typeof window !== "undefined") {
  commonAnimation.init();
}
class NavigationMenu {
  constructor() {
    this.activeMenu = null;
    this.menuTimeout = null;
    this.isMouseInHeader = false;
    this.isMouseInMenu = false;
    this.init();
  }
  init() {
    this.bindEvents();
  }
  bindEvents() {
    const navItems = document.querySelectorAll(".nav-item[data-menu]");
    navItems.forEach((item) => {
      const menuId = item.getAttribute("data-menu");
      const menu = document.getElementById(menuId);
      if (!menu) return;
      item.addEventListener("mouseenter", (e) => {
        this.showMenu(item, menu);
      });
      item.addEventListener("mouseleave", (e) => {
        const relatedTarget = e.relatedTarget;
        if (!relatedTarget || !menu.contains(relatedTarget)) {
          this.scheduleHideMenu();
        }
      });
      menu.addEventListener("mouseenter", (e) => {
        this.cancelHideMenu();
        this.showMenu(item, menu);
      });
      menu.addEventListener("mouseleave", (e) => {
        const relatedTarget = e.relatedTarget;
        if (!relatedTarget || !item.contains(relatedTarget)) {
          this.scheduleHideMenu();
        }
      });
    });
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (target && typeof target.closest === "function") {
        if (!target.closest(".nav-item") && !target.closest(".mega-menu, .dropdown-menu")) {
          this.hideAllMenus();
        }
      }
    });
    const header = document.querySelector("header");
    if (header) {
      header.addEventListener("mouseenter", () => {
        this.isMouseInHeader = true;
        this.cancelHideMenu();
      });
      header.addEventListener("mouseleave", (e) => {
        this.isMouseInHeader = false;
        const relatedTarget = e.relatedTarget;
        const isMovingToMenu = relatedTarget && (relatedTarget.closest(".mega-menu") || relatedTarget.closest(".dropdown-menu"));
        if (!isMovingToMenu) {
          this.scheduleHideMenu();
        }
      });
    }
    document.addEventListener(
      "mouseenter",
      (e) => {
        const target = e.target;
        if (target && typeof target.closest === "function") {
          if (target.closest(".mega-menu, .dropdown-menu, .mega-menu-bridge, .dropdown-menu-bridge")) {
            this.isMouseInMenu = true;
            this.cancelHideMenu();
          }
        }
      },
      true
    );
    document.addEventListener(
      "mouseleave",
      (e) => {
        const target = e.target;
        if (target && typeof target.closest === "function") {
          if (target.closest(".mega-menu, .dropdown-menu, .mega-menu-bridge, .dropdown-menu-bridge")) {
            this.isMouseInMenu = false;
            const relatedTarget = e.relatedTarget;
            const isMovingToHeader = relatedTarget && typeof relatedTarget.closest === "function" && (relatedTarget.closest("header") || relatedTarget.closest(".mega-menu") || relatedTarget.closest(".dropdown-menu") || relatedTarget.closest(".mega-menu-bridge") || relatedTarget.closest(".dropdown-menu-bridge"));
            if (!isMovingToHeader) {
              this.scheduleHideMenu();
            }
          }
        }
      },
      true
    );
    document.addEventListener("mouseleave", () => {
      this.hideAllMenus();
    });
  }
  showMenu(navItem, menu) {
    this.cancelHideMenu();
    this.hideAllMenus();
    this.activeMenu = menu;
    navItem.classList.add("active");
    menu.classList.add("active");
    navItem.classList.add("menu-active");
    const bridge = navItem.querySelector(".mega-menu-bridge, .dropdown-menu-bridge");
    if (bridge) {
      bridge.style.opacity = "1";
      bridge.style.pointerEvents = "auto";
    }
    this.dispatchMenuEvent("menu:show", { navItem, menu });
  }
  hideMenu(menu) {
    if (!menu) return;
    const navItem = document.querySelector(`[data-menu="${menu.id}"]`);
    menu.classList.remove("active");
    if (navItem) {
      navItem.classList.remove("active", "menu-active");
      const bridge = navItem.querySelector(".mega-menu-bridge, .dropdown-menu-bridge");
      if (bridge) {
        bridge.style.opacity = "0";
        bridge.style.pointerEvents = "none";
      }
    }
    if (this.activeMenu === menu) {
      this.activeMenu = null;
    }
    this.dispatchMenuEvent("menu:hide", { navItem, menu });
  }
  hideAllMenus() {
    const allMenus = document.querySelectorAll(".mega-menu, .dropdown-menu");
    const allNavItems = document.querySelectorAll(".nav-item[data-menu]");
    allMenus.forEach((menu) => this.hideMenu(menu));
    allNavItems.forEach((item) => {
      item.classList.remove("active", "menu-active");
    });
    this.activeMenu = null;
  }
  scheduleHideMenu() {
    this.cancelHideMenu();
    this.menuTimeout = setTimeout(() => {
      if (!this.isMouseInHeader && !this.isMouseInMenu) {
        this.hideAllMenus();
      }
    }, 200);
  }
  cancelHideMenu() {
    if (this.menuTimeout) {
      clearTimeout(this.menuTimeout);
      this.menuTimeout = null;
    }
  }
  dispatchMenuEvent(eventName, detail) {
    const event = new CustomEvent(eventName, { detail });
    document.dispatchEvent(event);
  }
  // Public methods for external control
  showMenuById(menuId) {
    const navItem = document.querySelector(`[data-menu="${menuId}"]`);
    const menu = document.getElementById(menuId);
    if (navItem && menu) {
      this.showMenu(navItem, menu);
    }
  }
  hideMenuById(menuId) {
    const menu = document.getElementById(menuId);
    if (menu) {
      this.hideMenu(menu);
    }
  }
  toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu && menu.classList.contains("active")) {
      this.hideMenu(menu);
    } else {
      this.showMenuById(menuId);
    }
  }
  // Debug method to check current state
  getDebugInfo() {
    return {
      activeMenu: this.activeMenu ? this.activeMenu.id : null,
      isMouseInHeader: this.isMouseInHeader,
      isMouseInMenu: this.isMouseInMenu,
      hasTimeout: !!this.menuTimeout
    };
  }
}
document.addEventListener("DOMContentLoaded", () => {
  window.navigationMenu = new NavigationMenu();
});
const parallaxEffect = {
  init() {
    const scene = document.getElementById("scene");
    if (scene != null) {
      initializeParallaxEffect();
    }
    function initializeParallaxEffect() {
      if (!scene) return;
      freezeParallaxElements(scene);
      if (document.readyState === "complete") {
        startParallaxAfterLoad();
      } else {
        window.addEventListener("load", startParallaxAfterLoad);
      }
    }
    function freezeParallaxElements(scene2) {
      const parallaxElements = scene2.querySelectorAll(".parallax-effect");
      parallaxElements.forEach((element) => {
        element.style.willChange = "transform";
        element.style.transform = "translate3d(0px, 0px, 0)";
        element.style.transition = "none";
        element.classList.add("parallax-frozen");
      });
    }
    function startParallaxAfterLoad() {
      waitForImagesToLoad(scene, () => {
        setTimeout(() => {
          unfreezeAndStartParallax(scene);
        }, 300);
      });
    }
    function unfreezeAndStartParallax(scene2) {
      const parallaxElements = scene2.querySelectorAll(".parallax-effect");
      parallaxElements.forEach((element) => {
        element.classList.remove("parallax-frozen");
        element.style.transition = "transform 0.3s ease-out";
      });
      setupParallaxAnimation(scene2);
    }
    function waitForImagesToLoad(scene2, onComplete) {
      scene2.querySelectorAll(".parallax-effect");
      const parallaxImages = scene2.querySelectorAll(".parallax-effect img");
      if (parallaxImages.length === 0) {
        onComplete();
        return;
      }
      let loadedCount = 0;
      const totalImages = parallaxImages.length;
      const checkCompletion = () => {
        loadedCount++;
        if (loadedCount >= totalImages) {
          onComplete();
        }
      };
      parallaxImages.forEach((img) => {
        if (img.complete) {
          checkCompletion();
        } else {
          img.addEventListener("load", checkCompletion);
          img.addEventListener("error", checkCompletion);
        }
      });
    }
    function setupParallaxAnimation(scene2) {
      const parallaxElements = scene2.querySelectorAll(".parallax-effect");
      const elementConfigs = createElementConfigs(parallaxElements);
      let isAnimating = false;
      let mouseX = scene2.offsetWidth / 2;
      let mouseY = scene2.offsetHeight / 2;
      initializeElements(elementConfigs);
      updateParallaxPositions(elementConfigs, mouseX, mouseY, scene2);
      const throttledMouseHandler = createThrottledHandler((event) => {
        mouseX = event.pageX;
        mouseY = event.pageY;
        if (!isAnimating) {
          requestAnimationFrame(() => {
            updateParallaxPositions(elementConfigs, mouseX, mouseY, scene2);
            isAnimating = false;
          });
          isAnimating = true;
        }
      });
      scene2.addEventListener("mousemove", throttledMouseHandler, {
        passive: true
      });
      setupPerformanceOptimization(scene2, elementConfigs);
    }
    function createElementConfigs(elements) {
      return Array.from(elements).map((element) => ({
        element,
        depth: parseFloat(element.getAttribute("data-parallax-value")) || 1,
        directionX: parseFloat(element.getAttribute("data-data-parallax-x")) || 1,
        directionY: parseFloat(element.getAttribute("data-data-parallax-y")) || 1,
        movementScale: 25
        // Reduced from 30 for smoother movement
      }));
    }
    function initializeElements(elementConfigs) {
      elementConfigs.forEach(({ element }) => {
        element.style.willChange = "transform";
        element.style.transform = "translateZ(0)";
      });
    }
    function updateParallaxPositions(elementConfigs, mouseX, mouseY, scene2) {
      const centerX = scene2.offsetWidth / 2;
      const centerY = scene2.offsetHeight / 2;
      const relativeX = (mouseX - centerX) / centerX;
      const relativeY = (mouseY - centerY) / centerY;
      elementConfigs.forEach(({ element, depth, directionX, directionY, movementScale }) => {
        if (!element.classList.contains("parallax-frozen")) {
          const moveX = relativeX * depth * directionX * movementScale;
          const moveY = relativeY * depth * directionY * movementScale;
          element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        }
      });
    }
    function createThrottledHandler(handler) {
      let timeoutId = null;
      return (event) => {
        if (timeoutId) return;
        timeoutId = setTimeout(() => {
          handler(event);
          timeoutId = null;
        }, 16);
      };
    }
    function setupPerformanceOptimization(scene2, elementConfigs) {
      let resetTimeout;
      scene2.addEventListener("mouseleave", () => {
        clearTimeout(resetTimeout);
        resetTimeout = setTimeout(() => {
          elementConfigs.forEach(({ element }) => {
            element.style.willChange = "auto";
          });
        }, 1e3);
      });
    }
  }
};
if (typeof window !== "undefined") {
  parallaxEffect.init();
}
const priceSwitcher = {
  // Store DOM elements
  elements: null,
  // Initialize the price switcher
  init() {
    try {
      this.getElements();
      this.addEventListeners();
      this.updatePrices();
    } catch (error) {
      console.error("Price switcher initialization failed:", error);
    }
  },
  // Get all the DOM elements we need
  getElements() {
    this.elements = {
      toggle: document.getElementById("priceCheck"),
      monthlyPrices: document.getElementsByClassName("price-month"),
      yearlyPrices: document.getElementsByClassName("price-year")
    };
  },
  // Update which prices are shown based on toggle state
  updatePrices() {
    const { toggle, monthlyPrices, yearlyPrices } = this.elements;
    if (!toggle) return;
    for (let i = 0; i < monthlyPrices.length; i++) {
      const monthly = monthlyPrices[i];
      const yearly = yearlyPrices[i];
      if (toggle.checked) {
        monthly.style.display = "none";
        yearly.style.display = "block";
      } else {
        monthly.style.display = "block";
        yearly.style.display = "none";
      }
    }
  },
  // Add click event to the toggle
  addEventListeners() {
    const { toggle } = this.elements;
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      this.updatePrices();
    });
  }
};
if (typeof window !== "undefined") {
  priceSwitcher.init();
}
const progressAnimation = {
  init() {
    const items = document.querySelectorAll("[data-progress-item]");
    items.forEach((item, index) => {
      const value = parseInt(item.getAttribute("data-progress-value"), 10) || 0;
      const bar = item.querySelector("[data-progress-bar]");
      const text = item.querySelector("[data-progress-text]");
      const duration = item.getAttribute("data-progress-duration") || 1.5;
      if (!bar || !text) return;
      gsap.set(bar, { width: "0%", opacity: 0.8 });
      gsap.to(bar, {
        width: `${value}%`,
        opacity: 1,
        duration,
        delay: 0.3 + index * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          end: "bottom 15%",
          scrub: false
        }
      });
      gsap.set(text, { opacity: 0 });
      gsap.to(text, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3 + index * 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          end: "bottom 15%",
          scrub: false
        }
      });
      const counter = { val: 0 };
      gsap.to(counter, {
        val: value,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          end: "bottom 15%",
          scrub: false
        },
        onUpdate: () => {
          text.textContent = `${Math.floor(counter.val)}%`;
        }
      });
    });
  }
};
if (typeof window !== "undefined") {
  progressAnimation.init();
}
const initRevealElements = () => {
  const elements = document.querySelectorAll("[data-ns-animate]");
  const Springer = window.Springer.default;
  elements.forEach((elem) => {
    const duration = elem.getAttribute("data-duration") ? parseFloat(elem.getAttribute("data-duration")) : 0.6;
    const delay = elem.getAttribute("data-delay") ? parseFloat(elem.getAttribute("data-delay")) : 0;
    const offset = elem.getAttribute("data-offset") ? parseFloat(elem.getAttribute("data-offset")) : 60;
    const instant = elem.hasAttribute("data-instant") && elem.getAttribute("data-instant") !== "false";
    const start = elem.getAttribute("data-start") || "top 90%";
    const end = elem.getAttribute("data-end") || "top 50%";
    const direction = elem.getAttribute("data-direction") || "down";
    const useSpring = elem.hasAttribute("data-spring");
    const spring = useSpring ? Springer(0.2, 0.8) : null;
    const rotation = elem.getAttribute("data-rotation") ? parseFloat(elem.getAttribute("data-rotation")) : 0;
    const animationType = elem.getAttribute("data-animation-type") || "from";
    elem.style.opacity = "1";
    elem.style.filter = "blur(0)";
    let animationProps;
    if (animationType === "to") {
      animationProps = {
        opacity: 1,
        filter: "blur(0)",
        duration,
        delay,
        ease: useSpring ? spring : "power2.out"
      };
      if (rotation !== 0) {
        animationProps.rotation = rotation;
      }
    } else {
      animationProps = {
        opacity: 0,
        filter: "blur(16px)",
        duration,
        delay,
        ease: useSpring ? spring : "power2.out"
      };
      if (rotation !== 0) {
        animationProps.rotation = rotation;
      }
    }
    if (!instant) {
      animationProps.scrollTrigger = {
        trigger: elem,
        start,
        end,
        scrub: false
      };
    }
    switch (direction) {
      case "left":
        animationProps.x = -offset;
        break;
      case "right":
        animationProps.x = offset;
        break;
      case "down":
        animationProps.y = offset;
        break;
      case "up":
      default:
        animationProps.y = -offset;
        break;
    }
    if (animationType === "to") {
      gsap.to(elem, animationProps);
    } else {
      gsap.from(elem, animationProps);
    }
  });
};
document.addEventListener("DOMContentLoaded", () => {
  initRevealElements();
});
let lenis;
const smoothScrolling = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768 || "ontouchstart" in window;
  if (!isMobile) {
    lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true
    });
    lenis.on("scroll", () => ScrollTrigger.update());
    gsap.ticker.add((time) => {
      lenis.raf(time * 1e3);
    });
    gsap.ticker.lagSmoothing(0);
  }
};
const resetTocItems = (sidebarList) => {
  const allListItems = sidebarList.querySelectorAll("li");
  allListItems.forEach((item) => {
    const icon = item.querySelector("span:last-child");
    const text = item.querySelector("span:first-child, a span");
    if (icon) icon.classList.add("invisible");
    if (text) {
      text.classList.remove("font-medium", "text-secondary", "dark:text-accent");
      text.classList.add("font-normal", "text-secondary/60", "dark:text-accent/60");
    }
  });
};
const activateTocItem = (item) => {
  const icon = item.querySelector("span:last-child");
  const text = item.querySelector("span:first-child, a span");
  if (icon) icon.classList.remove("invisible");
  if (text) {
    text.classList.remove("font-normal", "text-secondary/60", "dark:text-accent/60");
    text.classList.add("font-medium", "text-secondary", "dark:text-accent");
  }
};
const handleTocItemClick = (clickedItem, sidebarList) => {
  resetTocItems(sidebarList);
  activateTocItem(clickedItem);
};
const lenisSmoothScrollLinks = () => {
  const lenisTargetElements = document.querySelectorAll(".lenis-scroll-to");
  const sidebarList = document.querySelector(".table-of-contents .table-of-list");
  lenisTargetElements.forEach((ele) => {
    ele.addEventListener("click", function(e) {
      e.preventDefault();
      const target = ele.getAttribute("href");
      if (sidebarList) {
        const clickedItem = ele.closest("li");
        if (clickedItem) {
          handleTocItemClick(clickedItem, sidebarList);
        }
      }
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, {
            offset: -100,
            duration: 1.7,
            easing: (t) => 1 - Math.pow(1 - t, 3)
          });
        } else {
          const targetElement = document.querySelector(target);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
            setTimeout(() => {
              window.scrollBy(0, -100);
            }, 100);
          }
        }
      }
    });
  });
};
const handleTocListClicks = () => {
  const sidebarList = document.querySelector(".table-of-contents .table-of-list");
  if (!sidebarList) return;
  const listItems = sidebarList.querySelectorAll("li");
  listItems.forEach((item) => {
    if (item.querySelector(".lenis-scroll-to")) {
      return;
    }
    item.addEventListener("click", function() {
      handleTocItemClick(item, sidebarList);
    });
  });
};
document.addEventListener("DOMContentLoaded", () => {
  smoothScrolling();
  lenisSmoothScrollLinks();
  handleTocListClicks();
});
const TOP_NAV_CONFIG = {
  expireDays: 30,
  prefix: "top-nav-",
  suffix: "-hidden"
};
const navbar = document.querySelector(".has-top-nav");
const Cookie = {
  set(name, value, days = TOP_NAV_CONFIG.expireDays) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1e3);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  },
  get(name) {
    const match = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
    return match ? match.split("=")[1] : null;
  },
  remove(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
  }
};
const TopNav = {
  // Get a unique ID for each nav bar
  getId(nav) {
    return nav.getAttribute("accesskey") || nav.id || "default";
  },
  // Build cookie name
  cookieName(id) {
    return `${TOP_NAV_CONFIG.prefix}${id}${TOP_NAV_CONFIG.suffix}`;
  },
  // Check if nav should be hidden based on cookie
  isHidden(id) {
    return Cookie.get(this.cookieName(id)) === "true";
  },
  // Hide navigation and save state
  hide(nav) {
    const id = this.getId(nav);
    nav.classList.add("hidden");
    navbar.classList.add("is-cookie-false");
    navbar.classList.remove("is-cookie-true");
    navbar.style.transition = "all 0.5s ease-in-out";
    nav.classList.remove("visible");
    Cookie.set(this.cookieName(id), "true");
  },
  // Show navigation and clear state
  show(nav) {
    const id = this.getId(nav);
    nav.classList.add("visible");
    nav.classList.remove("hidden");
    navbar.classList.add("is-cookie-true");
    navbar.classList.remove("is-cookie-false");
    navbar.style.transition = "all 0.5s ease-in-out";
    Cookie.remove(this.cookieName(id));
  },
  // Initialize nav visibility based on saved cookies
  initVisibility() {
    const navs = document.querySelectorAll(".top-nav");
    navs.forEach((nav) => {
      const id = this.getId(nav);
      if (this.isHidden(id)) {
        nav.classList.add("hidden");
        nav.classList.remove("visible");
        navbar.classList.add("is-cookie-false");
        navbar.classList.remove("is-cookie-true");
        navbar.style.transition = "all 0.5s ease-in-out";
      } else {
        nav.classList.add("visible");
        nav.classList.remove("hidden");
        navbar.classList.add("is-cookie-true");
        navbar.classList.remove("is-cookie-false");
        navbar.style.transition = "all 0.5s ease-in-out";
      }
    });
  },
  // Setup close button listeners
  initCloseButtons() {
    const buttons = document.querySelectorAll(".close-top-nav");
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const nav = btn.closest(".top-nav");
        if (nav) this.hide(nav);
        else console.warn("  No parent .top-nav found for button");
      });
    });
  },
  // Initialize everything
  init() {
    this.initVisibility();
    this.initCloseButtons();
  }
};
document.addEventListener("DOMContentLoaded", () => TopNav.init());
document.addEventListener("DOMContentLoaded", function() {
  const numberObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const number = parseInt(element.getAttribute("data-number"));
          const speed = parseInt(element.getAttribute("data-speed")) || 800;
          const interval = parseInt(element.getAttribute("data-interval")) || 150;
          const rooms = parseInt(element.getAttribute("data-rooms")) || 2;
          const dataSpace = element.getAttribute("data-height-space");
          if (!element.classList.contains("animated")) {
            element.classList.add("animated");
            NumberAnimation(element, {
              number,
              speed,
              interval,
              rooms,
              dataSpace,
              // Pass the data-space attribute
              fontStyle: {
                "font-size": "inherit",
                color: "inherit"
              }
            });
          }
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "0px 0px -50px 0px"
    }
  );
  const numberElements = document.querySelectorAll("[data-counter]");
  numberElements.forEach((element) => {
    numberObserver.observe(element);
  });
});
document.addEventListener("DOMContentLoaded", function() {
  const slider = document.querySelector(".slider");
  const handle = document.querySelector(".slider-handle");
  const afterImage = document.querySelector(".after");
  document.querySelector(".slider-container");
  if (!slider || !handle || !afterImage) {
    return;
  }
  let isDragging = false;
  let startX = 0;
  let startLeft = 0;
  function initSlider() {
    const sliderRect = slider.getBoundingClientRect();
    const centerPosition = sliderRect.width / 2;
    handle.style.left = `${centerPosition}px`;
    updateClipPath(centerPosition);
  }
  function updateClipPath(position) {
    const sliderRect = slider.getBoundingClientRect();
    const percentage = position / sliderRect.width * 100;
    afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
  }
  handle.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDragging = true;
    startX = e.clientX;
    startLeft = parseInt(handle.style.left) || slider.offsetWidth / 2;
    handle.classList.add("no-transition");
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
    handle.style.cursor = "ew-resize";
    handle.classList.add("active");
  });
  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      handle.classList.remove("no-transition");
      document.body.style.cursor = "default";
      document.body.style.userSelect = "";
      handle.style.cursor = "ew-resize";
      handle.classList.remove("active");
    }
  });
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const sliderRect = slider.getBoundingClientRect();
      const deltaX = e.clientX - startX;
      const newPosition = startLeft + deltaX;
      const constrainedPosition = Math.max(0, Math.min(sliderRect.width, newPosition));
      handle.style.left = `${constrainedPosition}px`;
      updateClipPath(constrainedPosition);
      document.body.style.cursor = "ew-resize";
      handle.style.cursor = "ew-resize";
    }
  });
  handle.addEventListener("touchstart", (e) => {
    e.preventDefault();
    isDragging = true;
    startX = e.touches[0].clientX;
    startLeft = parseInt(handle.style.left) || slider.offsetWidth / 2;
    handle.classList.add("no-transition");
    handle.style.cursor = "ew-resize";
    handle.classList.add("active");
  });
  document.addEventListener("touchend", () => {
    if (isDragging) {
      isDragging = false;
      handle.classList.remove("no-transition");
      handle.style.cursor = "ew-resize";
      handle.classList.remove("active");
    }
  });
  document.addEventListener("touchmove", (e) => {
    if (isDragging) {
      e.preventDefault();
      const sliderRect = slider.getBoundingClientRect();
      const deltaX = e.touches[0].clientX - startX;
      const newPosition = startLeft + deltaX;
      const constrainedPosition = Math.max(0, Math.min(sliderRect.width, newPosition));
      handle.style.left = `${constrainedPosition}px`;
      updateClipPath(constrainedPosition);
      handle.style.cursor = "ew-resize";
    }
  });
  slider.addEventListener("click", (e) => {
    if (!isDragging) {
      const sliderRect = slider.getBoundingClientRect();
      const clickX = e.clientX - sliderRect.left;
      const constrainedPosition = Math.max(0, Math.min(sliderRect.width, clickX));
      handle.style.left = `${constrainedPosition}px`;
      updateClipPath(constrainedPosition);
    }
  });
  window.addEventListener("resize", () => {
    initSlider();
  });
  initSlider();
  handle.addEventListener("keydown", (e) => {
    const sliderRect = slider.getBoundingClientRect();
    const currentPosition = parseInt(handle.style.left) || sliderRect.width / 2;
    const step = sliderRect.width / 20;
    let newPosition = currentPosition;
    switch (e.key) {
      case "ArrowLeft":
        newPosition = Math.max(0, currentPosition - step);
        break;
      case "ArrowRight":
        newPosition = Math.min(sliderRect.width, currentPosition + step);
        break;
      case "Home":
        newPosition = 0;
        break;
      case "End":
        newPosition = sliderRect.width;
        break;
      default:
        return;
    }
    e.preventDefault();
    handle.style.left = `${newPosition}px`;
    updateClipPath(newPosition);
  });
  handle.setAttribute("tabindex", "0");
  handle.setAttribute("role", "slider");
  handle.setAttribute("aria-label", "Before and after image slider");
  handle.setAttribute("aria-valuemin", "0");
  handle.setAttribute("aria-valuemax", "100");
  handle.setAttribute("aria-valuenow", "50");
});
const leaflet = {
  init() {
    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
      return;
    }
    const leafletMap = L.map("map").setView([39.8283, -98.5795], 6);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      minZoom: 3
    }).addTo(leafletMap);
    window.addEventListener("resize", () => {
      leafletMap.invalidateSize();
    });
    leafletMap.zoomControl.setPosition("bottomright");
  }
};
document.addEventListener("DOMContentLoaded", () => {
  leaflet.init();
});
const themeSwitcher = {
  elements: null,
  animationConfig: {
    duration: 0.6,
    delay: 0.2,
    ease: "power2.out"
  },
  init() {
    try {
      this.cacheElements();
      this.setInitialTheme();
      this.bindEvents();
    } catch (error) {
      console.error("Theme switcher initialization failed:", error);
    }
  },
  cacheElements() {
    this.elements = {
      darkIcon: document.getElementById("dark-theme-icon"),
      lightIcon: document.getElementById("light-theme-icon"),
      toggleBtn: document.getElementById("theme-toggle"),
      html: document.documentElement
    };
  },
  setInitialTheme() {
    window.matchMedia("(prefers-color-scheme: light)").matches;
    localStorage.getItem("color-theme");
    this.setTheme("light");
  },
  bindEvents() {
    const { toggleBtn } = this.elements;
    if (!toggleBtn) return;
    toggleBtn.addEventListener("click", () => {
      const currentTheme = this.elements.html.classList.contains("dark") ? "dark" : "light";
      this.setTheme(currentTheme === "dark" ? "light" : "dark");
    });
  },
  setTheme(theme) {
    if (!["dark", "light"].includes(theme)) return;
    const { html } = this.elements;
    html.classList.remove("dark", "light");
    html.classList.add(theme);
    localStorage.setItem("color-theme", theme);
    this.updateIcons(theme === "dark");
  },
  updateIcons(isDark) {
    const { darkIcon, lightIcon } = this.elements;
    if (!darkIcon || !lightIcon) return;
    const showIcon = isDark ? darkIcon : lightIcon;
    const hideIcon = isDark ? lightIcon : darkIcon;
    hideIcon.classList.add("hidden");
    showIcon.classList.remove("hidden");
    gsap.fromTo(
      showIcon,
      {
        x: 100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: this.animationConfig.duration,
        delay: this.animationConfig.delay,
        ease: this.animationConfig.ease
      }
    );
  }
};
if (typeof window !== "undefined") {
  themeSwitcher.init();
}
