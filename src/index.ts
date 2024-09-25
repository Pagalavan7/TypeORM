import { DataSource } from "typeorm";
import "dotenv/config";

const dataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_SERVER,
  port: 1433, // Default MSSQL port; adjust if necessary
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Set to false in production
  logging: false, // Set to true to enable query logging
  options: {
    enableArithAbort: true,
    encrypt: true, // Enable encryption
    trustServerCertificate: true, // Allow self-signed certificates
  },
  entities: ["entity/*.js"],
});

export const connectDB = async () => {
  try {
    await dataSource.initialize();
    console.log("Db connection successful");
  } catch (err) {
    console.log("DB connection failed", err);
    throw err;
  }
};

connectDB();
