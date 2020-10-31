<template>
  <div id="app">
    <a href="https://ollebergkvist.com">
      <img
        id="logotype"
        alt="Olle Bergkvist logotype"
        width="100px"
        src="@/assets/logotype_white.svg"
      />
    </a>
    <Nav v-if="!$route.meta.hideNavigation"></Nav>
    <NavDashboard v-if="$route.meta.hideNavigation"></NavDashboard>
    <div class="divider"></div>
    <router-view />
  </div>
</template>

<script>
import Nav from "./components/Nav";
import NavDashboard from "./components/Nav-dashboard";

export default {
  name: "app",
  components: {
    Nav,
    NavDashboard,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@400;500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

html {
  font-size: 16px !important;
}

body {
  line-height: 1.4 !important;
  display: flex;
  justify-content: center;
  background-color: #2a2a2a !important;
  padding-left: 20px;
  padding-right: 20px;
}

img {
  margin-top: 2rem;
  margin-bottom: 3rem;
}

#app {
  background-color: #2a2a2a;
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1200px;
  color: white;
  margin-top: 20px;
}

p {
  margin-top: 0;
  font-family: "Open Sans", sans-serif;
  font-size: 1rem !important;
  line-height: 1.4;
  margin-bottom: 1.4rem !important;
  overflow: hidden;
  max-width: 55ch;
}

a {
  color: white !important;
  font-family: "Oswald", sans-serif;
}

.divider {
  height: 2px;
  width: 100%;
  background-color: white;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

h1,
h2,
h4 {
  margin-top: 0 !important;
}

h1 {
  font-size: 2.4rem;
  margin-bottom: 2.8rem !important;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1.4rem !important;
}

h3 {
  font-size: 1.6rem;
  margin-bottom: 1.4rem !important;
}

h4 {
  font-size: 1.2rem;
  margin-bottom: 1.4rem !important;
}

h3 {
  text-transform: uppercase !important;
}
</style>
