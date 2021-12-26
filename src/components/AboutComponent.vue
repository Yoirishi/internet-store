<style scoped lang="scss">
  .v-about-app
  {
    margin: 40px;
    padding: 40px;

    background-color: rgba(176, 176, 176, 0.6);
  }

  .v-aobut-me
  {
    margin: 40px;
    padding: 40px;

    background-color: rgba(176, 176, 176, 0.6);
  }
</style>


<template>
    <div class="v-about-app"><a target="_blank" href="http://localhost:8080/">Homepage</a> </div>
    <div class="v-aobut-me"> <a target="_blank" href="https://github.com/Yoirishi">https://github.com/Yoirishi</a> </div>
</template>

<script>
import {Options, Vue} from "vue-class-component"

const Component = Options;
@Component({
  props: {},
  components: {}

})

export default class AboutComponent extends Vue {
}
</script>
