<template>
  <div class="movies-show">
    <h1>Title: {{ movie.title }}</h1>
    <h3>Release date:{{ movie.year }}</h3>
    <h3>Plot: {{ movie.plot }}</h3>
    <h3>Director: {{ movie.director }}</h3>
    <router-link v-bind:to="`/`">Home</router-link>
    |
    <router-link v-bind:to="`/movies/${movie.id}/edit`">Edit movie</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      movie: {},
    };
  },
  created: function () {
    axios.get("/movies/" + this.$route.params.id).then((response) => {
      this.movie = response.data;
    });
  },
  methods: {},
};
</script>
