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
            ]" v-model="lettreCase"  @click="clickInput"/>
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
     emits: ["mouseDown", "clickInput"],
    

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

        return { lettreCase,nbClickInput,lIndice, clickInput }
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

.char:focus{
  -webkit-box-shadow: 0 0 0 2px rgb(0,133,180);
  -moz-box-shadow: 0 0 0 2px rgb(0,133,180);
  box-shadow: inset 0 0 0 2px rgb(0,133,180);  
}

.char2:focus{
  -webkit-box-shadow: 0 0 0 2px rgb(0,133,180);
  -moz-box-shadow: 0 0 0 2px rgb(0,133,180);
  box-shadow: inset 0 0 0 2px rgb(0,133,180);  
}

.char3:focus{
  -webkit-box-shadow: 0 0 0 2px rgb(0,133,180);
  -moz-box-shadow: 0 0 0 2px rgb(0,133,180);
  box-shadow: inset 0 0 0 2px rgb(0,133,180);  
}

</style>