(function (window) {
  window['env'] = window['env'] || {};

  // Environment variables

  window['env']['production'] = false;
  window['env']['CONFIG_SERVER_HOST_NAME'] = 'localhost';
  window['env']['LATEX_RENDERER_HOST_NAME'] = 'localhost';
  window['env']['PATTERN_ATLAS_HOST_NAME'] = 'localhost';
  window['env']['CONFIG_SERVER_PORT'] = 2379;
  window['env']['LATEX_RENDERER_PORT'] = 8083;
})(this);
