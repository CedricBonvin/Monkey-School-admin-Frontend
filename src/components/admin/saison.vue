<template>
    <div>
        <!-- AJOUTER UNE SAISON -->
        <div class="contAjouterSaison">
            <h2>Ajouter une saison :</h2>
            <div class="field">
                <label for="saison">Saison</label>
                <input type="text" v-model="saison.saison" placeholder="2022-2023">
            </div>
            <button @click="ajouterSaison()" class="button button_valid">Ajouter une saison</button>
        </div>
        <hr>
        <!-- MODIFIER SAISON -->
        <div class="contAjouterSaison">
            <h2>Supprimer une saison :</h2>
            <div class="boxAllSaison">
                <div class="itemSaison" @click="selectSaison(item)" v-for="item in tabSaisons" :key="item._idSaison"> {{ item.saison }}</div>
            </div>
            <div class="infoSaison">
                <div class="field">
                    <label for="saison">Saison</label>
                    <input type="text" v-model="selectedSaison.saison">
                </div>
            </div>
            <button @click="supprimerSaison()" class="button button_danger">Supprimer la saison</button>
        </div>
    </div>
</template>

<script>
export default {
    name : "saison",
    data(){
        return{
            saison : {},
            tabSaisons : [],
            selectedSaison : {}
        }
    },
    methods : {
        async ajouterSaison(){
            const token = sessionStorage.getItem("token")

            try {
                const res = await fetch(`${this.$store.state.HOST}/admin/saison/ajouterSaison?token=${token}`,{
                    method : "post",
                    body : JSON.stringify(this.saison),
                    headers : {"content-type" : "application/json"}
                })
                const response = await res.json()
                const {message, saisons } = response
    
                if(res.ok){
                    this.$store.commit("popUpClass",{succes : true, message : message})
                    this.tabSaisons = saisons
                }else{
                    this.$store.commit("popUpClass",{succes : false, message : message})
                }
            } catch (error) {
                this.$store.commit("popUpClass",{succes : false, message : "problème inatendu"})
            }
        },
        async callSaisons(){
            const token = sessionStorage.getItem("token")

            const res = await fetch(`${this.$store.state.HOST}/admin/saison/callSaisons?token=${token}`)
            const response = await res.json()
            const {message, saisons} = response
            if(res.ok){
                this.tabSaisons = saisons
            }else{
                this.$store.commit("popUpClass",{succes : false ,message : message})
            }
        },
        async supprimerSaison(){
            const token = sessionStorage.getItem("token")
            const saison = this.selectedSaison._idSaison
            try {
                const res = await fetch(`${this.$store.state.HOST}/admin/saison/supprimerSaison?idSaison=${saison}&token=${token}`,{
                    method : "delete",
                    headers : {"content-type" : "application/json"}
                })
                const response = await res.json()
                const {message, saisons} = response
                if (res.ok){
                    this.$store.commit("popUpClass",{succes : true, message : message})
                    this.tabSaisons = saisons
                    this.selectedSaison = {}
                }else {this.$store.commit("popUpClass",{succes : false, message : message})
}
            } catch (error) {
                this.$store.commit("popUpClass",{succes : false, message : "problème inattendu"})

            }
        },
        selectSaison(saison){
            this.selectedSaison = saison
        }
    },
    mounted(){
        this.callSaisons()
    }
}
</script>

<style lang="scss" scoped>
    input{
        display: block;
    }
    .boxAllSaison{
        border: solid 1px gray;
        display: flex;
        flex-flow: row wrap;
    }
    .itemSaison{
        padding: 10px 20px;
        cursor: pointer;
        &:hover{
            color: blue;
            font-weight: bold;
        }
    }
    hr{
        margin: 40px 0;
    }
    
</style>