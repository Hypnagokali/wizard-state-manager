<template>
  <div id="app">
    <VueWizard v-show="showDialog" header="Wizzard-State-Manager" :states="states" @finish="finish" @next="next" @back="back" @close="close">
      <template v-slot:name>
        <form>
          <label>Eingabe Name</label>
          <input type="text" v-model="user.name">
        </form>
      </template>
      <template v-slot:mail>
        <form>
          <label>Eingabe E-Mail</label>
          <input type="email" v-model="user.email">
        </form>
      </template>
      <template v-slot:age>
        <form>
          <label>Eingabe Alter</label>
          <input type="number" v-model="user.alter">
        </form>
      </template>
    </VueWizard>
    <button class="btn btn-primary" @click="showDialog = !showDialog">Toggle</button>
  </div>
</template>

<script>
import VueWizard from "./components/VueWizard";

export default {
  name: 'App',
  components: {
    VueWizard,
  }, data() {
    return {
      showDialog: false,
      user: {
        name: 'Kein Name',
        alter: 30,
        email: 'muh@test.de',
      },
      states: [
          {
            name: 'name',
            description: 'Input Username',
          },
          {
            name: 'mail',
            description: 'Input E-Mail',
            disableNext: () => {
              return this.user.email === '';
            },
          },
          {
            name: 'age',
            description: 'Input Alter',
          }
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
