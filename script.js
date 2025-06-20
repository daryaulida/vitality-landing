/* === Появление текста при скролле без ручных классов === */
function revealTextElements() {
  const elements = document.querySelectorAll('h1, h2, h3, h4, p, li, strong');
  const triggerPoint = window.innerHeight * 0.9;

  elements.forEach(el => {
    if (!el.classList.contains('reveal-text')) {
      el.classList.add('reveal-text');
    }
    const elTop = el.getBoundingClientRect().top;
    if (elTop < triggerPoint) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealTextElements);
window.addEventListener('load', revealTextElements);


document.addEventListener('DOMContentLoaded', function () {
  const forms = document.querySelectorAll('.form');

  forms.forEach(form => {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      submitButton.disabled = true;
      submitButton.textContent = 'Отправка...';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          alert('Заявка успешно отправлена!');
          form.reset();
        } else {
          alert('Ошибка: ' + result.message);
        }
      } catch (error) {
        alert('Ошибка при отправке. Попробуйте позже.');
      }

      submitButton.disabled = false;
      submitButton.textContent = originalText;
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const phoneInputs = document.querySelectorAll('.form input[name="phone"]');

  phoneInputs.forEach((input) => {
    const iti = window.intlTelInput(input, {
      initialCountry: "ru",
      separateDialCode: true,
      preferredCountries: ["ru", "by", "kz", "ua", "am"],
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });

    let maxDigits = 10; // по умолчанию для России

    const applyMask = () => {
      const placeholder = input.getAttribute("placeholder");
      const mask = placeholder.replace(/\d/g, "9");
      Inputmask({
        mask: mask,
        showMaskOnHover: false,
        clearIncomplete: true,
        placeholder: "_",
      }).mask(input);

      // определить максимальное количество цифр после выбора страны
      maxDigits = placeholder.replace(/\D/g, "").length;
    };

    input.addEventListener("countrychange", applyMask);
    setTimeout(applyMask, 100);

    // Ограничение ввода лишних цифр
    input.addEventListener("input", () => {
      const onlyDigits = input.value.replace(/\D/g, "");
      if (onlyDigits.length > maxDigits) {
        input.value = input.value.slice(0, input.value.length - 1);
      }
    });

    // Валидация перед отправкой
    const form = input.closest("form");
    if (form) {
      form.addEventListener("submit", function (e) {
        if (!iti.isValidNumber()) {
          e.preventDefault();
          input.classList.add("error");
          alert("Введите корректный номер телефона");
        } else {
          input.classList.remove("error");
        }
      });
    }
  });
});


const scrollBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight * 0.9) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});






