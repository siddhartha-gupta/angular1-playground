/// <reference path="../../_all.d.ts" />
declare module app {
    class SharedService implements SharedServiceInterface {
        private $rootScope;
        static $inject: string[];
        constructor($rootScope: ng.IRootScopeService);
        broadcastEvent: (eventName: any, data: any) => void;
    }
}
