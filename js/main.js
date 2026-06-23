/* Laurence Quizmaster — main.js (jQuery) */
$(function () {
  // Year
  $('#year').text(new Date().getFullYear());

  // Header on scroll
  var $header = $('#siteHeader');
  function onScroll(){ $header.toggleClass('scrolled', $(window).scrollTop() > 30); }
  $(window).on('scroll', onScroll); onScroll();

  // Mobile nav
  $('#navToggle').on('click', function(){
    var $list = $('#navList'); $list.toggleClass('open');
    $(this).attr('aria-expanded', $list.hasClass('open'));
  });
  $('#navList a').on('click', function(){ $('#navList').removeClass('open'); });

  // Reveal on scroll
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else { $('.reveal').addClass('in'); }

  // Stat counters
  var statsDone = false;
  function runCounters(){
    if (statsDone) return;
    var hero = document.querySelector('.hero-stats');
    if (!hero) return;
    var top = hero.getBoundingClientRect().top;
    if (top < window.innerHeight - 100){
      statsDone = true;
      $('.hero-stats [data-count]').each(function(){
        var $el = $(this), target = +$el.data('count'), start = 0, dur = 1600, t0 = performance.now();
        function tick(now){
          var p = Math.min((now - t0)/dur, 1);
          var val = Math.floor(start + (target - start) * (1 - Math.pow(1-p,3)));
          $el.text(val.toLocaleString() + (target >= 500 ? '+' : ''));
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }
  }
  $(window).on('scroll', runCounters); runCounters();

  // Gallery via Ajax/JSON
  $.getJSON('data/gallery.json').done(function(items){
    var $g = $('#gallery');
    items.forEach(function(it, i){
      var $item = $('<a class="gallery-item" href="#"></a>')
        .attr('data-cat', it.category)
        .attr('data-full', it.src);
      var $img = $('<img alt="">').attr('loading','lazy').attr('alt', it.alt || '');
      $img.on('load', function(){ $(this).addClass('loaded'); });
      $img.attr('src', it.thumb || it.src);
      $item.append($img);
      $g.append($item);
    });
  });

  // Filters
  $('#galleryFilters').on('click', '.filter', function(){
    var f = $(this).data('filter');
    $('#galleryFilters .filter').removeClass('active');
    $(this).addClass('active');
    $('#gallery .gallery-item').each(function(){
      var match = f === 'all' || $(this).data('cat') === f;
      $(this).css('display', match ? '' : 'none');
    });
  });

  // Lightbox
  var $lb = $('#lightbox'), $lbImg = $lb.find('img');
  $('#gallery').on('click', '.gallery-item', function(e){
    e.preventDefault();
    $lbImg.attr('src', $(this).data('full'));
    $lb.addClass('open').attr('aria-hidden','false');
  });
  $lb.on('click', function(e){
    if (e.target === this || $(e.target).hasClass('lightbox-close')) {
      $lb.removeClass('open').attr('aria-hidden','true');
      $lbImg.attr('src','');
    }
  });
  $(document).on('keydown', function(e){ if (e.key === 'Escape') $lb.removeClass('open').attr('aria-hidden','true'); });

  // Contact form (demo)
  $('#contactForm').on('submit', function(e){
    e.preventDefault();
    var $note = $('#formNote');
    $note.text('Thanks! This is a demonstration website — in the live version your enquiry would be sent straight to Laurence. We\'ll be in touch soon.').prop('hidden', false);
    this.reset();
    $note[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});