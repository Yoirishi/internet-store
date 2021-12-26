<style scoped lang="scss">
  .header-wrapper
  {
    position: sticky;
    top: 0;

    width: 100%;
    height: 190px;
    background: #9afbe9;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .v-router-link
  {
    height: 32px;
    width: 190px;
    background: springgreen;

    display: flex;
    justify-content: space-around;
    align-items: center;

    font-size: 120%;
  }

  .v-username
  {
    box-sizing: border-box;
    border: none;
    background-image:none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    outline: none;
    box-shadow: none;  //style reset

    display: block;
    padding: 8px;
    margin: 8px;
    background-color: white;

    &.is-error {
      border: 1px solid red;
    }
  }

  .v-password
  {
    box-sizing: border-box;
    border: none;
    background-image:none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    outline: none;
    box-shadow: none;  //style reset


    display: block;
    padding: 8px;
    margin: 8px;
    background-color: white;

    &.is-error {
      border: 1px solid red;
    }
  }

  .v-btn-login {
    border-radius: 8px;
    display: inline-block;
    outline: none;
    border: none;
    box-shadow: 0 0 8px 0 darkcyan;
    padding: 12px;
    margin: 12px;
    background-color: white;
    width: 164px;
    height: 36px;

    justify-items: center;
    justify-self: center;

    &:hover {
      background-color: #9afbe9;
    }

    &:active {
      background-color: #28f1cc;
    }
  }

  .v-btn-logout {
    border-radius: 8px;
    display: inline-block;
    outline: none;
    border: none;
    box-shadow: 0 0 8px 0 darkcyan;
    padding: 12px;
    margin: 12px;
    background-color: white;
    width: 164px;
    height: 36px;

    justify-items: center;
    justify-self: center;

    &:hover{
      background-color: lightsalmon;
    }

    &:active{
      background-color: coral;

    }
  }

  .v-username-greeting {
    margin: 8px;
    padding: 8px;
  }

</style>


<template>
  <div class="header-wrapper">
    <nav class="v-navigation">
      <p class="v-router-link"><router-link to="/">Go to Catalog</router-link></p>
      <p class="v-router-link"><router-link to="/cart">Go to Cart</router-link></p>
      <p class="v-router-link"><router-link to="/about">About</router-link></p>
    </nav>
    <div
        class="v-unauthorized"
        v-if="!loggedIn"
    >
      <input type="text"
             class="v-username"
             v-model="username"
             placeholder="Enter your username"
             :class="{'is-error' : invalidLoginData}"
      >
      <input type="password"
             class="v-password"
             v-model="password"
             placeholder="Enter your password"
             :class="{'is-error' : invalidPasswordData}"
      >
      <button
          class="v-btn-login"
          @click="logIn(username, password)"
      >Log in!</button>
    </div>
    <div
        class="v-authorized"
        v-else
    >
      <div class="v-username-greeting">
        Welcome, {{username}}!
      </div>
      <div
          class="v-admin-panel"
          v-if="isAdminMode"
      >
        <p class="v-router-link"><router-link to="/adminpanel">Go to Admin Panel</router-link></p>
      </div>
      <button
          class="v-btn-logout"
          @click="logOut"
      >Logout</button>
    </div>
  </div>
</template>

<script>
import {Options, Vue} from "vue-class-component"
import {inject} from "vue";

const Component = Options;
@Component({
  props: {},
  components: {},
  watch: {
    username()
    {
      this.invalidLoginData = false
    },
    password()
    {
      this.invalidPasswordData = false
    },
    isAdminMode(val) {
      this.isAdmin.mode = val;
    }
  }

})

export default class HeaderComponent extends Vue {
  username = null;
  password = null;

  loggedIn = false;

  isAdminMode = false;

  isAdmin = inject('isAdmin');

  invalidLoginData = false;
  invalidPasswordData = false;

  logIn(login, pass) {
    if (login && pass)
    {
      if (login === "admin" && this.password !== "admin")
      {
        this.invalidPasswordData = true;
        return;
      }
      if (login === "admin" && this.password === "admin")
      {
        this.isAdminMode = true
        this.$router.push('/adminpanel')
      }
      this.loggedIn = true
    }
    else if (login)
    {
      this.invalidPasswordData = true;
    }
    else if (pass) {
      this.invalidLoginData = true;
    }
  }

  logOut() {
    this.loggedIn = false
    this.username = null;
    this.password = null;
    if (this.isAdmin) {
      this.$router.push('/')
    }
    this.isAdminMode = false;
  }
}
</script>
