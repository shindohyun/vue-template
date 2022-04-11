<template>
  <v-card class="fill-height px-sm-8 px-4 py-sm-10 py-5">
    <v-card-title>Card List</v-card-title>
    <v-card-text>
      <v-container fluid>
        <v-row
          v-if="loading"
          justify="space-between"
          class="mb-8">
          <v-col cols="auto" v-for="i in 20" :key="i">
            <v-skeleton-loader
              width="300"
              height="300"
              v-bind="skeletonAttrs"
              type="list-item-avatar, divider, list-item-two-line, list-item-two-line, list-item-two-line"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row
          v-else
          justify="space-between"
          class="mb-8">
          <v-col cols="auto" v-for="(item, i) in items" :key="i">
            <v-card width="300">
              <v-app-bar flat height="100" :color="item.color" dark>
                <v-card-title class="white--text text-sm-h4 text-h5">
                  <v-avatar size="56" class="mr-3">
                    <img src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light">
                  </v-avatar>
                  {{ item.id }}
                </v-card-title>
                <v-spacer></v-spacer>
                <v-menu bottom left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="white" dark icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item v-for="(menuItem, i) in menu" :key="i" @click="menuAction(menuItem.action, item)">
                      <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-app-bar>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="5" sm="4" class="text-sm-subtitle-1 text-subtitle-2">이름</v-col>
                    <v-col class="text-sm-subtitle-1 text-subtitle-2">{{ item.name }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="5" sm="4" class="text-sm-subtitle-1 text-subtitle-2">이메일</v-col>
                    <v-col class="text-sm-subtitle-1 text-subtitle-2">{{ item.email }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="5" sm="4" class="text-sm-subtitle-1 text-subtitle-2">전화번호</v-col>
                    <v-col class="text-sm-subtitle-1 text-subtitle-2">{{ item.mobile }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="5" sm="4" class="text-sm-subtitle-1 text-subtitle-2">주소</v-col>
                    <v-col class="text-sm-subtitle-1 text-subtitle-2">{{ item.address }}</v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
          <v-dialog v-model="showEditDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                    <v-row>
                      <v-col>
                        <v-text-field 
                          v-model="selected.id"
                          label="ID"
                          outlined
                          dense
                          hide-details>
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field 
                          v-model="selected.name"
                          label="NAME"
                          outlined
                          dense
                          hide-details>
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field 
                          v-model="selected.email"
                          label="EMAIL"
                          outlined
                          dense
                          hide-details>
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field 
                          v-model="selected.mobile"
                          label="MOBILE"
                          outlined
                          dense
                          hide-details>
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field 
                          v-model="selected.address"
                          label="ADDRESS"
                          outlined
                          dense
                          hide-details>
                        </v-text-field>
                      </v-col>
                    </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeEditDialog()">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="editItem()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="showDeleteDialog" max-width="520px">
            <v-card>
              <v-card-title class="text-h5 justify-center">Are you sure you want to delete item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteDialog()">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItem()">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
function generateDefaultItem() {
  return {
    number: 0,
    id: '',
    name: '',
    email: '',
    mobile: '',
    address: '',
    color: ''
  }
}

export default {
  name: 'CardList',
  data:() => ({
    skeletonAttrs: {
      elevation: 2
    },
    menu: [
      { title: 'Edit', action: 'edit' },
      { title: 'Delete', action: 'delete' }
    ],
    items: [],
    loading: true,
    selectedIndex: 0,
    selected: {},
    // Edit Dialog
    showEditDialog: false,
    // Delete Dialog
    showDeleteDialog: false
  }),
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      this.fakeApiCall().then(data => {
        this.items = data.items
        this.loading = false
      })
    },
    fakeApiCall() {
      return new Promise((resolve) => {        
        let items = []

        for(let i = 0; i < 20; i++) {
          let item = generateDefaultItem()
          item.number = i
          item.id = 'id'+i
          item.name = 'name'+i
          item.email = 'email'+i
          item.mobile = 'mobile'+i
          item.address = 'address'+i
          item.color = this.getRandomColor()

          items.push(item);
        }
        
        setTimeout(() => {
          resolve({
            items
          })
        }, 1000)
      })
    },
    getRandomColor() {
      return '#'+(Math.random()*0xFFFFFF<<0).toString(16)
    },
    menuAction(action, item) {
      switch(action) {
        case 'edit':
          this.selectedIndex = this.items.indexOf(item)
          this.selected = Object.assign({}, item)
          this.showEditDialog = true
          break
        case 'delete':
          this.selected = item
          this.showDeleteDialog = true
          break
      }
    },
    // Edit Dialog
    editItem() {
      Object.assign(this.items[this.selectedIndex], this.selected)
      this.closeEditDialog()
    },
    closeEditDialog() {
      this.showEditDialog = false
    },
    // Delete Dialog
    deleteItem() {
      const index = this.items.indexOf(this.selected)
      this.items.splice(index, 1)
      this.selected = {}
      this.closeDeleteDialog()
    },
    closeDeleteDialog() {
      this.showDeleteDialog = false
    }
  }
}
</script>
