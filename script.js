/* -------------------------------
   Smooth Scroll Navigation
--------------------------------*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        // Only run if the href isn't simply "#"
        if(this.getAttribute("href") !== "#") {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if(target){
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    });
});

/* -------------------------------
   Scroll Reveal Animation
--------------------------------*/
const revealElements = document.querySelectorAll(
    ".grid-item, .section-heading, .wholesale-content"
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target); // Stop observing once revealed
        }
    });
}, { threshold: 0.2 });

revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all 1s ease";
    observer.observe(el);
});

/* -------------------------------
   Header Background on Scroll
--------------------------------*/
const header = document.querySelector(".luxury-header");

if(header) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

/* -------------------------------
   Featured Collection Slider
--------------------------------*/
const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dots = document.querySelectorAll(".slider-dots .dot");

let index = 0;

function updateSlider() {
    if(!track) return;
    track.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach(dot => dot.classList.remove("active"));
    if(dots[index]) {
        dots[index].classList.add("active");
    }
}

/* Next Slide */
if(nextBtn) {
    nextBtn.addEventListener("click", () => {
        index++;
        if(index >= slides.length) index = 0;
        updateSlider();
    });
}

/* Previous Slide */
if(prevBtn) {
    prevBtn.addEventListener("click", () => {
        index--;
        if(index < 0) index = slides.length - 1;
        updateSlider();
    });
}

/* Dot Navigation */
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i;
        updateSlider();
    });
});

/* Auto Slide */
setInterval(() => {
    if(!track || slides.length === 0) return;
    index++;
    if(index >= slides.length) index = 0;
    updateSlider();
}, 5000);
const music = document.getElementById("bg-music");
const btn = document.getElementById("musicBtn");

let playing = false;

btn.addEventListener("click", () => {

    if(!playing){
        music.play();
        btn.textContent = "❚❚ Stop Music";
        playing = true;
    } 
    else{
        music.pause();
        music.currentTime = 0;
        btn.textContent = "▶︎ Play Music";
        playing = false;
    }

});