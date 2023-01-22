<template>
  <div>
     <!-- CREER UN COURS -->
      <div class="ContCours">
        <h2>Créer un cours</h2>
            <div class="boxCreerCours">
                <div class="row">
                    <label for="nom">Nom : </label>
                    <input type="text" v-model="cours.nom">
                </div>
                <div class="row">
                    <label for="jour">Jour : </label>
                    <input type="text" v-model="cours.jour">
                </div>
                <div class="row">
                    <label for="heure">Heure : </label>
                    <input type="text" v-model="cours.heure">
                </div>
                <div class="row">
                    <label for="age">Age : </label>
                    <input type="text" v-model="cours.age">
                </div>
                <div class="row">
                    <label for="duree">Duree : </label>
                    <input type="number" v-model="cours.duree">
                </div>
                <div class="row">
                    <label for="type">Type : </label>
                    <select name="type" v-model="cours.idTypeCours" >
                        <option v-for="item in tabTypeCours" :key="item._idTypeCours" :value="item._idTypeCours"> {{ item.type }}</option>
                    </select>
                </div>
                <div v-if="cours.idTypeCours === 1" class="row">
                    <label  for="saison">Saison : </label>
                    <select v-model="cours.idSaison" name="saison" id="saison">
                        <option v-for="item in allSaisons" :key="item._idSaison" :value="item._idSaison"> {{ item.saison }}</option>
                    </select>
                </div>

            </div>
            <button @click="creerCours()" class="button button_valid">Créer le cours</button>
      </div>
      <hr>

      <!-- MODIFIER COURS -->
      <div class="ContModifier">
            <h2>Modifier un cours</h2>

            <!-- CHOIX SAISON -->
            <div class="row">
                <label for="nom">Saison : </label>
                <select v-model="saisonSelect"  @change="callCoursSaison()" id="choiceSaison">
                    <option  v-for="item in allSaisons" :key="item._idSaison" :value="item._idSaison" >{{ item.saison }}</option>
                </select>
            </div>

            <!-- FORMULAIRE -->
            <div class="boxCours" id="boxCours">


                <div  class="field" v-for="item in tabCours" :key="item._idCours">
                    <div @click="callCour(item,$event)">{{ item.nom }}</div>
                </div>
            </div>
            <div class="boxCreerCours">
                <div class="row">
                    <label for="nom">Nom : </label>
                    <input type="text" v-model="coursSelected.nom">
                </div>
                <div class="row">
                    <label for="jour">Jour : </label>
                    <input type="text" v-model="coursSelected.jour">
                </div>
                <div class="row">
                    <label for="heure">Heure : </label>
                    <input type="text" v-model="coursSelected.heure">
                </div>
                <div class="row">
                    <label for="age">Age : </label>
                    <input type="text" v-model="coursSelected.age">
                </div>
                <div class="row">
                    <label for="age">Duree : </label>
                    <input type="number" v-model="coursSelected.duree">
                </div>
                <div class="row">
                    <label for="saison">Saison : </label>
                    <div v-if="coursSelected.cours_saison">{{ coursSelected.cours_saison.saison }}</div>
                </div>
                <div class="row">
                    <label for="type">Type : </label>
                    <div v-if="coursSelected.type_cours">{{ coursSelected.type_cours.type }}</div>
                </div>
            </div>
            <div class="boxButton">
                <button @click="showInsertion()" class="button button_valid buttonAjouterDates">Ajouter des dates pour le cours</button>
                <button @click="modifierCours()" class="button button_valid">Modifier les données du cours</button>
                <button @click="supprimerCours(coursSelected)" class="button button_danger">Supprimer le cours</button>
            </div>

            <!-- INSERTION DES DATES -->
            <div class="boxInsertionDates">
                <div v-if="showBoxInsertion" class="contInsertion">
                <h3>Nombre de date à insérer pour le cours <span class="bold">{{ coursSelected.nom }} {{ coursSelected.saison }}</span> : </h3>
                <input type="number" v-model="nbrDates">
                <div class="boxDates">
                    <div v-for="index in nbrDates" :key="index" class="rowDate">
                        <span>{{ index }} : </span>
                        <input class="inputDate" type="date">
                    </div>
                </div>
                <button @click="insererDates()" class="button button_valid">Insérer les dates</button>
            </div>
           

            </div>
            <!-- DATE DE COURS EXISTANTE -->
            <div class="contDatesActuel">
                <h3>Les dates actuels pour le cours : {{ coursSelected.nom }} {{ coursSelected.saison }}</h3>
                <div class="contAffichageDates">
                    <div class="boxHeader">
                        <div class="celluleNomCours">Cours</div>
                        <div class="celluleDate">Date</div>
                        <div class="celluleProf">Prof_1</div>
                        <div class="celluleProf">Prof_2</div>
                        <div class="celluleProf">Prof_3</div>
                        <div class="celluleProf">Prof_4</div>
                        <div class="celluleAction">Supprimer</div>

                    </div>
                    <div class="boxDonneCours">
                        <div class="rowDates" v-for="item in dates" :key="item._idDatesCours">
                            <div class="celluleNomCours"> {{ item.cours.nom }}</div>
                            <div class="celluleDate"> {{ dateParse(item.date)  }}</div>
                            <div class="celluleProf">{{ nomProf(item,"prof_1") }}</div>
                            <div class="celluleProf">{{ nomProf(item,"prof_2") }}</div>
                            <div class="celluleProf">{{ nomProf(item,"prof_3") }}</div>
                            <div class="celluleProf">{{ nomProf(item,"prof_4") }}</div>
                            <div @click="supprimerDate(item._idDatesCours)" class="celluleSupprimer">Sup.</div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
  </div>

