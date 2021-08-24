<template>
  <div id="app">
    <VueWizzard v-show="showDialog" header="Wizzard-State-Manager" :states="states" @finish="finish" @next="next" @back="back" @close="close">
      <template v-slot:state0>
        <form>
          <label>Eingabe Name</label>
          <input type="text" v-model="user.name">
        </form>
      </template>
      <template v-slot:state1>
        <form>
          <label>Eingabe E-Mail</label>
          <input type="email" v-model="user.email">
        </form>
      </template>
      <template v-slot:state2>
        <form>
          <label>Eingabe Alter</label>
          <input type="number" v-model="user.alter">
        </form>
      </template>
    </VueWizzard>
    <button class="btn btn-primary" @click="showDialog = !showDialog">Toggle</button>
  </div>
</template>

<script>
import VueWizzard from "./components/VueWizzard";

export default {
  name: 'App',
  components: {
    VueWizzard,
  }, data() {
    return {
      showDialog: false,
      user: {
        name: 'Kein Name',
        alter: 30,
        email: 'muh@test.de',
      },
      states: [
          'Username',
          'E-Mail',
          'Alter'
      ],
    };
  },
  methods: {
    close() {
      this.showDialog = false
    },
    finish() {
      console.log('onFinish triggered');
    },
    next(currentState) {
      console.log('onNext triggered. toState = ', currentState);
    },
    back(currentState) {
      console.log('onBack triggered. toState = ', currentState);
    }
  }
}
</script>

<style>
#app {
  /*width: 50vw;*/
  /*position: absolute;*/
  /*left: 25vw;*/
  /*top: 10vw;*/
}
</style>
