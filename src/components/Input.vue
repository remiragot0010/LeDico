<template>
     <input maxlength="1" :id="indice" type="text" :class="[
              {
                'char':
                  nbClickInput === 0,
              },
              {
                'char2':
                  nbClickInput === 1,
              },
              {
                'char3':
                  nbClickInput === 2,
              },
            ]" v-model="lettreCase"  @click="clickInput" @keydown="pressDel($event)"/>
</template>

<script>
import {onMounted, ref,onUpdated} from 'vue';

export default {
    name: 'LetterContainer',
    props: {
        letter: String,
        indice: Number,
        nbClick: Number
    },
     emits: ["mouseDown", "clickInput", "keydown", "action"],
    

    setup(props, { emit }) {
        const lettreCase = ref("");
        const nbClickInput = ref(0);
        const lIndice = ref();

        onMounted(() => {
            lettreCase.value = props.letter;
            nbClickInput.value = props.nbClick;
        })

        onUpdated(() => {
          nbClickInput.value = props.nbClick;
          lettreCase.value = props.letter;
        })

        function clickInput() {
            if(nbClickInput.value < 2){
                nbClickInput.value++;
            }else{
                nbClickInput.value = 0;
            }
            emit('clickInput', props.indice, nbClickInput.value);
        }

        function pressDel(e) {
          if(e.keyCode === 13 || e.keyCode === 46) {
            emit('action', e.keyCode)
          }else if(e.keyCode === 8) {
            emit('keydown', props.indice, true)
          }else if(e.keyCode === 16){
            clickInput();
          }else if(e.keyCode === 17) {
            clickInput();
            clickInput();
          }else {
            emit('keydown', props.indice, false)
          }
        }

        return { lettreCase,nbClickInput,lIndice, pressDel, clickInput }
    },

    watch: {
        lettreCase : function () {
            this.$emit('mouseDown', this.indice, this.lettreCase)
        }
    }
}
</script>

<style  scoped>

.char {
  font-family: sans-serif;
  font-size:24px;
  text-transform: uppercase;
  outline: 0;
  border: 0;
  padding: 0;
  margin: 4px 0 0 1px;
  width: 2.2em;
  height: 2.2em;
  text-align: center;
  color: black;
  background-color: rgba(225, 225, 225); 
  user-select: none;
}

.char2 {
  font-family: sans-serif;
  font-size:24px;
  text-transform: uppercase;
  outline: 0;
  border: 0;
  padding: 0;
  margin: 4px 0 0 1px;
  width: 2.2em;
  height: 2.2em;
  text-align: center;
  color: black;
  background-color: rgb(207, 142, 56); 
  user-select: none;
}

.char3 {
  font-family: sans-serif;
  font-size:24px;
  text-transform: uppercase;
  outline: 0;
  border: 0;
  padding: 0;
  margin: 4px 0 0 1px;
  width: 2.2em;
  height: 2.2em;
  text-align: center;
  color: black;
  background-color: rgb(221, 58, 58); 
  
}
</style>