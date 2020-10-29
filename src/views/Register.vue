<template>
  <div>
    <h4>Register account</h4>
    <b-form v-on:submit.prevent="getFormValues">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="Please enter your email address."
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
        minlength="8"
        description="Please enter your desired password. 8 char minimum."
      >
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Firstname:"
        label-for="input-3"
        description="Please enter your first name."
      >
        <b-form-input
          id="input-3"
          v-model="form.firstname"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Lastname:"
        label-for="input-4"
        description="Please enter your last name."
      >
        <b-form-input
          id="input-4"
          v-model="form.lastname"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <div v-if="flagError">
        <p class="error">Please enter a valid email address.</p>
      </div>
      <b-button class="btn-block" type="submit" variant="primary"
        >Register</b-button
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
import axios from "axios";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
      },
      show: true,
      flagError: "",
    };
  },
  methods: {
    getFormValues() {
      console.log(this.url);
      axios({
        method: "POST",
        url: process.env.VUE_APP_SERVER + "/signup",
        data: {
          email: this.form.email,
          password: this.form.password,
          firstname: this.form.firstname,
          lastname: this.form.lastname,
        },
      }).then(
        () => {
          this.flagSuccess = 2;
          this.$router.push({ name: "Login" });
        },
        (error) => {
          this.flagError = 1;
          console.log(error);
        }
      );
    },
  },
};
</script>
