import { Doc } from "./Doc";
import { Send } from "./Send";

export type User = {
  id: String;
  name: String;
  username: String;
  password: String;
  email: String;
  isActive: Boolean;
  createdAt: Date;
  documents: Array<Doc>;
  sends: Array<Send>;
};
