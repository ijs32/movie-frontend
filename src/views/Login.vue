<template>
  <div class="Login">
    <div class="card">
      <form v-on:submit.prevent="submit()">
        <h1>Login</h1>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <div>
          <label>Email:</label>
          <input type="email" v-model="newSessionParams.email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" v-model="newSessionParams.password" />
        </div>
        <input type="submit" value="login" />
      </form>
    </div>
  </div>
</template>

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
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          console.log("User logged in successfully");
          localStorage.setItem("jwt", response.data.jwt);
          this.$parent.flashMessage = "You Successfully logged in!";
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
