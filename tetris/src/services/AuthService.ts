import { LoginUrl, RegisterUrl } from "../settings/Urls";
import UserService from "./UserService";

export default class AuthService {
    static async Login(nickName : string, password: string) : Promise<any> {
        const response = await fetch(LoginUrl, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: nickName, password: password})
        });
 
        const result = await response.json();
        if(result.token && result.success) {
            localStorage.setItem('token', result.token);
            await UserService.getInfo();
        }

        return result;
    }

    static async Register(nickName : string, password: string) : Promise<any> {
        const response = await fetch(RegisterUrl, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: nickName, password: password})
        });
        const result = await response.json();
        if(result.token && result.success) {
            localStorage.setItem('token', result.token);
            await UserService.getInfo();
        }
     
        return result;
    }
}