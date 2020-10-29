<template>
  <div>
    <nav>
      <router-link to="/dashboard" exact-active-class="exact-active"
        >Account</router-link
      >
      |
      <router-link to="/portfolio" active-class="active">Portfolio</router-link>
      |
      <router-link to="/stocks" active-class="active">Stocks</router-link>
      | <router-link to="/deposit" active-class="active">Deposit</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavDashboard",
};
</script>

<style scoped>
.active {
  background-color: black !important;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
}

.exact-active {
  background-color: black !important;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
}
</style>
