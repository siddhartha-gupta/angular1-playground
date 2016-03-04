/// <reference path='../_all.ts' />
var services = angular.module('services', []);
var controllers = angular.module('controllers', []);
var directives = angular.module('directives', []);


/// <reference path='../_all.ts' />
var app;
(function (app) {
    'use strict';
    var Constants = (function () {
        function Constants() {
        }
        Object.defineProperty(Constants, "Default", {
            get: function () {
                return {
                    serverUrl: 'http://localhost:8080/',
                    templateUrl: '../templates/'
                };
            },
            enumerable: true,
            configurable: true
        });
        return Constants;
    }());
    app.Constants = Constants;
})(app || (app = {}));


/// <reference path='../_all.ts' />
var app;
(function (app) {
    'use strict';
    var Config = (function () {
        function Config($routeProvider) {
            $routeProvider.when("/userslist", {
                templateUrl: app.Constants.Default.templateUrl + 'usersList.html',
                controller: 'UsersListController',
                controllerAs: 'customController'
            }).when('/addUser', {
                controller: 'AddUserController',
                controllerAs: 'customController',
                templateUrl: app.Constants.Default.templateUrl + 'addUser.html'
            }).otherwise({ redirectTo: '/userslist' });
        }
        Config.$inject = [
            '$routeProvider'
        ];
        return Config;
    }());
    app.Config = Config;
})(app || (app = {}));


/// <reference path='../_all.ts' />
var app;
(function (app) {
    'use strict';
    var RouteHandler = (function () {
        function RouteHandler($rootScope, //ng.IRootScopeService,
            $location, sharedService) {
            $rootScope.Utils = {
                keys: Object.keys
            };
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                sharedService.broadcastEvent('routeChangeStart', {
                    next: next,
                    current: current
                });
            });
            $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
                sharedService.broadcastEvent('routeChangeSuccess', {
                    next: next,
                    current: current
                });
            });
            $rootScope.$on("$routeChangeError", function (event, next, current) {
                sharedService.broadcastEvent('routeChangeError', {
                    next: next,
                    current: current
                });
            });
        }
        RouteHandler.inject = ['$rootScope', '$location', 'sharedService'];
        return RouteHandler;
    }());
    app.RouteHandler = RouteHandler;
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
})(app || (app = {}));


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var HeaderController = (function () {
        function HeaderController($scope, $location, $window, $log, sharedService) {
            this.$scope = $scope;
            this.$location = $location;
            this.$window = $window;
            this.$log = $log;
            this.sharedService = sharedService;
            $scope.$on("routeChangeStart", this.onRouteChangeStart.bind(this));
            $scope.$on("routeChangeSuccess", this.onRouteChangeSuccess.bind(this));
            $scope.$on("routeChangeError", this.onRouteChangeError.bind(this));
            this.heading = 'User management';
            this.headerLeftBtn = {
                'showBtn': false,
                'clickFunc': '',
                'text': ''
            };
            this.headerRightBtn = {
                'showBtn': false,
                'clickFunc': '',
                'text': ''
            };
        }
        HeaderController.prototype.onRouteChangeStart = function (event, params) {
            // this.$log.log('onRouteChangeStart: ', params);
        };
        HeaderController.prototype.onRouteChangeSuccess = function (event, params) {
            // this.$log.log('onRouteChangeSuccess: ', params);
            if (params.next && params.next.$$route && params.next.$$route.controller) {
                switch (params.next.$$route.controller) {
                    case 'UsersListController':
                        this.setUserListHeader();
                        break;
                    case 'AddUserController':
                        this.setAddUserHeader();
                        break;
                }
            }
            else {
                this.setUserListHeader();
            }
        };
        HeaderController.prototype.onRouteChangeError = function (event, params) {
            // this.$log.log('onRouteChangeError: ', params);
        };
        HeaderController.prototype.setUserListHeader = function () {
            this.headerLeftBtn = {
                'showBtn': false,
                'clickFunc': '',
                'text': ''
            };
            this.headerRightBtn = {
                'showBtn': true,
                'clickFunc': 'goToAddUser',
                'text': 'Add user'
            };
        };
        HeaderController.prototype.setAddUserHeader = function () {
            this.headerLeftBtn = {
                'showBtn': true,
                'clickFunc': 'goBack',
                'text': 'Back'
            };
            this.headerRightBtn = {
                'showBtn': false,
                'clickFunc': '',
                'text': ''
            };
        };
        HeaderController.prototype.callFunction = function (event, clickFunc) {
            event.preventDefault();
            if (angular.isFunction(this[clickFunc])) {
                this[clickFunc]();
            }
        };
        HeaderController.prototype.goToAddUser = function () {
            this.$location.path('/addUser').replace();
        };
        HeaderController.prototype.addUser = function () {
            this.sharedService.broadcastEvent('add-user', {});
        };
        HeaderController.prototype.goBack = function () {
            event.preventDefault();
            this.$location.path('/userslist').replace();
        };
        HeaderController.$inject = [
            '$scope',
            '$location',
            '$window',
            '$log',
            'SharedService'
        ];
        return HeaderController;
    }());
    app.HeaderController = HeaderController;
})(app || (app = {}));
controllers.controller('HeaderController', app.HeaderController);


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var UsersListController = (function () {
        function UsersListController($scope, $location, apiService, utilsService, sharedService, checkboxHandlerService) {
            this.$scope = $scope;
            this.$location = $location;
            this.apiService = apiService;
            this.utilsService = utilsService;
            this.sharedService = sharedService;
            this.checkboxHandlerService = checkboxHandlerService;
            this.appConfig = app.Constants.Default;
            this.sortOrder = '-id_member';
            this.getUsers();
            this.usersList = [];
            this.editUserDefault();
            this.modalDialogueDefault();
            this.infoSliderDefault();
            this.createtableHeading();
        }
        UsersListController.prototype.getUsers = function () {
            var _this = this;
            this.apiService.getCall({
                'url': this.appConfig.serverUrl + 'getuserslist'
            }).success(function (data, status) {
                _this.processServerData(data);
            }).error(function (data, status) {
                _this.utilsService.log('err');
            });
        };
        UsersListController.prototype.processServerData = function (data) {
            this.utilsService.log('processServerData: ', data);
            if (data && data.length > 0) {
                this.usersList = data;
            }
            else {
                this.usersList.length = 0;
            }
        };
        UsersListController.prototype.addUser = function () {
            this.$location.path('/addUser').replace();
        };
        /*
        * Action buttons handling
        */
        UsersListController.prototype.actionHandler = function (type, userId, userData) {
            switch (type) {
                case 'edit':
                    this.editUserClick(userId);
                    break;
                case 'delete':
                    this.deleteUserClick(userId);
                    break;
                case 'save':
                    this.updateUserData(userData, userId);
                    break;
            }
        };
        /*
        * Edit user code flow
        */
        UsersListController.prototype.validateEmail = function (val) {
            this.utilsService.log('validateEmail');
        };
        UsersListController.prototype.editUserClick = function (userId) {
            this.utilsService.log('userId: ', userId);
            this.editUser = {
                isVisible: true,
                title: 'Edit details',
                userData: this.utilsService.clone(this.utilsService.getObjectFromArr(this.usersList, 'id_member', userId)),
                userId: userId
            };
            this.sharedService.broadcastEvent('show-edit-modal', {});
            this.utilsService.log(this.editUser);
        };
        UsersListController.prototype.updateUserData = function (data, userId) {
            var _this = this;
            this.utilsService.log('updateUserData: ', data);
            this.utilsService.log('userId: ', userId);
            this.apiService.postCall({
                'url': this.appConfig.serverUrl + 'updateuser',
                'data': {
                    'userId': userId,
                    'userData': {
                        email: data.email,
                        firstname: data.firstname,
                        id_member: data.id_member,
                        lastname: data.lastname,
                        location: data.location,
                        phonenumber: data.phonenumber
                    }
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (response) {
                _this.utilsService.log('updateUserData success: ', response);
                _this.onUserUpdateResp(response.resp);
            }).error(function (response) {
                _this.utilsService.log('updateUserData error: ', response);
            });
        };
        UsersListController.prototype.onUserUpdateResp = function (resp) {
            this.hideEditPopup();
            if (resp === true) {
                this.showInfoSlider({
                    title: 'User updated',
                    body: 'User info has been updated successfully',
                    startTimer: 500,
                    endTimer: 4000
                });
                this.getUsers();
            }
            else {
                this.modalDialogue = {
                    isVisible: true,
                    title: 'Error!',
                    body: 'We have encountered error while updating user information. Please try again',
                    btn1Txt: 'Ok',
                    btn2Txt: '',
                    showBtn2: false,
                    btn1Callback: this.hideModalDialogue.bind(this),
                    btn2Callback: function () { },
                    closeBtnCallback: this.hideModalDialogue.bind(this),
                };
                this.sharedService.broadcastEvent('show-modal', {});
            }
        };
        /*
        * Delete user codeflow
        */
        UsersListController.prototype.deleteUserClick = function (userId) {
            this.utilsService.log('userId: ', userId);
            this.modalDialogue = {
                isVisible: true,
                title: 'Delete user?',
                body: 'Please confirm, you want to delete the user',
                btn1Txt: 'Ok',
                btn2Txt: 'Cancel',
                showBtn2: true,
                btn1Callback: this.deleteUserConfirm.bind(this, userId),
                btn2Callback: this.hideModalDialogue.bind(this),
                closeBtnCallback: this.hideModalDialogue.bind(this),
            };
            this.sharedService.broadcastEvent('show-modal', {});
        };
        UsersListController.prototype.deleteUserConfirm = function (userId) {
            var _this = this;
            this.utilsService.log('deleteUserConfirm, userId: ', userId);
            this.apiService.postCall({
                'url': this.appConfig.serverUrl + 'deleteuser',
                data: {
                    'userId': userId
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (response) {
                _this.utilsService.log('success: ', response);
                _this.onUserDeleted(response.resp);
            }).error(function (response) {
                _this.utilsService.log('error: ', response);
            });
        };
        UsersListController.prototype.onUserDeleted = function (resp) {
            if (resp === true) {
                this.hideModalDialogue();
                this.showInfoSlider({
                    title: 'User deleted',
                    body: 'User has been deleted successfully',
                    startTimer: 500,
                    endTimer: 4000
                });
                this.getUsers();
            }
            else {
                this.modalDialogue = {
                    isVisible: true,
                    title: 'Error!',
                    body: 'We have encountered error while deleting user. Please try again',
                    btn1Txt: 'Ok',
                    btn2Txt: '',
                    showBtn2: false,
                    btn1Callback: this.hideModalDialogue.bind(this),
                    btn2Callback: function () { },
                    closeBtnCallback: this.hideModalDialogue.bind(this),
                };
            }
        };
        /*
        * Delete all users codeflow
        */
        UsersListController.prototype.deleteAll = function ($event) {
            console.log('deleteAll');
            this.modalDialogue = {
                isVisible: true,
                title: 'Delete all users?',
                body: 'Please confirm, you want to delete all users',
                btn1Txt: 'Ok',
                btn2Txt: 'Cancel',
                showBtn2: true,
                btn1Callback: this.deleteAllUsersConfirm.bind(this),
                btn2Callback: this.hideModalDialogue.bind(this),
                closeBtnCallback: this.hideModalDialogue.bind(this),
            };
            this.sharedService.broadcastEvent('show-modal', {});
        };
        UsersListController.prototype.deleteAllUsersConfirm = function (userId) {
            var _this = this;
            this.utilsService.log('deleteUserConfirm, userId: ', userId);
            var userIds = [];
            for (var i = 0, len = this.usersList.length; i < len; i++) {
                userIds.push(this.usersList[i].id_member);
            }
            console.log(userIds);
            this.apiService.postCall({
                'url': this.appConfig.serverUrl + 'deleteallusers',
                data: {
                    'userIds': userIds
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (response) {
                _this.utilsService.log('success: ', response);
                _this.onAllUsersDeleted(response.resp);
            }).error(function (response) {
                _this.utilsService.log('error: ', response);
            });
        };
        UsersListController.prototype.onAllUsersDeleted = function (resp) {
            if (resp === true) {
                this.hideModalDialogue();
                this.showInfoSlider({
                    title: 'All users deleted',
                    body: 'All Users are deleted successfully',
                    startTimer: 500,
                    endTimer: 4000
                });
                this.getUsers();
            }
            else {
                this.modalDialogue = {
                    isVisible: true,
                    title: 'Error!',
                    body: 'We have encountered error while deleting users. Please try again',
                    btn1Txt: 'Ok',
                    btn2Txt: '',
                    showBtn2: false,
                    btn1Callback: this.hideModalDialogue.bind(this),
                    btn2Callback: function () { },
                    closeBtnCallback: this.hideModalDialogue.bind(this),
                };
            }
        };
        /*
        * Generic functions to hide pop ups
        * to show info slider etc
        */
        UsersListController.prototype.hideEditPopup = function (event) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            this.sharedService.broadcastEvent('hide-edit-modal', {});
            this.editUserDefault();
        };
        UsersListController.prototype.hideModalDialogue = function (event) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            this.sharedService.broadcastEvent('hide-modal', {});
            this.modalDialogueDefault();
        };
        UsersListController.prototype.manageSortOrder = function (orderBy) {
            if (orderBy === this.sortOrder) {
                this.sortOrder = '-' + orderBy;
            }
            else {
                this.sortOrder = orderBy;
            }
        };
        UsersListController.prototype.showInfoSlider = function (params) {
            var _this = this;
            this.infoSlider = {
                title: params.title,
                body: params.body
            };
            setTimeout(function () {
                _this.sharedService.broadcastEvent('show-info-slider', {});
            }, params.startTimer);
            setTimeout(function () {
                _this.hideInfoSlider();
            }, params.endTimer);
        };
        UsersListController.prototype.hideInfoSlider = function () {
            this.sharedService.broadcastEvent('hide-info-slider', {});
            this.infoSliderDefault();
        };
        /*
        * Functions to set deafult values for different configs
        */
        UsersListController.prototype.createtableHeading = function () {
            this.tableHeading = [{
                    'className': 'col-xs-1',
                    'sortOrder': 'id_member',
                    'text': 'S.No'
                }, {
                    'className': 'col-xs-2',
                    'sortOrder': 'firstname',
                    'text': 'First name'
                }, {
                    'className': 'col-xs-2',
                    'sortOrder': 'lastname',
                    'text': 'Last name'
                }, {
                    'className': 'col-xs-3',
                    'sortOrder': 'email',
                    'text': 'Email'
                }, {
                    'className': 'col-xs-2',
                    'sortOrder': 'phonenumber',
                    'text': 'Phone Number'
                }, {
                    'className': 'col-xs-1',
                    'sortOrder': 'location',
                    'text': 'Location'
                }
            ];
        };
        UsersListController.prototype.editUserDefault = function () {
            this.editUser = {
                isVisible: false,
                title: '',
                userData: {},
                userId: ''
            };
        };
        UsersListController.prototype.modalDialogueDefault = function () {
            this.modalDialogue = {
                isVisible: false,
                title: '',
                body: '',
                btn1Txt: '',
                btn2Txt: '',
                showBtn2: false,
                btn1Callback: function () { },
                btn2Callback: function () { },
                closeBtnCallback: function () { },
            };
        };
        UsersListController.prototype.infoSliderDefault = function () {
            this.infoSlider = {
                title: '',
                body: ''
            };
        };
        UsersListController.$inject = [
            '$scope',
            '$location',
            'APIService',
            'UtilsService',
            'SharedService',
            'CheckboxHandlerService'
        ];
        return UsersListController;
    }());
    app.UsersListController = UsersListController;
})(app || (app = {}));
controllers.controller('UsersListController', app.UsersListController);


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var AddUserController = (function () {
        function AddUserController($scope, $location, apiService, utilsService, sharedService) {
            this.$scope = $scope;
            this.$location = $location;
            this.apiService = apiService;
            this.utilsService = utilsService;
            this.sharedService = sharedService;
            $scope.$on('add-user', function (event, args) {
                this.addUser();
            });
            this.appConfig = app.Constants.Default;
            this.validEmail = false;
            this.userDataDefault();
            this.modalDialogueDefault();
        }
        AddUserController.prototype.validateEmail = function (val) {
            this.validEmail = this.utilsService.validateEmail(val);
        };
        AddUserController.prototype.validateForm = function () {
            // make null undefined checks here
            if (this.utilsService.isNullUndefined(this.userData.firstname) || this.utilsService.isNullUndefined(this.userData.lastname)) {
                this.showModalDialogue('inValidForm-name');
                return false;
            }
            else if (this.utilsService.isNullUndefined(this.userData.email)) {
                this.showModalDialogue('inValidForm-email');
                return false;
            }
            else if (this.utilsService.isNullUndefined(this.userData.phonenumber)) {
                this.showModalDialogue('inValidForm-phonenumber');
                return false;
            }
            else if (this.utilsService.isNullUndefined(this.userData.location)) {
                this.showModalDialogue('inValidForm-location');
                return false;
            }
            return true;
        };
        AddUserController.prototype.gotoUserList = function () {
            this.$location.path('/userslist').replace();
        };
        AddUserController.prototype.addUser = function () {
            var _this = this;
            this.utilsService.log('add user: ', this.userData);
            if (this.validateForm()) {
                this.apiService.postCall({
                    'url': this.appConfig.serverUrl + 'adduser',
                    data: this.userData,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function (response) {
                    _this.utilsService.log('success: ', response);
                    if (response && response.resp && response.resp === 'Email already in use') {
                        _this.showModalDialogue('emailInUse');
                    }
                    else {
                        _this.gotoUserList();
                    }
                }).error(function (response) {
                    _this.utilsService.log('error: ', response);
                });
            }
        };
        AddUserController.prototype.userDataDefault = function () {
            this.userData = {
                'firstname': '',
                'lastname': '',
                'email': '',
                'phonenumber': '',
                'location': 'IN'
            };
        };
        AddUserController.prototype.showModalDialogue = function (errorType) {
            var title = '', body = '';
            switch (errorType) {
                case 'emailInUse':
                    title = 'Email already in use';
                    body = 'Email ID is already in use, please enter a unique Email address';
                    break;
                case 'inValidForm-name':
                    title = 'Incomplete form';
                    body = 'Please fill First name/Last name';
                    break;
                case 'inValidForm-email':
                    title = 'Incomplete form';
                    body = 'Please fill the email address';
                    break;
                case 'inValidForm-phonenumber':
                    title = 'Incomplete form';
                    body = 'Please fill phone number';
                    break;
                case 'inValidForm-location':
                    title = 'Incomplete form';
                    body = 'Please select location';
                    break;
            }
            this.sharedService.broadcastEvent('show-modal', {});
            this.modalDialogue = {
                isVisible: true,
                title: title,
                body: body,
                btn1Txt: 'Ok',
                btn2Txt: '',
                showBtn2: false,
                btn1Callback: this.hideModalDialogue.bind(this),
                btn2Callback: function () { },
                closeBtnCallback: this.hideModalDialogue.bind(this),
            };
        };
        AddUserController.prototype.hideModalDialogue = function (event) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            this.sharedService.broadcastEvent('hide-modal', {});
            this.modalDialogueDefault();
        };
        AddUserController.prototype.modalDialogueDefault = function () {
            this.modalDialogue = {
                isVisible: false,
                title: '',
                body: '',
                btn1Txt: '',
                btn2Txt: '',
                showBtn2: false,
                btn1Callback: function () { },
                btn2Callback: function () { },
                closeBtnCallback: function () { },
            };
        };
        AddUserController.$inject = [
            '$scope',
            '$location',
            'APIService',
            'UtilsService',
            'SharedService'
        ];
        return AddUserController;
    }());
    app.AddUserController = AddUserController;
})(app || (app = {}));
controllers.controller('AddUserController', app.AddUserController);


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var EditUserController = (function () {
        function EditUserController() {
        }
        return EditUserController;
    }());
    app.EditUserController = EditUserController;
})(app || (app = {}));
controllers.controller('EditUserController', app.EditUserController);


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var ModalDialogueController = (function () {
        function ModalDialogueController() {
        }
        return ModalDialogueController;
    }());
    app.ModalDialogueController = ModalDialogueController;
})(app || (app = {}));
controllers.controller('ModalDialogueController', app.ModalDialogueController);


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var UserFormController = (function () {
        function UserFormController() {
        }
        UserFormController.prototype.onFormSubmit = function (event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            this.formSubmit({ data: this.userData, userDataId: this.userDataId });
        };
        return UserFormController;
    }());
    app.UserFormController = UserFormController;
})(app || (app = {}));
controllers.controller('UserFormController', app.UserFormController);


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var TableHeaderController = (function () {
        function TableHeaderController($element, $sce, checkboxHandlerService) {
            this.$element = $element;
            this.$sce = $sce;
            this.checkboxHandlerService = checkboxHandlerService;
            this.defaultClass = 'arrow arrow-down';
            this.lastSortOrder = '';
        }
        TableHeaderController.prototype.manageSortOrder = function (event, sortOrder) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            var newClass = 'arrow arrow-up', target = event.target;
            if (this.$element.find(target).find('span').hasClass('arrow-up')) {
                newClass = 'arrow arrow-down';
            }
            if (this.lastSortOrder !== sortOrder) {
                this.$element.find('#heading_' + this.lastSortOrder).find('span').removeClass().addClass(this.defaultClass);
                this.lastSortOrder = sortOrder;
            }
            this.$element.find(target).find('span').removeClass().addClass(newClass);
            this.sortFunc({
                'orderBy': sortOrder
            });
        };
        TableHeaderController.$inject = [
            '$element',
            '$sce',
            'CheckboxHandlerService'
        ];
        return TableHeaderController;
    }());
    app.TableHeaderController = TableHeaderController;
})(app || (app = {}));
controllers.controller('TableHeaderController', app.TableHeaderController);


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var InfoSliderController = (function () {
        function InfoSliderController() {
        }
        return InfoSliderController;
    }());
    app.InfoSliderController = InfoSliderController;
})(app || (app = {}));
controllers.controller('InfoSliderController', app.InfoSliderController);


