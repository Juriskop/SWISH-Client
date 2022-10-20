import axios, { AxiosResponse } from "axios";
import {httpDigestAuth} from '@juriskop/axios-http-digest-auth';
import {SWISHProgramDataJson, SWISHQuerySuccessfulAnswer, SWISHQueryErrorAnswer, SWISHQueryFailureAnswer} from "./types";
import {joinToUrl} from "./URLProcessor";

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

    async queryExistingProgram(programName: string, query: string): Promise<SWISHQuerySuccessfulAnswer|SWISHQueryFailureAnswer|SWISHQueryErrorAnswer> {
        let programCode = `:- include('${programName}').`;
        let response = await this.axiosInstance.post(`${joinToUrl([this.baseUrl, "/pengine/create"])}`, 
            {
                "src_text": programCode,
                "format": "json",
                "application": "swish",
                "destroy": true,
                "ask": query,
                "solutions": "all",
                "chunk": 10000
            });

        return response.data.answer;
    }

    async queryCustomProgram(programCode: string, query: string): Promise<SWISHQuerySuccessfulAnswer|SWISHQueryFailureAnswer|SWISHQueryErrorAnswer> {
        let response = await this.axiosInstance.post(`${joinToUrl([this.baseUrl, "/pengine/create"])}`, {
                "src_text": programCode,
                "format": "json",
                "application": "swish",
                "destroy": true,
                "ask": query,
                "solutions": "all",
                "chunk": 10000
            });

        return response.data.answer;
    }
}
