const nomes = ["Zika", "Gui", "Nicolas", "Luick", "Mathias"];
const ciclo = [
  ["Zika", "Gui", "Nicolas", "Luick"],
  ["Mathias", "Zika", "Gui", "Nicolas"],
  ["Luick", "Mathias", "Zika", "Gui"],
  ["Nicolas", "Luick", "Mathias", "Zika"],
  ["Gui", "Nicolas", "Luick", "Mathias"]
];
const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
const weekInMs = 604800000;

let weekOffset = 0;

const tabela = document.getElementById("tabela");
const weekLabel = document.getElementById("weekLabel");
const prevWeekBtn = document.getElementById("prevWeekBtn");
const nextWeekBtn = document.getElementById("nextWeekBtn");
const saveImageBtn = document.getElementById("saveImageBtn");

function getWeekStart(dateValue) {
  const date = new Date(dateValue);
  const day = date.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function render() {
  const now = new Date();
  const start = getWeekStart(now);
  start.setDate(start.getDate() + weekOffset * 7);

  tabela.innerHTML = "";

  const header = document.createElement("tr");
  header.innerHTML = `<th>Dia</th>${nomes.map((nome) => `<th>${nome}</th>`).join("")}`;
  tabela.appendChild(header);

  const base = getWeekStart(new Date());
  const cicloIndex = ((Math.floor((start - base) / weekInMs) % ciclo.length) + ciclo.length) % ciclo.length;

  weekLabel.textContent = `Semana de ${start.toLocaleDateString("pt-BR")}`;

  dias.forEach((dia, i) => {
    const tr = document.createElement("tr");
    const data = new Date(start);
    data.setDate(start.getDate() + i);

    let cells = `<td>${dia}<br><small>${data.toLocaleDateString("pt-BR")}</small></td>`;

    nomes.forEach((nome) => {
      let status = "Trabalho";
      if (i <= 3 && ciclo[cicloIndex][i] === nome) {
        status = "Folga";
      }
      cells += `<td class="${status === "Folga" ? "folga" : ""}">${status}</td>`;
    });

    tr.innerHTML = cells;
    tabela.appendChild(tr);
  });
}

function changeWeek(value) {
  weekOffset += value;
  render();
}

async function saveImage() {
  const capture = document.getElementById("capture");

  if (typeof html2canvas !== "function") {
    window.alert("Falha ao carregar a biblioteca de captura de imagem.");
    return;
  }

  const canvas = await html2canvas(capture, {
    backgroundColor: null,
    scale: 2
  });

  const link = document.createElement("a");
  link.download = "escala-semana.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

prevWeekBtn.addEventListener("click", () => changeWeek(-1));
nextWeekBtn.addEventListener("click", () => changeWeek(1));
saveImageBtn.addEventListener("click", saveImage);

render();
