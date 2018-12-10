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
              <td>{{props.item.createdAt.slice(0,10)}}</td>
              <td>{{props.item.views}}</td>
              <td @click="depost(props.item)">
                <v-btn flat>
                  <v-icon>delete_sweep</v-icon>
                </v-btn>
              </td>
              <td @click="postview(props.item)">
                <v-btn flat>
                  <v-icon>visibility</v-icon>
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
      postNumber:'',
      writer:'',
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
        {
          text: "조회수",
          value: "views",
          sortable: false,
          algin: "center"
        },
        { text: "삭제", sortable: false, align: "center" },
        { text: "VIEW", sortable: false, align: "center" }
      ]
    };
  },
  methods: {
    depost(a) {
      //댓글지우기
      if (event.target.classList.contains("btn__content")) return;

      this.$http
        .post("/users/depost", {
          id: this.$session.get("id"),
          number: a.postNumber
        })
        .then(response => {
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
    },
    postview(a){
      if (event.target.classList.contains("btn__content")) return;
      
      this.$router.push(`/boardshow/${a.postNumber}/${a.writer}`)
    }
  },
  mounted() {
    this.getlist();
  }
};
</script>