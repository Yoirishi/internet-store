<style scoped lang="scss">
  .main-wrapper {
    margin: 0 auto;
  }
</style>


<template>
    <div class="main-wrapper">
      <header-component></header-component>
      <router-view/>
    </div>
</template>

<script>
import HeaderComponent from "./HeaderComponent"
import {Options, Vue} from "vue-class-component"

const Component = Options;
@Component({
  props: {},
  components: {
    HeaderComponent
  }
})
export default class MainComponent extends Vue {

}
</script>
