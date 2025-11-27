/**
 * EIPONI Language School - Main JavaScript
 * Inicjalizacja wszystkich komponentów po załadowaniu DOM
 */

document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // INICJALIZACJA BIBLIOTEKI AOS (Animate On Scroll)
  // ============================================
  // Animacje elementów podczas przewijania strony
  // Parametry: once: true - animacja tylko raz, duration: 800ms
  // Sprawdzamy czy biblioteka AOS została załadowana i czy nie była już zainicjalizowana
  if (!window.isInited && typeof AOS !== 'undefined') {
    window.isInited = true;
    AOS.init({ once: true, duration: 800 });
  }

  // ============================================
  // INICJALIZACJA SWIPER (Karuzela opinii)
  // ============================================
  // Tworzymy karuzelę dla sekcji opinii klientów
  // Sprawdzamy czy biblioteka Swiper została załadowana
  if (typeof Swiper !== 'undefined') {
    new Swiper(".opinieSwiper", {
      loop: true,                    // Zapętlenie slajdów
      spaceBetween: 30,              // Odstęp między slajdami (px)
      slidesPerView: 1,              // Domyślnie 1 slajd na ekran (mobile)
      autoplay: {
        delay: 3500,                 // Automatyczne przewijanie co 3.5s
        pauseOnMouseEnter: true,     // Zatrzymanie po najechaniu myszką
      },
      pagination: {
        el: ".swiper-pagination",    // Element paginacji (kropki)
        clickable: true,             // Możliwość kliknięcia w kropki
      },
      // Responsywność - dostosowanie do szerokości ekranu
      breakpoints: {
        1200: {                      // Ekrany >= 1200px (desktop)
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1600: {                      // Ekrany >= 1600px (duże monitory)
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  }

  // ============================================
  // LICZNIKI ZNAKÓW - FORMULARZ REKRUTACJI
  // ============================================
  // Dynamiczne liczniki pokazujące ilość wprowadzonych znaków
  // dla pól: imię, nazwisko, telefon, email
  const fields = [
    { id: 'imie', max: 25 },
    { id: 'nazwisko', max: 25 },
    { id: 'telefon', max: 15 },
    { id: 'email', max: 60 }
  ];

  // Dla każdego pola tworzymy licznik i obsługę zdarzenia 'input'
  fields.forEach(({ id, max }) => {
    const input = document.getElementById(id);
    const counter = document.getElementById(`${id}Counter`);

    // Jeśli pole lub licznik nie istnieją w DOM, pomijamy
    if (!input || !counter) return;

    // Funkcja aktualizująca tekst licznika
    const update = () => {
      counter.textContent = `${input.value.length} / ${max}`;
    };

    // Nasłuchujemy na zmiany w polu tekstowym
    input.addEventListener('input', update);

    // Inicjalizacja - ustawienie początkowej wartości licznika
    update();
  });

  // ============================================
  // WALIDACJA FORMULARZA REKRUTACJI
  // ============================================
  // Obsługa walidacji HTML5 z klasami Bootstrap
  const rekrutacjaForm = document.getElementById('rekrutacja-form');
  if (rekrutacjaForm) {
    rekrutacjaForm.addEventListener('submit', function (e) {
      // Jeśli formularz nie jest poprawny, blokujemy wysłanie
      if (!rekrutacjaForm.checkValidity()) e.preventDefault();

      // Dodajemy klasę Bootstrap do wyświetlenia komunikatów walidacji
      rekrutacjaForm.classList.add('was-validated');
    }, false);
  }

  // ============================================
  // WALIDACJA FORMULARZA KONTAKTOWEGO
  // ============================================
  // Obsługa formularza kontaktowego z komunikatem sukcesu
  const contactForm = document.querySelector('.needs-validation');
  const successMessage = document.getElementById('success-message');

  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      // Zapobiegamy domyślnemu wysłaniu formularza (bez przeładowania strony)
      event.preventDefault();
      event.stopPropagation();

      // Sprawdzamy poprawność wypełnienia formularza
      if (!contactForm.checkValidity()) {
        // Formularz niepoprawny - pokazujemy komunikaty walidacji
        contactForm.classList.add('was-validated');
      } else {
        // Formularz poprawny - resetujemy i pokazujemy komunikat sukcesu
        contactForm.classList.remove('was-validated');
        contactForm.reset();

        if (successMessage) {
          // Pokazujemy komunikat sukcesu - usuwamy klasę d-none
          successMessage.classList.remove('d-none');
          successMessage.classList.add('show');

          // Automatyczne ukrycie komunikatu po 4 sekundach
          setTimeout(() => {
            successMessage.classList.remove('show');
            successMessage.classList.add('d-none');
          }, 4000);
        }
      }
    });
  }
});
