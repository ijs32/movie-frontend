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
      <button v-on:click="showMovie(movie)">More Info</button>
    </div>
    <form v-on:submit.prevent="createMovie()">
      <h1>New Movie</h1>
      <div>
        <label>Title:</label>
        <input type="text" v-model="newMovieParams.title" />
      </div>
      <div>
        <label>Year:</label>
        <input type="text" v-model="newMovieParams.year" />
      </div>
      <div>
        <label>Plot:</label>
        <input type="text" v-model="newMovieParams.plot" />
      </div>
      <div>
        <label>Director:</label>
        <input type="text" v-model="newMovieParams.director" />
      </div>
      <div>
        <label>English (true or false):</label>
        <input type="text" v-model="newMovieParams.english" />
      </div>
      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      movies: [],
      newMovieParams: {},
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
    createMovie: function () {
      axios
        .post("/movies", this.newMovieParams)
        .then(() => {
          this.$router.push("/success");
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
    showMovie: function (movie) {
      this.currentMovie = movie;
      console.log(movie);
      document.querySelector("#movie-details").showModal();
    },
  },
};
</script>
