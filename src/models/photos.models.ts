import { RowDataPacket } from "mysql2";

export default interface IPhotos extends RowDataPacket {
  id?: Number;
  title?: string;
  photo?: string;
  user_id?: string;
  created_at?: string;
  update_at?: string;
}
