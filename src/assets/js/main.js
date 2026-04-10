// src/components/MainScripts.jsx
import { useEffect } from "react";
import $ from "jquery";
import WOW from "wowjs";
window.$ = $;
window.jQuery = $;
window.WOW = WOW.WOW;

const MainScripts = () => {
  useEffect(() => {
    // Spinner
    setTimeout(() => {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);

    // Initiate the wowjs
    new WOW.WOW().init();

    // Fixed Navbar
    const handleNavbar = () => {
      if ($(window).width() < 992) {
        if ($(window).scrollTop() > 45) {
          $(".fixed-top").addClass("bg-dark shadow");
        } else {
          $(".fixed-top").removeClass("bg-dark shadow");
        }
      } else {
        if ($(window).scrollTop() > 45) {
          $(".fixed-top").addClass("bg-dark shadow").css("top", -45);
        } else {
          $(".fixed-top").removeClass("bg-dark shadow").css("top", 0);
        }
      }
    };
    $(window).on("scroll", handleNavbar);

    // Back to top button
    const handleBackToTop = () => {
      if ($(window).scrollTop() > 300) {
        $(".back-to-top").fadeIn("slow");
      } else {
        $(".back-to-top").fadeOut("slow");
      }
    };
    $(window).on("scroll", handleBackToTop);

    $(".back-to-top").on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    });

    // Causes progress
    $(".causes-progress").waypoint(
      function () {
        $(".progress .progress-bar").each(function () {
          $(this).css("width", $(this).attr("aria-valuenow") + "%");
        });
      },
      { offset: "80%" }
    );

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
      autoplay: false,
      smartSpeed: 1000,
      center: true,
      dots: false,
      loop: true,
      nav: true,
      navText: [
        '<i class="bi bi-arrow-left"></i>',
        '<i class="bi bi-arrow-right"></i>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
      },
    });

    return () => {
      $(window).off("scroll", handleNavbar);
      $(window).off("scroll", handleBackToTop);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default MainScripts;
