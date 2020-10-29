<template>
  <div class="main">
    <h2>Dashboard</h2>
    <div class="add-funds">
      <h4>Deposit money</h4>
      <b-form v-on:submit.prevent="depositMoney">
        <b-form-group
          id="input-group-1"
          label="Balance"
          label-for="input-1"
          description="Available funds."
        >
          <b-form-input
            id="input-1"
            value="0"
            type="number"
            readonly
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Money"
          label-for="input-2"
          description="Please enter amount to deposit."
        >
          <b-form-input
            id="input-2"
            v-model="form.amount"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
        <div v-if="flagSuccess">
          <p>You succesfully deposited: {{ form.amount }} USD</p>
        </div>
        <div v-if="flagError">
          <p>Unfortunately it was not possible to deposit the money.</p>
        </div>
        <b-button class="btn-block" type="submit" variant="primary"
          >Deposit</b-button
        >
      </b-form>
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
</style>

<script>
import axios from "axios";
let auth = require("../models/auth");

export default {
  data() {
    return {
      form: {
        amount: "",
      },
      id: auth.id,
      user: "",
      show: true,
      token: auth.token,
      flagSuccess: "",
      flagError: "",
      messageCreate: "",
    };
  },
  methods: {
    depositMoney(event) {
      axios({
        method: "PUT",
        url: process.env.VUE_APP_SERVER + "/deposit",
        // headers: { "x-access-token": this.token },
        data: {
          id: this.id,
          amount: this.form.amount,
        },
      })
        .then(
          (result) => {
            this.flagSuccess = 1;
            this.messageCreate = result.data.data.message;
          },
          (error) => {
            this.flagError = 1;
            this.console.error(error);
          }
        )
        .then(() => {
          this.form.amount = "";
          event.target.reset();
        });
    },
  },
};
</script>
