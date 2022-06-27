<template>
  <div>
    <h1>app</h1>
    <router-link style="margin-right: 10px" to="/">home</router-link>
    <router-link to="/login">login</router-link>
    <div class="main-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
h1 {
  color: red;
}
.main-box {
  width: 300px;
  height: 300px;
  background: url('./assets/imgs/demo.jpeg');
  background-size: 100%;
}
</style>
