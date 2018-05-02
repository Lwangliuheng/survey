<style scoped>

</style>
<template>
  <div class="channel-manage">
    <childInstitutionList  v-if="isChannelList"></childInstitutionList>
    <createChildInstitution v-else></createChildInstitution>
  </div>
</template>
<script>
  import createChildInstitution from '@/components/createChildInstitution'
  import childInstitutionList from '@/components/childInstitutionList'
  
  export default {
    data() {
      return{
        isChannelList: '',
      }
    },
    watch: {
      getUserIcons(val) {
        this.isChannelList = val;
        console.log(this.isChannelList)
      }
    },
    mounted() {
      this.isChannelList = this.$store.state.isChannelList;
    },
    methods: {
    },
    components: {
      createChildInstitution,
      childInstitutionList
    },
    computed: {
      getUserIcons(){
        return this.$store.state.isChannelList;
      }
    }

  }

</script>