/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var UserInfoController = (function () {
        function UserInfoController($scope, $timeout, $element, docEventService, utilsService, checkboxHandlerService) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$element = $element;
            this.docEventService = docEventService;
            this.utilsService = utilsService;
            this.checkboxHandlerService = checkboxHandlerService;
            this.readOnlyMode = true;
            this.checkboxSelected = false;
            this.userEditDataDefault();
            this.$scope.$on('check-all', function (event, params) {
                _this.onCheckboxClicked(null, params);
            });
            /*this.$scope.$on('checkbox-counter-changed', (event, params: any) => {
                this.onCheckboxCounterChanged(event, params);
            });*/
        }
        UserInfoController.prototype.startEditMode = function ($event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (this.readOnlyMode) {
                this.readOnlyMode = false;
                this.docEventService.bindKeyboardEvent(this.cancelEditMode.bind(this));
                this.docEventService.bindMouseEvent(this.onMouseClick.bind(this));
            }
        };
        UserInfoController.prototype.cancelEditMode = function (event, noreset) {
            var _this = this;
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            this.docEventService.unbindKeyboardEvent();
            this.docEventService.unbindMouseEvent();
            this.readOnlyMode = true;
            /*if (this.$scope.$root.$$phase != '$apply' && this.$scope.$root.$$phase != '$digest') {
                this.$scope.$apply();
            }*/
            if (!noreset) {
                this.$element.find('#firstname').val(this.userData.firstname);
                this.$element.find('#lastname').val(this.userData.lastname);
                this.$element.find('#location').val(this.userData.location);
                this.$timeout(function () {
                    _this.$scope.$apply();
                });
            }
        };
        UserInfoController.prototype.onMouseClick = function (event) {
            var target = event.target;
            var tagName = target.tagName.toLowerCase();
            if ((tagName !== 'input' && tagName !== 'select') || (this.$element.find(target).length === 0)) {
                this.cancelEditMode(event);
            }
        };
        UserInfoController.prototype.actionCallback = function (event, type, userId) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (type === 'save') {
                if (this.validateForm()) {
                    var userData = {
                        id_member: this.userData.id_member,
                        firstname: this.userEditData.firstname,
                        lastname: this.userEditData.lastname,
                        email: this.userData.email,
                        phonenumber: this.userData.phonenumber,
                        location: this.userEditData.location
                    };
                    this.cancelEditMode(null, true);
                }
                else {
                    this.userEditDataDefault();
                    return false;
                }
            }
            this.actionHandler({ type: type, userId: userId, userData: userData });
        };
        UserInfoController.prototype.validateForm = function () {
            var firstname = this.userEditData.firstname, lastname = this.userEditData.lastname, location = this.userEditData.location;
            if (this.utilsService.isNullUndefined(firstname) ||
                this.utilsService.isNullUndefined(lastname) ||
                this.utilsService.isNullUndefined(location)) {
                return false;
            }
            return true;
        };
        UserInfoController.prototype.userEditDataDefault = function () {
            this.userEditData = {
                firstname: this.userData.firstname,
                lastname: this.userData.lastname,
                location: this.userData.location
            };
        };
        UserInfoController.prototype.onCheckboxClicked = function (event, params) {
            var changed = false;
            if (event) {
                changed = true;
            }
            else if ((params && params.state !== this.checkboxSelected)) {
                this.checkboxSelected = params.state;
                changed = true;
            }
            if (changed) {
                this.checkboxHandlerService.manageCheckboxCounter(this.checkboxSelected);
            }
        };
        UserInfoController.$inject = [
            '$scope',
            '$timeout',
            '$element',
            'DocEventService',
            'UtilsService',
            'CheckboxHandlerService'
        ];
        return UserInfoController;
    }());
    app.UserInfoController = UserInfoController;
})(app || (app = {}));
controllers.controller('UserInfoController', app.UserInfoController);


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var EditUserDirective = (function () {
        function EditUserDirective() {
            this.restrict = 'E';
            this.scope = {
                isVisible: '=',
                title: '=',
                userData: '=',
                userId: '=',
                hidePopup: '&',
                updateData: '&',
                discardForm: '&'
            };
            this.templateUrl = app.Constants.Default.templateUrl + 'directives/edit-user.directive.html';
            this.controller = 'EditUserController';
            this.controllerAs = 'customController';
            this.bindToController = true;
        }
        EditUserDirective.prototype.link = function (scope, element) {
            scope.$on('show-edit-modal', function (event) {
                element.find('#editUserModal').modal('show');
            });
            scope.$on('hide-edit-modal', function (event) {
                element.find('#editUserModal').modal('hide');
            });
        };
        EditUserDirective.factory = function () {
            return (function () { return new EditUserDirective(); });
        };
        return EditUserDirective;
    }());
    app.EditUserDirective = EditUserDirective;
})(app || (app = {}));
directives.directive('editUser', app.EditUserDirective.factory());


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var ModalDialogueDirective = (function () {
        function ModalDialogueDirective() {
            this.restrict = 'E';
            this.scope = {
                isVisible: '=',
                title: '=',
                body: '=',
                btn1Txt: '=',
                btn2Txt: '=',
                showBtn2: '=',
                btn1Callback: '&',
                btn2Callback: '&',
                closeBtnCallback: '&',
            };
            this.templateUrl = app.Constants.Default.templateUrl + 'directives/modal-dialogue.directive.html';
            this.controller = 'ModalDialogueController';
            this.controllerAs = 'customController';
            this.bindToController = true;
        }
        ModalDialogueDirective.prototype.link = function (scope, element) {
            scope.$on('show-modal', function (event) {
                element.find('#modalDialogue').modal('show');
            });
            scope.$on('hide-modal', function (event, params) {
                element.find('#modalDialogue').modal('hide');
            });
        };
        ModalDialogueDirective.factory = function () {
            return (function () { return new ModalDialogueDirective(); });
        };
        return ModalDialogueDirective;
    }());
    app.ModalDialogueDirective = ModalDialogueDirective;
})(app || (app = {}));
directives.directive('modalDialogue', app.ModalDialogueDirective.factory());


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var UserFormDirective = (function () {
        function UserFormDirective() {
            this.restrict = 'E';
            this.scope = {
                userData: '=',
                userId: '=',
                editMode: '=',
                validateEmail: '&',
                formSubmit: '&',
                discardForm: '&'
            };
            this.templateUrl = app.Constants.Default.templateUrl + 'directives/user-form.directive.html';
            this.controller = 'UserFormController';
            this.controllerAs = 'customController';
            this.bindToController = true;
        }
        UserFormDirective.factory = function () {
            return (function () { return new UserFormDirective(); });
        };
        return UserFormDirective;
    }());
    app.UserFormDirective = UserFormDirective;
})(app || (app = {}));
directives.directive('userForm', app.UserFormDirective.factory());


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var TableHeaderDirective = (function () {
        function TableHeaderDirective($compile, $parse) {
            this.$compile = $compile;
            this.$parse = $parse;
            this.restrict = 'E';
            this.scope = {
                tableHeading: '=',
                sortFunc: '&',
                checkAll: '&',
                deleteAll: '&'
            };
            this.templateUrl = app.Constants.Default.templateUrl + 'directives/table-header.directive.html';
            this.controller = 'TableHeaderController';
            this.controllerAs = 'customController';
            this.bindToController = true;
        }
        TableHeaderDirective.factory = function () {
            var directive = function ($compile, $parse) { return new TableHeaderDirective($compile, $parse); };
            directive.$inject = ['$compile', '$parse'];
            return directive;
        };
        return TableHeaderDirective;
    }());
    app.TableHeaderDirective = TableHeaderDirective;
})(app || (app = {}));
directives.directive('tableHeader', app.TableHeaderDirective.factory());


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var InfoSliderDirective = (function () {
        function InfoSliderDirective() {
            // private timer: number;
            this.restrict = 'E';
            this.scope = {
                title: '=',
                body: '='
            };
            this.templateUrl = app.Constants.Default.templateUrl + 'directives/info-slider.directive.html';
            this.controller = 'InfoSliderController';
            this.controllerAs = 'customController';
            this.bindToController = true;
        }
        InfoSliderDirective.prototype.link = function (scope, element) {
            scope.$on('show-info-slider', function (event) {
                element.find('#infoSlider').modal('show');
            });
            scope.$on('hide-info-slider', function (event) {
                element.find('#infoSlider').modal('hide');
            });
        };
        InfoSliderDirective.factory = function () {
            return (function () { return new InfoSliderDirective(); });
        };
        return InfoSliderDirective;
    }());
    app.InfoSliderDirective = InfoSliderDirective;
})(app || (app = {}));
directives.directive('infoSlider', app.InfoSliderDirective.factory());


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var UserInfoDirective = (function () {
        function UserInfoDirective() {
            // private timer: number;
            this.restrict = 'E';
            this.scope = {
                userData: '=',
                actionHandler: '&'
            };
            this.templateUrl = app.Constants.Default.templateUrl + 'directives/user-info.directive.html';
            this.controller = 'UserInfoController';
            this.controllerAs = 'customController';
            this.bindToController = true;
        }
        UserInfoDirective.prototype.link = function (scope, element) { };
        UserInfoDirective.factory = function () {
            return (function () { return new UserInfoDirective(); });
        };
        return UserInfoDirective;
    }());
    app.UserInfoDirective = UserInfoDirective;
})(app || (app = {}));
directives.directive('userInfo', app.UserInfoDirective.factory());


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var APIService = (function () {
        function APIService($http) {
            this.$http = $http;
            this.httpService = $http;
        }
        APIService.prototype.getCall = function (params) {
            var config = params.config || {};
            return this.httpService.get(params.url, params);
        };
        APIService.prototype.postCall = function (params) {
            return this.httpService.post(params.url, params.data, {
                headers: params.headers
            });
        };
        APIService.$inject = ['$http'];
        return APIService;
    }());
    app.APIService = APIService;
})(app || (app = {}));
services.service('APIService', app.APIService);


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var SharedService = (function () {
        function SharedService($rootScope) {
            this.$rootScope = $rootScope;
            this.broadcastEvent = function (eventName, data) {
                this.$rootScope.$broadcast(eventName, data);
            };
        }
        SharedService.$inject = ['$rootScope'];
        return SharedService;
    }());
    app.SharedService = SharedService;
})(app || (app = {}));
services.service('SharedService', app.SharedService);


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var UtilsService = (function () {
        function UtilsService() {
        }
        UtilsService.prototype.getDataType = function (obj) {
            return ({}).toString.call(obj).toLowerCase();
        };
        UtilsService.prototype.isNullUndefined = function (val, validateZeroNaN) {
            var isNull = false, type = this.getDataType(val);
            switch (type) {
                case '[object array]':
                    if (val.length === 0) {
                        isNull = true;
                    }
                    break;
                case '[object object]':
                    if (Object.keys(val).length === 0) {
                        isNull = true;
                    }
                    break;
                default:
                    if (typeof (val) === "undefined" || val === null || val === "" || val === "null" || val === "undefined") {
                        isNull = true;
                    }
                    else if (validateZeroNaN && (val === 0 || isNaN(val))) {
                        isNull = true;
                    }
            }
            return isNull;
        };
        UtilsService.prototype.clone = function (obj) {
            if (obj == null || typeof (obj) != 'object')
                return obj;
            var temp = new obj.constructor();
            for (var key in obj)
                temp[key] = this.clone(obj[key]);
            return temp;
        };
        UtilsService.prototype.validateEmail = function (email) {
            var emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
            if (email && emailRegexp.test(email)) {
                return true;
            }
            else {
                return false;
            }
        };
        UtilsService.prototype.getObjectFromArr = function (arr, propName, propValue) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][propName] == propValue)
                    return arr[i];
            }
        };
        UtilsService.prototype.log = function () {
            var msg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                msg[_i - 0] = arguments[_i];
            }
            console.log.apply(console, arguments);
        };
        return UtilsService;
    }());
    app.UtilsService = UtilsService;
})(app || (app = {}));
services.service('UtilsService', app.UtilsService);


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var DocEventService = (function () {
        function DocEventService($document) {
            this.$document = $document;
        }
        DocEventService.prototype.bindMouseEvent = function (callback) {
            this.$document.on('click', function (event) {
                callback(event);
            });
        };
        DocEventService.prototype.bindKeyboardEvent = function (callback) {
            this.$document.on('keydown keypress', function (event) {
                if (event.which === 27) {
                    callback(event);
                }
            });
        };
        DocEventService.prototype.unbindMouseEvent = function () {
            this.$document.off('click');
        };
        DocEventService.prototype.unbindKeyboardEvent = function () {
            this.$document.off('keydown keypress');
        };
        DocEventService.$inject = [
            '$document'
        ];
        return DocEventService;
    }());
    app.DocEventService = DocEventService;
})(app || (app = {}));
services.service('DocEventService', app.DocEventService);


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var CheckboxHandlerService = (function () {
        function CheckboxHandlerService(sharedService) {
            this.sharedService = sharedService;
            this.checkboxCounter = 0;
            this.selectedAll = false;
        }
        CheckboxHandlerService.prototype.checkAll = function () {
            // console.log('checkAll');
            // console.log(this);
            this.selectedAll = !this.selectedAll;
            this.sharedService.broadcastEvent('check-all', { state: this.selectedAll });
        };
        CheckboxHandlerService.prototype.manageCheckboxCounter = function (isChecked) {
            if (isChecked) {
                this.checkboxCounter++;
            }
            else {
                this.checkboxCounter--;
            }
            if (this.checkboxCounter < 0) {
                this.checkboxCounter = 0;
            }
            // console.log('checkboxCounter: ', this.checkboxCounter); 
        };
        CheckboxHandlerService.$inject = [
            'SharedService'
        ];
        return CheckboxHandlerService;
    }());
    app.CheckboxHandlerService = CheckboxHandlerService;
})(app || (app = {}));
services.service('CheckboxHandlerService', app.CheckboxHandlerService);


