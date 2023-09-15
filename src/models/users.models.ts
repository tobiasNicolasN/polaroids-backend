import { RowDataPacket } from "mysql2";

export default interface IUsers extends RowDataPacket {
  id?: Number;
  username?: string;
  email?: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}
