const darkThemeOS = matchMedia('(prefers-color-scheme: dark)');
let switched = loadTheme();

function toggle() {
  switched = !switched;
  saveTheme(switched);
  switchTheme();
}

function isDarkTheme() {
  return (
    (darkThemeOS.matches && !switched) ||
    (!darkThemeOS.matches && switched)
  );
}

function updateTheme() {
  const isDark = isDarkTheme();
  updateHtmlClass(isDark);
  updateMetaTag(isDark);
}

function switchTheme() {
  document.documentElement.classList.add('is-transitioning');
  requestAnimationFrame(function () {
    requestAnimationFrame(function() {
      updateTheme();
      setTimeout(function() {
        document.documentElement.classList.remove('is-transitioning');
      }, 340);
    })
  })
}

function updateHtmlClass(isDark) {
  document.documentElement.classList.toggle('t-dark', isDark);
}

function updateMetaTag(isDark) {
  const color = isDark ? '#212c31' : "fff";
  document.getElementById('theme').setAttribute('content', color);
}

function saveTheme() {
  sessionStorage.setItem('darkmode', switched);
}


function loadTheme() {
  const val = sessionStorage.getItem('darkmode');
  return val === 'true';
}

function init() {
  updateTheme();

  darkThemeOS.addListener(function () {
    switched = false;
    saveTheme();
    updateTheme();
  });
}

export {
  init,
  toggle,
  isDarkTheme
};
