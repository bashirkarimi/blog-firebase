<template>
  <div id="app">
  
    <app-header />
    <router-view></router-view>

  </div>  
</template>

<script>
import showBlogs from "./components/showBlogs.vue";
import listBlogs from "./components/addBlog.vue";
import header from "./components/header.vue";

export default {
  name: "App",
  components: {
    "app-header": header
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style src="./assets/style.css">


