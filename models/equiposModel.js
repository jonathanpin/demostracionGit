const { conectar } = require('./db');

const sql = require('mssql');

exports.obtenerEquipos = async() => {
  try {
    // Ejecutar la consulta a la tabla de equipos utilizando la conexión a la base de datos
    const pool = await conectar();
    const result = await pool.request()
    .query('SELECT e.id_equipos,e.nombre,e.descripcion,m.nombre_marca,e.modelo,t.descripcion as tipo,es.descripcion as estado FROM ((equipos e LEFT JOIN marcas m on e.marca_id=m.id_marcas) LEFT JOIN tipo_equipo t on e.tipo_equipo_id=t.id_tipo_equipo) LEFT JOIN estados_equipo es on e.estado_equipo_id=es.id_estados_equipo');
    // Devolver el resultado de la consulta
    return result.recordset
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.obtenerEquipo = async(id) => {
  try {
    // Ejecutar la consulta a la tabla de equipos utilizando la conexión a la base de datos
    const pool = await conectar();
    const result = await pool.request()
    .input('id', sql.VarChar, id)
    .query('SELECT * FROM equipos where id_equipos = @id');
    // Devolver el resultado de la consulta
    return result.recordset
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.obtenerTipoEquipos = async() => {
  try {
    // Ejecutar la consulta a la tabla de equipos utilizando la conexión a la base de datos
    const pool = await conectar();
    const result = await pool.request()
    .query('SELECT * FROM tipo_equipo');
    // Devolver el resultado de la consulta
    return result.recordset
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.obtenerMarcas = async() => {
  try {
    // Ejecutar la consulta a la tabla de equipos utilizando la conexión a la base de datos
    const pool = await conectar();
    const result = await pool.request()
    .query('SELECT * FROM marcas');
    // Devolver el resultado de la consulta
    return result.recordset
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.obtenerEstados = async() => {
  try {
    // Ejecutar la consulta a la tabla de equipos utilizando la conexión a la base de datos
    const pool = await conectar();
    const result = await pool.request()
    .query('SELECT * FROM estados_equipo');
    // Devolver el resultado de la consulta
    return result.recordset
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.guardarEquipo = async (datos) => {
  try {
    const pool = await conectar();
    const result = await pool.request()
    .input('nombre', sql.VarChar, datos.nombre)
    .input('descripcion', sql.VarChar, datos.descripcion)
    .input('tipo_equipo_id', sql.Int, datos.tipoEquipo)
    .input('marca_id', sql.Int, datos.marca)
    .input('modelo', sql.VarChar, datos.modelo)
    .input('anio_compra', sql.Int, datos.anioCompra)
    .input('costo', sql.Numeric(18, 4), datos.costo)
    .input('vida_util', sql.Int, datos.vidaUtil)
    .input('estado_equipo_id', sql.Int, datos.estadoEquipo)
    .input('estado', sql.Char(1), datos.estado)
    .query('INSERT INTO equipos (nombre, descripcion, tipo_equipo_id, marca_id, modelo, anio_compra, costo, vida_util, estado_equipo_id, estado) VALUES (@nombre, @descripcion, @tipo_equipo_id, @marca_id, @modelo, @anio_compra, @costo, @vida_util, @estado_equipo_id, @estado)');

    // Verificar si se insertó correctamente el registro
    if (result.rowsAffected[0] > 0) {
      return { mensaje: 'Equipo guardado correctamente', error: false };
    } else {
      return { mensaje: 'Error al guardar el equipo', error: true };
    }
  } catch (error) {
    console.error(error);
    return { mensaje: 'Error al guardar el equipo', error: true };
  }
};

exports.editarEquipo = async (datos) => {
  try {
    const pool = await conectar();
    const result = await pool.request()
    .input('nombre', sql.VarChar, datos.nombre)
    .input('descripcion', sql.VarChar, datos.descripcion)
    .input('tipo_equipo_id', sql.Int, datos.tipoEquipo)
    .input('marca_id', sql.Int, datos.marca)
    .input('modelo', sql.VarChar, datos.modelo)
    .input('anio_compra', sql.Int, datos.anioCompra)
    .input('costo', sql.Numeric(18, 4), datos.costo)
    .input('vida_util', sql.Int, datos.vidaUtil)
    .input('estado_equipo_id', sql.Int, datos.estadoEquipo)
    .input('estado', sql.Char(1), datos.estado)
    .input('id_equipos', sql.Int, datos.id_equipos)
    .query('UPDATE equipos SET nombre=@nombre, descripcion=@descripcion, tipo_equipo_id=@tipo_equipo_id, marca_id=@marca_id, modelo=@modelo, anio_compra=@anio_compra, costo=@costo, vida_util=@vida_util, estado_equipo_id=@estado_equipo_id, estado=@estado WHERE id_equipos=@id_equipos');

    // Verificar si se insertó correctamente el registro
    if (result.rowsAffected[0] > 0) {
      return { mensaje: 'Equipo guardado correctamente', error: false };
    } else {
      return { mensaje: 'Error al guardar el equipo', error: true };
    }
  } catch (error) {
    console.error(error);
    return { mensaje: 'Error al guardar el equipo', error: true };
  }
};

exports.eliminarEquipo = async (id) => {
  try {
    const pool = await conectar();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Equipos WHERE id_equipos = @id');

    if (result.rowsAffected[0] === 0) {
      return { mensaje: 'El registro no existe', error: true };
    }
    return { mensaje: 'Registro con ID ${id} eliminado correctamente', error: false };
    
  } catch (error) {
    console.log(error);
    console.error(`Error al eliminar el registro: ${error.message}`);
    return { mensaje: 'Error al eliminar el registro: ${error.message}', error: true };
  }
};

