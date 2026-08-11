document.addEventListener("DOMContentLoaded", function() {

  const headerElem = document.getElementById("nav_main_header");
  
  window.addEventListener("scroll", function() {
    if (window.scrollY > 50) {
      headerElem.classList.add("scrolled-down");
    } else {
      headerElem.classList.remove("scrolled-down");
    }
  });

  const burger = document.getElementById("mob-trigger");
  const nav = document.getElementById("desktopMenu");

  if(burger) {
    burger.addEventListener("click", function() {
      nav.classList.toggle("open-mobile");
    });
  }

  const navLinks = nav.querySelectorAll("a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open-mobile");
    });
  });

  const triggers = document.querySelectorAll(".acc-trigger");
  for(let i = 0; i < triggers.length; i++) {
    triggers[i].addEventListener("click", function() {
      let panel = this.nextElementSibling;
      let icon = this.querySelector('.ico');
      
      if(panel.classList.contains("show")) {
        panel.classList.remove("show");
        icon.innerText = "+";
      } else {
        document.querySelectorAll('.hidden-panel').forEach(p => p.classList.remove('show'));
        document.querySelectorAll('.ico').forEach(i => i.innerText = '+');
        panel.classList.add("show");
        icon.innerText = "-";
      }
    });
  }

  const leadForm = document.getElementById("lead_capture_frm");
  if(leadForm) {
    leadForm.addEventListener("submit", function(event) {
      event.preventDefault();
      let nameField = document.getElementById("f_name");
      let emailField = document.getElementById("contact_email");
      let detailsField = document.getElementById("proj_brief");
      let honeypot = document.getElementById("spam_trap_55");
      let errName = document.getElementById("err_f_name");
      let errEmail = document.getElementById("err_email");
      let errBrief = document.getElementById("err_brief");
      let statusBox = document.getElementById("status_msg");

      errName.innerText = "";
      errEmail.innerText = "";
      errBrief.innerText = "";
      statusBox.innerText = "";

      if(honeypot.value !== "") return false;

      let formIsValid = true;

      if(nameField.value.trim().length < 2) {
        errName.innerText = "Please enter your full name.";
        formIsValid = false;
      }

      let emailStr = emailField.value.trim();
      if(emailStr === "" || emailStr.indexOf("@") === -1 || emailStr.indexOf(".") === -1) {
        errEmail.innerText = "Double check your work email.";
        formIsValid = false;
      }

      if(detailsField.value.trim().length < 5) {
        errBrief.innerText = "Please provide a bit more detail about the project.";
        formIsValid = false;
      }

      if(formIsValid) {
        let submitBtn = document.getElementById("btn_submit_lead");
        let oldBtnText = submitBtn.innerText;
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        setTimeout(function() {
          statusBox.innerHTML = "<span style='color: #4ade80;'>Thanks! Zeyad will get back to you within 24 hours.</span>";
          leadForm.reset();
          submitBtn.innerText = oldBtnText;
          submitBtn.disabled = false;
        }, 1200);
      }
    });
  }

  const progressBar = document.getElementById("scroll-progress");
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    let scrollTop = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollPercent = (scrollTop / scrollHeight) * 100;
    if(progressBar) progressBar.style.width = scrollPercent + "%";

    if(backToTopBtn) {
      if(scrollTop > 300) backToTopBtn.classList.add("visible");
      else backToTopBtn.classList.remove("visible");
    }
  });

  if(backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const track = document.getElementById("testimonial-track");
  const btnNext = document.getElementById("next-slide");
  const btnPrev = document.getElementById("prev-slide");
  let currentIndex = 0;
  const slideCount = document.querySelectorAll(".slide-item").length;

  function updateSlider() {
    if(track) track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  if(btnNext && btnPrev) {
    btnNext.addEventListener("click", () => {
      currentIndex = (currentIndex === slideCount - 1) ? 0 : currentIndex + 1;
      updateSlider();
    });
    btnPrev.addEventListener("click", () => {
      currentIndex = (currentIndex === 0) ? slideCount - 1 : currentIndex - 1;
      updateSlider();
    });
  }

  const termModal = document.getElementById("dev-terminal");
  const termInput = document.getElementById("term-input");
  const closeTermBtn = document.getElementById("close-term-btn");

  document.addEventListener("keydown", (e) => {
    if(e.key === "`" || e.key === "~") {
      e.preventDefault();
      termModal.classList.add("show-term");
      termInput.focus();
    }
    if(e.key === "Escape" && termModal.classList.contains("show-term")) {
      termModal.classList.remove("show-term");
    }
  });

  if(closeTermBtn) {
    closeTermBtn.addEventListener("click", () => termModal.classList.remove("show-term"));
  }

  if(termInput) {
    termInput.addEventListener("keypress", (e) => {
      if(e.key === "Enter") {
        let cmd = termInput.value.trim().toLowerCase();
        let outputArea = document.getElementById("term-output");
        
        let cmdEcho = document.createElement("p");
        cmdEcho.innerHTML = `<span style="color:#60a5fa">$</span> ${cmd}`;
        outputArea.insertBefore(cmdEcho, termInput.parentElement);

        let response = document.createElement("p");
        response.style.color = "#d1d5db";
        response.style.marginBottom = "10px";

        if(cmd === "help") {
          response.innerHTML = "Available commands: <br>- <b>about</b>: info about us<br>- <b>clear</b>: clear terminal<br>- <b>boot-hardware</b>: init system<br>- <b>hack</b>: ???";
        } else if(cmd === "about") {
          response.innerText = "Desert Byte FZ-LLC. Building the web since 2026. Hand-coded for Hack Club #horizons.";
        } else if(cmd === "hack") {
          response.style.color = "#ef4444";
          response.innerText = "ACCESS DENIED. THIS INCIDENT WILL BE REPORTED.";
        } else if (cmd === "boot-hardware") {
          response.innerHTML = "Initializing Smart System...<br>Mounting Raspberry Pi 3 B+... OK<br>Allocating virtual swap memory for dlib framework... OK<br>Connecting to ESP32 smoke sensors... Active.";
        } else if(cmd === "clear") {
          let paragraphs = outputArea.querySelectorAll("p");
          paragraphs.forEach(p => p.remove());
          response.innerText = ""; 
        } else if(cmd !== "") {
          response.innerText = `Command not found: ${cmd}`;
        }

        if(cmd !== "clear" && cmd !== "") outputArea.insertBefore(response, termInput.parentElement);
        
        termInput.value = "";
        outputArea.scrollTop = outputArea.scrollHeight;
      }
    });
  }

  const counters = document.querySelectorAll(".count-up");
  const speed = 200;

  const animateCounters = (entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        const counter = entry.target;
        const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          const inc = target / speed;

          if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 10);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
        observer.unobserve(counter);
      }
    });
  };

  const counterObserver = new IntersectionObserver(animateCounters, { threshold: 0.5 });
  counters.forEach(counter => { counterObserver.observe(counter); });

  const cursor = document.getElementById("custom-cursor");
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  const hoverElements = document.querySelectorAll("a, button, .acc-trigger, .term-btn");
  hoverElements.forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
  });

  const tiltCards = document.querySelectorAll('.srv-card, .price-card, .dash-panel');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10; 
      const rotateY = ((x - centerX) / centerX) * 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });

  setInterval(() => {
    const tempEl = document.getElementById('esp-temp');
    if(tempEl) {
      let currentTemp = parseFloat(tempEl.innerText);
      let fluctuation = (Math.random() * 0.8) - 0.4; 
      let newTemp = currentTemp + fluctuation;
      if(newTemp > 28) newTemp = 27.5;
      if(newTemp < 22) newTemp = 22.5;
      tempEl.innerText = newTemp.toFixed(1);
    }
  }, 2500);

  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  const fileList = document.getElementById('file-list');

  if(dropZone && fileInput) {
    dropZone.addEventListener('click', () => fileInput.click());
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
    });
    
    dropZone.addEventListener('drop', (e) => {
      let dt = e.dataTransfer;
      let files = dt.files;
      handleFiles(files);
    });
    
    fileInput.addEventListener('change', function() {
      handleFiles(this.files);
    });
    
    function handleFiles(files) {
      fileList.innerHTML = '';
      Array.from(files).forEach(file => {
        let li = document.createElement('li');
        li.innerText = '\uD83D\uDCC1 ' + file.name + ' (' + (file.size / 1024).toFixed(1) + ' KB)';
        li.style.color = 'var(--brand-primary)';
        li.style.fontSize = '0.9rem';
        li.style.listStyle = 'none';
        fileList.appendChild(li);
      });
    }
  }

});
// ================= FAQ Accordion Logic =================
const faqRows = document.querySelectorAll('.acc-row');

