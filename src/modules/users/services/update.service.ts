import DatabaseConnection from "@src/database/connection.js";

export class UpdateUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, body: any) {
    interface IUpdate {
      role: object[];
      branch: object[];
    }

    const update = <IUpdate>{};

    if (body.role) {
      update.role = body.role;
    }
    if (body.branch) {
      update.branch = body.branch;
    }

    const result = await this.db.collection("users").update(id, { $set: update });
    return result;
  }
}
