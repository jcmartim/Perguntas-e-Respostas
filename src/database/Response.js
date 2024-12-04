import { DataTypes } from "sequelize";
import sequelize from "./connection.js";

const Response = sequelize.define("response", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  reply: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Response.sync();

export default Response;
