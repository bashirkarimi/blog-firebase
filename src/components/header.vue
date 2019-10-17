<template>
<div>
<nav class="app-nav">
    <ul>
      <li class="app-nav__item"><router-link to="add" exact>Add blog</router-link></li>
      <li class="app-nav__item"><router-link to="/" exact>show blog</router-link></li>
    </ul>
  </nav>

</div>

  
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.app-nav {
  text-align: center;

  ul {
    list-style: none;
  }

  &__item {
    display: inline-block;
    padding: 12px;
    color: #e3e3e3;
  }

  &__item {
    .router-link-active {
      color: green;
    }
  }
}
</style>
