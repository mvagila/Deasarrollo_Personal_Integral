/* Registro de avance compartido por todas las páginas del sitio «Formar e investigar la DPI».
   Se guarda solo en el navegador de cada persona (localStorage). Para que el docente lo vea,
   la persona exporta su archivo en «Mi avance» y lo entrega en el aula virtual. */
(function (global) {
  "use strict";
  var KEY = "dpi-progreso-v1";
  var SAL = "DPI-UTPL-2026";
  var VERSION = 1;

  /* ---------- Catálogo: qué cuenta como avance en cada formación ---------- */
  var U = [
    { id: "u1", t: "Unidad 1 · Fundamentos del modelo educativo UTPL", c: ["La misión y el propósito como horizonte", "Fundamentos del modelo educativo", "La antropología y el humanismo integral", "De la antropología a la estrategia", "El rol del docente en este horizonte", "Indicadores de la formación integral", "Invitación a la reflexión"] },
    { id: "u2", t: "Unidad 2 · Competencias humanas para el futuro y la DPI", c: ["Competencias humanas y modelo educativo", "Habilidades blandas y competencias genéricas de la UTPL", "La DPI y su relación con marcos internacionales (UNESCO, Foro Económico Mundial, OCDE, Tuning)", "Resultados de aprendizaje de la asignatura", "El proyecto de desarrollo personal", "La relación entre modelo educativo y asignatura", "Invitación a la reflexión"] },
    { id: "u3", t: "Unidad 3 · Estrategias docentes para desarrollar competencias", c: ["El marco de competencias UTPL", "La taxonomía UTPL como progresión del aprendizaje", "Las rúbricas institucionales", "Metodologías activas y evidencias de aprendizaje", "Estrategias y actividades para integrar competencias genéricas en el aula", "Camino hacia el microproyecto docente integrador"] },
    { id: "u4", t: "Unidad 4 · Diseño de una propuesta docente integradora", c: ["Objetivo de la unidad", "El microproyecto docente integrador", "La importancia de la transversalidad", "Actividad calificada de la unidad", "Criterios de evaluación del microproyecto", "Invitación final a la reflexión"] }
  ];
  var MP = ["Contexto de la asignatura y su aporte a los perfiles", "Resultado de aprendizaje seleccionado", "Competencia genérica elegida", "Actividad integradora (componente específico y genérico)", "Metodología activa y su justificación", "Evidencias esperadas del estudiante", "Rúbrica o instrumento y forma de retroalimentación"];
  var EV = [["taller", "Taller de construcción de rúbricas (20 %)"], ["micro", "Microproyecto docente integrador (40 %)"], ["examen", "Examen teórico (20 %)"], ["foro", "Foro sobre competencias genéricas (20 %)"]];
  var ET = ["Incorporar", "Verificar", "Pertinencia", "Extraer", "Sintetizar"];

  var CATALOG = { formacion: [], investigacion: [] };
  U.forEach(function (u) {
    u.c.forEach(function (c, i) { CATALOG.formacion.push({ id: "f-" + u.id + "-c" + (i + 1), label: c, group: u.t }); });
    CATALOG.formacion.push({ id: "f-" + u.id + "-ref", label: "Reflexión de la unidad", group: u.t });
  });
  MP.forEach(function (m, i) { CATALOG.formacion.push({ id: "f-mp-" + (i + 1), label: m, group: "Borrador del microproyecto" }); });
  EV.forEach(function (e) { CATALOG.formacion.push({ id: "f-ev-" + e[0], label: e[1] + ", entregado en el aula virtual", group: "Evaluación" }); });
  ET.forEach(function (e, i) {
    var g = "Etapa " + (i + 1) + " · " + e;
    CATALOG.investigacion.push({ id: "i-e" + (i + 1) + "-leida", label: "Etapa revisada", group: g });
    CATALOG.investigacion.push({ id: "i-e" + (i + 1) + "-practica", label: "Práctica completada", group: g });
    CATALOG.investigacion.push({ id: "i-e" + (i + 1) + "-entrega", label: "Entregable subido al aula virtual", group: g });
  });
  CATALOG.investigacion.push({ id: "i-detective", label: "Detective de contradicciones", group: "Prácticas generales" });
  CATALOG.investigacion.push({ id: "i-rubrica", label: "Autoevaluación con la rúbrica", group: "Prácticas generales" });

  /* ---------- Almacenamiento ---------- */
  function empty() { return { v: VERSION, estudiante: { nombre: "", id: "", grupo: "" }, formacion: {}, investigacion: {}, notas: {}, inicio: new Date().toISOString() }; }
  var mem = null, listeners = [];
  function load() {
    if (mem) return mem;
    try { var raw = localStorage.getItem(KEY); mem = raw ? JSON.parse(raw) : empty(); } catch (e) { mem = empty(); }
    ["formacion", "investigacion", "notas"].forEach(function (k) { if (!mem[k]) mem[k] = {}; });
    if (!mem.estudiante) mem.estudiante = { nombre: "", id: "", grupo: "" };
    return mem;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) {} listeners.forEach(function (f) { try { f(mem); } catch (e) {} }); }
  window.addEventListener("storage", function (e) { if (e.key === KEY) { mem = null; load(); listeners.forEach(function (f) { f(mem); }); } });

  function mark(track, id, on) {
    load(); if (on === undefined) on = true;
    if (on) { if (!mem[track][id]) mem[track][id] = { at: new Date().toISOString() }; }
    else { delete mem[track][id]; }
    save();
  }
  function isDone(track, id) { return !!load()[track][id]; }
  function note(id, text) { load(); if (text === undefined) return mem.notas[id] ? mem.notas[id].t : ""; mem.notas[id] = { t: text, at: new Date().toISOString() }; save(); }
  function setStudent(o) { load(); mem.estudiante = { nombre: o.nombre || "", id: o.id || "", grupo: o.grupo || "" }; save(); }
  function stats(track, data) {
    var d = data || load(), total = CATALOG[track].length, n = 0, last = null;
    CATALOG[track].forEach(function (it) { var r = d[track] && d[track][it.id]; if (r) { n++; if (!last || r.at > last) last = r.at; } });
    return { done: n, total: total, pct: total ? Math.round(n * 100 / total) : 0, last: last };
  }

  /* ---------- Exportación con huella para detectar cambios manuales ---------- */
  function sha256(text) {
    if (!(global.crypto && crypto.subtle)) return Promise.resolve("no-disponible");
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(text)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
    });
  }
  function payload(d) {
    return { sitio: "Formar e investigar la DPI", version: VERSION, generado: new Date().toISOString(), estudiante: d.estudiante, inicio: d.inicio,
      resumen: { formacion: stats("formacion", d), investigacion: stats("investigacion", d) },
      formacion: d.formacion, investigacion: d.investigacion, notas: d.notas };
  }
  function exportData() {
    var p = payload(load()), body = JSON.stringify(p);
    return sha256(SAL + body).then(function (h) { p.huella = h; return p; });
  }
  function verify(obj) {
    if (!obj || !obj.huella) return Promise.resolve(false);
    var h = obj.huella, copy = JSON.parse(JSON.stringify(obj)); delete copy.huella;
    return sha256(SAL + JSON.stringify(copy)).then(function (x) { return x === h; });
  }
  function importOwn(obj) {
    mem = { v: VERSION, estudiante: obj.estudiante || {}, formacion: obj.formacion || {}, investigacion: obj.investigacion || {}, notas: obj.notas || {}, inicio: obj.inicio || new Date().toISOString() };
    save();
  }
  function reset() { mem = empty(); save(); }
  function download(name, text, type) {
    var blob = new Blob([text], { type: type || "application/json" }), a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  global.DPI = { KEY: KEY, CATALOG: CATALOG, UNIDADES: U, MICROPROYECTO: MP, EVALUACION: EV, ETAPAS: ET,
    load: load, mark: mark, isDone: isDone, note: note, setStudent: setStudent, stats: stats,
    exportData: exportData, verify: verify, importOwn: importOwn, reset: reset, download: download,
    onChange: function (f) { listeners.push(f); } };
})(window);
