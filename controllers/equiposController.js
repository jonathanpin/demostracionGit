const equiposModel = require('../models/equiposModel');

exports.getEquipos = async() => {
  const equipos  = await equiposModel.obtenerEquipos();
    if (equipos !== null && equipos !== undefined) {
        const response = { data: equipos, error:false };
        return response;
    } else {
        return { mensaje: 'Error al obtener los equipos', error:true };
    }
};

exports.getEquipo = async(id) => {
  const equipos  = await equiposModel.obtenerEquipo(id);
    if (equipos !== null && equipos !== undefined) {
        const response = { data: equipos, error:false };
        return response;
    } else {
        return { mensaje: 'Error al obtener los equipos', error:true };
    }
};

exports.getTipoEquipos = async() => {
  const tipos  = await equiposModel.obtenerTipoEquipos();
    if (tipos !== null && tipos !== undefined) {
        const response = { data: tipos, error:false };
        return response;
    } else {
        return { mensaje: 'Error al obtener los tipo de equipos', error:true };
    }
};

exports.getMarcas = async() => {
  const marcas  = await equiposModel.obtenerMarcas();
    if (marcas !== null && marcas !== undefined) {
        const response = { data: marcas, error:false };
        return response;
    } else {
        return { mensaje: 'Error al obtener las marcas', error:true };
    }
};

exports.getEstados = async() => {
  const estados  = await equiposModel.obtenerEstados();
    if (estados !== null && estados !== undefined) {
        const response = { data: estados, error:false };
        return response;
    } else {
        return { mensaje: 'Error al obtener los estados', error:true };
    }
};

exports.guardarEquipo = async(datos) => {
    return await equiposModel.guardarEquipo(datos);
};

exports.editarEquipo = async(datos) => {
    return await equiposModel.editarEquipo(datos);
};

exports.eliminarEquipo = async(id) => {
    return await equiposModel.eliminarEquipo(id);
};
