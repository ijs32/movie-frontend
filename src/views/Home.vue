<template>
  <div class="home">
    <div v-for="movie in movies" :key="movie.id">
      <h1>Title: {{ movie.title }}</h1>
      <h4>Plot: {{ movie.plot }}</h4>
      <dialog id="movie-details">
        <form method="dialog">
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
          <button v-on:click="updateMovie(currentMovie)">Update Movie</button>
          <button v-on:click="deleteMovie(currentMovie)">Delete Movie</button>
          <button>Close</button>
        </form>
      </dialog>
      <router-link v-bind:to="`/movies/${movie.id}`">More Info</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      movies: [],
      currentMovie: {},
    };
  },
  created: function () {
    this.indexMovies();
  },
  methods: {
    indexMovies: function () {
      axios
        .get("/movies")
        .then((response) => {
          this.movies = response.data;
          console.log("Successfully indexed movies!", this.movies);
        })
        .catch((error) => console.log(error.response));
    },
    updateMovie: function (movie) {
      axios
        .patch("/movies/" + movie.id, movie)
        .then((response) => {
          console.log("Successfully updated movie!", response.data);
          this.$router.push("/success");
        })
        .catch((error) => console.log(error.response));
    },
    deleteMovie: function (movie) {
      axios.delete("/movies/" + movie.id).then((response) => {
        console.log("DELETED", response.data);
        this.$router.push("/success");
      });
    },
  },
};
</script>
