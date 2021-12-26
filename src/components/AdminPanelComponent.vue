<style scoped lang="scss">
  .v-admin-panel-wrapper
  {
    display: grid;
    grid-template-areas: "order content content control";
    grid-template-columns: 15fr 30fr 30fr 25fr;
  }

  .v-admin-navigation
  {
    grid-area: order;
  }

  .v-admin-orders
  {
    grid-area: content;
  }

  .v-admin-order-control
  {
    grid-area: control
  }

  .v-admin-order--control--accept-btn
  {
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

  .v-admin-order--control--decline-btn
  {
    border-radius: 8px;
    display: inline-block;
    outline: none;
    border: none;
    box-shadow: 0 0 8px 0 lightcoral;
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

  .v-admin-btn--order_by_id
  {
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

    &:hover
    {
      background-color: #9afbe9;
    }

    &:active
    {
      background-color: #28f1cc;
    }

    &.accepted
    {
      background-color: mediumspringgreen;

      &:hover
      {
        background-color: limegreen;
      }

      &:active
      {
        background-color: darkseagreen;
      }
    }

    &.declined
    {
      background-color: #efe9e9;
      box-shadow: none;

      &:hover
      {
        background-color: #d3d3d3;
      }

      &:active
      {
        background-color: #b0b0b0;
      }
    }
  }
</style>


<template>
  <div
      class="v-admin-panel-wrapper"
      v-if="isAdmin.mode"
  >
    <div class="v-admin-navigation">
      <p>Orders:</p>
      <div
        v-for="order in orders"
      >
        <button
            class="v-admin-btn--order_by_id"
            :class="{
                    'accepted': order.status === 'accepted',
                    'declined': order.status === 'declined'
                    }"
            @click="changeOrder(order.id-1)"
        >
          id: {{order.id}}
        </button>
      </div>
    </div>
    <div class="v-admin-orders">
      <p>Compound:</p>
      <div v-if="orders[currentOrderIndex]">
        <div
            v-for="item in orders[currentOrderIndex].order.items"
        >
          <item-component
              v-if="item"
              :nomenclature="item"
              :isBtnDisabled="true"
          >
            <p>Count: {{item.count}}</p>
          </item-component>
        </div>
      </div>
    </div>
    <div class="v-admin-control">
      <p>Total: {{ orders[currentOrderIndex].order.total }}</p>
      <button class="v-admin-order--control--accept-btn" @click="acceptOrder">Accept</button>
      <button class="v-admin-order--control--decline-btn" @click="pendingOrder">Pending</button>
      <button class="v-admin-order--control--decline-btn" @click="declineOrder">Decline</button>
    </div>
  </div>
  <div class="v-admin-error" v-else>
    Sorry, but you have not administration permission
  </div>
</template>

<script>
import {Options, Vue} from "vue-class-component"
import axios from "axios";
import {inject} from "vue";
import ItemComponent from "./ItemComponent";

const Component = Options;
@Component({
  props: {},
  components: {
    ItemComponent
  }

})

export default class AdminPanelComponent extends Vue {
  isAdmin = inject('isAdmin')

  currentOrderIndex = 0;

  statusOrders = [];


  orders = [];

  changeOrder(id) {
    this.currentOrderIndex = id;
  }

  loadData() {
    axios('http://localhost:3000/Orders', {
      method: "GET"
    }).then((orders) => {
      console.log("200 OK")
      this.orders = orders.data;
    }).catch((error) => {
      console.log("An error occurred while processing the request: ", error)
    });
  }

  async beforeMount() {
    this.loadData()
  }

  acceptOrder() {
    this.saveWithStatus("accepted");
  }

  declineOrder() {
    this.saveWithStatus("declined");
  }

  pendingOrder() {
    this.saveWithStatus("pending");
  }


  saveWithStatus(status)
  {
    axios.put('http://localhost:3000/Orders/' + (this.currentOrderIndex+1), {
      date: this.orders[this.currentOrderIndex].date,
      id: this.orders[this.currentOrderIndex].id,
      order: this.orders[this.currentOrderIndex].order,
      status: status
    });

    this.orders[this.currentOrderIndex].status = status;
  }
}
</script>
