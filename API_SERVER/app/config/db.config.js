module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Acme@32363236",
  DB: "FERDB",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};