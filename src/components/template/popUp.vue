<template>
    <div v-if="this.$store.state.popUp.display">
        <div :class="{popUpSucces : this.$store.state.popUp.succes, popUpFalse : !this.$store.state.popUp.succes}" class="cont">
            <p>{{ this.$store.state.popUp.message }}</p>
            <button @click="close()" class="button">OK</button>
        </div>
    </div>
</template>

<script>
export default {
    name : "popUp",
    data(){
        return{

        }
    },
    methods : {
        close(){
            this.$store.state.popUp.display = false
        }
    }
}
</script>

<style lang="scss" scoped>
    .cont{
        display: inline-block;
        position: fixed;
        z-index: 100000;
        top: 0;
        right: 0;
        padding: 20px;
        min-width: 200px;
        text-align: center;
        border: solid 1px gray;
        border-radius: 20px 0px 20px 20px;
        font-weight: bold;
    }
    button{
        margin-top: 20px;
        font-size: .8em;
        min-width: 100px;
    }
    .popUpSucces{
        background: #8dc88d;
        color: #296829;
    }
    .popUpFalse{
        background: #d28888;
        color: rgb(143, 36, 36);
    }
</style>