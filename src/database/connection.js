import { Sequelize } from "sequelize";

const sequelize = new Sequelize("questions", "root", "jcm@2672", {
  host: "localhost",
  dialect: "mysql",
});

try {
  await sequelize.authenticate();
  console.log("Conectado com sucesso no banco de dados.");
} catch (error) {
  console.error(
    "Ocorreu um erro ao tentar conectar com o banco de dados:",
    error
  );
}

export default sequelize;
