const taskModel = require('../models/taskModel');
const { errorHttp } = require('../middlewares/errorHandler');

exports.getAll = (req, res) => {
  const { prioritas } = req.query;
  res.json(taskModel.getAll(prioritas));
};

exports.getById = (req, res, next) => {
  const id = parseInt(req.params.id);
  const data = taskModel.getById(id);
  if (!data) return next(errorHttp(404, `Data dengan id ${id} tidak ditemukan`));
  res.json(data);
};

// Body: { "judul": "...", "deskripsi": "...", "prioritas": "tinggi", "tenggat": "2026-10-05", "selesai": false }
exports.create = (req, res, next) => {
  const { judul, deskripsi, prioritas, tenggat, selesai } = req.body;
  if (!judul || !prioritas || !tenggat) {
    return next(errorHttp(400, 'judul, prioritas, dan tenggat wajib diisi'));
  }

  const baru = taskModel.create({
    judul,
    deskripsi: deskripsi || '',
    prioritas,
    tenggat,
    selesai: selesai === true,
  });
  res.status(201).json({
    status: 'success',
    message: 'Data berhasil ditambahkan',
    data: baru,
  });
};

exports.update = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (!taskModel.getById(id)) {
    return next(errorHttp(404, `Data dengan id ${id} tidak ditemukan`));
  }

  const { judul, deskripsi, prioritas, tenggat, selesai } = req.body;
  if (!judul || !prioritas || !tenggat) {
    return next(errorHttp(400, 'judul, prioritas, dan tenggat wajib diisi'));
  }

  const hasil = taskModel.update(id, {
    judul,
    deskripsi: deskripsi || '',
    prioritas,
    tenggat,
    selesai: selesai === true,
  });
  res.status(200).json({
    status: 'success',
    message: `Data tugas dengan id ${id} berhasil diperbarui`,
    data: hasil,
  });
};

exports.remove = (req, res, next) => {
  const id = parseInt(req.params.id);
  const berhasil = taskModel.remove(id);
  if (!berhasil) return next(errorHttp(404, `Data dengan id ${id} tidak ditemukan`));
  res.status(200).json({
    status: 'success',
    message: `Data tugas dengan id ${id} berhasil dihapus`,
    data: null,
  });
};