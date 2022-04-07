<template>
<div class="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <div class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">

    <div class=" flex flex-row  justify-center "  > 
        <div :class="['w-10 h-10 bg-indigo-600 m-1 shadow-xl ring-1 ring-gray-900/5 flex justify-center sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 text-center align-middle style', { 'bloc' : nbInput === i+4}]" v-for="i in nbBloc"  :key="i" @click="changeValue(i+4)">
           {{ i+4}} 
        </div>

        
    </div>

    <ul class="mt-6">
        <li v-for="(mot,i) in tabLettreGlobal" :key="mot"><label v-for="(lettre,j) in mot" :key="lettre" :class="[
            'lettre',
              {
                'lettre2':
                  tabColorGlobal[i][j] === 1,
              },
              {
                'lettre1':
                  tabColorGlobal[i][j] === 2,
              },
            ]"> {{ lettre  }}</label></li>
    </ul>
    <div class="mt-6 flex flex-row items-center justify-center" >
        <Input class="" v-for="i in nbInput" :key="i" :nbClick="tabColor[i]" :letter="tabLettre[i]" :indice="i" @mouseDown="changeInput" @clickInput="clickInput" @keydown="keydown" @action="actionInput"/>
    </div>

    <div class="flex mt-6 justify-center space-x-4">
        <a @click="clear" id="button1" class=" w-32  items-center justify-center rounded-md border border-transparent bg-indigo-600 lg:bg-indigo-500  sm:bg-indigo-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Clear</a>
        <a @click="clearAll" id="button3" class=" w-32  items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Clear All</a>
        <a @click="search" id="button2" class="w-32   items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Rechercher</a>
    </div>
</div>

<ul class="grid grid-cols-4 gap-4 mt-7">
        <li v-for="(mot) in tableauFinal" :key="mot"><a @click="clickWord(mot.mot)">{{ mot.mot}}</a></li>
    </ul>
</div>


</template>

