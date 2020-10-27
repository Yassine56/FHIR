import axios from "axios";
require("dotenv").config({ path: "../../.env" });

let clientId = process.env.CLIENT_ID;
let clientSecret = process.env.CLIENT_SECRET;
let appUserId = process.env.APP_USER_ID;

export class Fhirservice {
  async GenerateNewOauthAccessCode() {
    try {
      let res = await axios.post(
        `https://api.1up.health/user-management/v1/user/auth-code?app_user_id=${appUserId}&client_id=${clientId}&client_secret=${clientSecret}`,
        {}
      );
      if (res.status == 200) {
        return {
          success: true,
          response: res.data,
        };
      }
    } catch (err) {
      console.log("error", err);
      return {
        success: false,
        response: err.message,
      };
    }
  }
  async ExchangeOauthAccessForAccessCode(code: String) {
    try {
      let res = await axios.post(
        `https://api.1up.health/fhir/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`,
        {}
      );
      if (res.status == 200) {
        return {
          success: true,
          response: res.data,
        };
      }
    } catch (err) {
      console.log("error", err);
      return {
        success: false,
        response: err.message,
      };
    }
  }
  async GetNewOAuthAccessTokenWithRefreshToken(refreshToken: String) {
    try {
      let res = await axios.post(
        `https://api.1up.health/fhir/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`,
        {}
      );
      if (res.status == 200) {
        return {
          success: true,
          response: res.data,
        };
      }
    } catch (err) {
      console.log("error", err);
      return {
        success: false,
        response: err.message,
      };
    }
  }
  async CreatePatientRessource(patient: { resourceType: string; id: string; gender: string }) {
    try {
      let res = await axios.post(`https://api.1up.health/fhir/dstu2/Patient`, patient);
      if (res.status == 200) {
        return {
          success: true,
          response: res.data,
        };
      }
    } catch (err) {
      console.log("error", err);
      return {
        success: false,
        response: err.message,
      };
    }
  }
  async GetPatientRessource(patientId: string, accessToken: string) {
    try {
      const instance = axios.create({
        headers: { authorization: "bearer " + accessToken },
      });
      let res = await instance.get(`https://api.1up.health/fhir/dstu2/Patient/${patientId}/$everything`);
      if (res.status == 200) {
        return {
          success: true,
          response: res.data,
        };
      }
    } catch (err) {
      console.log("error", err);
      return {
        success: false,
        response: err.message,
      };
    }
  }
}
