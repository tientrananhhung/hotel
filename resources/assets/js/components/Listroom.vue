<template>
    <v-expansion-panel>
        <v-list-tile avatar>
            Danh sách phòng
        </v-list-tile>
        <v-expansion-panel-content v-for="i in arrrooms" :key="i" expand-icon="mdi-menu-down">
            <div slot="header">{{i.name}}</div>
            <v-card>
                <v-card-text class="grey lighten-3">
                    Ngày sinh là : {{i.birthday}} | Địa chỉ là : {{i.address}} .
                </v-card-text>
            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
export default {
  data() {
    return {
      arrrooms: []
    };
  },
  props: {
    datarooms: {
      type: Object,
      default: function() {
        return (this.arrrooms = this);
      }
    }
  }
};
</script>
