<template>
    <div>
        <h2 class="titleCreerProf" @click="showBox('infoProf')">Création d'un prof</h2>
        <div v-if="this.show.infoProf" class="contCreate">
            <div class="boxCreate">
                <div class="field">
                    <label >Nom :</label>
                    <input type="text" v-model="prof.nom">
                </div>
                <div class="field">
                    <label >Prénom :</label>
                    <input type="text" v-model="prof.prenom">
                </div>
                <div class="field">
                        <label >Date de naissance :</label>
                        <input type="date" v-model="prof.dateNaissance">
                </div>
                <div class="field">
                        <label >Npa :</label>
                        <input type="number" v-model="prof.npa">
                </div>
                <div class="field">
                        <label >Ville :</label>
                        <input type="text" v-model="prof.ville">
                </div>
                <div class="field">
                        <label >Adresse :</label>
                        <input type="text" v-model="prof.adresse">
                </div>
                <div class="field">
                        <label >Nationalité :</label>
                        <input type="text" v-model="prof.nationalite">
                </div>
                <div class="field">
                        <label >permis :</label>
                        <input type="text" v-model="prof.permis">
                </div>
                <div class="field">
                        <label >Télépnonne :</label>
                        <input type="text" v-model="prof.telephonne">
                </div>
                <div class="field">
                        <label >E-mail :</label>
                        <input type="text" v-model="prof.mail">
                </div>
                <div class="field">
                        <label >Banque :</label>
                        <input type="text" v-model="prof.banque">
                </div>
                <div class="field">
                        <label >IBAN :</label>
                        <input type="text" v-model="prof.iban">
                </div>
                <div class="field">
                        <label >No AVS :</label>
                        <input type="text" v-model="prof.avs">
                </div>
                <div class="field">
                        <label>Tarif/heure :</label>
                        <input type="number" v-model="prof.tarifHeure">
                </div>
                <div class="field">
                        <label >Password :</label>
                        <input type="text" v-model="prof.pw">
                </div>
                <div class="field">
                        <label >Role :</label>
                        <input type="text" v-model="prof.role">
                </div>
                
            </div>
            <button @click="createProf()" class="button button_valid">Créer Prof</button>
        </div>
        <hr>
        <!-- MODIFIER PROF -->
        <div class="contMondif">
            <h2>Modifier un prof</h2>
            <div class="boxProf" >
                <div v-for="item in tabProfs" :key="item._idProf" @click="selectProf(item)" class="prof">{{ item.prenom }}</div>   
            </div>

            <h3 class="titleDetail">Détail pour : {{ nomProfAModifier }}</h3>
            <!-- FORMULAIRE -->
            <div class="boxCreate">
                <div class="field">
                    <label >Nom :</label>
                    <input type="text" v-model="selectedProf.nom">
                </div>
                <div class="field">
                    <label >Prénom :</label>
                    <input type="text" v-model="selectedProf.prenom">
                </div>
                <div class="field">
                        <label >Date de naissance :</label>
                        <input type="date" v-model="selectedProf.dateNaissance">
                </div>
                <div class="field">
                        <label >Npa :</label>
                        <input type="number" v-model="selectedProf.npa">
                </div>
                <div class="field">
                        <label >Ville :</label>
                        <input type="text" v-model="selectedProf.ville">
                </div>
                <div class="field">
                        <label >Adresse :</label>
                        <input type="text" v-model="selectedProf.adresse">
                </div>
                <div class="field">
                        <label >Nationalité :</label>
                        <input type="text" v-model="selectedProf.nationalite">
                </div>
                <div class="field">
                        <label >permis :</label>
                        <input type="text" v-model="selectedProf.permis">
                </div>
                <div class="field">
                        <label >Télépnonne :</label>
                        <input type="text" v-model="selectedProf.telephonne">
                </div>
                <div class="field">
                        <label >E-mail :</label>
                        <input type="text" v-model="selectedProf.mail">
                </div>
                <div class="field">
                        <label >Banque :</label>
                        <input type="text" v-model="selectedProf.banque">
                </div>
                <div class="field">
                        <label >IBAN :</label>
                        <input type="text" v-model="selectedProf.iban">
                </div>
                <div class="field">
                        <label >No AVS :</label>
                        <input type="text" v-model="selectedProf.avs">
                </div>
                <div class="field">
                        <label>Tarif/heure :</label>
                        <input type="number" v-model="selectedProf.tarifHeure">
                </div>
                <div class="field">
                        <label >Password :</label>
                        <input type="text" v-model="selectedProf.pw">
                </div>
                <div class="field">
                        <label >Role :</label>
                        <input type="text" v-model="selectedProf.role">
                </div>
                
            </div>
            <button @click="modifProf()" class="button button_valid">Modifier prof</button>
            <button @click="supprimerProf(selectedProf._idProf)" class="button button_danger">Supprimer prof</button>
        </div>
    </div>
