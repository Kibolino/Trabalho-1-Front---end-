/* Kleber Augusto Barbosa RA: 2022001447 */
/* configuração do gráfico via chart */
const labels = []; //array de categorias
const data = {
  labels: labels,
  datasets: [
    {
      label: "",
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ],// array de cores
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      data: [], //array de valores
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};
const config_2 = {
  type: "bar",
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};
const config_3 = {
  type: "pie",
  data: data,
  options: {},
};
let myChart = new Chart(document.getElementById("chart"), config);

/* -------------------------------------------------------------------------- */

function mudatipo(tipo) { /* Função para mudar o tipo de gráfico */
  myChart.destroy();
  if (tipo == "line") {
    myChart = new Chart(document.getElementById("chart"), config);
  }

  if (tipo == "bar") {
    myChart = new Chart(document.getElementById("chart"), config_2);
  }
  if (tipo == "pie") {
    myChart = new Chart(document.getElementById("chart"), config_3);
  }

}
/* -------------------------------------------------------------------------- */

const push = document.getElementById("push");
push.addEventListener("click", pushValueChart);

function pushValueChart() { /* Função para puxar valor dos campos de formulários */
  const pushValue = document.getElementById("pushvalue");
  const pushlabel = document.getElementById("pushlabel");
 
  myChart.data.datasets[0].data.push(pushValue.value);
  myChart.data.labels.push(pushlabel.value);
  myChart.update();
  listatabela();
  limpar();
}


/* -------------------------------------------------------------------------- */
function listatabela() {  // Função para criar tabela de dados
  let tbody = document.getElementById("tbody");
  tbody.innerText = "";

  for (let i = 0; i < myChart.data.datasets[0].data.length; i++) { // laço para criar tabela de dados 
    let tr = tbody.insertRow();

    let td_categoria = tr.insertCell(); // Criação de variável local para receber dados do array 
    let td_valor = tr.insertCell();
    let td_ações = tr.insertCell();
    if(myChart.data.datasets[0].data[i] == '' ){
        td_valor.innerHTML=0;
        td_categoria.innerHTML=0;
        console.log(myChart.data.datasets[0].data);
    }
    else
    td_valor.innerHTML = myChart.data.datasets[0].data[i];
    td_categoria.innerHTML = myChart.data.labels[i];

    let imgDelet = document.createElement("img");
    imgDelet.src = "img/close-outline.svg";
    imgDelet.setAttribute(
      "onclick",
      "deletar(" + myChart.data.datasets[0].data[i] + ")"
    );

    td_ações.appendChild(imgDelet);
  }
}

/* -------------------------------------------------------------------------- */
function limpar() { // função para apagar os campos de envio
  document.getElementById("pushvalue").value = "";
  document.getElementById("pushlabel").value = "";
}
/* -------------------------------------------------------------------------- */
function deletar(data) {// função para deletar elemetnos do array
  let tbody = document.getElementById("tbody");

  for (let i = 0; i < myChart.data.datasets[0].data.length; i++) {
    if (myChart.data.datasets[0].data[i] == data) {
      myChart.data.datasets[0].data.splice(i, 1);
      myChart.data.labels.splice(i, 1);
      tbody.deleteRow(i);
      myChart.update();
    }
  }
}

/* -------------------------------------------------------------------------- */
function reload(e){ //evita que a página faça reload
    event.preventDefault()
}
