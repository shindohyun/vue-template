<template>
  <v-card class="fill-height px-sm-8 px-4 py-sm-10 py-5">
    <v-card-title>Bulletin Board</v-card-title>
    <v-card-text>
      <v-data-table
        class="elevation-3"
        checkbox-color="primary"
        hide-default-footer
        show-select
        v-model="selected"
        :headers="headers"
        :items="items"
        :server-items-length="total"
        :items-per-page="options.itemsPerPage"
        @page-count="pageCount = $event"
        :options.sync="options"
        :page.sync="options.page"
        :loading="loading">
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-dialog v-model="showDialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="green" dark class="me-3" v-bind="attrs" v-on="on">ADD</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ dialogTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                      <v-row>
                        <v-col>
                          <v-text-field 
                            v-model="targetItem.id"
                            label="ID"
                            outlined
                            dense
                            hide-details
                            :disabled="targetItemIndex != -1">
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field 
                            v-model="targetItem.name"
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
                            v-model="targetItem.email"
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
                            v-model="targetItem.mobile"
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
                            v-model="targetItem.address"
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
                  <v-btn color="blue darken-1" text @click="closeDialog()">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="saveItem()">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="showDeleteDialog" max-width="520px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="red" dark v-bind="attrs" v-on="on">DELETE</v-btn>
              </template>
              <v-card v-if="selected.length > 0">
                <v-card-title class="text-h5 justify-center">Are you sure you want to delete {{ selected.length }} item(s)?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDeleteDialog()">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItem()">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
              <v-card v-else>
                <v-card-title class="text-h5 justify-center">Please select item.</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDeleteDialog()">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:footer>
          <v-container fluid>
            <v-row>
              <v-col v-if="!$vuetify.breakpoint.mobile"/>
              <v-col>
                  <v-pagination
                    v-model="options.page"
                    :length="pageCount"
                    :total-visible="10">
                </v-pagination>
              </v-col>
              <v-col v-if="!$vuetify.breakpoint.mobile">
                <div style="display: flex; align-items: center; float: right;">
                  <p class="text-subtitle-1 my-0">{{ pageStatus }}</p>
                  <v-select
                    class="ms-4"
                    style="max-width: fit-content;"
                    hide-details
                    solo
                    v-model="options.itemsPerPage"
                    :items="itemsPerPageSelectItems"
                    item-text="text"
                    item-value="value"
                    @change="options.page = 1">
                  </v-select>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        </template>
      </v-data-table>
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
    address: ''
  }
}

// 테이블: 등록/수정/삭제, 체크박스, 상세보기
export default {
  name: 'BulletinBoard',
  data:() => ({
    // Table & Pagination
    headers: [
      {
        text: 'NUMBER',
        value: 'number',
        width: '100px'
      },
      {
        text: 'ID',
        value: 'id'
      },
      {
        text: 'NAME',
        value: 'name'
      },
      {
        text: 'EMAIL',
        value: 'email'
      },
      {
        text: 'MOBILE',
        value: 'mobile'
      },
      {
        text: 'ADDRESS',
        value: 'address'
      },
      {
        text: 'ACTIONS',
        value: 'actions',
        sortable: false
      }
    ],
    items: [],
    total: 0,
    pageCount: 0,
    options: {},
    loading: true,
    itemsPerPageSelectItems: [
      {
        text: '5',
        value: 5
      },
      {
        text: '10',
        value: 10
      },
      {
        text: '15',
        value: 15
      },
      {
        text: 'ALL',
        value: 20
      }
    ],
    selected: [],
    // Add & Edit Dialog
    showDialog: false,
    targetItem: generateDefaultItem(),
    targetItemIndex: -1,
    // Delete Dialog
    showDeleteDialog: false
  }),
  computed: {
    // Table & Pagination
    pageStatus() {
      let start = ((this.options.page-1) * this.options.itemsPerPage) + 1
      let end = this.options.page * this.options.itemsPerPage
      end = end > this.total ? this.total : end

      return `${start}-${end} of ${this.total}`
    },
    // Add & Edit Dialog
    dialogTitle() {
      return this.targetItemIndex === -1 ? 'Add' : 'Edit'
    }
  },
  watch: {
    // Table & Pagination
    options: {
      handler() {
        this.getData()
      },
      deep: true
    },
    // Add & Edit Dialog
    showDialog(value) {
      if(!value) {
        this.$nextTick(() => {
          this.targetItem = Object.assign({}, generateDefaultItem())
          this.targetItemIndex = -1
        })
      }
    }
  },
  methods: {
    // Table & Pagination
    getData() {
      this.loading = true
      this.fakeApiCall().then(data => {
        this.items = data.items
        this.total = data.total
        this.loading = false
      })
    },
    fakeApiCall() {
      return new Promise((resolve) => {
        const { sortBy, sortDesc, page, itemsPerPage } = this.options
        
        let items = []

        for(let i = 0; i < 20; i++) {
          let item = generateDefaultItem()
          item.number = i
          item.id = 'id'+i
          item.name = 'name'+i
          item.email = 'email'+i
          item.mobile = 'mobile'+i
          item.address = 'address'+i
          
          items.push(item)
        }
        
        const total = items.length

        if (sortBy.length === 1 && sortDesc.length === 1) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy[0]]
            const sortB = b[sortBy[0]]

            if (sortDesc[0]) {
              if (sortA < sortB) return 1
              if (sortA > sortB) return -1
              return 0
            } else {
              if (sortA < sortB) return -1
              if (sortA > sortB) return 1
              return 0
            }
          })
        }

        if (itemsPerPage > 0) {
          items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        }

        setTimeout(() => {
          resolve({
            items,
            total,
          })
        }, 1000)
      })
    },
    // Add & Edit Dialog
    saveItem() {
      if (this.targetItemIndex > -1) {
        Object.assign(this.items[this.targetItemIndex], this.targetItem)
      } else {
        this.targetItem.number = this.items[this.items.length-1].number + 1
        this.items.push(this.targetItem)
      }
      this.closeDialog()
    },
    editItem(item) {
      this.targetItemIndex = this.items.indexOf(item)
      this.targetItem = Object.assign({}, item)
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
    },
    // Delete Dialog
    deleteItem() {
      this.selected.forEach(item => {
        const index = this.items.indexOf(item)
        this.items.splice(index, 1)
      })
      this.selected = []
      this.closeDeleteDialog()
    },
    closeDeleteDialog() {
      this.showDeleteDialog = false
    }
  }
}
</script>
