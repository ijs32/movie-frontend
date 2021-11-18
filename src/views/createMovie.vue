<template>
  <div class="create-movie">
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
      newMovieParams: {},
    };
  },
  methods: {
    createMovie: function () {
      axios
        .post("/movies", this.newMovieParams)
        .then(() => {
          this.$router.push("/");
          console.log("Successfully created movie!");
        })
        .catch((error) => console.log(error.response));
    },
  },
};
</script>
