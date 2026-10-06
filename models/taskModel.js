// Topik 18 - Produktivitas: Daftar Tugas
let tasks = [
  {
    id: 1,
    judul: 'Kerjakan Tugas 1 Express',
    deskripsi: 'CRUD + filter',
    prioritas: 'tinggi',
    tenggat: '2026-10-05',
    selesai: false,
  },
  {
    id: 2,
    judul: 'Review Materi Dasar Teori REST',
    deskripsi: 'Baca ulang slide pertemuan 3-4',
    prioritas: 'sedang',
    tenggat: '2026-10-01',
    selesai: false,
  },
  {
    id: 3,
    judul: 'Push project ke GitHub',
    deskripsi: 'Minimal 5 commit bertahap',
    prioritas: 'tinggi',
    tenggat: '2026-10-06',
    selesai: true,
  },
];
let nextId = 4;

function getAll(prioritas) {
  if (prioritas) return tasks.filter((t) => t.prioritas === prioritas);
  return tasks;
}

function getById(id) {
  return tasks.find((t) => t.id === id);
}

function create(data) {
  const baru = { id: nextId++, ...data };
  tasks.push(baru);
  return baru;
}

// penggantian penuh: seluruh field diganti, id tetap
function update(id, data) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;
  tasks[index] = { id, ...data };
  return tasks[index];
}

function remove(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };