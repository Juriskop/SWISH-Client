import axios from "axios";
import {httpDigestAuth} from '@juriskop/axios-http-digest-auth';
import {SWISHProgramDataJson} from "./types";
import { joinToUrl } from "./URLProcessor";

export class SWISHClient {
    private axiosInstance = axios.create({});
   // public baseUrl: string;

    constructor(username: string, password: string, public baseUrl: string) {
       // baseURL feature does not work with http Digest auth
        httpDigestAuth(this.axiosInstance, {username, password});
    
      //  this.baseUrl = baseUrl;
    }

    async getProgramCodeAsJson(programName: string): Promise<SWISHProgramDataJson> {
       let response = await this.axiosInstance.get(`${joinToUrl([this.baseUrl, "/p/", programName])}?format=json`);
    
        return response.data;
       
    }

    async getProgramCodeAsRawText(programName: string): Promise<string> {
        let response = await this.axiosInstance.get(`${joinToUrl([this.baseUrl, "/p/", programName])}?format=raw`, {responseType:"text"});

        return response.data;
    }
}