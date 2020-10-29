<template>
  <div class="main">
    <h4 id="h4-account">Account</h4>
    <div v-if="!user">
      <img
        src="../assets/preloader.svg"
        alt="preloader"
        id="loading-gif"
        width="50px"
      />
    </div>
    <div v-else>
      <p>Email: {{ user.email }}</p>
      <p>
        Firstname:
        {{ user.firstname.charAt(0).toUpperCase() + user.firstname.substr(1) }}
      </p>
      <p>
        Lastname:
        {{ user.lastname.charAt(0).toUpperCase() + user.lastname.substr(1) }}
      </p>
      <p>
        Account created:
        {{ formattedDate }}
      </p>
      <p v-if="!user.balance">Balance: 0 USD</p>
      <p v-else>Balance: {{ user.balance.toFixed(2) }} USD</p>
    </div>

    <div class="divider"></div>
    <router-link to="/" id="logout" class="logout-link">Logout</router-link>
  </div>
</template>

<style scoped>
p {
  margin-bottom: 0;
}

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
</style>

<script>
import axios from "axios";
const moment = require("moment");
let auth = require("../models/auth");

export default {
  data() {
    return {
      form: {
        amount: "",
      },
      user: "",
      date: "",
      formattedDate: "",
      token: auth.token,
      id: auth.id,
      flagRetrieved: "",
      flagRetrievedError: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios({
        method: "POST",
        url: process.env.VUE_APP_SERVER + "/findone",
        data: {
          id: this.id,
        },
      })
        .then(
          (result) => {
            this.user = result.data;
            this.date = result.data.createdAt;
          },
          (error) => {
            console.error(error);
          }
        )
        .then(() => {
          const formattedDate = moment(this.date, "YYYY-MM-DD").format(
            "YYYY-MM-DD"
          );
          this.formattedDate = formattedDate;
        });
    },
  },
};
</script>
