$(document).ready(function () {
        /* 1. Hero Slider Logic */
        const slides = [
          {
            img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=1920",
            script: "Timeless",
            title: "定格你的光芒<br>成就專屬於你的肖像作品",
          },
          {
            img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920",
            script: "Elegant",
            title: "每一刻凝望<br>都值得被優雅珍藏",
          },
          {
            img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1920",
            script: "Distinctive",
            title: "讓回憶不只停留<br>而是成為細看一生的作品",
          },
        ];

        let currentSlide = 0;
        const $slider = $("#slider");

        // Pre-load images for smoother slide
        slides.forEach((slide, i) => {
          const activeClass = i === 0 ? "active" : "";
          $slider.append(
            `<img src="${slide.img}" class="slide-image absolute inset-0 w-full h-full object-cover opacity-0 z-0 ${activeClass}" id="slide-${i}">`,
          );
        });

        function updateSlide() {
          const slide = slides[currentSlide];

          // Transition images
          $(".slide-image")
            .removeClass("active opacity-60")
            .addClass("opacity-0");
          $(`#slide-${currentSlide}`).addClass("active opacity-60");

          // Animate text with staggered effect
          $("#hero-script, #hero-title, #hero-cta").css({
            opacity: 0,
            transform: "translateY(20px)",
          });

          setTimeout(() => {
            $("#hero-script").text(slide.script).animate({ opacity: 1 }, 800);
            $("#hero-title").html(slide.title).animate({ opacity: 1 }, 800);
            $("#hero-cta").animate({ opacity: 1 }, 800);

            // Add subtle CSS transform via jQuery for that "floating" look
            $("#hero-script, #hero-title, #hero-cta").css(
              "transform",
              "translateY(0)",
            );
          }, 400);

          currentSlide = (currentSlide + 1) % slides.length;
        }

        updateSlide(); // Initial run
        setInterval(updateSlide, 6000);

        /* 2. Scroll Reveal Animations */
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                $(entry.target).addClass("visible");
              }
            });
          },
          { threshold: 0.1 },
        );

        $(".fade-in-up").each(function () {
          observer.observe(this);
        });

        /* 3. Navigation Scroll Effect */
        $(window).on("scroll", function () {
          if ($(window).scrollTop() > 100) {
            $("#main-nav").addClass("glass-nav py-4").removeClass("py-6");
          } else {
            $("#main-nav").removeClass("glass-nav py-4").addClass("py-6");
          }
        });

        /* 4. Mobile Menu Logic */
        $("#menu-toggle").on("click", function () {
          $("#mobile-menu").removeClass("opacity-0 pointer-events-none");
        });

        $("#menu-close, .mobile-nav-link").on("click", function () {
          $("#mobile-menu").addClass("opacity-0 pointer-events-none");
        });

        /* 5. Smooth Scroll for links */
        $('a[href^="#"]').on("click", function (e) {
          e.preventDefault();
          const target = this.hash;
          const $target = $(target);
          if ($target.length) {
            $("html, body").animate(
              {
                scrollTop: $target.offset().top - 80,
              },
              1000,
            );
          }
        });
      });