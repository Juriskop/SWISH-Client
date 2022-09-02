import axios from "axios";
import {httpDigestAuth} from '@juriskop/axios-http-digest-auth';
import {SWISHProgramDataJson} from "./types";

export class SWISHClient {
    private axiosInstance = axios.create({});

    constructor(username: string, password: string, baseUrl: string) {
        httpDigestAuth(this.axiosInstance, {username, password});
    }

    async getProgramCodeAsJson(programName: string): Promise<SWISHProgramDataJson> {
        throw new Error('Not yet implemented');
    }

    async getProgramCodeAsRawText(programName: string): Promise<string> {
        throw new Error('Not yet implemented');
    }
}