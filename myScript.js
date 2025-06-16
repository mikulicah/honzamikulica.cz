// Načti header a připoj burger menu po načtení
fetch('header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;

    // Burger toggle
    const burger = document.getElementById('burger');
    if (burger) {
      burger.addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('active');
      });
    }
  });

// Načti ostatní části stránky
fetch('sidebar.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('sidebar').innerHTML = data;
  });

fetch('body.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('body').innerHTML = data;
  });

fetch('footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  });

  function setLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
    updateLanguage(lang);
  }

  function updateLanguage(lang) {
    // Skryje všechny jazykové verze
    document.querySelectorAll('.lang').forEach(el => {
      el.classList.remove('active');
    });

    // Zobrazí zvolený jazyk
    const selected = document.getElementById(lang);
    if (selected) {
      selected.classList.add('active');
    }
  }

  // Po načtení stránky použij jazyk z localStorage
  document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'cs';
    updateLanguage(savedLang);
  });




const images = Array.from(document.querySelectorAll('.lightbox-image'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;

function showImage(index) {
  currentIndex = index;
  lightboxImg.src = images[index].src;
  lightbox.classList.remove('hidden');
}

images.forEach((img, i) => {
  img.parentElement.addEventListener('click', e => {
    e.preventDefault();
    showImage(i);
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.classList.add('hidden');
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
});

// Zavření kliknutím mimo obrázek
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.add('hidden');
  }
});

// Přepínání pomocí klávesnice
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('hidden')) {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'Escape') closeBtn.click();
  }
});


var myIndex = 0;
        carousel();
        
        function carousel() {
          var i;
          var x = document.getElementsByClassName("mySlides");
          for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";  
          }
          myIndex++;
          if (myIndex > x.length) {myIndex = 1}    
          x[myIndex-1].style.display = "block";  
          setTimeout(carousel, 2500); // Change image every 2 seconds
        }