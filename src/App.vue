<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/createmovie">Create Movie</router-link>
      |
      <router-link to="/login">Login</router-link>
      |
      <router-link to="/signup">Signup</router-link>
      <button v-on:click="logout()">Logout</button>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: { password: "", password_confirmation: "" },
      errors: [],
      newSessionParams: {},
    };
  },
  methods: {
    logout: function () {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("jwt");
      console.log("user successfully logged out");
    },
  },
};
</script>
