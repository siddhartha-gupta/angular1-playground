System.register(['angular2/core', 'angular2/router', 'angular2/common', '../directives/spinner.directive', '../directives/invite-handler.directive', '../services/server-communicator.service', '../services/event-pub-sub.service', '../services/generic-config.service', '../services/utils.service', '../settings'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, common_1, spinner_directive_1, invite_handler_directive_1, server_communicator_service_1, event_pub_sub_service_1, generic_config_service_1, utils_service_1, settings_1;
    var PlayersList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (spinner_directive_1_1) {
                spinner_directive_1 = spinner_directive_1_1;
            },
            function (invite_handler_directive_1_1) {
                invite_handler_directive_1 = invite_handler_directive_1_1;
            },
            function (server_communicator_service_1_1) {
                server_communicator_service_1 = server_communicator_service_1_1;
            },
            function (event_pub_sub_service_1_1) {
                event_pub_sub_service_1 = event_pub_sub_service_1_1;
            },
            function (generic_config_service_1_1) {
                generic_config_service_1 = generic_config_service_1_1;
            },
            function (utils_service_1_1) {
                utils_service_1 = utils_service_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            }],
        execute: function() {
            PlayersList = (function () {
                function PlayersList(router, customEventService, serverCommunicator, genericConfig, utils) {
                    var _this = this;
                    this.router = router;
                    this.customEventService = customEventService;
                    this.serverCommunicator = serverCommunicator;
                    this.genericConfig = genericConfig;
                    this.utils = utils;
                    customEventService.onHeaderClicked.subscribe(function (data) { return _this.onHeaderClicked(data); });
                    customEventService.onPlayersListReceived.subscribe(function (data) { return _this.onPlayersListReceived(data); });
                    customEventService.onStartGame.subscribe(function (data) { return _this.onStartGame(); });
                    customEventService.onSendingInvite.subscribe(function (data) { return _this.onSendingInvite(); });
                    customEventService.onEndGame.subscribe(function (data) { return _this.endGame(); });
                    this.showLoader = false;
                    this.serverCommunicator.msgSender('get-players-list', {});
                }
                PlayersList.prototype.ngAfterViewInit = function () {
                    console.log(this.inviteHandler);
                };
                PlayersList.prototype.onStartGame = function () {
                    this.router.navigate(['GamePlay']);
                };
                PlayersList.prototype.onRecipientSelected = function (event, emailId) {
                    this.inviteHandler.onRecipientSelected(event, emailId);
                };
                PlayersList.prototype.onSendingInvite = function () {
                    this.showLoader = true;
                };
                PlayersList.prototype.onPlayersListReceived = function (data) {
                    var list = [], tempList = [];
                    console.log('on playersList: ', data);
                    if (data) {
                        list = data;
                    }
                    else {
                        list = this.serverCommunicator.playersList;
                    }
                    for (var i = 0, len = list.length; i < len; i++) {
                        if (list[i].emailId !== this.genericConfig.multiPlayerConfig.emailId) {
                            tempList.push(list[i]);
                        }
                    }
                    this.playersList = tempList;
                };
                /*
                * Functions to handler
                * Click on headers for current component
                */
                PlayersList.prototype.onHeaderClicked = function (data) {
                    if (data.routeName === '/playerslist') {
                        switch (data.btnType) {
                            case 'left':
                                this.goToHome();
                                break;
                            case 'right':
                                break;
                        }
                    }
                };
                PlayersList.prototype.goToHome = function () {
                    this.router.navigate(['Home']);
                };
                PlayersList.prototype.endGame = function () {
                    this.showLoader = false;
                };
                __decorate([
                    core_1.ViewChild(invite_handler_directive_1.InviteHandler), 
                    __metadata('design:type', invite_handler_directive_1.InviteHandler)
                ], PlayersList.prototype, "inviteHandler", void 0);
                PlayersList = __decorate([
                    core_1.Component({
                        selector: 'PlayersList',
                        directives: [router_1.ROUTER_DIRECTIVES, common_1.NgClass, spinner_directive_1.Spinner, invite_handler_directive_1.InviteHandler],
                        styleUrls: [settings_1._settings.cssPath + 'player-list.css'],
                        templateUrl: settings_1._settings.templatePath.component + 'player-list.template.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, event_pub_sub_service_1.CustomEventService, server_communicator_service_1.ServerCommunicator, generic_config_service_1.GenericConfig, utils_service_1.Utils])
                ], PlayersList);
                return PlayersList;
            })();
            exports_1("PlayersList", PlayersList);
        }
    }
});

//# sourceMappingURL=players-list.component.js.map
