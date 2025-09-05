// Función para convertir tasa de interés al equivalente anual
function convertirTasaAAnual(tasa, periodo) {
  switch (periodo) {
    case "diario":
      return tasa * 365;
    case "semanal":
      return tasa * 52;
    case "mensual":
      return tasa * 12;
    case "trimestral":
      return tasa * 4;
    case "semestral":
      return tasa * 2;
    case "anual":
    default:
      return tasa;
  }
}

// Función para convertir tiempo a años
function convertirTiempoAAnios(tiempo, periodo) {
  switch (periodo) {
    case "diario":
      return tiempo / 365;
    case "semanal":
      return tiempo / 52;
    case "mensual":
      return tiempo / 12;
    case "trimestral":
      return tiempo / 4;
    case "semestral":
      return tiempo / 2;
    case "anual":
    default:
      return tiempo;
  }
}

// Función para convertir tiempo de años a la unidad seleccionada (para calcularTiempo)
function convertirAniosAUnidad(tiempoEnAnios, periodo) {
  switch (periodo) {
    case "diario":
      return tiempoEnAnios * 365;
    case "semanal":
      return tiempoEnAnios * 52;
    case "mensual":
      return tiempoEnAnios * 12;
    case "trimestral":
      return tiempoEnAnios * 4;
    case "semestral":
      return tiempoEnAnios * 2;
    case "anual":
    default:
      return tiempoEnAnios;
  }
}

const unidadesPlural = {
  diario: "días",
  semanal: "semanas",
  mensual: "meses",
  trimestral: "trimestres",
  semestral: "semestres",
  anual: "años",
};

// 1. CALCULAR MONTO FINAL (M)
// Fórmula: M = C * (1 + i * t), con i y t en años
document.querySelector("#monto form").addEventListener("submit", function (e) {
  e.preventDefault();
  const capital = parseFloat(document.getElementById("monto-capital").value);
  const tasaInteres = parseFloat(
    document.getElementById("monto-interes").value,
  );
  const tiempo = parseFloat(document.getElementById("monto-tiempo").value);
  const periodo = document.getElementById("monto-periodo").value;

  if (isNaN(capital) || isNaN(tasaInteres) || isNaN(tiempo)) {
    alert("Por favor, completa todos los campos con números válidos.");
    return;
  }

  const tasaAnual = convertirTasaAAnual(tasaInteres, periodo) / 100; // Convertir a decimal
  const tiempoEnAnios = convertirTiempoAAnios(tiempo, periodo);
  const montoFinal = capital * (1 + tasaAnual * tiempoEnAnios);

  document.getElementById("resultado-monto").textContent =
    montoFinal.toFixed(2);
});

// 2. CALCULAR CAPITAL INICIAL (C)
// Fórmula: C = M / (1 + i * t)
document
  .querySelector("#capital form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const monto = parseFloat(document.getElementById("capital-monto").value);
    const tasaInteres = parseFloat(
      document.getElementById("capital-interes").value,
    );
    const tiempo = parseFloat(document.getElementById("capital-tiempo").value);
    const periodo = document.getElementById("capital-periodo").value;

    if (isNaN(monto) || isNaN(tasaInteres) || isNaN(tiempo)) {
      alert("Por favor, completa todos los campos con números válidos.");
      return;
    }

    const tasaAnual = convertirTasaAAnual(tasaInteres, periodo) / 100; // Convertir a decimal
    const tiempoEnAnios = convertirTiempoAAnios(tiempo, periodo);
    const capital = monto / (1 + tasaAnual * tiempoEnAnios);

    document.getElementById("resultado-capital").textContent =
      capital.toFixed(2);
  });

// 3. CALCULAR TASA DE INTERÉS (i)
// Fórmula: i = (M - C) / (C * t), salida en % por período seleccionado
document
  .querySelector("#interes form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const monto = parseFloat(document.getElementById("interes-monto").value);
    const capital = parseFloat(
      document.getElementById("interes-capital").value,
    );
    const tiempo = parseFloat(document.getElementById("interes-tiempo").value);
    const periodo = document.getElementById("interes-periodo").value;

    if (isNaN(monto) || isNaN(capital) || isNaN(tiempo)) {
      alert("Por favor, completa todos los campos con números válidos.");
      return;
    }

    const tiempoEnAnios = convertirTiempoAAnios(tiempo, periodo);
    const tasaAnual = (monto - capital) / (capital * tiempoEnAnios); // Tasa anual decimal
    const factorPeriodo = convertirTasaAAnual(1, periodo); // Ej. 12 para mensual
    const tasaPorPeriodo = tasaAnual / factorPeriodo; // Convertir a tasa por período
    const tasaPorcentaje = tasaPorPeriodo * 100;

    document.getElementById("resultado-interes").textContent =
      tasaPorcentaje.toFixed(2) + " % " + periodo;
  });

// 4. CALCULAR TIEMPO (t)
// Fórmula: t = (M - C) / (C * i), salida en unidad seleccionada
document.querySelector("#tiempo form").addEventListener("submit", function (e) {
  e.preventDefault();
  const monto = parseFloat(document.getElementById("tiempo-monto").value);
  const capital = parseFloat(document.getElementById("tiempo-capital").value);
  const tasaInteres = parseFloat(
    document.getElementById("tiempo-interes").value,
  );
  const periodo = document.getElementById("tiempo-periodo").value;

  if (isNaN(monto) || isNaN(capital) || isNaN(tasaInteres)) {
    alert("Por favor, completa todos los campos con números válidos.");
    return;
  }

  const tasaAnual = convertirTasaAAnual(tasaInteres, periodo) / 100; // Convertir a decimal
  const tiempoEnAnios = (monto - capital) / (capital * tasaAnual);
  const tiempoResultado = convertirAniosAUnidad(tiempoEnAnios, periodo);

  const unidad = unidadesPlural[periodo] || periodo;

  document.getElementById("resultado-tiempo").textContent =
    tiempoResultado.toFixed(2) + " " + unidad;
});