/// <reference path='../bower_components/DefinitelyTyped/jquery/jquery.d.ts' />
/// <reference path='../bower_components/DefinitelyTyped/angularjs/angular.d.ts' />
/// <reference path="../bower_components/DefinitelyTyped/angularjs/angular-route.d.ts" />
/// <reference path='app.ts' />
/// <reference path='ts/modules.ts' />
/// <reference path='ts/constants.ts' />
/// <reference path='ts/config.ts' />
/// <reference path='ts/route-handler.ts' />
/// <reference path='ts/interfaces/controllers/user-list.interface.ts' />
/// <reference path='ts/interfaces/controllers/add-user.interface.ts' />
/// <reference path='ts/interfaces/controllers/header.interface.ts' />
/// <reference path='ts/interfaces/controllers/table-header.interface.ts' />
/// <reference path='ts/interfaces/controllers/user-form.interface.ts' />
/// <reference path='ts/interfaces/controllers/user-info.interface.ts' />
/// <reference path='ts/interfaces/directives/user-info.interface.ts' />
/// <reference path='ts/interfaces/data/app-config.interface.ts' />
/// <reference path='ts/interfaces/data/user-data.interface.ts' />
/// <reference path='ts/interfaces/data/edit-user.interface.ts' />
/// <reference path='ts/interfaces/data/modal-dialogue.interface.ts' />
/// <reference path='ts/interfaces/data/info-slider.interface.ts' />
/// <reference path='ts/interfaces/data/table-heading.interface.ts' />
/// <reference path='ts/interfaces/data/header-buttons.interface.ts' />
/// <reference path='ts/interfaces/services/api.interface.ts' />
/// <reference path='ts/interfaces/services/doc-event.interface.ts' />
/// <reference path='ts/interfaces/services/shared.interface.ts' />
/// <reference path='ts/interfaces/services/utils.interface.ts' />
/// <reference path='ts/controllers/header.controller.ts' />
/// <reference path='ts/controllers/users-list.controller.ts' />
/// <reference path='ts/controllers/add-user.controller.ts' />
/// <reference path='ts/controllers/directives/edit-user.controller.ts' />
/// <reference path='ts/controllers/directives/modal-dialogue.controller.ts' />
/// <reference path='ts/controllers/directives/user-form.controller.ts' />
/// <reference path='ts/controllers/directives/table-header.controller.ts' />
/// <reference path='ts/controllers/directives/info-slider.controller.ts' />
/// <reference path='ts/controllers/directives/user-info.controller.ts' />
/// <reference path='ts/directives/edit-user.directive.ts' />
/// <reference path='ts/directives/modal-dialogue.directive.ts' />
/// <reference path='ts/directives/user-form.directive.ts' />
/// <reference path='ts/directives/table-header.directive.ts' />
/// <reference path='ts/directives/info-slider.directive.ts' />
/// <reference path='ts/directives/user-info.directive.ts' />
/// <reference path='ts/services/api.service.ts' />
/// <reference path='ts/services/shared.service.ts' />
/// <reference path='ts/services/utils.service.ts' />
/// <reference path='ts/services/doc-event.service.ts' />
/// <reference path='ts/services/checkbox-handler.service.ts' />


/// <reference path='_all.ts' />
var app;
(function (app) {
    app.formApp = angular.module('formApp', ['ngRoute', 'controllers', 'services', 'directives']);
    app.formApp.config(app.Config);
    app.formApp.run(['$rootScope', '$location', 'SharedService', app.RouteHandler]);
})(app || (app = {}));


