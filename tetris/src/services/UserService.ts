import { LeadersUrl, UpdateScoreUrl, UserInfoUrl } from "../settings/Urls";
import states from "../states";

export default class UserService {
  static async getInfo() : Promise<any> {
    const response = await fetch(UserInfoUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
    const userInfo = await response.json();
    states.nickname = userInfo.nickname;
    states.rank = userInfo.position;
    states.bestResult = userInfo.bestResult;
    return userInfo;
  }

  static async updateBestResult(score: number) {
    const response = await fetch(UpdateScoreUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({Nickname: '', Position: '', BestResult: score })
    });
    const userInfo = await response.json();
    states.rank = userInfo.position;
    states.bestResult = userInfo.bestResult;
  }

  static async getLeaders() : Promise<any> {
    const response = await fetch(LeadersUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
    const leaders = await response.json();
    return leaders;
  }
}