(function (window) {
  window['env'] = window['env'] || {};

  // Environment variables

  window['env']['production'] = false;
  window['env']['CONFIG_SERVER_HOST_NAME'] = 'localhost';
  window['env']['LATEX_RENDERER_HOST_NAME'] = 'localhost';
  window['env']['PATTERN_ATLAS_API_HOST_NAME'] = 'localhost';
  window['env']['CONFIG_SERVER_PORT'] = 2379;
  window['env']['LATEX_RENDERER_PORT'] = 5030;
  window['env']['PATTERN_ATLAS_API_PORT'] = 1977;
  window['env']['URL_SCHEME'] = 'http';
  window['env']['AUTH_REALM_URL'] = 'http://localhost:7080/realms/patternatlas';
})(this);