faqRows.forEach(row => {
    row.addEventListener('click', function() {
        // تحديد الإجابة والأيقونة الخاصة بالسؤال اللي ضغطنا عليه
        const panel = this.querySelector('.hidden-panel');
        const icon = this.querySelector('.ico');

        // تشغيل أو إيقاف كلاس الظهور
        panel.classList.toggle('active');

        // تغيير علامة الـ + والـ -
        if (panel.classList.contains('active')) {
            icon.textContent = '-';
        } else {
            icon.textContent = '+';
        }
    });
});
const loadGitBtn = document.getElementById('fetch-repos-btn');
const reposDiv = document.getElementById('repos-container');
const GITHUB_USER = 'zeyadpublish';

if(loadGitBtn) {
  loadGitBtn.addEventListener('click',async () => {
    loadGitBtn.textContent = 'Connecting to Github...';
    reposDiv.innerHTML = '';

    try{
      const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=3`);

      if(!res.ok) throw new Error('API Erorr');

      const data = await res.json();

      data.forEach(repo => {
        const box = document.createElement('div');
        box.className = 'repo-box';
        box.innerHTML = `
            <h4>${repo.name}</h4>
            <p>${repo.description || 'No description provided for this project.'}</p>
            <span class="repo-lang">${repo.language || 'Code'}</span>
            `;
            reposDiv.appendChild(box);
      });

      loadGitBtn.textContent = 'Synced Successfully';
      setTimeout(() => loadGitBtn.textContent = 'Sync Repositories', 3000);

    } catch(err) {
      reposDiv.innerHTML = '<p style="color: #ef4444;">Failed to fetch from Github API. Check connection or username.</p>';
      loadGitBtn.textContent = 'Retry';
    }
    });
}
