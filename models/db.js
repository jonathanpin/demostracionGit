const sql = require('mssql');
var config = {
  user: 'sa',
  password: 'pa55w0rd',
  server: 'LOCALHOST', 
  database: 'equipos',
  synchronize: true,
  trustServerCertificate: true,
};
async function conectar() {
  try {
    const pool = await sql.connect(config);
    // console.log('Conexión exitosa a la base de datos');
    return pool;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { conectar };