</template>

<script>

export default {
    name : "cours",
    data(){
        return{
            cours : {},
            coursSelected : {},
            tabCours : [],
            allSaisons : [], // ok
            saisonSelect : "", // récupere la saison choisi dans modifier le cours
            showBoxInsertion : false,
            nbrDates : 0,
            tabInsertDates : [],
            tabTypeCours : [],
            dates : []
        }
    },
    methods : {
        async creerCours(){
            const token = sessionStorage.getItem("token")
            const res = await fetch(`${this.$store.state.HOST}/admin/cours/creerCours?token=${token}`,{
                method : "post",
                body : JSON.stringify(this.cours),
                headers : {"content-type" : "application/json"}
            })
            const response = await res.json()
            const {message} = response
            if(res.ok){
                this.$store.commit("popUpClass", {succes : true,message : message})
            }else{
                this.$store.commit("popUpClass", {succes : false,message : message})
            }
        },
        async modifierCours(){
            const token = sessionStorage.getItem("token")
            console.log(this.coursSelected)
            const res = await fetch(`${this.$store.state.HOST}/admin/cours/modifierCours?idSaison=${this.saisonSelect}&token=${token}`,{
                method : "put",
                body : JSON.stringify(this.coursSelected),
                headers : {"content-type" : "application/json"}
            })
            const response = await res.json()
            const {message, tabCours} = response
            if (res.ok){
                this.tabCours = tabCours
                this.$store.commit("popUpClass", {succes : true, message : message})
            }else{ this.$store.commit("popUpClass", {succes : false, message: message})}
            
        },
        async callCour(item,e){
            
            let div = document.getElementById("boxCours")

            let tabItem = div.querySelectorAll(".select")
            for (let item of tabItem){
                item.classList.remove("select")
            }
            e.target.classList.add("select")
            
            const token = sessionStorage.getItem("token")
            const res = await fetch(`${this.$store.state.HOST}/admin/cours/callDatesDuCours/?idCours=${item._idCours}&token=${token}`)
            const response = await res.json()
            const {message, dates, coursSelected} = response
            if (res.ok){
                this.coursSelected = {...coursSelected }
                console.log(this.coursSelected)
                this.showBoxInsertion = false
                this.dates = dates
            }else {this.$store.commit("popUpClass", { succes: false, message : message})}
        },
        async supprimerCours(coursSelected){
            console.log(coursSelected)
            const token = sessionStorage.getItem("token")
            const res = await fetch(`${this.$store.state.HOST}/admin/cours/supprimerCours?token=${token}`,{
                method : "delete",
                body : JSON.stringify({idCours : coursSelected._idCours, idSaison : coursSelected.idSaison}),
                headers : {"content-type" : "application/json"}
            })
            const response = await res.json()
            const {message, tabCours} = response
            if (res.ok){
                    this.$store.commit("popUpClass", {succes : true, message : message})
                    this.tabCours= tabCours
                    this.coursSelected = {}
            }else {
                this.$store.commit("popUpClass", {succes : false, message : message})
            }
        },
        async callSaisons(){
            const token = sessionStorage.getItem("token")
            const res = await fetch(`${this.$store.state.HOST}/admin/cours?token=${token}`)
            const response = await res.json()
            const {saisons, message , typeCours} = response
            if (res.ok){
                    this.allSaisons = saisons  
                    this.tabTypeCours = typeCours    
            }else{
                this.$store.commit("popUpClass",{succes : false, message : message})
            }       
        },
        async callCoursSaison(){
            const token = sessionStorage.getItem("token")
            const res = await fetch(`${this.$store.state.HOST}/admin/cours/callCoursSaison?idSaison=${this.saisonSelect}&token=${token}`)
            const response = await res.json()
            const {message, cours} = response
            if(res.ok){
                    this.coursSelected = {}
                    this.tabCours = cours
            }else{ this.$store.commit("popUpClass", {succes: false, message : message})}
        },
        showInsertion(){
            this.showBoxInsertion ? this.showBoxInsertion = false : this.showBoxInsertion = true
        },
        async insererDates(){
            const tabDates = document.querySelectorAll(".inputDate")
            this.tabInsertDates = []
            for (let item of tabDates){
                let obj = {
                    date : item.value,
                    idSaison : this.coursSelected.idSaison,
                    idCours : this.coursSelected._idCours,
                    idTypeCours : this.coursSelected.idTypeCours
                }
                this.tabInsertDates.push(obj)
            }
            console.log(this.tabInsertDates)

            const token = sessionStorage.getItem("token")
            const res = await fetch(`${this.$store.state.HOST}/admin/cours/insertDateCours?token=${token}`,{
                method : "post",
                body : JSON.stringify(this.tabInsertDates),
                headers : {"content-type" : "application/json"}
            })
            const response = await res.json()
            const {message} = response
            if (res.ok){
                this.$store.commit("popUpClass", {succes : true, message : message})
            }else { this.$store.commit("popUpClass", {succes : false, message : message})}

        },
        dateParse(item){
            let date = new Date(item)
            let dateParse = date.toLocaleDateString("fr-FR",{month:"numeric", day:"numeric"})
            return dateParse

        },
        supprimerDate(idDateCours){
            const token = sessionStorage.getItem("token")
            fetch(`${this.$store.state.HOST}/admin/cours/supprimerDateCours?idCours=${idDateCours}&token=${token}`)
            .then(res => res.json())
            .then(response => {
                this.$store.state.popUp.display = true
                this.$store.state.popUp.message = response.message
                if(response.succes){
                    this.$store.state.popUp.succes = true
                    this.callCour()
                }else{
                    this.$store.state.popUp.succes = false
                }
            }).catch(err => console.log(err))
        },
        nomProf(date, colProf){
           if(date[colProf]){ return date[colProf].prenom}   
        }
    },
    mounted(){
        this.callSaisons()
    }
}
</script>

