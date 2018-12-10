<template>
  <div>
    <v-container fluid justify-center>
      <v-layout row>
        <v-flex d-flex>
          <v-text-field background-color="white" box label="Add comment here" v-model="comment"></v-text-field>
        </v-flex>
        <v-card-actions>
          <v-btn flat color="orange" @click="saveComment">POST</v-btn>
        </v-card-actions>
      </v-layout>

      <v-data-table :items="c_items" class="elevation-1" hide-actions hide-headers>
        <template slot="items" slot-scope="props">
          <td>
            <p>
              <strong>{{props.item.author}}</strong>
              <br>
              <span
                style="color:gray"
              >| {{props.item.createdAt.slice(0,10)}}</span>
              <br>
              <span>{{props.item.body}}</span>
            </p>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>              
<script>
export default {
  name: "BoardContentComment",
  data: function() {
    return {
      comment: "",
      c_items: ""
    };
  },
  methods: {
    saveComment() {
      var comments = {
        author: this.$session.get("id"),
        body: this.comment,
        createdAt: this.date
      };
      this.comment = "";
      this.$http
        .post(`/board/post/${this.$route.params.postNumber}/comment`, comments)
        .then(res => {
          console.log(res.data);
          this.getComment();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getComment() {
      this.$http
        .get(`/board/post/${this.$route.params.postNumber}/comment`)
        .then(response => {
          this.c_items = response.data;
          console.log(this.c_items);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getComment();
  }
};
</script>