<template>
  <div></div>
</template>

<style></style>

<script>
import router from "../router/index";
let auth = require("../models/auth");

(function() {
  auth.token = "";
  auth.id = "";
  console.log("Token = " + auth.token);
  router.push({ name: "Login" });
})();
</script>
