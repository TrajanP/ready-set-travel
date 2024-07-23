import { createContext } from 'react';

const user = {username: "", accessToken: "", isAuth: false, firstName: "", id: ""};

export const UserContext = createContext(user);
