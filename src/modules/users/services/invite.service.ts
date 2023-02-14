import DatabaseConnection from "@src/database/connection.js";

export class InviteUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(body: any, options: any) {
    return {
      _id: body._id,
      // name_alias: body.name_alias,
      // email: body.email,
      // role_id: body.role_id,
      // branch_access: body.branch_access,
    };
  }
}
