<template>
  <div class="home">
    <div v-for="movie in movies" :key="movie.id">
      <h1>Title: {{ movie.title }}</h1>
      <h4>Plot: {{ movie.plot }}</h4>
      <form v-on:submit.prevent="updateMovie()">
        <h1>New Movie</h1>
        <div>
          <label>Title:</label>
          <input type="text" v-model="movie.title" />
        </div>
        <div>
          <label>Year:</label>
          <input type="text" v-model="movie.year" />
        </div>
        <div>
          <label>Plot:</label>
          <input type="text" v-model="movie.plot" />
        </div>
        <div>
          <label>Director:</label>
          <input type="text" v-model="movie.director" />
        </div>
        <div>
          <label>English (true or false):</label>
          <input type="text" v-model="movie.english" />
        </div>
        <input type="submit" value="Update" />
      </form>
      <button v-on:click="deleteMovie()">Delete Movie</button>
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
          console.log("Success!", this.movies);
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
    updateMovie: function () {
      axios
        .patch(`/movies${this.$route.params.id}`, this.newMovieParams)
        .then(() => {
          this.$router.push("/success");
        })
        .catch((error) => console.log(error.response));
    },
    deleteMovie: function () {
      axios.delete(`/movies/${this.$route.params.id}`).then((response) => {
        console.log("DELETED", response.data);
        this.$router.push("/success");
      });
    },
  },
};
</script>
