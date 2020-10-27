import { Router } from "express";
import { FhirController } from "../controllers/fhir.controller";

const router = Router();

router.get("/", FhirController.GetNewAuthAccessCode);
router.get("/patient/:patientId", FhirController.ListPatientsRessources);
router.get("/accessToken", FhirController.GetAccessToken);
export default router;
