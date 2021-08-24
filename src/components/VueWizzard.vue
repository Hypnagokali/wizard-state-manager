<template>
  <div class="wizzard-window">
    <div class="card">
      <div class="card-header">
        {{ header }}
        <span class="float-right close-button" @click="$emit('close')">&times;</span>
      </div>
      <div class="card-body" v-for="(i, index) in states" :key="index" v-show="index === currentState">
        <h5 class="card-title">{{ i }}</h5>
        <slot :name="`state${index}`">
          <h2>{{ `state${index}` }}</h2>
        </slot>
      </div>
      <hr>
      <div class="card-body wizzard-control">
        <a href="#" class="btn btn-warning float-left" @click="back" v-show="currentState !== initState">Zurück</a>
        <div class="float-right">
          <a href="#" class="btn btn-danger" @click="$emit('close')">Abbrechen</a>
          <a href="#" class="btn btn-primary" @click="next" v-show="currentState !== finalState">Weiter</a>
          <a href="#" class="btn btn-success" @click="$emit('finish')" v-show="currentState === finalState">Finish</a>
        </div>
      </div>

      <div class="card-footer">
        <span v-for="(i, index) in states" :key="index" :class="'border stateItem' + isStateItemCurrent(index)">
        </span>
      </div>

      <!--    <div class="card-body">-->
      <!--      <h5 class="card-title">Blabla</h5>-->
      <!--      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>-->
      <!--      <a href="#" class="btn btn-primary">Weiter</a>-->
      <!--    </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "VueWizzard",
  props: {
    header: String,
    states: Array,
  },
  data() {
    return {
      initState: 0,
      finalState: 0,
      currentState: 0,
    };
  },
  methods: {
    isStateItemCurrent(index = 0) {
      return index === this.currentState ? ' active' : '';
    },
    next() {
      if (this.currentState < this.finalState) {
        // if (this.events.stateChange.length >= this.currentState) {
        //   this.events.stateChange[this.currentState]();
        // }
        this.currentState++;
        this.$emit('next', this.currentState);
      }
    },
    back() {
      if (this.currentState > this.initState) {
        this.currentState--;
        this.$emit('back', this.currentState);
      }
    },
  },
  created() {
    this.finalState = this.states.length - 1;
  }
}
</script>

<style scoped>
.wizzard-window {
  width: 50vw;
  position: fixed;
  left: 25vw;
  top: 10vw;
}

.wizzard-control a {
  margin: 5px;
}

.close-button {
  cursor: pointer;
}

.stateItem {
  margin:1%;
  width:25px;
  height:25px;
  background-color: #4891ff;
  display:inline-block;
}

.stateItem.active {
  background-color: blue;
}
</style>
