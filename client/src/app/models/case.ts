import { Firm } from "./firm";
import { Insurance } from "./insurance";
export interface Case {
  id:Number;
  practiceLocation: string;
  category: string;
  purposeOfVisit: string;
  caseType: string;
  doa: string;
  insurance: Insurance[];
  firm: Firm[];
}
