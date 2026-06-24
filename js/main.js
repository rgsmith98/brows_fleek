
(function(){
  const hdr = document.getElementById('siteHeader');
  // Inner pages always show solid white header
  const isIndex = document.body.dataset.page === 'index';
  if(!isIndex) hdr.classList.add('solid');
  const onScroll = () => { if(isIndex) hdr.classList.toggle('scrolled', window.scrollY > 60); };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Hamburger
  const ham = document.getElementById('hdrHamburger');
  const nav = document.getElementById('hdrNav');
  if(ham && nav){
    ham.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      ham.classList.toggle('is-open', open);
      ham.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  // Mobile: tap on has-drop <a> toggles its submenu
  if(window.innerWidth <= 768){
    document.querySelectorAll('.has-drop > a').forEach(a => {
      a.addEventListener('click', function(e){
        e.preventDefault();
        const li = this.parentElement;
        li.classList.toggle('mob-open');
      });
    });
  }

  // Scroll reveal
  const revEls = document.querySelectorAll('[data-reveal]');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); }});
    },{threshold:.1});
    revEls.forEach(el => io.observe(el));
  } else revEls.forEach(el => el.classList.add('is-visible'));
})();