</template> 

<script>
export default {
    name : "prof-create",
    data(){
        return{
            prof : {},
            tabProfs : [],
            selectedProf : {},
            nomProfAModifier : "",
            show : {infoProf : false}
        }
    },
    methods : {
        async createProf(){
            const token = sessionStorage.getItem("token")
            const res = await fetch(`${this.$store.state.HOST}/admin/profs/newProf?token=${token}`,{
                method : "post",
                body : JSON.stringify(this.prof),
                headers : {"content-type" : "application/json"}
            })
            const response = await res.json()
            const {message, profs} = response
            if (res.ok){
                this.$store.commit("popUpClass",{succes : true, message : message})
                this.tabProfs = profs
            }else{ this.$store.commit("popUpClass", {succes : false, message : message})}
        },
        async callProfs(){
            try {
                const token = sessionStorage.getItem("token")
                const res = await fetch(`${this.$store.state.HOST}/admin/profs/callProfs?token=${token}`)
                const response = await res.json()
                const {profs, message} = response
                if(res.ok){
                    this.tabProfs = profs
                }else{
                    this.$store.commit("popUpClass", {succes : false, message : message})
                }
            } catch (error) {
                this.$store.commit("popUpClass", {succes : false, message : "Un problème est survenu"})
            }
        },
        selectProf(item){
            this.nomProfAModifier = item.prenom
            this.selectedProf = {...item}
        },
        async modifProf(){
            const token = sessionStorage.getItem("token")
            const res = await fetch(`${this.$store.state.HOST}/admin/profs/modifierProf?token=${token}`,{
                method : "put",
                body : JSON.stringify(this.selectedProf),
                headers : {"content-type" : "application/json"}
            })
            const response = await res.json()
            const {prof, profs , message} = response
            if(res.ok){
                    this.nomProfAModifier = prof.prenom
                    this.selectedProf = prof
                    this.tabProfs = profs
                    this.$store.commit("popUpClass",{succes : true, message : message})

            }else{
                this.$store.commit("popUpClass",{succes : false, message : message})
            }
        },
        async supprimerProf(idProf){
            const token = sessionStorage.getItem("token")
            const textConfirm = "Voulez-vous vraiment supprimer le prof... CETTE ACTION EST IRRÉVERSIBLE..."
            if(confirm(textConfirm)){
                const res = await fetch(`${this.$store.state.HOST}/admin/profs/supprimerProf?idProf=${idProf}&token=${token}`,{
                    method : "delete"
                })
                const response = await res.json()
                const {message, profs} = response
                if(res.ok){
                    this.$store.commit("popUpClass", {succes : true, message : message})
                    this.tabProfs = profs
                    this.selectedProf = {}
                }else{
                    this.$store.commit("popUpClass", {succes : false, message : message})
                }
            }
        },
        showBox(box){
            console.log("test")
            
            this.show[box] === true ? this.show[box] = false : this.show[box] = true
        }
    },
    mounted(){
        this.callProfs()
    }
}
</script>

<style lang="scss" scoped>
    
    
    input{
        margin-left: 10px;
    }
    input[type=number]{
        width: 70px;
    }
    .contMondif{
        margin: 50px 0;
    }
    .titleCreerProf{
        cursor: pointer;
        &:hover{
            font-weight: bold;
            text-decoration: underline;
            color: blue;
            transition: .2s;
        }
    }
    
    .prof{
        padding: 10px;
    }
    .prof:hover{
        color: green;
        cursor: pointer;    
    }
    .boxProf{
        display: flex;
        flex-flow: row ;
        border: solid 1px gray;
        margin: 20px 0;
    }
    .titleDetail{
        margin: 20px 0;
    }
    .field{
        width: 400px;
        display: flex;
        justify-content: space-between;
        margin: 15px 0;
    }
    hr{
        margin: 40px 0;
    }
    .button_danger{
        margin-left: 40px;
    }
</style>