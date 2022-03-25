<template>
    <select name="select" id="select" @change="changeValue" v-model="selectedValue">
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
    </select>
    <div  class="mt-6 flex flex-row items-center justify-center" >
        <Input v-for="i in nbInput" :key="i" :nbClick="tabColor[i]" :letter="tabLettre[i]" :indice="i" @mouseDown="changeInput" @clickInput="clickInput"/>
    </div>

    <div class="flex mt-6 justify-center space-x-4">
        <a @click="clear" class=" w-32  items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Clear</a>
        <a @click="search" class="w-32   items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Rechercher</a>
    </div>
    <ul class="grid grid-cols-4 gap-4 mt-6">
        <li v-for="(mot) in tableauFinal" :key="mot">{{ mot.mot}}</li>
    </ul>


</template>

<script>
import Input from '../components/Input.vue'
import ListeMot from "@/models/ListeMot";
import ListeProba from "@/models/ListeProba";
import { onMounted, ref, onUpdated} from 'vue';
export default {
  components: { Input },
  name: 'LaPage',
  
  setup() {

      const nbInput = ref(5);
      const selectedValue = ref(5);
      const tabColor = ref([]);
      const tabLettre = ref([])
      const tabResultats = ref([])
      const tabResultats2 = ref([])
      const listeProba = ref([])
      const tableauFinal = ref([])
      const valueInput = ref("")

      function changeValue() {
          nbInput.value = parseInt(selectedValue.value);
          clear();
      }

      function changeInput(indice, lettre) {
          if( lettre != undefined && lettre != "") {
            if(indice < nbInput.value) {
                const test = indice +1;
                document.getElementById(test.toString()).focus();
            }
            tabLettre.value[indice] = lettre;
          }   
      }

      function clickInput(indice, nbClick) {
          tabColor.value[indice] = nbClick;
      }

      function clear() {
          for(let i=1; i<=nbInput.value;i++) {
            tabLettre.value[i] = '';
            tabColor.value[i] = 0;
          }
          tableauFinal.value = [];

          document.getElementById('1').focus();
      }

      function search() {
          tabResultats.value = [];
          tabResultats2.value = [];
          const tabLettreTMP = ref([]);
          const tabLettrePositionTMP = ref([]);


        ListeMot.getLesMots().forEach(element => {
            if(element.length === nbInput.value && element[0] === tabLettre.value[1].toUpperCase()){
                tabResultats.value.push(element); 
            }
        });
        tabLettreTMP.value.push({"lettre" : tabLettre.value[1].toUpperCase(), "couleur" : "R", "position": 1});
        for(let i = 2;i<= nbInput.value;i++) {
            if(tabColor.value[i] === 2){
                tabResultats.value.forEach(element => {
                if(element[i-1] === tabLettre.value[i].toUpperCase()){
                    tabResultats2.value.push(element);
                }
            })
            tabResultats.value = tabResultats2.value;
            tabResultats2.value = [];  
            tabLettreTMP.value.push({"lettre" : tabLettre.value[i].toUpperCase(), "couleur" : "R", "position": i});
            tabLettrePositionTMP.value.push(tabLettre.value[i].toUpperCase()+i);
            }
        }

        for(let i = 2;i<= nbInput.value;i++) {
            if(tabColor.value[i] === 1){
                tabResultats.value.forEach(element => {
                if(element.includes(tabLettre.value[i].toUpperCase()) && !(element[i-1] === tabLettre.value[i].toUpperCase())){
                    tabResultats2.value.push(element);
                }
            })
            tabResultats.value = tabResultats2.value;
            tabResultats2.value = [];  
            tabLettreTMP.value.push({"lettre" : tabLettre.value[i].toUpperCase(), "couleur" : "0", "position": i});
            tabLettrePositionTMP.value.push(tabLettre.value[i].toUpperCase()+i);
            }
        }
        for(let i = 2;i<= nbInput.value;i++) {
            if(tabColor.value[i] === 0){
                tabResultats.value.forEach(element => {

                let del = true;

                tabLettreTMP.value.forEach(lettre => {
                    let verif = true;
                    if(lettre.lettre === tabLettre.value[i].toUpperCase()) {
                        del = false;
                        if(lettre.couleur === "O") {
                            if(element[i] === tabLettre.value[i].toUpperCase()){
                                verif = false;
                            }
                        }else if(lettre.couleur === "R") {
                            for(let j=1; j< element.length;j++) {
                                let k = j+1;
                                if((element[j] === tabLettre.value[i].toUpperCase().toString()) && ((tabLettrePositionTMP.value.indexOf(element[j]+k) === -1))) {
                                    verif = false;
                                }
                            }
                        }
                        if(verif) {
                            tabResultats2.value.push(element);
                        }
                    }
                })
                if(del) {
                    if(!(element.includes(tabLettre.value[i].toUpperCase()))){
                        tabResultats2.value.push(element);
                    }
                }

             
            })
            tabResultats.value = tabResultats2.value;
            tabResultats2.value = [];  
            }
        }
        calculProba();
        trieTableauFinal();
      }

      function trieTableauFinal() {
        const sortByMapped = (map,compareFn) => (a,b) => compareFn(map(a),map(b));
        const byValue = (a,b) => b - a;
        const toPrice = e => e.proba;
        const byPrice = sortByMapped(toPrice,byValue);
        tableauFinal.value.sort(byPrice)
      }

     
      function calculProba() {
        tabResultats.value.forEach(leMot => {
            let probaTotal = 0;
            for(let j = 0;j<leMot.length;j++) {
                const index = ListeProba.getLesProbas().findIndex( (element) => element.lettre === leMot[j]);
                probaTotal += ListeProba.getLesProbas()[index].proba
            }
            tableauFinal.value.push({"mot" : leMot, "proba" : probaTotal})
          })
      }

      onMounted(() =>  {
          for (let i = 1; i <= nbInput.value; i++) {
            tabColor.value[i] = 0; 
            tabLettre.value[i] = '';
            }

          document.getElementById('1').focus();
      })

      return { nbInput, selectedValue, tabColor, tabLettre,tabResultats,tabResultats2,listeProba, tableauFinal,valueInput,clear, changeValue, changeInput, clickInput, search, calculProba, trieTableauFinal }
  }
}
</script>

<style scoped>
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
</style>
