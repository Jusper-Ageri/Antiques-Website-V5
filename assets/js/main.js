
document.addEventListener('DOMContentLoaded', function(){
  // Preloader hide after load
  const pre = document.getElementById('preloader');
  if(pre){ setTimeout(()=>{ pre.classList.add('hidden'); setTimeout(()=>pre.style.display='none',400); }, 800); }

  // slideshow auto fade
  let slides = document.querySelectorAll('.slide');
  let dots = document.querySelectorAll('.dot');
  let idx = 0;
  function showNext(){ slides.forEach(s=>s.classList.remove('show')); dots.forEach(d=>d.classList.remove('active')); idx = (idx+1) % slides.length; slides[idx].classList.add('show'); if(dots[idx]) dots[idx].classList.add('active'); }
  if(slides.length>0){ slides[0].classList.add('show'); if(dots[0]) dots[0].classList.add('active'); setInterval(showNext,4000); }

  window.plusSlides = function(n){ slides.forEach(s=>s.classList.remove('show')); idx = (idx + n + slides.length) % slides.length; slides[idx].classList.add('show'); dots.forEach(d=>d.classList.remove('active')); if(dots[idx]) dots[idx].classList.add('active'); }
  window.currentSlide = function(n){ slides.forEach(s=>s.classList.remove('show')); idx = n-1; slides[idx].classList.add('show'); dots.forEach(d=>d.classList.remove('active')); if(dots[idx]) dots[idx].classList.add('active'); }

  // gallery modal
  const modal = document.getElementById('galleryModal');
  const btn = document.getElementById('viewGalleryBtn');
  const close = document.getElementById('galleryClose');
  const content = document.getElementById('galleryContent');
  if(btn){ btn.addEventListener('click', ()=>{ modal.style.display='flex'; content.innerHTML=''; for(let i=1;i<=15;i++){ let img = document.createElement('img'); img.src = `https://source.unsplash.com/1200x800/?interior,design,${i}`; content.appendChild(img); } }); }
  if(close){ close.addEventListener('click', ()=> modal.style.display='none'); }
  window.addEventListener('click',(e)=>{ if(e.target==modal) modal.style.display='none'; });

  // smooth in-page scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{ a.addEventListener('click', function(e){ e.preventDefault(); const id = this.getAttribute('href').slice(1); const el = document.getElementById(id); if(el) el.scrollIntoView({behavior:'smooth', block:'start'}); }); });

  // file input label display
  window.fileSelected = function(input){ const label = document.getElementById('fileLabel'); if(input.files && input.files.length) label.textContent = input.files[0].name; else label.textContent=''; }

  // page transition: intercept internal links and fade out then navigate
  document.querySelectorAll('a[href$=".html"], a[href="/"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return;
      e.preventDefault();
      document.body.style.transition='opacity .45s ease';
      document.body.style.opacity = 0;
      setTimeout(()=>{ window.location.href = href; }, 450);
    });
  });
});
