import { Secret } from "jsonwebtoken";

export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'developpment' | 'production';
      URL_API: string;
      PORT_API: string;
      PRIVATE_KEY: Secret;
    }
  }
}
