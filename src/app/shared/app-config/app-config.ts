import { InjectionToken } from "@angular/core";
import { IAppConfig }     from "./iapp-config";

export const ApiEndpointConfig: IAppConfig = {
    //apiEndpoint: "https://squizer-server.herokuapp.com/"
    apiEndpoint: "http://localhost:8000/"
};

export let APP_CONFIG = new InjectionToken<IAppConfig>("app-config");
