require('./index.scss');

// Load Netlify if we need it
if(['#invite_token'].includes(window.location.hash)){
  const s = document.createElement('script');
  s.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
  document.head.appendChild(s);
}