System.register(['angular2/platform/browser', 'rxjs/Rx', './components/app.component', './services/generic-config.service', './services/current-game-config.service'], function(exports_1) {
    var browser_1, app_component_1, generic_config_service_1, current_game_config_service_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (_1) {},
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (generic_config_service_1_1) {
                generic_config_service_1 = generic_config_service_1_1;
            },
            function (current_game_config_service_1_1) {
                current_game_config_service_1 = current_game_config_service_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.App, [browser_1.ELEMENT_PROBE_PROVIDERS, generic_config_service_1.GenericConfig, current_game_config_service_1.CurrentGameConfig]).catch(console.error);
        }
    }
});

//# sourceMappingURL=boot.js.map
