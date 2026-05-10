(function () {
  'use strict';

  var PHONE = '923007166993';
  var lang = (document.documentElement.lang || 'en').toLowerCase();
  var isUrdu = lang.indexOf('ur') === 0;

  function buildMessage(machine) {
    if (isUrdu) {
      return 'السلام علیکم، میں ' + machine + ' میں دلچسپی رکھتا ہوں۔ براہِ کرم تفصیلات اور قیمت بھیجیں۔';
    }
    return "Hi, I'm interested in the " + machine + '. Please share details and price.';
  }

  function buildGenericMessage() {
    if (isUrdu) {
      return 'السلام علیکم، میں آپ کی استعمال شدہ صنعتی مشینوں کے بارے میں معلومات حاصل کرنا چاہتا ہوں۔';
    }
    return 'Hi, I would like more information about your used industrial machines.';
  }

  // Wire up all WhatsApp links
  var links = document.querySelectorAll('a[data-whatsapp]');
  for (var i = 0; i < links.length; i++) {
    var a = links[i];
    var machine = a.getAttribute('data-machine');
    var text = machine ? buildMessage(machine) : buildGenericMessage();
    a.href = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(text);
  }

  // Mobile menu toggle
  var toggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      var open = navLinks.classList.contains('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') navLinks.classList.remove('open');
    });
  }

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
