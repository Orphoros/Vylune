declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BOT_TOKEN: string;
            VC_NAME: string;
            GUILD_ID: string;
            USE_GUILD: string;
            BOT_ID: string;
            BRAIN_FILE: PathOrFileDescriptor;
            TRAINING_FILE: PathOrFileDescriptor;
            ERROR_MSG_FILE: PathOrFileDescriptor;
            TRAIN: string;
            ADMIN_ROLE_NAME: string;
            PORT: string;
        }
    }
}

export { };
