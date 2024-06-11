var google = null;

/* eslint-disable */
(function (configData) {
    function load(agency) {

        // **********************************************************
        // Fix for the agency.path (reverse proxy breaks it).
        if (window.location.host.indexOf('cbre.us') > -1 && agency.path) {
            agency.path = agency.path.trim().replace(/ /g, "%20");
            if (agency.path.indexOf('/properties2') > -1 && !window.location.pathname.indexOf('/properties2') > -1) {
                agency.path = window.location.pathname.replace('/results', '');
                agency.path = agency.path.split('/detail')[0];
            }
        }
        // **********************************************************

        var polyfillUrl =
            'https://polyfill.io/v3/polyfill.min.js?features=default%2Ces6%2Cfetch%2CObject.getOwnPropertyDescriptor&amp';
        var manifestUrl = '/resources/cbre-search-spa-v2/src/asset-manifest.json';

        function getGoogleMapsUrl(locale) {
            return (
                '//maps.googleapis.com/maps/api/js?v=3&client=gme-cbreltd&channel=' + this.document.domain + '&libraries=places&language=' +
                locale
            );
        }

        function getRecaptchaUrl(locale) {
            return '//www.google.com/recaptcha/api.js?render=explicit&amp;hl=' + locale;
        }
        var acceptedEnv = ['dev', 'staging', 'prod'];
        var acceptedComponents = ['spa', 'carousel', 'landing', 'landing-old', 'search'];
        var v1ResourcesPrefix = '/resources/cbre-search-spa/';

        if (!agency) {
            throw new Error('agency365 is missing on the global scope');
        }
        if (!agency.config) {
            throw new Error(
                'agency365.config is undefined. Provide a path to a config file or pass config inline as JS object'
            );
        }
        if (!agency.renderInElementWithId) {
            throw new Error(
                'agency365.renderInElementWithId is undefined. Provide an id for an element where to render an SPA component'
            );
        }
        if (!document.getElementById(agency.renderInElementWithId)) {
            throw new Error(
                'Element with id: ' +
                renderInElementWithId +
                'can not be found. Make sure it is present on the page'
            );
        }
        if (!agency.component || acceptedComponents.indexOf(agency.component) === -1) {
            var acceptedValues = acceptedEnv.join('|');
            throw new Error(
                'agency365.component is undefined. Provide which SPA component to render, accepted values: ' +
                acceptedValues
            );
        }
        if (!agency.env || acceptedEnv.indexOf(agency.env) === -1) {
            throw new Error(
                'agency365.env is undefined or set to a wrong value. Provide which environment you are running, accepted values: dev|staging|prod'
            );
        }
        if (agency.siteId) {
            console.warn('agency.siteId is deprecated. siteId is now read from the config');
        }
        if (agency.locale) {
            console.warn('agency.locale is deprecated. Locale is now read from the config');
        }

        function getLocale(config) {
            return config.language;
        }

        function waitForGlobal(keys, callback) {
            const allKeysPresent = keys
                .map(function (key) {
                    return !!window[key];
                })
                .reduce(function (acc, curr) {
                    return acc && curr;
                }, true);

            if (allKeysPresent) {
                callback();
            } else {
                setTimeout(function () {
                    waitForGlobal(keys, callback);
                }, 200);
            }
        }

        function loadScript(path, callback, deferred) {
            var script = document.createElement('script');
            script.onload = callback;
            script.src = path;
            if (deferred) script.setAttribute('defer', '');

            document.head.appendChild(script);
        }

        function loadCSS(fileName) {
            if (fileName === undefined) {
                return;
            }

            var head = document.head;
            var link = document.createElement('link');

            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = fileName;

            head.appendChild(link);
        }

        function getComponent() {
            switch (agency.component) {
                case 'carousel':
                    return 'carousel';
                case 'search':
                    return 'search';
                case 'landing':
                    return 'landing';
                case 'landing-old':
                    return 'landing-old';
                case 'spa':
                    return 'spa';
                default:
                    throw new Error('Can not recognise a component');
            }
        }

        function getToggle(toggles) {
            return toggles[getComponent()];
        }

        function waitForV2ScriptsToLoad(config) {
            waitForGlobal(['Agency365Search', 'google'], function () {
                var cbre = new Agency365Search();
                cbre.renderSearch(agency.renderInElementWithId, config, agency.path);
            });
        }

        function renderV1(appConfig) {
            switch (getComponent()) {
                case 'search':
                    CBRESearch().renderSearch(agency.renderInElementWithId, agency.config, {
                        path: agency.path,
                    });
                    break;
                case 'carousel':
                    CBRESearch().renderCarousel(
                        agency.renderInElementWithId,
                        agency.config,
                        {
                            path: agency.path,
                        },
                        agency.staticQuery
                    );
                    break;
                case 'spa':
                    if (agency.breadcrumb != null) appConfig.breadcrumbPrefix = agency.breadcrumb;
                    CBRESearch().renderListMap(agency.renderInElementWithId, appConfig, agency.path, {
                        staticQuery: agency.staticQuery,
                    });
                    break;
                case 'landing-old':
                    CBRESearch().renderListings(
                        agency.renderInElementWithId,
                        agency.config,
                        {
                            path: agency.path,
                        },
                        {
                            staticQuery: agency.staticQuery,
                        }
                    );
                    break;
                default:
                    throw new Error('Failed identifying component to render');
            }
        }

        function waitForV1ScriptsToLoad(config) {
            waitForGlobal(['CBRESearch', 'google'], function () {
                renderV1(config);
            });
        }

        function onV2ManifestLoaded(manifest, config) {
            var locale = getLocale(config);
            loadCSS(manifest['main.css']);
            loadScript(getRecaptchaUrl(locale));
            loadScript(manifest['runtime-main.js']);
            loadScript(manifest['vendors-main.js']);
            loadScript(manifest['main.js']);
            if (!window.google) {
                loadScript(getGoogleMapsUrl(locale));
            }
            waitForV2ScriptsToLoad(config);
        }

        function loadV2Resources(config) {
            fetch(manifestUrl)
                .then(function (res) {
                    if (!res.ok) {
                        throw new Error(res.statusText);
                    }
                    return res.json();
                })
                .then(function (manifest) {
                    onV2ManifestLoaded(manifest, config);
                })
                .catch(function (err) {
                    console.error(err);
                });
        }

        function buildV1CssLink(version, designVersion, commercial) {
            var type = commercial ? 'commercial' : 'residential';
            var design = '';
            if (designVersion === 'v2' || designVersion === 'r3') {
                design = designVersion;
            }
            return v1ResourcesPrefix + version + '/release/css/cbre-' + type + design + '.min.css';
        }

        function updateGlobalStyleProp(designVersion, config) {
            if (isCommercial(config) && designVersion === 'v2') {
                window.cbreSiteTheme = 'commercialv2';
                window.cbreSiteType = 'commercial';
            } else if (isCommercial(config) && designVersion === 'r3') {
                window.cbreSiteTheme = 'commercialr3';
                window.cbreSiteType = 'commercial';
            } else if (isCommercial(config) && !(designVersion === 'v2' || designVersion === 'r3')) {
                window.cbreSiteTheme = 'commercial';
                window.cbreSiteType = 'commercial';
            }
        }

        function isCommercial(config) {
            return config.siteType === 'commercial';
        }

        function onV1ManifestLoaded(version, designVersion, config) {
            var locale = getLocale(config);
            updateGlobalStyleProp(designVersion, config);
            loadCSS(buildV1CssLink(version, designVersion, isCommercial(config)));
            loadScript(getRecaptchaUrl(locale));

            loadScript(getGoogleMapsUrl(locale), function () {
                loadScript(
                    v1ResourcesPrefix + version + '/release/gzip/js/application.min.js',
                    function () {
                        waitForV1ScriptsToLoad(config);
                    },
                    false
                );
            });

            // waitForV1ScriptsToLoad(config);
        }

        function getSiteVersion(data) {
            var site = data.sites ? data.sites.filter(function (e) {
                if (e.host == window.location.host.toLowerCase()) {
                    return e;
                }
            }) : null;

            // if host matches return build version else return version
            var version = site.length > 0 ? site[0].buildVersion : data.version;

            return version;
        }

        function loadV1Resources(designVersion, config) {
            var versionUrl = '/resources/cbre-search-spa/version.json';

            fetch(versionUrl)
                .then(function (res) {
                    if (!res.ok) {
                        throw new Error(res.statusText);
                    }
                    return res.json();
                })
                .catch(function (err) {
                    console.error('Failed loading version file');
                    console.error(err);
                })
                .then(function (data) {
                    var version = getSiteVersion(data);
                    console.log(version);

                    onV1ManifestLoaded(version, designVersion, config);
                })
                .catch(function (err) {
                    console.error(err);
                });
        }

        function onToggleLoaded(toggles, config) {
            var toggle = getToggle(toggles);
            if (toggle.version === 'v2') {
                loadV2Resources(config);
            } else {
                loadV1Resources(toggle.design, config);
            }
        }

        function getToggleUrl(siteId) {
            return '/resources/cbre-search-spa-v2/toggles/' + siteId + '-' + agency.env + '.json';
        }

        function getConfig() {
            if (typeof agency.config === 'string') {
                return fetch(agency.config).then(function (res) {
                    if (!res.ok) {
                        throw new Error(res.statusText);
                    }
                    return res.json();
                });
            }

            return Promise.resolve(agency.config);
        }

        function getToggles(siteId) {
            return fetch(getToggleUrl(siteId)).then(function (res) {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            });
        }

        function onPolyfillLoaded() {
            var config;
            getConfig()
                .then(function (data) {
                    config = data;
                    var siteId = config.siteId;
                    if (config && config.additionalHeadCSS) {
                        if (config.additionalHeadCSS.length > 0) {
                            for (var i = 0; i < config.additionalHeadCSS.length; i++) {
                                addCss(config.additionalHeadCSS[i]);
                            }
                        }
                    }
                    document.body.className += ' ' + siteId;
                    return getToggles(siteId);
                })
                .then(function (toggles) {
                    onToggleLoaded(toggles, config);
                })
                .catch(function (err) {
                    console.error('Failed loading config');
                    console.error(err);
                });
        }

        loadScript(polyfillUrl, onPolyfillLoaded);
    }

    function addCss(fileName) {
        var head = document.head;
        var link = document.createElement('link');

        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = fileName;

        head.appendChild(link);
    }

    if (Array.isArray(configData)) {
        configData.forEach(load);
    } else {
        load(configData);
    }
})(window.agency365);
/* eslint-enable */
