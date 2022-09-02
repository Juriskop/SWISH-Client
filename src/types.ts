export interface SWISHProgramDataJson {
    chats: {
        total: number;
    },
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
    }
}