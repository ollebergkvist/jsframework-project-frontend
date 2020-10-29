<template>
  <div class="main">
    <h4>Portfolio ({{ user }})</h4>
    <div v-if="!portfolio">
      <img
        src="../assets/preloader.svg"
        alt="preloader"
        id="loading-gif"
        width="50px"
      />
    </div>
    <div v-else>
      <table class="table table-dark table-sm ">
        <caption>
          List of stocks in portfolio
        </caption>
        <thead>
          <tr>
            <th scope="col">Stock</th>
            <th scope="col">Amount</th>
            <th scope="col">Purchase value</th>
            <th scope="col">Market value</th>
            <th scope="col">Unit Price</th>
          </tr>
        </thead>
        <tbody v-for="item in portfolio" :key="item.name">
          <tr v-if="item.name == 'Apple Inc'">
            <td>{{ item.name }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ item.price.toFixed(2) }} USD</td>
            <td
              :class="
                item.amount * appleMarketValue < item.price ? 'red' : 'green'
              "
            >
              {{ (item.amount * appleMarketValue).toFixed(2) }} USD
            </td>
            <td>{{ appleMarketValue.toFixed(2) }} USD</td>
          </tr>
          <tr v-else>
            <td>{{ item.name }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ item.price.toFixed(2) }} USD</td>
            <td
              :class="
                item.amount * walmartMarketValue < item.price ? 'red' : 'green'
              "
            >
              {{ (item.amount * walmartMarketValue).toFixed(2) }} USD
            </td>
            <td>{{ walmartMarketValue.toFixed(2) }} USD</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="divider"></div>
    <router-link to="/" class="logout-link">Logout</router-link>
  </div>
</template>

<style scoped>
.divider {
  height: 2px;
  width: 100%;
  background-color: white;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

h1 {
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.stock-divider:last-child {
  display: none;
}

.table-dark {
  background-color: #2a2a2a !important;
}

.green {
  background-color: #5cb85c;
}

.red {
  background-color: #d9534f;
}
</style>

<script>
import axios from "axios";
import io from "socket.io-client";
let auth = require("../models/auth");

export default {
  data() {
    return {
      socket: io(process.env.VUE_APP_LOCAL_SERVER),
      portfolio: "",
      token: auth.token,
      id: auth.id,
      user: "",
      appleMarketValue: "",
      walmartMarketValue: "",
    };
  },
  mounted() {
    this.getData();
    this.socket.on("stocks", (data) => {
      data.forEach((stock) => {
        if (stock.label == "Apple Inc") {
          this.appleMarketValue = stock.data[stock.data.length - 1];
        } else {
          this.walmartMarketValue = stock.data[stock.data.length - 1];
        }
      });
    });
  },
  methods: {
    twoD(num) {
      return Math.round(num * 100) / 100;
    },
    getData() {
      axios({
        method: "POST",
        url: process.env.VUE_APP_SERVER + "/findone",
        data: {
          id: this.id,
        },
      }).then(
        (result) => {
          this.portfolio = result.data.portfolio;
          this.user =
            result.data.firstname.charAt(0).toUpperCase() +
            result.data.firstname.substr(1) +
            " " +
            result.data.lastname.charAt(0).toUpperCase() +
            result.data.lastname.substr(1);
        },
        (error) => {
          console.error(error);
        }
      );
    },
  },
};
</script>
