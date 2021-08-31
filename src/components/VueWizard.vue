<template>
  <div class="wizard-window">
    <div class="card">
      <div class="card-header">
        {{ header }}
        <span class="float-right float-end close-button" @click="resetAndClose">&times;</span>
      </div>
      <div class="card-body" v-for="(i, index) in stateObjects" :key="index" v-show="index === currentState">
        <h5 class="card-title">{{ i.description }}</h5>
        <slot :name="i.name">
          <h2>{{ i.name }}</h2>
        </slot>
      </div>
      <hr>
      <div class="card-body wizard-control">
        <button 
          href="#"
          class="btn btn-warning float-start float-left"
          @click="back"
          v-show="currentState !== initState"
          :disabled="isButtonDisabled(stateObjects[currentState], 'Back')"
          >
            {{ buttons.back }}
        </button>
        <div class="float-end float-right">
          <button href="#" class="btn btn-danger" @click="resetAndClose">{{ buttons.cancel }}</button>
          <button 
            href="#" 
            class="btn btn-primary" 
            @click="next" 
            v-show="currentState !== finalState" 
            :disabled="isButtonDisabled(stateObjects[currentState], 'Next')"
            >
              {{ buttons.next }}
          </button>
          <button
            href="#"
            class="btn btn-success"
            @click="finish"
            v-show="currentState === finalState"
            :disabled="isButtonDisabled(stateObjects[currentState], 'Finish')"
            >
              {{ buttons.finish }}
            </button>
        </div>
      </div>

      <div class="card-footer">
        <span v-for="(i, index) in stateObjects" :key="index" :class="'border stateItem' + isStateItemCurrent(index)">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VueWizard",
  props: {
    header: String,
    states: Array,
    buttons: {
      type: Object,
      default: function() {
        return {
          next: 'Weiter',
          back: 'Zurück',
          cancel: 'Abbrechen',
          finish: 'Abschließen',
        };
      },
    }
  },
  data() {
    return {
      stateObjects: [],
      initState: 0,
      finalState: 0,
      currentState: 0,
    };
  },
  methods: {
    isButtonDisabled(state, button) {
      if (typeof state === 'object') {
          const buttonAttribute = `disable${button}`;

          if (state[buttonAttribute] && typeof state[buttonAttribute] === 'function') {
            return state[buttonAttribute]();
          }
      }

      return false;
    },
    resetAndClose() {
      this.currentState = 0;
      this.$emit('close');
    },
    isStateItemCurrent(index = 0) {
      return index === this.currentState ? ' active' : '';
    },
    next() {
      if (this.isButtonDisabled(this.stateObjects[this.currentState], 'Next'))
        return;
      
      if (this.currentState < this.finalState) {
        // if (this.events.stateChange.length >= this.currentState) {
        //   this.events.stateChange[this.currentState]();
        // }
        this.currentState++;
        this.$emit('next', this.currentState);
      }
    },
    back() {
      if (this.isButtonDisabled(this.stateObjects[this.currentState], 'Back'))
        return;

      if (this.currentState > this.initState) {
        this.currentState--;
        this.$emit('back', this.currentState);
      }
    },
    finish() {
      if (this.isButtonDisabled(this.stateObjects[this.currentState], 'Finish'))
        return;

        if (this.currentState > this.initState) {
          this.currentState--;
          this.$emit('back', this.currentState);
        }
    },
  },
  created() {
    this.finalState = this.states.length - 1;
    this.stateObjects = this.states.map(state => {
      if (typeof state !== 'object') {
        state = {
          name: state,
          description: `Description for ${state}`,
        };

        return state;
      }
      if (state.name && state.description) {
        return state;
      }
      throw new Error('State object without name and description found');
    });
    console.log(this.stateObjects);
  }
}
</script>

<style scoped>
.wizard-window {
  width: 50vw;
  position: absolute;
  left: 25vw;
  top: 10vh;
}

.wizard-control a {
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
