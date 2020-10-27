import { Request, Response } from "express";
import { FhirAuth } from "../models";
import { Fhirservice } from "../services/fhirservice";
import FhirAuthModule from "../modules/fhir/FhirModule";
require("dotenv").config({ path: "../../.env" });
export class FhirController {
  static GetClientIdAndSecret(req: Request, res: Response) {
    let clientId = process.env.CLIENT_ID;
    let clientSecret = process.env.CLIENT_SECRET;
    console.log(`fhir.routes.get.GetClientIdAndSecret - attempting to get client id and secret`, clientId);
    return res.status(200).json({
      success: true,
      response: {
        clientId,
        clientSecret,
      },
    });
  }
  static async GetAccessToken(req: Request, res: Response) {
    try {
      let item = await FhirController.GenerateNewAccessCode("create");
      console.log(`fhir.routes.get.GetClientIdAndSecret - attempting to get access code `);
      return res.status(200).json({
        success: true,
        response: item.response,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        response: err,
      });
    }
  }

  private static async GenerateNewAccessCode(action: string, id?: number) {
    try {
      let codeResponse = await new Fhirservice().GenerateNewOauthAccessCode();
      if (codeResponse.success) {
        let code = codeResponse.response.code;
        let accessCodeResponse = await new Fhirservice().ExchangeOauthAccessForAccessCode(code);
        if (accessCodeResponse.success) {
          const authItem = { ...accessCodeResponse.response, code } as FhirAuth;
          if (action == "create") {
            let result = await new FhirAuthModule().add(authItem);
            return {
              success: true,
              response: result,
            };
          }
          if (action == "update") {
            let result = await new FhirAuthModule().update(id, authItem);
            return {
              success: true,
              response: result,
            };
          }
        } else {
          return { success: false, response: accessCodeResponse.response };
        }
      }
      {
        return { success: false, response: codeResponse.response };
      }
    } catch (err) {}
  }
  static async GetNewAuthAccessCode(req: Request, res: Response) {
    try {
      console.log(`fhir.routes.get.NewaccessCode - attempting to get new access code`);
      const response = await new Fhirservice().GenerateNewOauthAccessCode();
      console.log(`fhir.routes.get.NewaccessCode - attempting to get new access code status:200`);
      return res.status(200).json({
        success: true,
        response: response,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        response: err,
      });
    }
  }
  static async CreatePatient(req: Request, res: Response) {
    try {
    } catch (err) {
      return res.status(500).json({
        success: false,
        response: err,
      });
    }
  }
  static async ListPatientsRessources(req: Request, res: Response) {
    try {
      let { patientId } = req.params;
      console.log(`fhir.routes.get.patientressources - attempting to get new access code`, patientId);
      let authItem = await new FhirAuthModule().fetchAll();
      if (authItem.length) {
        let item = authItem[0];
        let results = await new Fhirservice().GetPatientRessource(patientId, item.access_token);
        if (!results.success) {
          let newItem = await FhirController.GenerateNewAccessCode("update", item.id);
          let results = await new Fhirservice().GetPatientRessource(patientId, newItem.response.access_token);
          return res.status(200).json({
            success: true,
            response: results.response,
          });
        } else {
          return res.status(200).json({
            success: true,
            response: results.response,
          });
        }
      } else {
        let itemResponse = await FhirController.GenerateNewAccessCode("create");
        if (itemResponse.success) {
          let authItem = itemResponse.response;
          let results = await new Fhirservice().GetPatientRessource(patientId, authItem.access_token);
          return res.status(200).json({
            success: true,
            response: results.response,
          });
        } else {
          return res.status(500).json({
            success: false,
            response: "internal server error",
          });
        }
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        response: err,
      });
    }
  }
}
