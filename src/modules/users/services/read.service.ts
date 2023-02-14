import DatabaseConnection from "@src/database/connection.js";

export class ReadUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, options: any) {
    const result = await this.db.collection("users").read(id);
    return {
      _id: result._id,
      name: result.name,
      email: result.email,
      username: result.username,
      role: result.role,
    };
  }
}
