import DatabaseConnection from "@src/database/connection.js";

export class DestroyUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string) {
    const result = await this.db.collection("users").delete(id);
    return result;
  }
}
