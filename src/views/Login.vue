<template>
  <div>
    <h4>Log in</h4>
    <b-form v-on:submit.prevent="getFormValues">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="Please enter your registered email address."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Password:"
        label-for="input-2"
        description="Please enter your password."
      >
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
      <div v-if="flag">
        <p class="error">Wrong username or password entered</p>
      </div>
      <b-button id="login" class="btn-block" type="submit" variant="primary"
        >Login</b-button
      >
    </b-form>
  </div>
</template>

<style>
.form-text {
  color: white !important;
}
.error {
  margin-top: 1rem;
}
</style>

<script>
let auth = require("../models/auth");

import axios from "axios";
export default {
  mounted() {
    this.clearAuth();
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      show: true,
      flag: "",
    };
  },
  methods: {
    getFormValues() {
      axios({
        method: "POST",
        url: process.env.VUE_APP_SERVER + "/login",
        data: {
          email: this.form.email,
          password: this.form.password,
        },
      })
        .then(
          (result) => {
            auth.token = result.data.token;
            auth.id = result.data.id;
          },
          (error) => {
            console.error(error);
            this.flag = 1;
          }
        )
        .then(() => {
          if (auth.token) {
            this.$router.push({ name: "Dashboard" });
          }
        });
    },
    clearAuth() {
      auth.token = "";
      auth.id = "";
    },
  },
};
</script>
