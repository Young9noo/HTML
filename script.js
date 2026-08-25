/* ==========================================================
   ALAN / CUTS — PURE PREMIER JS
========================================================== */


/* ==========================================================
   LOADER
========================================================== */

document.body.classList.add("loading");

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hide");

        document.body.classList.remove("loading");

    }, 1800);

});


/* ==========================================================
   HEADER
========================================================== */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 35) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* ==========================================================
   MOBILE NAV
========================================================== */

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("mobile");

});


document.querySelectorAll(".navigation a").forEach(link => {

    link.addEventListener("click", () => {

        navigation.classList.remove("mobile");

    });

});


/* ==========================================================
   ACTIVE NAVIGATION
========================================================== */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".navigation a");

const navObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navItems.forEach(item => {
                    item.classList.remove("active");
                });

                const active =
                    document.querySelector(
                        `.navigation a[href="#${entry.target.id}"]`
                    );

                if (active) {
                    active.classList.add("active");
                }

            }

        });

    },

    {
        threshold: 0.25
    }

);

sections.forEach(section => {
    navObserver.observe(section);
});


/* ==========================================================
   HERO PARALLAX
========================================================== */

const hero = document.querySelector(".hero");
const heroImage = document.querySelector(".hero-image");
const heroEmblem = document.querySelector(".hero-emblem");

window.addEventListener("scroll", () => {

    if (!hero) return;

    const scroll = window.scrollY;

    if (scroll < window.innerHeight) {

        if (heroImage) {

            heroImage.style.transform =
                `scale(1.04) translateY(${scroll * 0.035}px)`;

        }

        if (heroEmblem) {

            heroEmblem.style.marginTop =
                `${scroll * 0.045}px`;

        }

    }

});


/* ==========================================================
   SCROLL REVEALS
========================================================== */

const revealTargets = document.querySelectorAll(
    ".service-card, .gallery-card, .about-image, .about-copy, .review, .booking-container, .stat"
);

revealTargets.forEach(element => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach((entry, index) => {

            if (entry.isIntersecting) {

                setTimeout(() => {

                    entry.target.classList.add("visible");

                }, index * 70);

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);

revealTargets.forEach(element => {
    revealObserver.observe(element);
});


/* ==========================================================
   GALLERY SLIDER
========================================================== */

const galleryTrack =
    document.querySelector(".gallery-track");

const galleryNext =
    document.getElementById("galleryNext");

const galleryPrev =
    document.getElementById("galleryPrev");


if (galleryTrack && galleryNext && galleryPrev) {

    galleryNext.addEventListener("click", () => {

        galleryTrack.scrollBy({
            left: 280,
            behavior: "smooth"
        });

    });


    galleryPrev.addEventListener("click", () => {

        galleryTrack.scrollBy({
            left: -280,
            behavior: "smooth"
        });

    });

}


/* ==========================================================
   STAT COUNTERS
========================================================== */

const stats = document.querySelectorAll(
    ".stat strong[data-number]"
);


const statsObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const element = entry.target;

            const target =
                Number(element.dataset.number);

            let start = 0;

            const duration = 1400;

            const startTime = performance.now();


            function animate(currentTime) {

                const progress =
                    Math.min(
                        (currentTime - startTime) / duration,
                        1
                    );

                const eased =
                    1 - Math.pow(1 - progress, 3);

                const value =
                    Math.floor(eased * target);


                if (target === 5) {

                    element.textContent =
                        value.toFixed(1);

                } else {

                    element.textContent =
                        value.toLocaleString();

                }


                if (progress < 1) {

                    requestAnimationFrame(animate);

                } else {

                    if (target === 5) {

                        element.textContent = "5.0";

                    } else if (target === 100) {

                        element.textContent = "100%";

                    } else {

                        element.textContent =
                            target.toLocaleString() + "+";

                    }

                }

            }


            requestAnimationFrame(animate);

            statsObserver.unobserve(element);

        });

    },

    {
        threshold: .8
    }

);


stats.forEach(stat => {
    statsObserver.observe(stat);
});


/* ==========================================================
   SERVICE CARD TILT
========================================================== */

document.querySelectorAll(".service-card").forEach(card => {

    card.addEventListener("mousemove", event => {

        if (window.innerWidth < 850) return;

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const rotateY =
            ((x - rect.width / 2) /
            rect.width) * 3;

        const rotateX =
            ((y - rect.height / 2) /
            rect.height) * -3;


        card.style.transform =
            `translateY(-6px)
             perspective(700px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "";

    });

});


/* ==========================================================
   SMOOTH ANCHOR LINKS
========================================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const id =
            link.getAttribute("href");

        const target =
            document.querySelector(id);

        if (!target) return;

        event.preventDefault();

        const offset = 65;

        const position =
            target.getBoundingClientRect().top
            + window.scrollY
            - offset;

        window.scrollTo({
            top: position,
            behavior: "smooth"
        });

    });

});


/* ==========================================================
   YEAR
========================================================== */

const year = document.getElementById("year");

if (year) {
    year.textContent =
        new Date().getFullYear();
}