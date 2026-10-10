const brandScript = document.currentScript;
const brandRoot = new URL('.', brandScript.src);
const brandUrl = (path) => new URL(path, brandRoot).href;
const createLogo = (className) => {
  const logo = document.createElement('a');
  logo.className = className;
  logo.href = brandUrl('');
  logo.setAttribute('aria-label', 'ProbKey Business Solutions home');

  const name = document.createElement('span');
  name.className = 'brand-name';
  name.textContent = 'ProbKey Business Solutions';
  logo.append(name);
  return logo;
};

const header = document.querySelector('.site-header') || document.createElement('header');
header.className = 'site-header';
header.replaceChildren();
header.append(createLogo('brand'));

const skipLink = document.createElement('a');
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
document.body.prepend(skipLink);

const mainContent = document.querySelector('main');
if (mainContent && !mainContent.id) mainContent.id = 'main-content';
if (mainContent) skipLink.href = `#${mainContent.id}`;

const menuToggle = document.createElement('button');
menuToggle.className = 'menu-toggle';
menuToggle.type = 'button';
menuToggle.setAttribute('aria-label', 'Open navigation');
menuToggle.setAttribute('aria-expanded', 'false');
menuToggle.setAttribute('aria-controls', 'primary-navigation');
menuToggle.innerHTML = '<span></span><span></span>';
header.append(menuToggle);

const nav = document.createElement('nav');
nav.className = 'main-nav';
nav.id = 'primary-navigation';
nav.setAttribute('aria-label', 'Main navigation');
const links = [
  ['Home', ''],
  ['About', 'about/'],
  ['Services', 'services/'],
  ['Portfolio', 'portfolio/'],
  ['Industries', 'industries/'],
  ['Free Audit', 'free-audit/'],
  ['Case Studies', 'case-studies/'],
  ['Blog', 'blog/'],
  ['Contact', 'contact/']
];

links.forEach(([label, path]) => {
  const link = document.createElement('a');
  link.href = brandUrl(path);
  link.textContent = label;
  if (new URL(link.href).pathname.replace(/\/+$/, '') === window.location.pathname.replace(/\/+$/, '')) {
    link.setAttribute('aria-current', 'page');
  }
  nav.append(link);
});

const callToAction = document.createElement('a');
callToAction.className = 'nav-cta';
callToAction.href = brandUrl('contact/');
callToAction.innerHTML = 'Book a free strategy call <span aria-hidden="true">↗</span>';
nav.append(callToAction);
header.append(nav);

const oldRouteHeader = document.querySelector('.route-header');
if (oldRouteHeader) oldRouteHeader.remove();
if (!header.isConnected) document.body.prepend(header);

const oldFooter = document.querySelector('.site-footer, .simple-footer');
if (oldFooter) oldFooter.remove();

const footer = document.createElement('footer');
footer.className = 'site-footer brand-footer';
footer.innerHTML = `
  <div class="brand-footer-content">
    <div class="brand-footer-identity"></div>
    <div>
      <h2 class="brand-footer-heading">Explore ProbKey</h2>
      <nav class="brand-footer-links" aria-label="Footer navigation">
        <a href="${brandUrl('services/')}">Services</a>
        <a href="${brandUrl('portfolio/')}">Portfolio</a>
        <a href="${brandUrl('free-audit/')}">Free Audit</a>
        <a href="${brandUrl('case-studies/')}">Case Studies</a>
        <a href="${brandUrl('blog/')}">Blog &amp; insights</a>
        <a href="${brandUrl('contact/')}">Contact</a>
      </nav>
    </div>
    <div>
      <h2 class="brand-footer-heading">Connect with us</h2>
      <nav class="brand-footer-socials" aria-label="Social media">
        <a href="https://www.instagram.com/probkey12/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
        <a href="https://www.facebook.com/khalidahmed23" target="_blank" rel="noopener noreferrer">Facebook ↗</a>
        <a href="https://www.linkedin.com/in/probkey-solutions-2374743a4/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a href="https://wa.me/923151204969" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
      </nav>
    </div>
  </div>
  <div class="brand-footer-bottom">
    <span>© ${new Date().getFullYear()} ProbKey Business Solutions. All rights reserved.</span>
    <a href="mailto:probkey14@gmail.com">probkey14@gmail.com</a>
  </div>`;
footer.querySelector('.brand-footer-identity').append(createLogo('brand'));
const description = document.createElement('p');
description.textContent = 'We help ambitious businesses build a stronger digital presence through strategy, creative, marketing, and practical technology.';
footer.querySelector('.brand-footer-identity').append(description);
document.body.append(footer);

const updateHeaderScrollState = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
updateHeaderScrollState();
window.addEventListener('scroll', updateHeaderScrollState, { passive: true });

const closeMenu = () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  document.body.classList.remove('nav-open');
};

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.classList.toggle('nav-open', open);
});

nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('click', (event) => {
  if (!header.contains(event.target)) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});
