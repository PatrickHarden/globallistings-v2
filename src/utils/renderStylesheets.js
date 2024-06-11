// Hack to force styled components to render styles during prerender for googlebot
// Hosted here for version control but currently only used by Drupal when hosting the V2 SPA
export default () => {
  if (
    /PhantomJS/.test(window.navigator.userAgent) ||
    /Prerender/i.test(window.navigator.userAgent)
  ) {
    var el = document.createElement('style');
    document.head.appendChild(el);
    var styles = document.querySelectorAll('style[data-styled]');
    for (style of styles.values()) {
      for (rule of style.sheet.rules) {
        el.appendChild(document.createTextNode(rule.cssText));
      }
    }
  }
};
