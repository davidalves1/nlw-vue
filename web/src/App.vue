<template>
  <div id="app">
    <main>
      <router-view/>
    </main>
  </div>
</template>

<style>
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.container {
  width: 90vw;
  max-width: 700px;
}

@media (min-width: 700px) {
  :root {
    font-size: 62.5%;
  }
}
</style>
