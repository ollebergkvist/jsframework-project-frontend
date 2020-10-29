<template>
  <div class="main">
    <h2>Stocks</h2>
    <!-- <div v-if="!chartData">
      <img
        src="../assets/preloader.svg"
        alt="preloader"
        id="loading-gif"
        width="50px"
      />
    </div> -->
    <Chart v-if="loaded" :chart-data="chartData" :options="chartOptions" />
    <div class="wrapper">
      <div
        class="stock"
        v-for="(stock, index) in chartData.datasets"
        :key="index"
      >
        <h4>{{ stock.label }}</h4>
        <p>
          Price:
          {{ Math.round(stock.data[stock.data.length - 1] * 100) / 100 }} USD
        </p>
        <button
          type="button"
          class="btn btn-primary btn-block"
          @click="purchase(stock)"
        >
          Purchase
        </button>
        <button
          type="button"
          class="btn btn-primary btn-block"
          @click="sell(stock)"
        >
          Sell
        </button>
      </div>
    </div>
    <h6 v-if="message">{{ message }}</h6>
    <div class="divider"></div>
    <router-link to="/" class="logout-link">Logout</router-link>
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";
import Chart from "../components/Chart";

let auth = require("../models/auth");
var socket = io(process.env.VUE_APP_SERVER);

export default {
  name: "Stocks",
  components: {
    Chart,
  },
  data() {
    return {
      token: auth.token,
      id: auth.id,
      loaded: "",
      flagSuccess: "",
      flagError: "",
      message: "",
      chartData: {},
      chartOptions: {
        maintainAspectRatio: false,
        animation: false,
        legend: {
          position: "top",
          align: "end",
        },
        responsive: false,
        lineTension: 1,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
                padding: 0,
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    socket.on("stocks", (stock) => {
      this.chartData = {
        datasets: stock,
        labels: stock[0].labels,
      };

      this.loaded = true;
    });
  },
  methods: {
    purchase(stock) {
      axios({
        method: "POST",
        url: process.env.VUE_APP_SERVER + "/purchase",
        data: {
          id: this.id,
          name: stock.label,
          amount: 1,
          price: Math.round(stock.data[stock.data.length - 1] * 100) / 100,
        },
      }).then(
        (result) => {
          this.message = result.data.msg;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    sell(stock) {
      axios({
        method: "POST",
        url: process.env.VUE_APP_SERVER + "/sell",
        data: {
          id: this.id,
          name: stock.label,
          amount: 1,
          price: Math.round(stock.data[stock.data.length - 1] * 100) / 100,
        },
      }).then(
        (result) => {
          this.message = result.data.msg;
        },
        (error) => {
          console.error(error);
        }
      );
    },
  },
};
</script>

<style scoped>
.divider {
  height: 2px;
  width: 100%;
  background-color: white;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

h4 {
  margin-top: 2rem !important;
}

.wrapper {
  display: flex;
  flex-direction: column;
}

.logout-link {
  padding-bottom: 3rem;
}
</style>
