<template>
  <div>
    <v-container>
      <v-card>
        <v-data-table :items="list" class="elevation-1" hide-actions :headers="headers">
          <template slot="items" slot-scope="props">
            <tr :active="props.selected" class="text-xs-center">
              <td>{{props.item.postNumber}}</td>
              <td>{{props.item.title}}</td>
              <td>{{props.item.writer}}</td>
              <td>{{props.item.createdAt}}</td>
              <td @click="depost(props.item)">
                <v-btn flat>
                  <v-icon>delete_sweep</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>
<script>

export default {
  name: "MyPostInfo",
  data: function() {
    return {
      list: "",
      selected: "",
      _selected: "",
      headers: [
        {
          text: "게시글번호",
          value: "postNumber",
          sortable: false,
          align: "center"
        },
        { text: "제목", value: "title", sortable: false, align: "center" },
        { text: "작성자", value: "writer", sortable: false, align: "center" },
        {
          text: "작성일",
          value: "createdAt",
          sortable: false,
          align: "center"
        },
        { text: "삭제", sortable: false, align: "center" }
      ]
    };
  },
  methods: {
    depost(a) {
      if (event.target.classList.contains("btn__content")) return;
     
      this.$http
        .post("/users/depost", {
          id: this.$session.get("id"),
          number: a.postNumber
        })
        .then(response => {
            alert(a.postNumber + "번 게시글 삭제!");
            this.getlist();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getlist() {
      this.$http
        .post("/users/postlist", { id: this.$session.get("id") })
        .then(response => {
          this.list = response.data;
          console.log(this.list);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getlist();
  }
};
</script>