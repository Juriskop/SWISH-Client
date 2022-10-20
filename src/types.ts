export interface SWISHProgramDataJson {
    chats: {
        total: number;
    };
    data: string;
    meta: {
        author: string;
        commit: string;
        commit_message: string;
        data: string;
        identity: string;
        modify: string[];
        name: string;
        previous: string;
        public: string;
        symbolic: string;
        time: number;
    };
}

export interface SWISHQuerySuccessfulAnswer {
    data: {
        data: Record<string, any>[];
        event: 'success';
        id: string;
        more: boolean;
        projection: string[];
        time: number;
    };
    event: string;
    id: string;   
}

export interface SWISHQueryFailureAnswer {
    data: {
        data?: Record<string, any>[];
        event: 'failure';
        id: string;
        time: number;
    };
    event: string;
    id: string;   
}

export interface SWISHQueryErrorAnswer {
    data: {
        arg1?: any;
        arg2?: any;
        arg3?: any;
        arg4?: any;
        arg5?: any;
        code: string;
        data: Record<string, any>[];
        event: 'error';
        id: string;
        time?: number;
    };
    event: string;
    id: string;
}