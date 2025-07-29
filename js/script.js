document.addEventListener("DOMContentLoaded", function () {
   const header = document.querySelector("header");
  if (!header) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      menu.classList.toggle("active");
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest("nav") && menu.classList.contains("active")) {
      menu.classList.remove("active");
    }
  });

  // Testimonial Slider
  const testimonials = document.querySelectorAll(".testimonial");
  const prevBtn = document.getElementById("prev-testimonial");
  const nextBtn = document.getElementById("next-testimonial");

  if (testimonials.length > 0 && prevBtn && nextBtn) {
    let currentTestimonial = 0;

    // Hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
      if (index !== 0) {
        testimonial.style.display = "none";
      }
    });

    // Function to show a specific testimonial
    function showTestimonial(index) {
      testimonials.forEach((testimonial) => {
        testimonial.style.display = "none";
      });
      testimonials[index].style.display = "block";
    }

    // Event listeners for navigation buttons
    nextBtn.addEventListener("click", function () {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    });

    prevBtn.addEventListener("click", function () {
      currentTestimonial =
        (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentTestimonial);
    });

    // Auto-rotate testimonials
    setInterval(function () {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  }

  // Form Validation
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Simple validation
      let isValid = true;
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      const message = document.getElementById("message");

      if (!name.value.trim()) {
        isValid = false;
        name.style.borderColor = "red";
      } else {
        name.style.borderColor = "";
      }

      if (!email.value.trim() || !isValidEmail(email.value)) {
        isValid = false;
        email.style.borderColor = "red";
      } else {
        email.style.borderColor = "";
      }

      if (!phone.value.trim()) {
        isValid = false;
        phone.style.borderColor = "red";
      } else {
        phone.style.borderColor = "";
      }

      if (!message.value.trim()) {
        isValid = false;
        message.style.borderColor = "red";
      } else {
        message.style.borderColor = "";
      }

      if (isValid) {
        // In a real application, you would send the form data to a server
        alert("¡Mensaje enviado con éxito! Te contactaremos pronto.");
        contactForm.reset();
      } else {
        alert("Por favor, completa todos los campos correctamente.");
      }
    });
  }

  // Email validation helper function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (menu.classList.contains("active")) {
          menu.classList.remove("active");
        }
      }
    });
  });

  // Blog category filter (simplified for demo)
  const categoryTags = document.querySelectorAll(".category-tag");

  if (categoryTags.length > 0) {
    categoryTags.forEach((tag) => {
      tag.addEventListener("click", function (e) {
        e.preventDefault();

        // Remove active class from all tags
        categoryTags.forEach((t) => t.classList.remove("active"));

        // Add active class to clicked tag
        this.classList.add("active");

        // In a real application, you would filter the blog posts here
        // For this demo, we'll just show a message
        if (this.textContent !== "Todos") {
          console.log(`Filtrando por categoría: ${this.textContent}`);
        }
      });
    });
  }

  // Animation on scroll (simple implementation)
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".feature-card, .service-card, .team-card, .blog-card"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial state for animation
  const animatedElements = document.querySelectorAll(
    ".feature-card, .service-card, .team-card, .blog-card"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Run animation on load and scroll
  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);
});
