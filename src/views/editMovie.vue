<template>
  <div class="edit-Movie">
    <form v-on:submit.prevent="updateMovie()">
      <h1>Edit Movie!</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <h2>Movie Info:</h2>
      <p>
        Title:
        <input type="text" v-model="currentMovie.title" />
      </p>
      <p>
        Plot:
        <input type="text" v-model="currentMovie.plot" />
      </p>
      <p>
        Year:
        <input type="integer" v-model="currentMovie.year" />
      </p>
      <input type="submit" value="Edit" />
    </form>
    <button v-on:click="deleteMovie(currentMovie)">Delete Movie</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      currentMovie: {},
      errors: [],
    };
  },
  created: function () {
    axios.get("/movies/" + this.$route.params.id).then((response) => {
      this.currentMovie = response.data;
    });
  },
  methods: {
    updateMovie: function () {
      axios
        .patch("/movies/" + this.$route.params.id, this.currentMovie)
        .then((response) => {
          console.log("Successfully updated movie!", response.data);
          this.$router.push("/");
        })
        .catch((error) => console.log(error.response));
    },
    deleteMovie: function () {
      axios.delete("/movies/" + this.$route.params.id, this.currentMovie).then((response) => {
        console.log("DELETED", response.data);
        this.$router.push("/");
      });
    },
  },
};
</script>
