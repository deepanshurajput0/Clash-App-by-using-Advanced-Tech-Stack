import Env from "./env";

export const BASE_URL = `${Env.BACKEND_URL}/api`
export const REGISTER_URL = `${BASE_URL}/auth/register`


console.log(REGISTER_URL)