<style lang="scss" scoped>
    .row{
        margin: 10px 0;
        width: 300px;
        display: flex;
        justify-content: space-between;
    }
    h3{
        margin-bottom: 20px;
    }
    .boxCours{

        border: solid 1px gray;
        display: flex;
        padding: 20px;
        margin: 40px 0;
        background: rgb(229, 229, 229);
    }
    .field{
        padding: 0 20px;
        cursor: pointer;
    }
    .field:hover{
        color: blue;
        font-weight: bold;
    }
    .button_danger{
        margin: 0 40px;
    }
    hr{
        margin: 40px 0;
        border: solid 1px gray;
    }
    .buttonAjouterDates{
        margin-left: 40px;
        background: #9dade2;
        color: black;
    }
    .boxInsertionDates{
        h3{
            margin: 30px 0;
        }
        .rowDate{
            margin: 15px 0;
        }
        button{
            margin-top: 30px;
        }
    }
    .select{
        font-weight: bold;
        text-decoration: underline;
    }
    .contDatesActuel{
        margin: 40px;
    }
    .boxHeader{
        display: flex;
        background: teal;
        color: white;
    }
    .rowDates{
        display: flex;
        &:hover{
            background: rgb(227, 227, 227);
        }
    }
    .celluleDate{
        width: 80px;
    }
    .celluleSaison{
        width: 120px;
    }
    .celluleNomCours{
        width: 165px;
    }
    .celluleProf{
        width: 100px;
    }
    .celluleSupprimer{
        width: 100px;
        cursor: pointer;
        text-align: center;
        &:hover{
            font-weight: bold;
        }
    }
    .boxButton{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        margin: 50px 0;
        button{
            margin: 20px;
        }
    }
</style>
<!-- 424 lignes -->