<script>
import Input from '../components/Input.vue'
import ListeMot from "@/models/ListeMot";
import ListeProba from "@/models/ListeProba";
import { cloneDeep } from "lodash";
import { onMounted,  ref} from 'vue';
export default {
  components: { Input },
  name: 'LaPage',
  
  setup() {

    const nbBloc = ref(5);
      const nbInput = ref(5);
      const selectedValue = ref(5);
      const tabColor = ref([]);
      const tabLettre = ref([])
      const tabResultats = ref([])
      const tabResultats2 = ref([])
      const listeProba = ref([])
      const tableauFinal = ref([])
      const valueInput = ref("")
      const tabLettreGlobal = ref([])
      const tabColorGlobal = ref([])
      const theIndice =ref(0);
      const variableQuiSertARien = ref(false);
      const oldTabColor = ref([]);

      function changeValue(nb) {
          nbInput.value = parseInt(nb);
          clearAll();
      }

      function changeInput(indice, lettre) {
          if( lettre != undefined && lettre != "") {
            theIndice.value = indice;
            if(indice < nbInput.value) {
                const test = indice +1;
                document.getElementById(test.toString()).focus();
            }
            tabLettre.value[indice] = lettre;
          }   
      }

      function clickInput(indice, nbClick) {
          theIndice.value = indice;
          tabColor.value[indice] = nbClick;
      }

      function clear() {
          theIndice.value = 0;
          clearInput();
          tableauFinal.value = [];
      }

      function clearInput() {
          oldTabColor.value = cloneDeep(tabColor.value);
          for(let i=1; i<=nbInput.value;i++) {
            tabLettre.value[i] = '';
            tabColor.value[i] = 0;
          }
          document.getElementById('1').focus();
          theIndice.value = 0;
      }

      function clearAll() {
          clear();
          tabColorGlobal.value = [];
          tabLettreGlobal.value = [];
      }

      function search() {
          if(tabLettre.value[1] !== '') {
            tabResultats.value = [];
            tabResultats2.value = [];
            
            tabColorGlobal.value.push(cloneDeep(tabColor.value))
            tabLettreGlobal.value.push(cloneDeep(tabLettre.value))

            tabLettreGlobal.value.forEach( (leTab,index) => {
                
                const tabLettreTMP = ref([]);
                const tabLettrePositionTMP = ref([]);

                if(index === 0) {
                    ListeMot.getLesMots().forEach(element => {
                        if(element.length === nbInput.value && element[0] === leTab[1].toUpperCase()){
                            tabResultats.value.push(element); 
                        }
                    });
                } 

            tabLettreTMP.value.push({"lettre" : leTab[1].toUpperCase(), "couleur" : "R", "position": 1});

            for(let i = 2;i<= nbInput.value;i++) {
                if(tabColorGlobal.value[index][i] === 2){
                    tabResultats.value.forEach(element => {
                    if(element[i-1] === leTab[i].toUpperCase()){
                        tabResultats2.value.push(element);
                    }
                })
                tabResultats.value = tabResultats2.value;
                tabResultats2.value = [];  
                tabLettreTMP.value.push({"lettre" : leTab[i].toUpperCase(), "couleur" : "R", "position": i});
                tabLettrePositionTMP.value.push(leTab[i].toUpperCase()+i);
                }
            }

        

            for(let i = 2;i<= nbInput.value;i++) {
                if(tabColorGlobal.value[index][i] === 1){
                    tabResultats.value.forEach(element => {
                    if(element.includes(leTab[i].toUpperCase()) && !(element[i-1] === leTab[i].toUpperCase())){
                        tabResultats2.value.push(element);
                    }
                })
                tabResultats.value = tabResultats2.value;
                tabResultats2.value = [];  
                tabLettreTMP.value.push({"lettre" : leTab[i].toUpperCase(), "couleur" : "0", "position": i});
                tabLettrePositionTMP.value.push(leTab[i].toUpperCase()+i);
                }
            }

        
            for(let i = 2;i<= nbInput.value;i++) {
                if(tabColor.value[i] === 0){
                    tabResultats.value.forEach(element => {

                    let del = true;

                    tabLettreTMP.value.forEach(lettre => {
                        let verif = true;
                        if(lettre.lettre === leTab[i].toUpperCase()) {
                            del = false;
                            if(lettre.couleur === "O") {
                                if(element[i] === leTab[i].toUpperCase()){
                                    verif = false;
                                }
                            }else if(lettre.couleur === "R") {
                                for(let j=1; j< element.length;j++) {
                                    let k = j+1;
                                    if((element[j] === leTab[i].toUpperCase().toString()) && ((tabLettrePositionTMP.value.indexOf(element[j]+k) === -1))) {
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
                        if(!(element.includes(leTab[i].toUpperCase()))){
                            tabResultats2.value.push(element);
                        }
                    }
                })
                tabResultats.value = tabResultats2.value;
                tabResultats2.value = [];  
                }
            }

            });

            calculProba();
            trieTableauFinal();
            clearInput();
          }
          
      }

      function keydown(indice,res) {
          theIndice.value = indice;
          if(res) { 
              let val = indice-1;
              if(indice === nbInput.value && tabLettre.value[indice] !== "") {
                  document.getElementById(val.toString()).focus();
                  tabLettre.value[indice] = "";
                    tabColor.value[indice] = 0;
                    variableQuiSertARien.value = true;
              }else if(indice !== 1 ) {
                document.getElementById(val.toString()).focus();
                tabLettre.value[indice-1] = "";
                tabColor.value[indice-1] = 0;
            }else{
                document.getElementById('1').focus();
                tabLettre.value[indice] = "";
                tabColor.value[indice] = 0;
            }
          }else{
              variableQuiSertARien.value = true;
              //document.getElementById('1').focus();
          }
      }

      function trieTableauFinal() { 
        const sortByMapped = (map,compareFn) => (a,b) => compareFn(map(a),map(b));
        const byValue = (a,b) => b - a;
        const toPrice = e => e.proba;
        const byPrice = sortByMapped(toPrice,byValue);
        tableauFinal.value.sort(byPrice)
      }

      function actionInput(id) {
          if(id === 13) {
              search();
          }else if(id === 46) {
              clear();
          }
      }

      function clickWord(leMot) {
          for(let i=0; i<nbInput.value;i++) {
              tabLettre.value[i+1] = leMot[i];
          }
          oldTabColor.value.forEach((color,index) => {
              if(color === 2) {
                  tabColor.value[index] = 2;
              }
          })  
      }

     
      function calculProba() {
        tableauFinal.value = [];
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

        window.addEventListener('keydown', (e) => {
            if(e.key === "Shift" || e.key === "Control") {
                return;
            }else
            if(e.key === "Backspace") {
                if(!variableQuiSertARien.value) {
                    keydown(theIndice.value, true)
                }
                variableQuiSertARien.value = false;
            } else 
            if(!variableQuiSertARien.value && theIndice.value != nbInput.value) {
                document.getElementById(theIndice.value+1).focus();
            }
            variableQuiSertARien.value = false;
        });

      })

      return { nbInput, selectedValue, tabColor, tabLettre,tabResultats,tabResultats2,listeProba, tableauFinal,valueInput, tabLettreGlobal, tabColorGlobal,theIndice,oldTabColor,nbBloc,clickWord,actionInput, clear, clearAll,clearInput, changeValue, changeInput, keydown, clickInput, search, calculProba, trieTableauFinal }
  }
}
</script>

<style scoped>

.lettre {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.2em;
    padding-right: 10px;
}

.lettre1 {
    color: rgb(221, 58, 58);
}

.lettre2 {
    color: rgb(207, 142, 56);
}

.bloc {
    background-color: palevioletred;
}
.style {
    color: white;
    font-size: 1.7em;
}
</style>
