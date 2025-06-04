  // Dark Mode
  const toggle = document.getElementById('mode-toggle');
  const icon = document.getElementById('mode-icon');
  const body = document.body;

  const updateIcon = (isLight) => {
    icon.src = isLight ? 'lightoff.png' : 'lighton.png';
  };

  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    updateIcon(true);
  } else {
    updateIcon(false);
  }

  toggle.addEventListener('click', () => {
    const switchingToLight = !body.classList.contains('light-mode');
    if (switchingToLight) {
      body.classList.add('transitioning-to-light');
      setTimeout(() => {
        body.classList.remove('transitioning-to-light');
      }, 600);
    }
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateIcon(isLight);
  });

  // Chapter Navigation
  const contentDiv = document.querySelector('.content');
  const prevBtns = document.querySelectorAll('.prev-btn');
  const nextBtns = document.querySelectorAll('.next-btn');
  const totalChapters = 27; // Update this to match actual chapter count

  // CHANGE HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // CHANGE HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // CHANGE HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^
        // CHANGE HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^
          // CHANGE HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^
            // CHANGE HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^
              // CHANGE HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^
                // CHANGE HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^
                  // CHANGE HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^
                    // CHANGE HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^
                      // CHANGE HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^
                        // CHANGE HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^
                          // CHANGE HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^
                            // CHANGE HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^
                              // CHANGE HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                // CHANGE HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                  // CHANGE HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                    // CHANGE HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^

  let currentChapterIndex = 0;

function loadChapter(index) {
  if (index < 0 || index >= totalChapters) return;

  const template = document.getElementById(`chapter-${index + 1}`);
  if (!template) {
    contentDiv.innerHTML = `<p>Chapter not found.</p>`;
    return;
  }

  // Fade between chapters

  // Begin fade out 
  contentDiv.style.transition = 'opacity 0.6s ease';
  contentDiv.style.opacity = 0;

  // Wait for fade-out to complete (0.6s), then swap content and fade back in
  setTimeout(() => {
    contentDiv.innerHTML = template.innerHTML;
    window.scrollTo(0, 0);

    // Force reflow so browser registers the DOM update
    void contentDiv.offsetWidth;

    // Fade back in
    contentDiv.style.transition = 'opacity 0.6s ease';
    contentDiv.style.opacity = 1;
  }, 700); // Slightly longer than the 0.6s CSS transition
  currentChapterIndex = index;
  updateButtons();
}


  function updateButtons() {
    prevBtns.forEach(btn => {
      btn.classList.toggle('disabled', currentChapterIndex === 0);
      btn.setAttribute('aria-disabled', currentChapterIndex === 0 ? 'true' : 'false');
    });

    nextBtns.forEach(btn => {
      btn.classList.toggle('disabled', currentChapterIndex === totalChapters - 1);
      btn.setAttribute('aria-disabled', currentChapterIndex === totalChapters - 1 ? 'true' : 'false');
    });
  }

  prevBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentChapterIndex > 0) {
        loadChapter(currentChapterIndex - 1);
      }
    });
  });

  nextBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentChapterIndex < totalChapters - 1) {
        loadChapter(currentChapterIndex + 1);
      }
    });
  });
// Load initial chapter immediately, without waiting for fade
const template = document.getElementById('chapter-1');
if (template) {
  contentDiv.innerHTML = template.innerHTML;
  document.body.classList.add('loaded'); // for any initial transition effect
}



// toc links


document.addEventListener('click', function (e) {
  const link = e.target.closest('[data-chapter]');
  if (link) {
    e.preventDefault();
    const targetChapter = parseInt(link.dataset.chapter, 10);
    loadChapter(targetChapter);
  }
});


// TOC loading
const tocLink = document.getElementById('load-toc');
const tocTemplate = document.getElementById('toc-template');

if (tocLink && tocTemplate) {
  tocLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    contentDiv.style.transition = 'opacity 1s ease';
    contentDiv.style.opacity = 0;

    setTimeout(() => {
      contentDiv.innerHTML = tocTemplate.innerHTML;
      window.scrollTo(0, 0);

      // Trigger reflow
      void contentDiv.offsetWidth;

      contentDiv.style.transition = 'opacity 1s ease';
      contentDiv.style.opacity = 1;

      currentChapterIndex = -1; // so next/prev buttons don’t interfere
      updateButtons();
    }, 600);
  });
}
