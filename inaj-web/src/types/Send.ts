import { Doc } from "./Doc";

export type Send = {
  id: String;
  name: String;
  document: Doc;
  content: String;
  periodicity: "dialy" | "weekly" | "monthly" | number;
  lastSentDate: Date;
  sendDates: Array<Date>;
  status: "INACTIVE" | "ACTIVE";
};