/// <reference path='../../_all.ts' />
var app;
(function (app) {
    'use strict';
    var TestController = (function () {
        function TestController() {
            this.validEmail = false;
        }
        TestController.prototype.validateEmail = function (val) {
            this.validEmail = true;
        };
        return TestController;
    }());
    app.TestController = TestController;
})(app || (app = {}));
controllers.controller('TestController', app.TestController);



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLmpzIiwic291cmNlcyI6WyJ0cy9tb2R1bGVzLnRzIiwidHMvY29uc3RhbnRzLnRzIiwidHMvY29uZmlnLnRzIiwidHMvcm91dGUtaGFuZGxlci50cyIsInRzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvdXNlci1saXN0LmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvYWRkLXVzZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy9oZWFkZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy90YWJsZS1oZWFkZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy91c2VyLWZvcm0uaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy91c2VyLWluZm8uaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9kaXJlY3RpdmVzL3VzZXItaW5mby5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvYXBwLWNvbmZpZy5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvdXNlci1kYXRhLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvZGF0YS9lZGl0LXVzZXIuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9kYXRhL21vZGFsLWRpYWxvZ3VlLmludGVyZmFjZS50cyIsInRzL2ludGVyZmFjZXMvZGF0YS9pbmZvLXNsaWRlci5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvdGFibGUtaGVhZGluZy5pbnRlcmZhY2UudHMiLCJ0cy9pbnRlcmZhY2VzL2RhdGEvaGVhZGVyLWJ1dHRvbnMuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9hcGkuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9kb2MtZXZlbnQuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9zaGFyZWQuaW50ZXJmYWNlLnRzIiwidHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy91dGlscy5pbnRlcmZhY2UudHMiLCJ0cy9jb250cm9sbGVycy9oZWFkZXIuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL3VzZXJzLWxpc3QuY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2FkZC11c2VyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2VkaXQtdXNlci5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5jb250cm9sbGVyLnRzIiwidHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy91c2VyLWZvcm0uY29udHJvbGxlci50cyIsInRzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2luZm8tc2xpZGVyLmNvbnRyb2xsZXIudHMiLCJ0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3VzZXItaW5mby5jb250cm9sbGVyLnRzIiwidHMvZGlyZWN0aXZlcy9lZGl0LXVzZXIuZGlyZWN0aXZlLnRzIiwidHMvZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5kaXJlY3RpdmUudHMiLCJ0cy9kaXJlY3RpdmVzL3VzZXItZm9ybS5kaXJlY3RpdmUudHMiLCJ0cy9kaXJlY3RpdmVzL3RhYmxlLWhlYWRlci5kaXJlY3RpdmUudHMiLCJ0cy9kaXJlY3RpdmVzL2luZm8tc2xpZGVyLmRpcmVjdGl2ZS50cyIsInRzL2RpcmVjdGl2ZXMvdXNlci1pbmZvLmRpcmVjdGl2ZS50cyIsInRzL3NlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzIiwidHMvc2VydmljZXMvc2hhcmVkLnNlcnZpY2UudHMiLCJ0cy9zZXJ2aWNlcy91dGlscy5zZXJ2aWNlLnRzIiwidHMvc2VydmljZXMvZG9jLWV2ZW50LnNlcnZpY2UudHMiLCJ0cy9zZXJ2aWNlcy9jaGVja2JveC1oYW5kbGVyLnNlcnZpY2UudHMiLCJfYWxsLnRzIiwiYXBwLnRzIiwidHMvY29udHJvbGxlcnMvdGVzdC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQztBQUVuQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUM5QyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQzs7O0FDSmxELG1DQUFtQztBQUVuQyxJQUFPLEdBQUcsQ0FXVDtBQVhELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZO0lBRVo7UUFBQTtRQU9BLENBQUM7UUFOQSxzQkFBVyxvQkFBTztpQkFBbEI7Z0JBQ0MsTUFBTSxDQUFDO29CQUNOLFNBQVMsRUFBRSx3QkFBd0I7b0JBQ25DLFdBQVcsRUFBRSxlQUFlO2lCQUM1QjtZQUNGLENBQUM7OztXQUFBO1FBQ0YsZ0JBQUM7SUFBRCxDQUFDO0lBUFksYUFBUyxZQU9yQjtBQUNGLENBQUMsRUFYTSxHQUFHLEtBQUgsR0FBRyxRQVdUOzs7QUNiRCxtQ0FBbUM7QUFFbkMsSUFBTyxHQUFHLENBb0JUO0FBcEJELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZO0lBRVo7UUFLQyxnQkFBWSxjQUF1QztZQUNsRCxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDakMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxnQkFBZ0I7Z0JBQ2pFLFVBQVUsRUFBRSxxQkFBcUI7Z0JBQ2pDLFlBQVksRUFBRSxrQkFBa0I7YUFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ25CLFVBQVUsRUFBRSxtQkFBbUI7Z0JBQy9CLFlBQVks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Q0FBQztJQUNwQixXQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsZ0JBQVksQ0FBQyxDQUFDLENBQUM7QUFDNUUsQ0FBQyxFQUxNLEdBQUcsS0FBSCxHQUFHLFFBS1Q7OztBQ1BELHNDQUFzQztBQUV0QyxJQUFPLEdBQUcsQ0FjVDtBQWRELFdBQU8sR0FBRyxFQUFDLENBQUM7SUFDWCxZQUFZLENBQUM7SUFFYjtRQUdDO1lBQ0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQztRQUVELHNDQUFhLEdBQWIsVUFBYyxHQUFXO1lBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUM7UUFDRixxQkFBQztJQUFELENBQUM7SUFWWSxrQkFBYyxpQkFVMUI7QUFDRixDQUFDLEVBZE0sR0FBRyxLQUFILEdBQUcsUUFjVDtBQUNELFdBQVcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cclxuXHJcbnZhciBzZXJ2aWNlcyA9IGFuZ3VsYXIubW9kdWxlKCdzZXJ2aWNlcycsIFtdKTtcclxudmFyIGNvbnRyb2xsZXJzID0gYW5ndWxhci5tb2R1bGUoJ2NvbnRyb2xsZXJzJywgW10pO1xyXG52YXIgZGlyZWN0aXZlcyA9IGFuZ3VsYXIubW9kdWxlKCdkaXJlY3RpdmVzJywgW10pO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBDb25zdGFudHMge1xyXG5cdFx0c3RhdGljIGdldCBEZWZhdWx0KCk6IGFueSB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c2VydmVyVXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MDgwLycsXHJcblx0XHRcdFx0dGVtcGxhdGVVcmw6ICcuLi90ZW1wbGF0ZXMvJ1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGNsYXNzIENvbmZpZyB7XHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcbiAgICAgICAgICAgICckcm91dGVQcm92aWRlcidcclxuICAgICAgICBdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCRyb3V0ZVByb3ZpZGVyOiBuZy5yb3V0ZS5JUm91dGVQcm92aWRlcikge1xyXG5cdFx0XHQkcm91dGVQcm92aWRlci53aGVuKFwiL3VzZXJzbGlzdFwiLCB7XHJcblx0XHRcdFx0dGVtcGxhdGVVcmw6IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICd1c2Vyc0xpc3QuaHRtbCcsXHJcblx0XHRcdFx0Y29udHJvbGxlcjogJ1VzZXJzTGlzdENvbnRyb2xsZXInLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXJBczogJ2N1c3RvbUNvbnRyb2xsZXInXHJcblx0XHRcdH0pLndoZW4oJy9hZGRVc2VyJywge1xyXG5cdFx0XHRcdGNvbnRyb2xsZXI6ICdBZGRVc2VyQ29udHJvbGxlcicsXHJcblx0XHRcdFx0Y29udHJvbGxlckFzOiAnY3VzdG9tQ29udHJvbGxlcicsXHJcblx0XHRcdFx0dGVtcGxhdGVVcmw6IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdhZGRVc2VyLmh0bWwnXHJcblx0XHRcdH0pLm90aGVyd2lzZSh7IHJlZGlyZWN0VG86ICcvdXNlcnNsaXN0JyB9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgY2xhc3MgUm91dGVIYW5kbGVyIHtcclxuXHRcdHN0YXRpYyBpbmplY3QgPSBbJyRyb290U2NvcGUnLCAnJGxvY2F0aW9uJywgJ3NoYXJlZFNlcnZpY2UnXTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgJHJvb3RTY29wZTogYW55LCAvL25nLklSb290U2NvcGVTZXJ2aWNlLFxyXG5cdFx0XHQkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcblx0XHRcdHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHQkcm9vdFNjb3BlLlV0aWxzID0ge1xyXG5cdFx0XHRcdGtleXM6IE9iamVjdC5rZXlzXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQkcm9vdFNjb3BlLiRvbihcIiRyb3V0ZUNoYW5nZVN0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50LCBuZXh0LCBjdXJyZW50KSB7XHJcblx0XHRcdFx0c2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgncm91dGVDaGFuZ2VTdGFydCcsIHtcclxuXHRcdFx0XHRcdG5leHQ6IG5leHQsXHJcblx0XHRcdFx0XHRjdXJyZW50OiBjdXJyZW50XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0JHJvb3RTY29wZS4kb24oXCIkcm91dGVDaGFuZ2VTdWNjZXNzXCIsIGZ1bmN0aW9uKGV2ZW50LCBuZXh0LCBjdXJyZW50KSB7XHJcblx0XHRcdFx0c2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgncm91dGVDaGFuZ2VTdWNjZXNzJywge1xyXG5cdFx0XHRcdFx0bmV4dDogbmV4dCxcclxuXHRcdFx0XHRcdGN1cnJlbnQ6IGN1cnJlbnRcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkcm9vdFNjb3BlLiRvbihcIiRyb3V0ZUNoYW5nZUVycm9yXCIsIGZ1bmN0aW9uKGV2ZW50LCBuZXh0LCBjdXJyZW50KSB7XHJcblx0XHRcdFx0c2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgncm91dGVDaGFuZ2VFcnJvcicsIHtcclxuXHRcdFx0XHRcdG5leHQ6IG5leHQsXHJcblx0XHRcdFx0XHRjdXJyZW50OiBjdXJyZW50XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cdGV4cG9ydCBpbnRlcmZhY2UgVXNlcnNMaXN0SW50ZXJmYWNlIHtcclxuXHRcdGdldFVzZXJzKCk6IHZvaWQ7XHJcblx0XHRwcm9jZXNzU2VydmVyRGF0YShkYXRhOiBhbnkpOiB2b2lkO1xyXG5cdFx0YWRkVXNlcigpOiB2b2lkO1xyXG5cdFx0YWN0aW9uSGFuZGxlcih0eXBlOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nLCB1c2VyRGF0YT86IFVzZXJEYXRhSW50ZXJmYWNlKTogdm9pZDtcclxuXHRcdHZhbGlkYXRlRW1haWwodmFsOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0ZWRpdFVzZXJDbGljayh1c2VySWQ6IHN0cmluZyk6IHZvaWQ7XHJcblx0XHR1cGRhdGVVc2VyRGF0YShkYXRhOiBVc2VyRGF0YUludGVyZmFjZSwgdXNlcklkOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0b25Vc2VyVXBkYXRlUmVzcChyZXNwOiBCb29sZWFuKTogdm9pZDtcclxuXHRcdGRlbGV0ZVVzZXJDbGljayhrZXk6IHN0cmluZyk6IHZvaWQ7XHJcblx0XHRkZWxldGVVc2VyQ29uZmlybShrZXk6IHN0cmluZyk6IHZvaWQ7XHJcblx0XHRvblVzZXJEZWxldGVkKHJlc3A6IEJvb2xlYW4pOiB2b2lkO1xyXG5cdFx0aGlkZUVkaXRQb3B1cChldmVudD86IEV2ZW50KTogdm9pZDtcclxuXHRcdGhpZGVNb2RhbERpYWxvZ3VlKGV2ZW50PzogRXZlbnQpOiB2b2lkO1xyXG5cdFx0bWFuYWdlU29ydE9yZGVyKG9yZGVyQnk6IHN0cmluZyk6IHZvaWQ7XHJcblx0XHRzaG93SW5mb1NsaWRlcihwYXJhbXM6IEluZm9TbGlkZXJJbnRlcmZhY2UpOiB2b2lkO1xyXG5cdFx0aGlkZUluZm9TbGlkZXIoKTogdm9pZDtcclxuXHRcdGNyZWF0ZXRhYmxlSGVhZGluZygpOiB2b2lkO1xyXG5cdFx0ZWRpdFVzZXJEZWZhdWx0KCk6IHZvaWQ7XHJcblx0XHRtb2RhbERpYWxvZ3VlRGVmYXVsdCgpOiB2b2lkO1xyXG5cdFx0aW5mb1NsaWRlckRlZmF1bHQoKTogdm9pZDtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBBZGRVc2VySW50ZXJmYWNlIHtcclxuXHRcdHZhbGlkYXRlRW1haWwodmFsOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0dmFsaWRhdGVGb3JtKCk6IEJvb2xlYW47XHJcblx0XHRnb3RvVXNlckxpc3QoKTogdm9pZDtcclxuXHRcdGFkZFVzZXIoKTogdm9pZDtcclxuXHRcdHVzZXJEYXRhRGVmYXVsdCgpOiB2b2lkO1xyXG5cdFx0c2hvd01vZGFsRGlhbG9ndWUoZXJyb3JUeXBlOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0aGlkZU1vZGFsRGlhbG9ndWUoZXZlbnQ/OiBFdmVudCk6IHZvaWQ7XHJcblx0XHRtb2RhbERpYWxvZ3VlRGVmYXVsdCgpOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSGVhZGVySW50ZXJmYWNlIHtcclxuXHRcdG9uUm91dGVDaGFuZ2VTdGFydChldmVudDogRXZlbnQsIHBhcmFtczogT2JqZWN0KTogdm9pZDtcclxuXHRcdG9uUm91dGVDaGFuZ2VTdWNjZXNzKGV2ZW50OiBFdmVudCwgcGFyYW1zOiBhbnkpOiB2b2lkO1xyXG5cdFx0b25Sb3V0ZUNoYW5nZUVycm9yKGV2ZW50LCBwYXJhbXMpOiB2b2lkO1xyXG5cdFx0c2V0VXNlckxpc3RIZWFkZXIoKTogdm9pZDtcclxuXHRcdHNldEFkZFVzZXJIZWFkZXIoKTogdm9pZDtcclxuXHRcdGNhbGxGdW5jdGlvbihldmVudDogRXZlbnQsIGNsaWNrRnVuYzogc3RyaW5nKTogdm9pZDtcclxuXHRcdGdvVG9BZGRVc2VyKCk6IHZvaWQ7XHJcblx0XHRhZGRVc2VyKCk6IHZvaWQ7XHJcblx0XHRnb0JhY2soKTogdm9pZDtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBUYWJsZUhlYWRlckludGVyZmFjZSB7XHJcblx0XHRtYW5hZ2VTb3J0T3JkZXIoZXZlbnQ6IEV2ZW50LCBzb3J0T3JkZXI6IHN0cmluZyk6IHZvaWQ7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgVXNlckZvcm1JbnRlcmZhY2Uge1xyXG5cdFx0b25Gb3JtU3VibWl0KGV2ZW50OiBFdmVudCk6IHZvaWQ7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgVXNlckluZm9JbnRlcmZhY2Uge1xyXG5cdFx0c3RhcnRFZGl0TW9kZShldmVudDogRXZlbnQpOiB2b2lkO1xyXG5cdFx0Y2FuY2VsRWRpdE1vZGUoZXZlbnQ/OiBFdmVudCwgbm9yZXNldD86IEJvb2xlYW4pOiB2b2lkO1xyXG5cdFx0b25Nb3VzZUNsaWNrKGV2ZW50OiBFdmVudCk6IHZvaWQ7XHJcblx0XHRhY3Rpb25DYWxsYmFjayhldmVudDogRXZlbnQsIHR5cGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpOiB2b2lkO1xyXG5cdFx0dmFsaWRhdGVGb3JtKCk6IHZvaWQ7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdC8vIGV4cG9ydCBpbnRlcmZhY2UgSU1lbnVEaXJlY3RpdmUgZXh0ZW5kcyBuZy5JU2NvcGVcclxuXHRleHBvcnQgaW50ZXJmYWNlIFVzZXJJbmZvU2NvcGVJbnRlcmZhY2UgZXh0ZW5kcyBuZy5JU2NvcGUge1xyXG5cdFx0Y3VzdG9tQ29udHJvbGxlcjogYW55O1xyXG5cdFx0dXNlckRhdGE6IGFueTtcclxuXHRcdGFjdGlvbkhhbmRsZXI6IGFueTtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIGFwcENvbmZpZ0ludGVyZmFjZSB7XHJcblx0XHRzZXJ2ZXJVcmw6IHN0cmluZztcclxuXHRcdHRlbXBsYXRlVXJsOiBzdHJpbmc7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBVc2VyRGF0YUludGVyZmFjZSB7XHJcblx0XHRpZF9tZW1iZXI/OiBzdHJpbmc7XHJcblx0XHRmaXJzdG5hbWU6IHN0cmluZztcclxuXHRcdGxhc3RuYW1lOiBzdHJpbmc7XHJcblx0XHRlbWFpbDogc3RyaW5nO1xyXG5cdFx0cGhvbmVudW1iZXI6IHN0cmluZztcclxuXHRcdGxvY2F0aW9uOiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIHVzZXJFZGl0RGF0YUludGVyZmFjZSB7XHJcblx0XHRmaXJzdG5hbWU6IHN0cmluZztcclxuXHRcdGxhc3RuYW1lOiBzdHJpbmc7XHJcblx0XHRsb2NhdGlvbjogc3RyaW5nO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgRWRpdFVzZXJJbnRlcmZhY2Uge1xyXG5cdFx0aXNWaXNpYmxlOiBCb29sZWFuO1xyXG5cdFx0dGl0bGU6IHN0cmluZztcclxuXHRcdC8vVE9ETzogbmVlZCB0byBsb29rIGludG8gdGhpc1xyXG5cdFx0dXNlckRhdGE6IGFueTtcclxuXHRcdHVzZXJJZDogc3RyaW5nO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgTW9kYWxEaWFsb2d1ZUludGVyZmFjZSB7XHJcblx0XHRpc1Zpc2libGU6IEJvb2xlYW4sXHJcblx0XHR0aXRsZTogc3RyaW5nLFxyXG5cdFx0Ym9keTogc3RyaW5nLFxyXG5cdFx0YnRuMVR4dDogc3RyaW5nLFxyXG5cdFx0YnRuMlR4dD86IHN0cmluZyxcclxuXHRcdHNob3dCdG4yOiBCb29sZWFuLFxyXG5cdFx0YnRuMUNhbGxiYWNrPzogRnVuY3Rpb24sXHJcblx0XHRidG4yQ2FsbGJhY2s/OiBGdW5jdGlvbixcclxuXHRcdGNsb3NlQnRuQ2FsbGJhY2s/OiBGdW5jdGlvbixcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIEluZm9TbGlkZXJJbnRlcmZhY2Uge1xyXG5cdFx0dGl0bGU6IHN0cmluZztcclxuXHRcdGJvZHk6IHN0cmluZztcclxuXHRcdHN0YXJ0VGltZXI/OiBudW1iZXI7XHJcblx0XHRlbmRUaW1lcj86IG51bWJlcjtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0J1xyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIFRhYmxlSGVhZGluZ0ludGVyZmFjZSB7XHJcblx0XHRjbGFzc05hbWU6IHN0cmluZztcclxuXHRcdHNvcnRPcmRlcjogc3RyaW5nO1xyXG5cdFx0dGV4dDogc3RyaW5nO1xyXG5cdFx0Y3VzdG9tRnVuYz86IEZ1bmN0aW9uO1xyXG5cdFx0Y3VzdG9tSFRNTD86IEJvb2xlYW47XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBIZWFkZXJCdXR0b25zSW50ZXJmYWNlIHtcclxuXHRcdHNob3dCdG46IEJvb2xlYW47XHJcblx0XHRjbGlja0Z1bmM6IHN0cmluZztcclxuXHRcdHRleHQ6IHN0cmluZztcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBBUElTZXJ2aWNlSW50ZXJmYWNlIHtcclxuXHRcdGdldENhbGwocGFyYW1zOiBhbnkpOiBhbnk7XHJcblx0XHRwb3N0Q2FsbChwYXJhbXM6IGFueSk6IGFueTtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBEb2NFdmVudFNlcnZpY2VJbnRlcmZhY2Uge1xyXG5cdFx0YmluZE1vdXNlRXZlbnQoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZDtcclxuXHRcdGJpbmRLZXlib2FyZEV2ZW50KGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQ7XHJcblx0XHR1bmJpbmRNb3VzZUV2ZW50KCk6IHZvaWQ7XHJcblx0XHR1bmJpbmRLZXlib2FyZEV2ZW50KCk6IHZvaWQ7XHJcblx0fVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgU2hhcmVkU2VydmljZUludGVyZmFjZSB7XHJcblx0XHRicm9hZGNhc3RFdmVudChldmVudE5hbWU6IHN0cmluZywgZGF0YTogYW55KTogdm9pZDtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBVdGlsc1NlcnZpY2VJbnRlcmZhY2Uge1xyXG5cdFx0Z2V0RGF0YVR5cGUob2JqOiBPYmplY3QpOiBzdHJpbmc7XHJcblx0XHRpc051bGxVbmRlZmluZWQodmFsOiBhbnksIHZhbGlkYXRlWmVyb05hTj86IEJvb2xlYW4pOiBCb29sZWFuO1xyXG5cdFx0Y2xvbmUob2JqOiBhbnkpOiBhbnk7XHJcblx0XHR2YWxpZGF0ZUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBCb29sZWFuO1xyXG5cdFx0Z2V0T2JqZWN0RnJvbUFycihhcnI6IEFycmF5PGFueT4sIHByb3BOYW1lOiBzdHJpbmcsIHByb3BWYWx1ZTogYW55KTogYW55O1xyXG5cdFx0bG9nKC4uLm1zZzogYW55W10pOiB2b2lkO1xyXG5cdH1cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnXHJcblxyXG5cdGV4cG9ydCBjbGFzcyBIZWFkZXJDb250cm9sbGVyIGltcGxlbWVudHMgSGVhZGVySW50ZXJmYWNlIHtcclxuXHRcdGhlYWRpbmc6IHN0cmluZztcclxuXHRcdGhlYWRlckxlZnRCdG46IEhlYWRlckJ1dHRvbnNJbnRlcmZhY2U7XHJcblx0XHRoZWFkZXJSaWdodEJ0bjogSGVhZGVyQnV0dG9uc0ludGVyZmFjZTtcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCckc2NvcGUnLFxyXG5cdFx0XHQnJGxvY2F0aW9uJyxcclxuXHRcdFx0JyR3aW5kb3cnLFxyXG5cdFx0XHQnJGxvZycsXHJcblx0XHRcdCdTaGFyZWRTZXJ2aWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSxcclxuXHRcdFx0cHJpdmF0ZSAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgJHdpbmRvdzogbmcuSVdpbmRvd1NlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgJGxvZzogbmcuSUxvZ1NlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdCRzY29wZS4kb24oXCJyb3V0ZUNoYW5nZVN0YXJ0XCIsIHRoaXMub25Sb3V0ZUNoYW5nZVN0YXJ0LmJpbmQodGhpcykpO1xyXG5cdFx0XHQkc2NvcGUuJG9uKFwicm91dGVDaGFuZ2VTdWNjZXNzXCIsIHRoaXMub25Sb3V0ZUNoYW5nZVN1Y2Nlc3MuYmluZCh0aGlzKSk7XHJcblx0XHRcdCRzY29wZS4kb24oXCJyb3V0ZUNoYW5nZUVycm9yXCIsIHRoaXMub25Sb3V0ZUNoYW5nZUVycm9yLmJpbmQodGhpcykpO1xyXG5cclxuXHRcdFx0dGhpcy5oZWFkaW5nID0gJ1VzZXIgbWFuYWdlbWVudCc7XHJcblx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnJyxcclxuXHRcdFx0XHQndGV4dCc6ICcnXHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuaGVhZGVyUmlnaHRCdG4gPSB7XHJcblx0XHRcdFx0J3Nob3dCdG4nOiBmYWxzZSxcclxuXHRcdFx0XHQnY2xpY2tGdW5jJzogJycsXHJcblx0XHRcdFx0J3RleHQnOiAnJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uUm91dGVDaGFuZ2VTdGFydChldmVudDogRXZlbnQsIHBhcmFtczogT2JqZWN0KSB7XHJcblx0XHRcdC8vIHRoaXMuJGxvZy5sb2coJ29uUm91dGVDaGFuZ2VTdGFydDogJywgcGFyYW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRvblJvdXRlQ2hhbmdlU3VjY2VzcyhldmVudDogRXZlbnQsIHBhcmFtczogYW55KSB7XHJcblx0XHRcdC8vIHRoaXMuJGxvZy5sb2coJ29uUm91dGVDaGFuZ2VTdWNjZXNzOiAnLCBwYXJhbXMpO1xyXG5cclxuXHRcdFx0aWYgKHBhcmFtcy5uZXh0ICYmIHBhcmFtcy5uZXh0LiQkcm91dGUgJiYgcGFyYW1zLm5leHQuJCRyb3V0ZS5jb250cm9sbGVyKSB7XHJcblx0XHRcdFx0c3dpdGNoIChwYXJhbXMubmV4dC4kJHJvdXRlLmNvbnRyb2xsZXIpIHtcclxuXHRcdFx0XHRcdGNhc2UgJ1VzZXJzTGlzdENvbnRyb2xsZXInOlxyXG5cdFx0XHRcdFx0XHR0aGlzLnNldFVzZXJMaXN0SGVhZGVyKCk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdGNhc2UgJ0FkZFVzZXJDb250cm9sbGVyJzpcclxuXHRcdFx0XHRcdFx0dGhpcy5zZXRBZGRVc2VySGVhZGVyKCk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnNldFVzZXJMaXN0SGVhZGVyKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRvblJvdXRlQ2hhbmdlRXJyb3IoZXZlbnQsIHBhcmFtcykge1xyXG5cdFx0XHQvLyB0aGlzLiRsb2cubG9nKCdvblJvdXRlQ2hhbmdlRXJyb3I6ICcsIHBhcmFtcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0VXNlckxpc3RIZWFkZXIoKSB7XHJcblx0XHRcdHRoaXMuaGVhZGVyTGVmdEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnJyxcclxuXHRcdFx0XHQndGV4dCc6ICcnXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmhlYWRlclJpZ2h0QnRuID0ge1xyXG5cdFx0XHRcdCdzaG93QnRuJzogdHJ1ZSxcclxuXHRcdFx0XHQnY2xpY2tGdW5jJzogJ2dvVG9BZGRVc2VyJyxcclxuXHRcdFx0XHQndGV4dCc6ICdBZGQgdXNlcidcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRBZGRVc2VySGVhZGVyKCkge1xyXG5cdFx0XHR0aGlzLmhlYWRlckxlZnRCdG4gPSB7XHJcblx0XHRcdFx0J3Nob3dCdG4nOiB0cnVlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnZ29CYWNrJyxcclxuXHRcdFx0XHQndGV4dCc6ICdCYWNrJ1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5oZWFkZXJSaWdodEJ0biA9IHtcclxuXHRcdFx0XHQnc2hvd0J0bic6IGZhbHNlLFxyXG5cdFx0XHRcdCdjbGlja0Z1bmMnOiAnJyxcclxuXHRcdFx0XHQndGV4dCc6ICcnXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0Y2FsbEZ1bmN0aW9uKGV2ZW50OiBFdmVudCwgY2xpY2tGdW5jOiBzdHJpbmcpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGlmIChhbmd1bGFyLmlzRnVuY3Rpb24odGhpc1tjbGlja0Z1bmNdKSkge1xyXG5cdFx0XHRcdHRoaXNbY2xpY2tGdW5jXSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Z29Ub0FkZFVzZXIoKSB7XHJcblx0XHRcdHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9hZGRVc2VyJykucmVwbGFjZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFkZFVzZXIoKSB7XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnYWRkLXVzZXInLCB7fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Z29CYWNrKCkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLiRsb2NhdGlvbi5wYXRoKCcvdXNlcnNsaXN0JykucmVwbGFjZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdIZWFkZXJDb250cm9sbGVyJywgYXBwLkhlYWRlckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgVXNlcnNMaXN0Q29udHJvbGxlciBpbXBsZW1lbnRzIFVzZXJzTGlzdEludGVyZmFjZSB7XHJcblx0XHRwcml2YXRlIHVzZXJzTGlzdDogQXJyYXk8YW55PjtcclxuXHRcdHByaXZhdGUgYXBwQ29uZmlnOiBhcHBDb25maWdJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIGVkaXRVc2VyOiBFZGl0VXNlckludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgbW9kYWxEaWFsb2d1ZTogTW9kYWxEaWFsb2d1ZUludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgaW5mb1NsaWRlcjogSW5mb1NsaWRlckludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgc29ydE9yZGVyOiBzdHJpbmc7XHJcblx0XHRwcml2YXRlIHRhYmxlSGVhZGluZzogVGFibGVIZWFkaW5nSW50ZXJmYWNlW107XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG5cdFx0XHQnJHNjb3BlJyxcclxuXHRcdFx0JyRsb2NhdGlvbicsXHJcblx0XHRcdCdBUElTZXJ2aWNlJyxcclxuXHRcdFx0J1V0aWxzU2VydmljZScsXHJcblx0XHRcdCdTaGFyZWRTZXJ2aWNlJyxcclxuXHRcdFx0J0NoZWNrYm94SGFuZGxlclNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxyXG5cdFx0XHRwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcclxuXHRcdFx0cHJpdmF0ZSBhcGlTZXJ2aWNlOiBBUElTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgY2hlY2tib3hIYW5kbGVyU2VydmljZTogQ2hlY2tib3hIYW5kbGVyU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdHRoaXMuYXBwQ29uZmlnID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0O1xyXG5cdFx0XHR0aGlzLnNvcnRPcmRlciA9ICctaWRfbWVtYmVyJztcclxuXHRcdFx0dGhpcy5nZXRVc2VycygpO1xyXG5cclxuXHRcdFx0dGhpcy51c2Vyc0xpc3QgPSBbXTtcclxuXHRcdFx0dGhpcy5lZGl0VXNlckRlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlRGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLmluZm9TbGlkZXJEZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMuY3JlYXRldGFibGVIZWFkaW5nKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0VXNlcnMoKSB7XHJcblx0XHRcdHRoaXMuYXBpU2VydmljZS5nZXRDYWxsKHtcclxuXHRcdFx0XHQndXJsJzogdGhpcy5hcHBDb25maWcuc2VydmVyVXJsICsgJ2dldHVzZXJzbGlzdCdcclxuXHRcdFx0fSkuc3VjY2VzcygoZGF0YSwgc3RhdHVzKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5wcm9jZXNzU2VydmVyRGF0YShkYXRhKVxyXG5cdFx0XHR9KS5lcnJvcigoZGF0YSwgc3RhdHVzKSA9PiB7XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdlcnInKVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRwcm9jZXNzU2VydmVyRGF0YShkYXRhOiBhbnkpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdwcm9jZXNzU2VydmVyRGF0YTogJywgZGF0YSk7XHJcblxyXG5cdFx0XHRpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHR0aGlzLnVzZXJzTGlzdCA9IGRhdGE7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy51c2Vyc0xpc3QubGVuZ3RoID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGFkZFVzZXIoKSB7XHJcblx0XHRcdHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9hZGRVc2VyJykucmVwbGFjZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qXHJcblx0XHQqIEFjdGlvbiBidXR0b25zIGhhbmRsaW5nXHJcblx0XHQqL1xyXG5cdFx0YWN0aW9uSGFuZGxlcih0eXBlOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nLCB1c2VyRGF0YT86IFVzZXJEYXRhSW50ZXJmYWNlKSB7XHJcblx0XHRcdHN3aXRjaCAodHlwZSkge1xyXG5cdFx0XHRcdGNhc2UgJ2VkaXQnOlxyXG5cdFx0XHRcdFx0dGhpcy5lZGl0VXNlckNsaWNrKHVzZXJJZCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnZGVsZXRlJzpcclxuXHRcdFx0XHRcdHRoaXMuZGVsZXRlVXNlckNsaWNrKHVzZXJJZCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnc2F2ZSc6XHJcblx0XHRcdFx0XHR0aGlzLnVwZGF0ZVVzZXJEYXRhKHVzZXJEYXRhLCB1c2VySWQpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvKlxyXG5cdFx0KiBFZGl0IHVzZXIgY29kZSBmbG93XHJcblx0XHQqL1xyXG5cdFx0dmFsaWRhdGVFbWFpbCh2YWw6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3ZhbGlkYXRlRW1haWwnKTtcclxuXHRcdH1cclxuXHJcblx0XHRlZGl0VXNlckNsaWNrKHVzZXJJZDogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXNlcklkOiAnLCB1c2VySWQpO1xyXG5cclxuXHRcdFx0dGhpcy5lZGl0VXNlciA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IHRydWUsXHJcblx0XHRcdFx0dGl0bGU6ICdFZGl0IGRldGFpbHMnLFxyXG5cdFx0XHRcdHVzZXJEYXRhOiB0aGlzLnV0aWxzU2VydmljZS5jbG9uZSh0aGlzLnV0aWxzU2VydmljZS5nZXRPYmplY3RGcm9tQXJyKHRoaXMudXNlcnNMaXN0LCAnaWRfbWVtYmVyJywgdXNlcklkKSksXHJcblx0XHRcdFx0dXNlcklkOiB1c2VySWRcclxuXHRcdFx0fTtcclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdzaG93LWVkaXQtbW9kYWwnLCB7fSk7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZyh0aGlzLmVkaXRVc2VyKTtcclxuXHRcdH1cclxuXHJcblx0XHR1cGRhdGVVc2VyRGF0YShkYXRhOiBVc2VyRGF0YUludGVyZmFjZSwgdXNlcklkOiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1cGRhdGVVc2VyRGF0YTogJywgZGF0YSk7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXNlcklkOiAnLCB1c2VySWQpO1xyXG5cclxuXHRcdFx0dGhpcy5hcGlTZXJ2aWNlLnBvc3RDYWxsKHtcclxuXHRcdFx0XHQndXJsJzogdGhpcy5hcHBDb25maWcuc2VydmVyVXJsICsgJ3VwZGF0ZXVzZXInLFxyXG5cdFx0XHRcdCdkYXRhJzoge1xyXG5cdFx0XHRcdFx0J3VzZXJJZCc6IHVzZXJJZCxcclxuXHRcdFx0XHRcdCd1c2VyRGF0YSc6IHtcclxuXHRcdFx0XHRcdFx0ZW1haWw6IGRhdGEuZW1haWwsXHJcblx0XHRcdFx0XHRcdGZpcnN0bmFtZTogZGF0YS5maXJzdG5hbWUsXHJcblx0XHRcdFx0XHRcdGlkX21lbWJlcjogZGF0YS5pZF9tZW1iZXIsXHJcblx0XHRcdFx0XHRcdGxhc3RuYW1lOiBkYXRhLmxhc3RuYW1lLFxyXG5cdFx0XHRcdFx0XHRsb2NhdGlvbjogZGF0YS5sb2NhdGlvbixcclxuXHRcdFx0XHRcdFx0cGhvbmVudW1iZXI6IGRhdGEucGhvbmVudW1iZXJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH1cclxuXHRcdFx0fSkuc3VjY2VzcygocmVzcG9uc2U6IGFueSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXBkYXRlVXNlckRhdGEgc3VjY2VzczogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHRcdHRoaXMub25Vc2VyVXBkYXRlUmVzcChyZXNwb25zZS5yZXNwKTtcclxuXHRcdFx0fSkuZXJyb3IoKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCd1cGRhdGVVc2VyRGF0YSBlcnJvcjogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRvblVzZXJVcGRhdGVSZXNwKHJlc3A6IEJvb2xlYW4pIHtcclxuXHRcdFx0dGhpcy5oaWRlRWRpdFBvcHVwKCk7XHJcblxyXG5cdFx0XHRpZiAocmVzcCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdHRoaXMuc2hvd0luZm9TbGlkZXIoe1xyXG5cdFx0XHRcdFx0dGl0bGU6ICdVc2VyIHVwZGF0ZWQnLFxyXG5cdFx0XHRcdFx0Ym9keTogJ1VzZXIgaW5mbyBoYXMgYmVlbiB1cGRhdGVkIHN1Y2Nlc3NmdWxseScsXHJcblx0XHRcdFx0XHRzdGFydFRpbWVyOiA1MDAsXHJcblx0XHRcdFx0XHRlbmRUaW1lcjogNDAwMFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHRoaXMuZ2V0VXNlcnMoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XHJcblx0XHRcdFx0XHRpc1Zpc2libGU6IHRydWUsXHJcblx0XHRcdFx0XHR0aXRsZTogJ0Vycm9yIScsXHJcblx0XHRcdFx0XHRib2R5OiAnV2UgaGF2ZSBlbmNvdW50ZXJlZCBlcnJvciB3aGlsZSB1cGRhdGluZyB1c2VyIGluZm9ybWF0aW9uLiBQbGVhc2UgdHJ5IGFnYWluJyxcclxuXHRcdFx0XHRcdGJ0bjFUeHQ6ICdPaycsXHJcblx0XHRcdFx0XHRidG4yVHh0OiAnJyxcclxuXHRcdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcclxuXHRcdFx0XHRcdGJ0bjFDYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdFx0YnRuMkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1tb2RhbCcsIHt9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8qXHJcblx0XHQqIERlbGV0ZSB1c2VyIGNvZGVmbG93XHJcblx0XHQqL1xyXG5cdFx0ZGVsZXRlVXNlckNsaWNrKHVzZXJJZDogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygndXNlcklkOiAnLCB1c2VySWQpO1xyXG5cclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHR0aXRsZTogJ0RlbGV0ZSB1c2VyPycsXHJcblx0XHRcdFx0Ym9keTogJ1BsZWFzZSBjb25maXJtLCB5b3Ugd2FudCB0byBkZWxldGUgdGhlIHVzZXInLFxyXG5cdFx0XHRcdGJ0bjFUeHQ6ICdPaycsXHJcblx0XHRcdFx0YnRuMlR4dDogJ0NhbmNlbCcsXHJcblx0XHRcdFx0c2hvd0J0bjI6IHRydWUsXHJcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmRlbGV0ZVVzZXJDb25maXJtLmJpbmQodGhpcywgdXNlcklkKSxcclxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1tb2RhbCcsIHt9KTtcclxuXHRcdH1cclxuXHJcblx0XHRkZWxldGVVc2VyQ29uZmlybSh1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2RlbGV0ZVVzZXJDb25maXJtLCB1c2VySWQ6ICcsIHVzZXJJZCk7XHJcblxyXG5cdFx0XHR0aGlzLmFwaVNlcnZpY2UucG9zdENhbGwoe1xyXG5cdFx0XHRcdCd1cmwnOiB0aGlzLmFwcENvbmZpZy5zZXJ2ZXJVcmwgKyAnZGVsZXRldXNlcicsXHJcblx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0J3VzZXJJZCc6IHVzZXJJZFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0aGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfVxyXG5cdFx0XHR9KS5zdWNjZXNzKChyZXNwb25zZTogYW55KSA9PiB7XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdzdWNjZXNzOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdFx0dGhpcy5vblVzZXJEZWxldGVkKHJlc3BvbnNlLnJlc3ApO1xyXG5cdFx0XHR9KS5lcnJvcigocmVzcG9uc2UpID0+IHtcclxuXHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ2Vycm9yOiAnLCByZXNwb25zZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uVXNlckRlbGV0ZWQocmVzcDogQm9vbGVhbikge1xyXG5cdFx0XHRpZiAocmVzcCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUoKTtcclxuXHRcdFx0XHR0aGlzLnNob3dJbmZvU2xpZGVyKHtcclxuXHRcdFx0XHRcdHRpdGxlOiAnVXNlciBkZWxldGVkJyxcclxuXHRcdFx0XHRcdGJvZHk6ICdVc2VyIGhhcyBiZWVuIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5JyxcclxuXHRcdFx0XHRcdHN0YXJ0VGltZXI6IDUwMCxcclxuXHRcdFx0XHRcdGVuZFRpbWVyOiA0MDAwXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dGhpcy5nZXRVc2VycygpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHRcdHRpdGxlOiAnRXJyb3IhJyxcclxuXHRcdFx0XHRcdGJvZHk6ICdXZSBoYXZlIGVuY291bnRlcmVkIGVycm9yIHdoaWxlIGRlbGV0aW5nIHVzZXIuIFBsZWFzZSB0cnkgYWdhaW4nLFxyXG5cdFx0XHRcdFx0YnRuMVR4dDogJ09rJyxcclxuXHRcdFx0XHRcdGJ0bjJUeHQ6ICcnLFxyXG5cdFx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0XHRidG4yQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvKlxyXG5cdFx0KiBEZWxldGUgYWxsIHVzZXJzIGNvZGVmbG93XHJcblx0XHQqL1xyXG5cdFx0ZGVsZXRlQWxsKCRldmVudCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZygnZGVsZXRlQWxsJyk7XHJcblxyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdHRpdGxlOiAnRGVsZXRlIGFsbCB1c2Vycz8nLFxyXG5cdFx0XHRcdGJvZHk6ICdQbGVhc2UgY29uZmlybSwgeW91IHdhbnQgdG8gZGVsZXRlIGFsbCB1c2VycycsXHJcblx0XHRcdFx0YnRuMVR4dDogJ09rJyxcclxuXHRcdFx0XHRidG4yVHh0OiAnQ2FuY2VsJyxcclxuXHRcdFx0XHRzaG93QnRuMjogdHJ1ZSxcclxuXHRcdFx0XHRidG4xQ2FsbGJhY2s6IHRoaXMuZGVsZXRlQWxsVXNlcnNDb25maXJtLmJpbmQodGhpcyksXHJcblx0XHRcdFx0YnRuMkNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHR9O1xyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3Nob3ctbW9kYWwnLCB7fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGVsZXRlQWxsVXNlcnNDb25maXJtKHVzZXJJZDogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnZGVsZXRlVXNlckNvbmZpcm0sIHVzZXJJZDogJywgdXNlcklkKTtcclxuXHJcblx0XHRcdHZhciB1c2VySWRzID0gW107XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy51c2Vyc0xpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0XHR1c2VySWRzLnB1c2godGhpcy51c2Vyc0xpc3RbaV0uaWRfbWVtYmVyKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zb2xlLmxvZyh1c2VySWRzKTtcclxuXHRcdFx0dGhpcy5hcGlTZXJ2aWNlLnBvc3RDYWxsKHtcclxuXHRcdFx0XHQndXJsJzogdGhpcy5hcHBDb25maWcuc2VydmVyVXJsICsgJ2RlbGV0ZWFsbHVzZXJzJyxcclxuXHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHQndXNlcklkcyc6IHVzZXJJZHNcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH1cclxuXHRcdFx0fSkuc3VjY2VzcygocmVzcG9uc2U6IGFueSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnc3VjY2VzczogJywgcmVzcG9uc2UpO1xyXG5cdFx0XHRcdHRoaXMub25BbGxVc2Vyc0RlbGV0ZWQocmVzcG9uc2UucmVzcCk7XHJcblx0XHRcdH0pLmVycm9yKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0b25BbGxVc2Vyc0RlbGV0ZWQocmVzcDogQm9vbGVhbikge1xyXG5cdFx0XHRpZiAocmVzcCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUoKTtcclxuXHRcdFx0XHR0aGlzLnNob3dJbmZvU2xpZGVyKHtcclxuXHRcdFx0XHRcdHRpdGxlOiAnQWxsIHVzZXJzIGRlbGV0ZWQnLFxyXG5cdFx0XHRcdFx0Ym9keTogJ0FsbCBVc2VycyBhcmUgZGVsZXRlZCBzdWNjZXNzZnVsbHknLFxyXG5cdFx0XHRcdFx0c3RhcnRUaW1lcjogNTAwLFxyXG5cdFx0XHRcdFx0ZW5kVGltZXI6IDQwMDBcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLmdldFVzZXJzKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdFx0aXNWaXNpYmxlOiB0cnVlLFxyXG5cdFx0XHRcdFx0dGl0bGU6ICdFcnJvciEnLFxyXG5cdFx0XHRcdFx0Ym9keTogJ1dlIGhhdmUgZW5jb3VudGVyZWQgZXJyb3Igd2hpbGUgZGVsZXRpbmcgdXNlcnMuIFBsZWFzZSB0cnkgYWdhaW4nLFxyXG5cdFx0XHRcdFx0YnRuMVR4dDogJ09rJyxcclxuXHRcdFx0XHRcdGJ0bjJUeHQ6ICcnLFxyXG5cdFx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxyXG5cdFx0XHRcdFx0YnRuMUNhbGxiYWNrOiB0aGlzLmhpZGVNb2RhbERpYWxvZ3VlLmJpbmQodGhpcyksXHJcblx0XHRcdFx0XHRidG4yQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdFx0Y2xvc2VCdG5DYWxsYmFjazogdGhpcy5oaWRlTW9kYWxEaWFsb2d1ZS5iaW5kKHRoaXMpLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvKlxyXG5cdFx0KiBHZW5lcmljIGZ1bmN0aW9ucyB0byBoaWRlIHBvcCB1cHNcclxuXHRcdCogdG8gc2hvdyBpbmZvIHNsaWRlciBldGNcclxuXHRcdCovXHJcblx0XHRoaWRlRWRpdFBvcHVwKGV2ZW50PzogRXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ2hpZGUtZWRpdC1tb2RhbCcsIHt9KTtcclxuXHRcdFx0dGhpcy5lZGl0VXNlckRlZmF1bHQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRoaWRlTW9kYWxEaWFsb2d1ZShldmVudD86IEV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnaGlkZS1tb2RhbCcsIHt9KTtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlRGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1hbmFnZVNvcnRPcmRlcihvcmRlckJ5OiBzdHJpbmcpIHtcclxuXHRcdFx0aWYgKG9yZGVyQnkgPT09IHRoaXMuc29ydE9yZGVyKSB7XHJcblx0XHRcdFx0dGhpcy5zb3J0T3JkZXIgPSAnLScgKyBvcmRlckJ5O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc29ydE9yZGVyID0gb3JkZXJCeTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHNob3dJbmZvU2xpZGVyKHBhcmFtczogSW5mb1NsaWRlckludGVyZmFjZSkge1xyXG5cdFx0XHR0aGlzLmluZm9TbGlkZXIgPSB7XHJcblx0XHRcdFx0dGl0bGU6IHBhcmFtcy50aXRsZSxcclxuXHRcdFx0XHRib2R5OiBwYXJhbXMuYm9keVxyXG5cdFx0XHR9O1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ3Nob3ctaW5mby1zbGlkZXInLCB7fSk7XHJcblx0XHRcdH0sIHBhcmFtcy5zdGFydFRpbWVyKTtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuaGlkZUluZm9TbGlkZXIoKTtcclxuXHRcdFx0fSwgcGFyYW1zLmVuZFRpbWVyKTtcclxuXHRcdH1cclxuXHJcblx0XHRoaWRlSW5mb1NsaWRlcigpIHtcclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdoaWRlLWluZm8tc2xpZGVyJywge30pO1xyXG5cdFx0XHR0aGlzLmluZm9TbGlkZXJEZWZhdWx0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0LypcclxuXHRcdCogRnVuY3Rpb25zIHRvIHNldCBkZWFmdWx0IHZhbHVlcyBmb3IgZGlmZmVyZW50IGNvbmZpZ3NcclxuXHRcdCovXHJcblx0XHRjcmVhdGV0YWJsZUhlYWRpbmcoKSB7XHJcblx0XHRcdHRoaXMudGFibGVIZWFkaW5nID0gW3tcclxuXHRcdFx0XHQnY2xhc3NOYW1lJzogJ2NvbC14cy0xJyxcclxuXHRcdFx0XHQnc29ydE9yZGVyJzogJ2lkX21lbWJlcicsXHJcblx0XHRcdFx0J3RleHQnOiAnUy5ObydcclxuXHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMicsXHJcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ2ZpcnN0bmFtZScsXHJcblx0XHRcdFx0XHQndGV4dCc6ICdGaXJzdCBuYW1lJ1xyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdCdjbGFzc05hbWUnOiAnY29sLXhzLTInLFxyXG5cdFx0XHRcdFx0J3NvcnRPcmRlcic6ICdsYXN0bmFtZScsXHJcblx0XHRcdFx0XHQndGV4dCc6ICdMYXN0IG5hbWUnXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMycsXHJcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ2VtYWlsJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ0VtYWlsJ1xyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdCdjbGFzc05hbWUnOiAnY29sLXhzLTInLFxyXG5cdFx0XHRcdFx0J3NvcnRPcmRlcic6ICdwaG9uZW51bWJlcicsXHJcblx0XHRcdFx0XHQndGV4dCc6ICdQaG9uZSBOdW1iZXInXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMScsXHJcblx0XHRcdFx0XHQnc29ydE9yZGVyJzogJ2xvY2F0aW9uJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJ0xvY2F0aW9uJ1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvKiwge1xyXG5cdFx0XHRcdFx0J2NsYXNzTmFtZSc6ICdjb2wteHMtMSB0ZXh0LXJpZ2h0JyxcclxuXHRcdFx0XHRcdCdzb3J0T3JkZXInOiAnJyxcclxuXHRcdFx0XHRcdCd0ZXh0JzogJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuZy1jaGVja2VkPVwiY3VzdG9tQ29udHJvbGxlci5jaGVja2JveEhhbmRsZXJTZXJ2aWNlLmNoZWNrYm94Q291bnRlclwiIC8+JyxcclxuXHRcdFx0XHRcdCdjdXN0b21GdW5jJzogdGhpcy5jaGVja2JveEhhbmRsZXJTZXJ2aWNlLmNoZWNrQWxsLmJpbmQodGhpcy5jaGVja2JveEhhbmRsZXJTZXJ2aWNlKSxcclxuXHRcdFx0XHRcdCdjdXN0b21IVE1MJzogdHJ1ZVxyXG5cdFx0XHRcdH0qL1xyXG5cdFx0XHRdO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVkaXRVc2VyRGVmYXVsdCgpIHtcclxuXHRcdFx0dGhpcy5lZGl0VXNlciA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IGZhbHNlLFxyXG5cdFx0XHRcdHRpdGxlOiAnJyxcclxuXHRcdFx0XHR1c2VyRGF0YToge30sXHJcblx0XHRcdFx0dXNlcklkOiAnJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vZGFsRGlhbG9ndWVEZWZhdWx0KCkge1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWUgPSB7XHJcblx0XHRcdFx0aXNWaXNpYmxlOiBmYWxzZSxcclxuXHRcdFx0XHR0aXRsZTogJycsXHJcblx0XHRcdFx0Ym9keTogJycsXHJcblx0XHRcdFx0YnRuMVR4dDogJycsXHJcblx0XHRcdFx0YnRuMlR4dDogJycsXHJcblx0XHRcdFx0c2hvd0J0bjI6IGZhbHNlLFxyXG5cdFx0XHRcdGJ0bjFDYWxsYmFjazogZnVuY3Rpb24oKSB7IH0sXHJcblx0XHRcdFx0YnRuMkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRpbmZvU2xpZGVyRGVmYXVsdCgpIHtcclxuXHRcdFx0dGhpcy5pbmZvU2xpZGVyID0ge1xyXG5cdFx0XHRcdHRpdGxlOiAnJyxcclxuXHRcdFx0XHRib2R5OiAnJ1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ1VzZXJzTGlzdENvbnRyb2xsZXInLCBhcHAuVXNlcnNMaXN0Q29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBBZGRVc2VyQ29udHJvbGxlciBpbXBsZW1lbnRzIEFkZFVzZXJJbnRlcmZhY2Uge1xyXG5cdFx0cHJpdmF0ZSB2YWxpZEVtYWlsOiBCb29sZWFuO1xyXG5cdFx0cHJpdmF0ZSB1c2VyRGF0YTogVXNlckRhdGFJbnRlcmZhY2U7XHJcblx0XHRwcml2YXRlIGFwcENvbmZpZzogYXBwQ29uZmlnSW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSBtb2RhbERpYWxvZ3VlOiBNb2RhbERpYWxvZ3VlSW50ZXJmYWNlO1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcclxuXHRcdFx0JyRzY29wZScsXHJcblx0XHRcdCckbG9jYXRpb24nLFxyXG5cdFx0XHQnQVBJU2VydmljZScsXHJcblx0XHRcdCdVdGlsc1NlcnZpY2UnLFxyXG5cdFx0XHQnU2hhcmVkU2VydmljZSdcclxuXHRcdF07XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHByaXZhdGUgJHNjb3BlOiBuZy5JU2NvcGUsXHJcblx0XHRcdHByaXZhdGUgJGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIGFwaVNlcnZpY2U6IEFQSVNlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UsXHJcblx0XHRcdHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZVxyXG5cdFx0KSB7XHJcblx0XHRcdCRzY29wZS4kb24oJ2FkZC11c2VyJywgZnVuY3Rpb24oZXZlbnQsIGFyZ3MpIHtcclxuXHRcdFx0XHR0aGlzLmFkZFVzZXIoKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0aGlzLmFwcENvbmZpZyA9IGFwcC5Db25zdGFudHMuRGVmYXVsdDtcclxuXHRcdFx0dGhpcy52YWxpZEVtYWlsID0gZmFsc2U7XHJcblx0XHRcdHRoaXMudXNlckRhdGFEZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZURlZmF1bHQoKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YWxpZGF0ZUVtYWlsKHZhbDogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMudmFsaWRFbWFpbCA9IHRoaXMudXRpbHNTZXJ2aWNlLnZhbGlkYXRlRW1haWwodmFsKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YWxpZGF0ZUZvcm0oKSB7XHJcblx0XHRcdC8vIG1ha2UgbnVsbCB1bmRlZmluZWQgY2hlY2tzIGhlcmVcclxuXHRcdFx0aWYgKHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZCh0aGlzLnVzZXJEYXRhLmZpcnN0bmFtZSkgfHwgdGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKHRoaXMudXNlckRhdGEubGFzdG5hbWUpKSB7XHJcblx0XHRcdFx0dGhpcy5zaG93TW9kYWxEaWFsb2d1ZSgnaW5WYWxpZEZvcm0tbmFtZScpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5lbWFpbCkpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dNb2RhbERpYWxvZ3VlKCdpblZhbGlkRm9ybS1lbWFpbCcpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5waG9uZW51bWJlcikpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dNb2RhbERpYWxvZ3VlKCdpblZhbGlkRm9ybS1waG9uZW51bWJlcicpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bGxVbmRlZmluZWQodGhpcy51c2VyRGF0YS5sb2NhdGlvbikpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dNb2RhbERpYWxvZ3VlKCdpblZhbGlkRm9ybS1sb2NhdGlvbicpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRnb3RvVXNlckxpc3QoKSB7XHJcblx0XHRcdHRoaXMuJGxvY2F0aW9uLnBhdGgoJy91c2Vyc2xpc3QnKS5yZXBsYWNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0YWRkVXNlcigpIHtcclxuXHRcdFx0dGhpcy51dGlsc1NlcnZpY2UubG9nKCdhZGQgdXNlcjogJywgdGhpcy51c2VyRGF0YSk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy52YWxpZGF0ZUZvcm0oKSkge1xyXG5cdFx0XHRcdHRoaXMuYXBpU2VydmljZS5wb3N0Q2FsbCh7XHJcblx0XHRcdFx0XHQndXJsJzogdGhpcy5hcHBDb25maWcuc2VydmVyVXJsICsgJ2FkZHVzZXInLFxyXG5cdFx0XHRcdFx0ZGF0YTogdGhpcy51c2VyRGF0YSxcclxuXHRcdFx0XHRcdGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH1cclxuXHRcdFx0XHR9KS5zdWNjZXNzKChyZXNwb25zZTogYW55KSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnV0aWxzU2VydmljZS5sb2coJ3N1Y2Nlc3M6ICcsIHJlc3BvbnNlKTtcclxuXHJcblx0XHRcdFx0XHRpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UucmVzcCAmJiByZXNwb25zZS5yZXNwID09PSAnRW1haWwgYWxyZWFkeSBpbiB1c2UnKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2hvd01vZGFsRGlhbG9ndWUoJ2VtYWlsSW5Vc2UnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZ290b1VzZXJMaXN0KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSkuZXJyb3IoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmxvZygnZXJyb3I6ICcsIHJlc3BvbnNlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHVzZXJEYXRhRGVmYXVsdCgpIHtcclxuXHRcdFx0dGhpcy51c2VyRGF0YSA9IHtcclxuXHRcdFx0XHQnZmlyc3RuYW1lJzogJycsXHJcblx0XHRcdFx0J2xhc3RuYW1lJzogJycsXHJcblx0XHRcdFx0J2VtYWlsJzogJycsXHJcblx0XHRcdFx0J3Bob25lbnVtYmVyJzogJycsXHJcblx0XHRcdFx0J2xvY2F0aW9uJzogJ0lOJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHNob3dNb2RhbERpYWxvZ3VlKGVycm9yVHlwZTogc3RyaW5nKSB7XHJcblx0XHRcdGxldCB0aXRsZTogc3RyaW5nID0gJycsXHJcblx0XHRcdFx0Ym9keTogc3RyaW5nID0gJyc7XHJcblxyXG5cdFx0XHRzd2l0Y2ggKGVycm9yVHlwZSkge1xyXG5cdFx0XHRcdGNhc2UgJ2VtYWlsSW5Vc2UnOlxyXG5cdFx0XHRcdFx0dGl0bGUgPSAnRW1haWwgYWxyZWFkeSBpbiB1c2UnO1xyXG5cdFx0XHRcdFx0Ym9keSA9ICdFbWFpbCBJRCBpcyBhbHJlYWR5IGluIHVzZSwgcGxlYXNlIGVudGVyIGEgdW5pcXVlIEVtYWlsIGFkZHJlc3MnO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ2luVmFsaWRGb3JtLW5hbWUnOlxyXG5cdFx0XHRcdFx0dGl0bGUgPSAnSW5jb21wbGV0ZSBmb3JtJztcclxuXHRcdFx0XHRcdGJvZHkgPSAnUGxlYXNlIGZpbGwgRmlyc3QgbmFtZS9MYXN0IG5hbWUnO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ2luVmFsaWRGb3JtLWVtYWlsJzpcclxuXHRcdFx0XHRcdHRpdGxlID0gJ0luY29tcGxldGUgZm9ybSc7XHJcblx0XHRcdFx0XHRib2R5ID0gJ1BsZWFzZSBmaWxsIHRoZSBlbWFpbCBhZGRyZXNzJztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdpblZhbGlkRm9ybS1waG9uZW51bWJlcic6XHJcblx0XHRcdFx0XHR0aXRsZSA9ICdJbmNvbXBsZXRlIGZvcm0nO1xyXG5cdFx0XHRcdFx0Ym9keSA9ICdQbGVhc2UgZmlsbCBwaG9uZSBudW1iZXInO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJ2luVmFsaWRGb3JtLWxvY2F0aW9uJzpcclxuXHRcdFx0XHRcdHRpdGxlID0gJ0luY29tcGxldGUgZm9ybSc7XHJcblx0XHRcdFx0XHRib2R5ID0gJ1BsZWFzZSBzZWxlY3QgbG9jYXRpb24nO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuc2hhcmVkU2VydmljZS5icm9hZGNhc3RFdmVudCgnc2hvdy1tb2RhbCcsIHt9KTtcclxuXHRcdFx0dGhpcy5tb2RhbERpYWxvZ3VlID0ge1xyXG5cdFx0XHRcdGlzVmlzaWJsZTogdHJ1ZSxcclxuXHRcdFx0XHR0aXRsZTogdGl0bGUsXHJcblx0XHRcdFx0Ym9keTogYm9keSxcclxuXHRcdFx0XHRidG4xVHh0OiAnT2snLFxyXG5cdFx0XHRcdGJ0bjJUeHQ6ICcnLFxyXG5cdFx0XHRcdHNob3dCdG4yOiBmYWxzZSxcclxuXHRcdFx0XHRidG4xQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IHRoaXMuaGlkZU1vZGFsRGlhbG9ndWUuYmluZCh0aGlzKSxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRoaWRlTW9kYWxEaWFsb2d1ZShldmVudD86IEV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zaGFyZWRTZXJ2aWNlLmJyb2FkY2FzdEV2ZW50KCdoaWRlLW1vZGFsJywge30pO1xyXG5cdFx0XHR0aGlzLm1vZGFsRGlhbG9ndWVEZWZhdWx0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bW9kYWxEaWFsb2d1ZURlZmF1bHQoKSB7XHJcblx0XHRcdHRoaXMubW9kYWxEaWFsb2d1ZSA9IHtcclxuXHRcdFx0XHRpc1Zpc2libGU6IGZhbHNlLFxyXG5cdFx0XHRcdHRpdGxlOiAnJyxcclxuXHRcdFx0XHRib2R5OiAnJyxcclxuXHRcdFx0XHRidG4xVHh0OiAnJyxcclxuXHRcdFx0XHRidG4yVHh0OiAnJyxcclxuXHRcdFx0XHRzaG93QnRuMjogZmFsc2UsXHJcblx0XHRcdFx0YnRuMUNhbGxiYWNrOiBmdW5jdGlvbigpIHsgfSxcclxuXHRcdFx0XHRidG4yQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHRcdGNsb3NlQnRuQ2FsbGJhY2s6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5jb250cm9sbGVycy5jb250cm9sbGVyKCdBZGRVc2VyQ29udHJvbGxlcicsIGFwcC5BZGRVc2VyQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBFZGl0VXNlckNvbnRyb2xsZXIge1xyXG5cdFx0Y29uc3RydWN0b3IoKSB7XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ0VkaXRVc2VyQ29udHJvbGxlcicsIGFwcC5FZGl0VXNlckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgTW9kYWxEaWFsb2d1ZUNvbnRyb2xsZXIge1xyXG5cdFx0Y29uc3RydWN0b3IoKSB7XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ01vZGFsRGlhbG9ndWVDb250cm9sbGVyJywgYXBwLk1vZGFsRGlhbG9ndWVDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFVzZXJGb3JtQ29udHJvbGxlciBpbXBsZW1lbnRzIFVzZXJGb3JtSW50ZXJmYWNlIHtcclxuXHRcdHByaXZhdGUgZm9ybVN1Ym1pdDogRnVuY3Rpb247XHJcblx0XHRwcml2YXRlIHVzZXJEYXRhOiBVc2VyRGF0YUludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgdXNlckRhdGFJZDogc3RyaW5nO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG5cdFx0b25Gb3JtU3VibWl0KGV2ZW50OiBFdmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuZm9ybVN1Ym1pdCh7IGRhdGE6IHRoaXMudXNlckRhdGEsIHVzZXJEYXRhSWQ6IHRoaXMudXNlckRhdGFJZCB9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignVXNlckZvcm1Db250cm9sbGVyJywgYXBwLlVzZXJGb3JtQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBUYWJsZUhlYWRlckNvbnRyb2xsZXIgaW1wbGVtZW50cyBUYWJsZUhlYWRlckludGVyZmFjZSB7XHJcblx0XHRwcml2YXRlIHNvcnRGdW5jOiBGdW5jdGlvbjtcclxuXHRcdHByaXZhdGUgZGVmYXVsdENsYXNzOiBzdHJpbmc7XHJcblx0XHRwcml2YXRlIGxhc3RTb3J0T3JkZXI6IHN0cmluZztcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCckZWxlbWVudCcsXHJcblx0XHRcdCckc2NlJyxcclxuXHRcdFx0J0NoZWNrYm94SGFuZGxlclNlcnZpY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwcml2YXRlICRlbGVtZW50OiBuZy5JUm9vdEVsZW1lbnRTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlICRzY2U6IG5nLklTQ0VTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIGNoZWNrYm94SGFuZGxlclNlcnZpY2U6IENoZWNrYm94SGFuZGxlclNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHR0aGlzLmRlZmF1bHRDbGFzcyA9ICdhcnJvdyBhcnJvdy1kb3duJztcclxuXHRcdFx0dGhpcy5sYXN0U29ydE9yZGVyID0gJyc7XHJcblx0XHR9XHJcblxyXG5cdFx0bWFuYWdlU29ydE9yZGVyKGV2ZW50OiBFdmVudCwgc29ydE9yZGVyOiBzdHJpbmcpIHtcclxuXHRcdFx0aWYgKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IG5ld0NsYXNzID0gJ2Fycm93IGFycm93LXVwJyxcclxuXHRcdFx0XHR0YXJnZXQgPSA8SFRNTEVsZW1lbnQ+IGV2ZW50LnRhcmdldDtcclxuXHJcblx0XHRcdGlmICh0aGlzLiRlbGVtZW50LmZpbmQodGFyZ2V0KS5maW5kKCdzcGFuJykuaGFzQ2xhc3MoJ2Fycm93LXVwJykpIHtcclxuXHRcdFx0XHRuZXdDbGFzcyA9ICdhcnJvdyBhcnJvdy1kb3duJztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMubGFzdFNvcnRPcmRlciAhPT0gc29ydE9yZGVyKSB7XHJcblx0XHRcdFx0dGhpcy4kZWxlbWVudC5maW5kKCcjaGVhZGluZ18nICsgdGhpcy5sYXN0U29ydE9yZGVyKS5maW5kKCdzcGFuJykucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyh0aGlzLmRlZmF1bHRDbGFzcyk7XHJcblx0XHRcdFx0dGhpcy5sYXN0U29ydE9yZGVyID0gc29ydE9yZGVyO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuJGVsZW1lbnQuZmluZCh0YXJnZXQpLmZpbmQoJ3NwYW4nKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKG5ld0NsYXNzKTtcclxuXHJcblx0XHRcdHRoaXMuc29ydEZ1bmMoe1xyXG5cdFx0XHRcdCdvcmRlckJ5Jzogc29ydE9yZGVyXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0Lyp0b1RydXN0ZWRIVE1MKGh0bWw6IHN0cmluZykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy4kc2NlLnRydXN0QXNIdG1sKGh0bWwpO1xyXG5cdFx0fSovXHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ1RhYmxlSGVhZGVyQ29udHJvbGxlcicsIGFwcC5UYWJsZUhlYWRlckNvbnRyb2xsZXIpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgSW5mb1NsaWRlckNvbnRyb2xsZXIge1xyXG5cdFx0Y29uc3RydWN0b3IoKSB7XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ0luZm9TbGlkZXJDb250cm9sbGVyJywgYXBwLkluZm9TbGlkZXJDb250cm9sbGVyKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFVzZXJJbmZvQ29udHJvbGxlciBpbXBsZW1lbnRzIFVzZXJJbmZvSW50ZXJmYWNlIHtcclxuXHRcdHByaXZhdGUgcmVhZE9ubHlNb2RlOiBCb29sZWFuO1xyXG5cdFx0cHJpdmF0ZSBhY3Rpb25IYW5kbGVyOiBGdW5jdGlvbjtcclxuXHRcdHByaXZhdGUgdXNlckRhdGE6IFVzZXJEYXRhSW50ZXJmYWNlO1xyXG5cdFx0cHJpdmF0ZSB1c2VyRWRpdERhdGE6IHVzZXJFZGl0RGF0YUludGVyZmFjZTtcclxuXHRcdHByaXZhdGUgY2hlY2tib3hTZWxlY3RlZDogQm9vbGVhbjtcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCckc2NvcGUnLFxyXG5cdFx0XHQnJHRpbWVvdXQnLFxyXG5cdFx0XHQnJGVsZW1lbnQnLFxyXG5cdFx0XHQnRG9jRXZlbnRTZXJ2aWNlJyxcclxuXHRcdFx0J1V0aWxzU2VydmljZScsXHJcblx0XHRcdCdDaGVja2JveEhhbmRsZXJTZXJ2aWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHJpdmF0ZSAkc2NvcGU6IG5nLklTY29wZSxcclxuXHRcdFx0cHJpdmF0ZSAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlICRlbGVtZW50OiBuZy5JUm9vdEVsZW1lbnRTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIGRvY0V2ZW50U2VydmljZTogRG9jRXZlbnRTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxyXG5cdFx0XHRwcml2YXRlIGNoZWNrYm94SGFuZGxlclNlcnZpY2U6IENoZWNrYm94SGFuZGxlclNlcnZpY2VcclxuXHRcdCkge1xyXG5cdFx0XHR0aGlzLnJlYWRPbmx5TW9kZSA9IHRydWU7XHJcblx0XHRcdHRoaXMuY2hlY2tib3hTZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnVzZXJFZGl0RGF0YURlZmF1bHQoKTtcclxuXHJcblx0XHRcdHRoaXMuJHNjb3BlLiRvbignY2hlY2stYWxsJywgKGV2ZW50LCBwYXJhbXM6IGFueSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMub25DaGVja2JveENsaWNrZWQobnVsbCwgcGFyYW1zKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvKnRoaXMuJHNjb3BlLiRvbignY2hlY2tib3gtY291bnRlci1jaGFuZ2VkJywgKGV2ZW50LCBwYXJhbXM6IGFueSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMub25DaGVja2JveENvdW50ZXJDaGFuZ2VkKGV2ZW50LCBwYXJhbXMpO1xyXG5cdFx0XHR9KTsqL1xyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXJ0RWRpdE1vZGUoJGV2ZW50OiBFdmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodGhpcy5yZWFkT25seU1vZGUpIHtcclxuXHRcdFx0XHR0aGlzLnJlYWRPbmx5TW9kZSA9IGZhbHNlO1xyXG5cdFx0XHRcdHRoaXMuZG9jRXZlbnRTZXJ2aWNlLmJpbmRLZXlib2FyZEV2ZW50KHRoaXMuY2FuY2VsRWRpdE1vZGUuYmluZCh0aGlzKSk7XHJcblx0XHRcdFx0dGhpcy5kb2NFdmVudFNlcnZpY2UuYmluZE1vdXNlRXZlbnQodGhpcy5vbk1vdXNlQ2xpY2suYmluZCh0aGlzKSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRjYW5jZWxFZGl0TW9kZShldmVudD86IEV2ZW50LCBub3Jlc2V0PzogQm9vbGVhbikge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuZG9jRXZlbnRTZXJ2aWNlLnVuYmluZEtleWJvYXJkRXZlbnQoKTtcclxuXHRcdFx0dGhpcy5kb2NFdmVudFNlcnZpY2UudW5iaW5kTW91c2VFdmVudCgpO1xyXG5cclxuXHRcdFx0dGhpcy5yZWFkT25seU1vZGUgPSB0cnVlO1xyXG5cdFx0XHQvKmlmICh0aGlzLiRzY29wZS4kcm9vdC4kJHBoYXNlICE9ICckYXBwbHknICYmIHRoaXMuJHNjb3BlLiRyb290LiQkcGhhc2UgIT0gJyRkaWdlc3QnKSB7XHJcblx0XHRcdFx0dGhpcy4kc2NvcGUuJGFwcGx5KCk7XHJcblx0XHRcdH0qL1xyXG5cclxuXHRcdFx0aWYgKCFub3Jlc2V0KSB7XHJcblx0XHRcdFx0dGhpcy4kZWxlbWVudC5maW5kKCcjZmlyc3RuYW1lJykudmFsKHRoaXMudXNlckRhdGEuZmlyc3RuYW1lKTtcclxuXHRcdFx0XHR0aGlzLiRlbGVtZW50LmZpbmQoJyNsYXN0bmFtZScpLnZhbCh0aGlzLnVzZXJEYXRhLmxhc3RuYW1lKTtcclxuXHRcdFx0XHR0aGlzLiRlbGVtZW50LmZpbmQoJyNsb2NhdGlvbicpLnZhbCh0aGlzLnVzZXJEYXRhLmxvY2F0aW9uKTtcclxuXHJcblx0XHRcdFx0dGhpcy4kdGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLiRzY29wZS4kYXBwbHkoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdG9uTW91c2VDbGljayhldmVudDogRXZlbnQpIHtcclxuXHRcdFx0bGV0IHRhcmdldCA9IDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQ7XHJcblx0XHRcdGxldCB0YWdOYW1lID0gdGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcclxuXHJcblx0XHRcdGlmICgodGFnTmFtZSAhPT0gJ2lucHV0JyAmJiB0YWdOYW1lICE9PSAnc2VsZWN0JykgfHwgKHRoaXMuJGVsZW1lbnQuZmluZCh0YXJnZXQpLmxlbmd0aCA9PT0gMCkpIHtcclxuXHRcdFx0XHR0aGlzLmNhbmNlbEVkaXRNb2RlKGV2ZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGFjdGlvbkNhbGxiYWNrKGV2ZW50OiBFdmVudCwgdHlwZTogc3RyaW5nLCB1c2VySWQ6IHN0cmluZykge1xyXG5cdFx0XHRpZiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodHlwZSA9PT0gJ3NhdmUnKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMudmFsaWRhdGVGb3JtKCkpIHtcclxuXHRcdFx0XHRcdHZhciB1c2VyRGF0YSA9IHtcclxuXHRcdFx0XHRcdFx0aWRfbWVtYmVyOiB0aGlzLnVzZXJEYXRhLmlkX21lbWJlcixcclxuXHRcdFx0XHRcdFx0Zmlyc3RuYW1lOiB0aGlzLnVzZXJFZGl0RGF0YS5maXJzdG5hbWUsXHJcblx0XHRcdFx0XHRcdGxhc3RuYW1lOiB0aGlzLnVzZXJFZGl0RGF0YS5sYXN0bmFtZSxcclxuXHRcdFx0XHRcdFx0ZW1haWw6IHRoaXMudXNlckRhdGEuZW1haWwsXHJcblx0XHRcdFx0XHRcdHBob25lbnVtYmVyOiB0aGlzLnVzZXJEYXRhLnBob25lbnVtYmVyLFxyXG5cdFx0XHRcdFx0XHRsb2NhdGlvbjogdGhpcy51c2VyRWRpdERhdGEubG9jYXRpb25cclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHR0aGlzLmNhbmNlbEVkaXRNb2RlKG51bGwsIHRydWUpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLnVzZXJFZGl0RGF0YURlZmF1bHQoKTtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5hY3Rpb25IYW5kbGVyKHsgdHlwZTogdHlwZSwgdXNlcklkOiB1c2VySWQsIHVzZXJEYXRhOiB1c2VyRGF0YSB9KTtcclxuXHRcdH1cclxuXHJcblx0XHR2YWxpZGF0ZUZvcm0oKSB7XHJcblx0XHRcdGxldCBmaXJzdG5hbWUgPSB0aGlzLnVzZXJFZGl0RGF0YS5maXJzdG5hbWUsXHJcblx0XHRcdFx0bGFzdG5hbWUgPSB0aGlzLnVzZXJFZGl0RGF0YS5sYXN0bmFtZSxcclxuXHRcdFx0XHRsb2NhdGlvbiA9IHRoaXMudXNlckVkaXREYXRhLmxvY2F0aW9uO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZChmaXJzdG5hbWUpIHx8XHJcblx0XHRcdFx0dGhpcy51dGlsc1NlcnZpY2UuaXNOdWxsVW5kZWZpbmVkKGxhc3RuYW1lKSB8fFxyXG5cdFx0XHRcdHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVsbFVuZGVmaW5lZChsb2NhdGlvbikpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdH1cclxuXHJcblx0XHR1c2VyRWRpdERhdGFEZWZhdWx0KCkge1xyXG5cdFx0XHR0aGlzLnVzZXJFZGl0RGF0YSA9IHtcclxuXHRcdFx0XHRmaXJzdG5hbWU6IHRoaXMudXNlckRhdGEuZmlyc3RuYW1lLFxyXG5cdFx0XHRcdGxhc3RuYW1lOiB0aGlzLnVzZXJEYXRhLmxhc3RuYW1lLFxyXG5cdFx0XHRcdGxvY2F0aW9uOiB0aGlzLnVzZXJEYXRhLmxvY2F0aW9uXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0b25DaGVja2JveENsaWNrZWQoZXZlbnQ/OiBFdmVudCwgcGFyYW1zPzogYW55KSB7XHJcblx0XHRcdGxldCBjaGFuZ2VkID0gZmFsc2U7XHJcblx0XHRcdGlmKGV2ZW50KSB7XHJcblx0XHRcdFx0Y2hhbmdlZCA9IHRydWU7XHJcblx0XHRcdH0gZWxzZSBpZiAoKHBhcmFtcyAmJiBwYXJhbXMuc3RhdGUgIT09IHRoaXMuY2hlY2tib3hTZWxlY3RlZCkpIHtcclxuXHRcdFx0XHR0aGlzLmNoZWNrYm94U2VsZWN0ZWQgPSBwYXJhbXMuc3RhdGU7XHJcblx0XHRcdFx0Y2hhbmdlZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKGNoYW5nZWQpIHtcclxuXHRcdFx0XHR0aGlzLmNoZWNrYm94SGFuZGxlclNlcnZpY2UubWFuYWdlQ2hlY2tib3hDb3VudGVyKHRoaXMuY2hlY2tib3hTZWxlY3RlZCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuY29udHJvbGxlcnMuY29udHJvbGxlcignVXNlckluZm9Db250cm9sbGVyJywgYXBwLlVzZXJJbmZvQ29udHJvbGxlcik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgRWRpdFVzZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIGlzVmlzaWJsZTogJz0nLFxyXG5cdFx0XHR0aXRsZTogJz0nLFxyXG5cdFx0XHR1c2VyRGF0YTogJz0nLFxyXG5cdFx0XHR1c2VySWQ6ICc9JyxcclxuXHRcdFx0aGlkZVBvcHVwOiAnJicsXHJcblx0XHRcdHVwZGF0ZURhdGE6ICcmJyxcclxuXHRcdFx0ZGlzY2FyZEZvcm06ICcmJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvZWRpdC11c2VyLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ0VkaXRVc2VyQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkge31cclxuXHJcblx0XHRsaW5rKHNjb3BlOiBuZy5JU2NvcGUsIGVsZW1lbnQ6IG5nLklSb290RWxlbWVudFNlcnZpY2UpIHtcclxuXHRcdFx0c2NvcGUuJG9uKCdzaG93LWVkaXQtbW9kYWwnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdCg8YW55PmVsZW1lbnQuZmluZCgnI2VkaXRVc2VyTW9kYWwnKSkubW9kYWwoJ3Nob3cnKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRzY29wZS4kb24oJ2hpZGUtZWRpdC1tb2RhbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0KDxhbnk+ZWxlbWVudC5maW5kKCcjZWRpdFVzZXJNb2RhbCcpKS5tb2RhbCgnaGlkZScpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XHJcblx0XHRcdHJldHVybiggKCkgPT4gbmV3IEVkaXRVc2VyRGlyZWN0aXZlKCkpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG59IFxyXG5kaXJlY3RpdmVzLmRpcmVjdGl2ZSgnZWRpdFVzZXInLCBhcHAuRWRpdFVzZXJEaXJlY3RpdmUuZmFjdG9yeSgpKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNb2RhbERpYWxvZ3VlRGlyZWN0aXZlIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xyXG5cdFx0XHRpc1Zpc2libGU6ICc9JyxcclxuXHRcdFx0dGl0bGU6ICc9JyxcclxuXHRcdFx0Ym9keTogJz0nLFxyXG5cdFx0XHRidG4xVHh0OiAnPScsXHJcblx0XHRcdGJ0bjJUeHQ6ICc9JyxcclxuXHRcdFx0c2hvd0J0bjI6ICc9JyxcclxuXHRcdFx0YnRuMUNhbGxiYWNrOiAnJicsXHJcblx0XHRcdGJ0bjJDYWxsYmFjazogJyYnLFxyXG5cdFx0XHRjbG9zZUJ0bkNhbGxiYWNrOiAnJicsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgdGVtcGxhdGVVcmwgPSBhcHAuQ29uc3RhbnRzLkRlZmF1bHQudGVtcGxhdGVVcmwgKyAnZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5kaXJlY3RpdmUuaHRtbCc7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlciA9ICdNb2RhbERpYWxvZ3VlQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG5cdFx0bGluayhzY29wZTpuZy5JU2NvcGUsIGVsZW1lbnQ6IG5nLklSb290RWxlbWVudFNlcnZpY2UpIHtcclxuXHRcdFx0c2NvcGUuJG9uKCdzaG93LW1vZGFsJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHQoPGFueT5lbGVtZW50LmZpbmQoJyNtb2RhbERpYWxvZ3VlJykpLm1vZGFsKCdzaG93Jyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0c2NvcGUuJG9uKCdoaWRlLW1vZGFsJywgZnVuY3Rpb24oZXZlbnQsIHBhcmFtczogYW55KSB7XHJcblx0XHRcdFx0KDxhbnk+ZWxlbWVudC5maW5kKCcjbW9kYWxEaWFsb2d1ZScpKS5tb2RhbCgnaGlkZScpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRzdGF0aWMgZmFjdG9yeSgpOiBuZy5JRGlyZWN0aXZlRmFjdG9yeSB7XHJcblx0XHRcdHJldHVybiAoKCkgPT4gbmV3IE1vZGFsRGlhbG9ndWVEaXJlY3RpdmUoKSk7XHJcblx0XHR9XHJcbiAgICB9XHJcbn1cclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ21vZGFsRGlhbG9ndWUnLCBhcHAuTW9kYWxEaWFsb2d1ZURpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFVzZXJGb3JtRGlyZWN0aXZlIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xyXG5cdFx0XHR1c2VyRGF0YTogJz0nLFxyXG5cdFx0XHR1c2VySWQ6ICc9JyxcclxuXHRcdFx0ZWRpdE1vZGU6ICc9JyxcclxuXHRcdFx0dmFsaWRhdGVFbWFpbDogJyYnLFxyXG5cdFx0XHRmb3JtU3VibWl0OiAnJicsXHJcblx0XHRcdGRpc2NhcmRGb3JtOiAnJidcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL3VzZXItZm9ybS5kaXJlY3RpdmUuaHRtbCc7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlciA9ICdVc2VyRm9ybUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGNvbnRyb2xsZXJBcyA9ICdjdXN0b21Db250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBVc2VyRm9ybURpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufSBcclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ3VzZXJGb3JtJywgYXBwLlVzZXJGb3JtRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVGFibGVIZWFkZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBwdWJsaWMgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRhYmxlSGVhZGluZzogJz0nLFxyXG5cdFx0XHRzb3J0RnVuYzogJyYnLFxyXG5cdFx0XHRjaGVja0FsbDogJyYnLFxyXG5cdFx0XHRkZWxldGVBbGw6ICcmJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ1RhYmxlSGVhZGVyQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHByaXZhdGUgJGNvbXBpbGU6IG5nLklDb21waWxlU2VydmljZSwgcHJpdmF0ZSAkcGFyc2U6IG5nLklQYXJzZVNlcnZpY2UpIHsgfVxyXG5cclxuXHRcdHN0YXRpYyBmYWN0b3J5KCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcclxuXHRcdFx0dmFyIGRpcmVjdGl2ZSA9ICgkY29tcGlsZTogbmcuSUNvbXBpbGVTZXJ2aWNlLCAkcGFyc2U6IG5nLklQYXJzZVNlcnZpY2UpID0+IG5ldyBUYWJsZUhlYWRlckRpcmVjdGl2ZSgkY29tcGlsZSwgJHBhcnNlKTtcclxuXHRcdFx0ZGlyZWN0aXZlLiRpbmplY3QgPSBbJyRjb21waWxlJywgJyRwYXJzZSddO1xyXG5cdFx0XHRyZXR1cm4gZGlyZWN0aXZlO1xyXG5cdFx0fVxyXG4gICAgfVxyXG59XHJcbmRpcmVjdGl2ZXMuZGlyZWN0aXZlKCd0YWJsZUhlYWRlcicsIGFwcC5UYWJsZUhlYWRlckRpcmVjdGl2ZS5mYWN0b3J5KCkpO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEluZm9TbGlkZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcclxuXHRcdC8vIHByaXZhdGUgdGltZXI6IG51bWJlcjtcclxuXHJcblx0XHRwdWJsaWMgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcHVibGljIHNjb3BlID0ge1xyXG5cdFx0XHR0aXRsZTogJz0nLFxyXG5cdFx0XHRib2R5OiAnPSdcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyB0ZW1wbGF0ZVVybCA9IGFwcC5Db25zdGFudHMuRGVmYXVsdC50ZW1wbGF0ZVVybCArICdkaXJlY3RpdmVzL2luZm8tc2xpZGVyLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ0luZm9TbGlkZXJDb250cm9sbGVyJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyQXMgPSAnY3VzdG9tQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7IH1cclxuXHJcblx0XHRsaW5rKHNjb3BlOiBuZy5JU2NvcGUsIGVsZW1lbnQ6IG5nLklSb290RWxlbWVudFNlcnZpY2UpIHtcclxuXHRcdFx0c2NvcGUuJG9uKCdzaG93LWluZm8tc2xpZGVyJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHQoPGFueT5lbGVtZW50LmZpbmQoJyNpbmZvU2xpZGVyJykpLm1vZGFsKCdzaG93Jyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0c2NvcGUuJG9uKCdoaWRlLWluZm8tc2xpZGVyJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHQoPGFueT5lbGVtZW50LmZpbmQoJyNpbmZvU2xpZGVyJykpLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXRpYyBmYWN0b3J5KCk6IG5nLklEaXJlY3RpdmVGYWN0b3J5IHtcclxuXHRcdFx0cmV0dXJuICgoKSA9PiBuZXcgSW5mb1NsaWRlckRpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuICAgIH1cclxufVxyXG5kaXJlY3RpdmVzLmRpcmVjdGl2ZSgnaW5mb1NsaWRlcicsIGFwcC5JbmZvU2xpZGVyRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBVc2VySW5mb0RpcmVjdGl2ZSBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xyXG5cdFx0Ly8gcHJpdmF0ZSB0aW1lcjogbnVtYmVyO1xyXG5cclxuXHRcdHB1YmxpYyByZXN0cmljdCA9ICdFJztcclxuXHRcdHB1YmxpYyBzY29wZTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcclxuXHRcdFx0dXNlckRhdGE6ICc9JyxcclxuXHRcdFx0YWN0aW9uSGFuZGxlcjogJyYnXHJcblx0XHR9O1xyXG5cdFx0cHVibGljIHRlbXBsYXRlVXJsID0gYXBwLkNvbnN0YW50cy5EZWZhdWx0LnRlbXBsYXRlVXJsICsgJ2RpcmVjdGl2ZXMvdXNlci1pbmZvLmRpcmVjdGl2ZS5odG1sJztcclxuXHRcdHB1YmxpYyBjb250cm9sbGVyID0gJ1VzZXJJbmZvQ29udHJvbGxlcic7XHJcblx0XHRwdWJsaWMgY29udHJvbGxlckFzID0gJ2N1c3RvbUNvbnRyb2xsZXInO1xyXG5cdFx0cHVibGljIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG5cdFx0bGluayhzY29wZTogVXNlckluZm9TY29wZUludGVyZmFjZSwgZWxlbWVudDogbmcuSVJvb3RFbGVtZW50U2VydmljZSkgeyB9XHJcblxyXG5cdFx0c3RhdGljIGZhY3RvcnkoKTogbmcuSURpcmVjdGl2ZUZhY3Rvcnkge1xyXG5cdFx0XHRyZXR1cm4gKCgpID0+IG5ldyBVc2VySW5mb0RpcmVjdGl2ZSgpKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuZGlyZWN0aXZlcy5kaXJlY3RpdmUoJ3VzZXJJbmZvJywgYXBwLlVzZXJJbmZvRGlyZWN0aXZlLmZhY3RvcnkoKSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBBUElTZXJ2aWNlIGltcGxlbWVudHMgQVBJU2VydmljZUludGVyZmFjZSB7XHJcblx0XHRzdGF0aWMgJGluamVjdCA9IFsnJGh0dHAnXTtcclxuXHRcdGh0dHBTZXJ2aWNlOiBuZy5JSHR0cFNlcnZpY2U7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogbmcuSUh0dHBTZXJ2aWNlKSB7XHJcblx0XHRcdHRoaXMuaHR0cFNlcnZpY2UgPSAkaHR0cDtcclxuXHRcdH1cclxuXHJcblx0XHRnZXRDYWxsKHBhcmFtczogYW55KSB7XHJcblx0XHRcdGxldCBjb25maWcgPSBwYXJhbXMuY29uZmlnIHx8IHt9O1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQocGFyYW1zLnVybCwgcGFyYW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRwb3N0Q2FsbChwYXJhbXM6IGFueSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5odHRwU2VydmljZS5wb3N0KHBhcmFtcy51cmwsIHBhcmFtcy5kYXRhLCB7XHJcblx0XHRcdFx0aGVhZGVyczogcGFyYW1zLmhlYWRlcnNcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbnNlcnZpY2VzLnNlcnZpY2UoJ0FQSVNlcnZpY2UnLCBhcHAuQVBJU2VydmljZSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uLy4uL19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU2hhcmVkU2VydmljZSBpbXBsZW1lbnRzIFNoYXJlZFNlcnZpY2VJbnRlcmZhY2Uge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckcm9vdFNjb3BlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHsgfVxyXG5cclxuICAgICAgICBicm9hZGNhc3RFdmVudCA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdChldmVudE5hbWUsIGRhdGEpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuc2VydmljZXMuc2VydmljZSgnU2hhcmVkU2VydmljZScsIGFwcC5TaGFyZWRTZXJ2aWNlKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBVdGlsc1NlcnZpY2UgaW1wbGVtZW50cyBVdGlsc1NlcnZpY2VJbnRlcmZhY2Uge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgICAgIGdldERhdGFUeXBlKG9iajogYW55KSB7XHJcblx0XHRcdHJldHVybiAoe30pLnRvU3RyaW5nLmNhbGwob2JqKS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlzTnVsbFVuZGVmaW5lZCh2YWw6IGFueSwgdmFsaWRhdGVaZXJvTmFOPzogQm9vbGVhbikge1xyXG5cdFx0XHRsZXQgaXNOdWxsOiBCb29sZWFuID0gZmFsc2UsXHJcblx0XHRcdFx0dHlwZSA9IHRoaXMuZ2V0RGF0YVR5cGUodmFsKTtcclxuXHJcblx0XHRcdHN3aXRjaCAodHlwZSkge1xyXG5cdFx0XHRcdGNhc2UgJ1tvYmplY3QgYXJyYXldJzpcclxuXHRcdFx0XHRcdGlmICh2YWwubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdGlzTnVsbCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnW29iamVjdCBvYmplY3RdJzpcclxuXHRcdFx0XHRcdGlmIChPYmplY3Qua2V5cyh2YWwpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRpc051bGwgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mICh2YWwpID09PSBcInVuZGVmaW5lZFwiIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IFwiXCIgfHwgdmFsID09PSBcIm51bGxcIiB8fCB2YWwgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0XHRcdFx0aXNOdWxsID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAodmFsaWRhdGVaZXJvTmFOICYmICh2YWwgPT09IDAgfHwgaXNOYU4odmFsKSkpIHtcclxuXHRcdFx0XHRcdFx0aXNOdWxsID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gaXNOdWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNsb25lKG9iajogYW55KSB7XHJcblx0XHRcdGlmIChvYmogPT0gbnVsbCB8fCB0eXBlb2YgKG9iaikgIT0gJ29iamVjdCcpXHJcblx0XHRcdFx0cmV0dXJuIG9iajtcclxuXHJcblx0XHRcdHZhciB0ZW1wID0gbmV3IG9iai5jb25zdHJ1Y3RvcigpO1xyXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKVxyXG5cdFx0XHRcdHRlbXBba2V5XSA9IHRoaXMuY2xvbmUob2JqW2tleV0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRlbXA7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFsaWRhdGVFbWFpbChlbWFpbDogc3RyaW5nKTogQm9vbGVhbiB7XHJcblx0XHRcdHZhciBlbWFpbFJlZ2V4cCA9IC9eW2EtejAtOSEjJCUmJyorXFwvPT9eX2B7fH1+Li1dK0BbYS16MC05XShbYS16MC05LV0qW2EtejAtOV0pPyhcXC5bYS16MC05XShbYS16MC05LV0qW2EtejAtOV0pPykqJC9pO1xyXG5cclxuXHRcdFx0aWYgKGVtYWlsICYmIGVtYWlsUmVnZXhwLnRlc3QoZW1haWwpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0T2JqZWN0RnJvbUFycihhcnI6IEFycmF5PGFueT4sIHByb3BOYW1lOiBzdHJpbmcsIHByb3BWYWx1ZTogYW55KSB7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKGFycltpXVtwcm9wTmFtZV0gPT0gcHJvcFZhbHVlKSByZXR1cm4gYXJyW2ldO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0bG9nKC4uLm1zZzogYW55W10pIHtcclxuXHRcdFx0Y29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcclxuXHRcdH1cclxuICAgIH1cclxufVxyXG5zZXJ2aWNlcy5zZXJ2aWNlKCdVdGlsc1NlcnZpY2UnLCBhcHAuVXRpbHNTZXJ2aWNlKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgZXhwb3J0IGNsYXNzIERvY0V2ZW50U2VydmljZSBpbXBsZW1lbnRzIERvY0V2ZW50U2VydmljZUludGVyZmFjZSB7XHJcbiAgICBwcml2YXRlIGRvY1JlZjogSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG4gICAgICAnJGRvY3VtZW50J1xyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRkb2N1bWVudDogbmcuSURvY3VtZW50U2VydmljZSkgeyB9XHJcblxyXG4gICAgYmluZE1vdXNlRXZlbnQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgIHRoaXMuJGRvY3VtZW50Lm9uKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGNhbGxiYWNrKGV2ZW50KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEtleWJvYXJkRXZlbnQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgIHRoaXMuJGRvY3VtZW50Lm9uKCdrZXlkb3duIGtleXByZXNzJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAyNykge1xyXG4gICAgICAgICAgY2FsbGJhY2soZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdW5iaW5kTW91c2VFdmVudCgpIHtcclxuICAgICAgdGhpcy4kZG9jdW1lbnQub2ZmKCdjbGljaycpO1xyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZEtleWJvYXJkRXZlbnQoKSB7XHJcbiAgICAgIHRoaXMuJGRvY3VtZW50Lm9mZigna2V5ZG93biBrZXlwcmVzcycpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5zZXJ2aWNlcy5zZXJ2aWNlKCdEb2NFdmVudFNlcnZpY2UnLCBhcHAuRG9jRXZlbnRTZXJ2aWNlKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIENoZWNrYm94SGFuZGxlclNlcnZpY2Uge1xyXG5cdFx0cHVibGljIGNoZWNrYm94Q291bnRlcjogbnVtYmVyO1xyXG5cdFx0cHJpdmF0ZSBzZWxlY3RlZEFsbDogQm9vbGVhbjtcclxuXHJcblx0XHRwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXHJcblx0XHRcdCdTaGFyZWRTZXJ2aWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlXHJcblx0XHQpIHtcclxuXHRcdFx0dGhpcy5jaGVja2JveENvdW50ZXIgPSAwO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkQWxsID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2hlY2tBbGwoKSB7XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdjaGVja0FsbCcpO1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyh0aGlzKTtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZEFsbCA9ICF0aGlzLnNlbGVjdGVkQWxsO1xyXG5cdFx0XHR0aGlzLnNoYXJlZFNlcnZpY2UuYnJvYWRjYXN0RXZlbnQoJ2NoZWNrLWFsbCcsIHsgc3RhdGU6IHRoaXMuc2VsZWN0ZWRBbGwgfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0bWFuYWdlQ2hlY2tib3hDb3VudGVyKGlzQ2hlY2tlZDogQm9vbGVhbikge1xyXG5cdFx0XHRpZihpc0NoZWNrZWQpIHtcclxuXHRcdFx0XHR0aGlzLmNoZWNrYm94Q291bnRlcisrO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuY2hlY2tib3hDb3VudGVyLS07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLmNoZWNrYm94Q291bnRlciA8IDApIHtcclxuXHRcdFx0XHR0aGlzLmNoZWNrYm94Q291bnRlciA9IDA7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gY29uc29sZS5sb2coJ2NoZWNrYm94Q291bnRlcjogJywgdGhpcy5jaGVja2JveENvdW50ZXIpOyBcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuc2VydmljZXMuc2VydmljZSgnQ2hlY2tib3hIYW5kbGVyU2VydmljZScsIGFwcC5DaGVja2JveEhhbmRsZXJTZXJ2aWNlKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYm93ZXJfY29tcG9uZW50cy9EZWZpbml0ZWx5VHlwZWQvanF1ZXJ5L2pxdWVyeS5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9hbmd1bGFyanMvYW5ndWxhci5kLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYm93ZXJfY29tcG9uZW50cy9EZWZpbml0ZWx5VHlwZWQvYW5ndWxhcmpzL2FuZ3VsYXItcm91dGUuZC50c1wiIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdhcHAudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL21vZHVsZXMudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnN0YW50cy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29uZmlnLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9yb3V0ZS1oYW5kbGVyLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy91c2VyLWxpc3QuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2NvbnRyb2xsZXJzL2FkZC11c2VyLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy9oZWFkZXIuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2NvbnRyb2xsZXJzL3RhYmxlLWhlYWRlci5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvY29udHJvbGxlcnMvdXNlci1mb3JtLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9jb250cm9sbGVycy91c2VyLWluZm8uaW50ZXJmYWNlLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9kaXJlY3RpdmVzL3VzZXItaW5mby5pbnRlcmZhY2UudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2RhdGEvYXBwLWNvbmZpZy5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvZGF0YS91c2VyLWRhdGEuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2RhdGEvZWRpdC11c2VyLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9kYXRhL21vZGFsLWRpYWxvZ3VlLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9kYXRhL2luZm8tc2xpZGVyLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9kYXRhL3RhYmxlLWhlYWRpbmcuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL2RhdGEvaGVhZGVyLWJ1dHRvbnMuaW50ZXJmYWNlLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy9hcGkuaW50ZXJmYWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9pbnRlcmZhY2VzL3NlcnZpY2VzL2RvYy1ldmVudC5pbnRlcmZhY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2ludGVyZmFjZXMvc2VydmljZXMvc2hhcmVkLmludGVyZmFjZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvaW50ZXJmYWNlcy9zZXJ2aWNlcy91dGlscy5pbnRlcmZhY2UudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9oZWFkZXIuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvdXNlcnMtbGlzdC5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9hZGQtdXNlci5jb250cm9sbGVyLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9lZGl0LXVzZXIuY29udHJvbGxlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvY29udHJvbGxlcnMvZGlyZWN0aXZlcy9tb2RhbC1kaWFsb2d1ZS5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3VzZXItZm9ybS5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL3RhYmxlLWhlYWRlci5jb250cm9sbGVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9jb250cm9sbGVycy9kaXJlY3RpdmVzL2luZm8tc2xpZGVyLmNvbnRyb2xsZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2NvbnRyb2xsZXJzL2RpcmVjdGl2ZXMvdXNlci1pbmZvLmNvbnRyb2xsZXIudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL2VkaXQtdXNlci5kaXJlY3RpdmUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvbW9kYWwtZGlhbG9ndWUuZGlyZWN0aXZlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9kaXJlY3RpdmVzL3VzZXItZm9ybS5kaXJlY3RpdmUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvdGFibGUtaGVhZGVyLmRpcmVjdGl2ZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvZGlyZWN0aXZlcy9pbmZvLXNsaWRlci5kaXJlY3RpdmUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL2RpcmVjdGl2ZXMvdXNlci1pbmZvLmRpcmVjdGl2ZS50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3NlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSd0cy9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvc2VydmljZXMvdXRpbHMuc2VydmljZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ndHMvc2VydmljZXMvZG9jLWV2ZW50LnNlcnZpY2UudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3RzL3NlcnZpY2VzL2NoZWNrYm94LWhhbmRsZXIuc2VydmljZS50cycgLz5cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBhcHAge1xyXG5cdGV4cG9ydCB2YXIgZm9ybUFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmb3JtQXBwJywgWyduZ1JvdXRlJywgJ2NvbnRyb2xsZXJzJywgJ3NlcnZpY2VzJywgJ2RpcmVjdGl2ZXMnXSk7XHJcblxyXG5cdGZvcm1BcHAuY29uZmlnKENvbmZpZyk7XHJcbiAgICBmb3JtQXBwLnJ1bihbJyRyb290U2NvcGUnLCAnJGxvY2F0aW9uJywgJ1NoYXJlZFNlcnZpY2UnLCBSb3V0ZUhhbmRsZXJdKTtcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi8uLi9fYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIGFwcCB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgVGVzdENvbnRyb2xsZXIge1xyXG5cdFx0cHJpdmF0ZSB2YWxpZEVtYWlsOiBCb29sZWFuO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0XHR0aGlzLnZhbGlkRW1haWwgPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHR2YWxpZGF0ZUVtYWlsKHZhbDogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMudmFsaWRFbWFpbCA9IHRydWU7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ1Rlc3RDb250cm9sbGVyJywgYXBwLlRlc3RDb250cm9sbGVyKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
