<template>
    <div class="mx-auto sm:px-12">
        <header class="container">
            <div class="pt-5 position-relative">
                <h2>Countries Catalog</h2>
            </div>
        </header>
        <div class="container mt-5">
            <b-container fluid>
                <!-- User Interface controls -->
                <b-row>
                <b-col lg="6" class="my-1">
                    <b-form-group
                    label="Sort"
                    label-for="sort-by-select"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                    v-slot="{ ariaDescribedby }"
                    >
                    <b-input-group size="sm">
                        <b-form-select
                        id="sort-by-select"
                        v-model="sortBy"
                        :options="sortOptions"
                        :aria-describedby="ariaDescribedby"
                        class="w-75"
                        >
                        <template #first>
                            <option value="">-- none --</option>
                        </template>
                        </b-form-select>

                        <b-form-select
                        v-model="sortDesc"
                        :disabled="!sortBy"
                        :aria-describedby="ariaDescribedby"
                        size="sm"
                        class="w-25"
                        >
                        <option :value="false">Asc</option>
                        <option :value="true">Desc</option>
                        </b-form-select>
                    </b-input-group>
                    </b-form-group>
                </b-col>

                <b-col lg="6" class="my-1">
                    <b-form-group
                    label="Filter"
                    label-for="filter-input"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                    >
                    <b-input-group size="sm">
                        <b-form-input
                        id="filter-input"
                        v-model="filter"
                        type="search"
                        placeholder="Type to Search"
                        ></b-form-input>

                        <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
                    </b-form-group>
                </b-col>

                <b-col sm="5" md="6" class="my-1">
                    <b-form-group
                    label="Per page"
                    label-for="per-page-select"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                    >
                    <b-form-select
                        id="per-page-select"
                        v-model="perPage"
                        :options="pageOptions"
                        size="sm"
                    ></b-form-select>
                    </b-form-group>
                </b-col>

                <b-col sm="7" md="12" class="my-1">
                    <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                    ></b-pagination>
                </b-col>
                </b-row>

                <!-- Main table element -->
                <b-table
                striped hover
                :items="items"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :filter-included-fields="filterOn"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                stacked="md"
                show-empty
                small
                @filtered="onFiltered"
                >

                    <template #cell(flags)="row">
                        <b-img :src=row.value.png rounded="circle" width="50" height="50" :alt=row.value.alt></b-img>    
                    </template>

                    <template #cell(name)="row">
                        <a href="#" @click="info(row.item, row.index, $event.target)">
                            {{ row.value.official }}
                        </a> 
                    </template>
                    
                    <template #cell(nativeName)="row">
                        {{ row.item.name.common }} 
                    </template>

                    <template #cell(altSpellings)="row">
                        {{ row.item.altSpellings.toString() }} 
                    </template>

                    <template #cell(idd)="row">
                        {{ row.item.idd.root }}{{ row.item.idd.suffixes.toString() }}  
                    </template>

                    <template #row-details="row">
                        <b-card>
                        <ul>
                            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                        </ul>
                        </b-card>
                    </template>
                </b-table>

                <!-- Info modal -->
                <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
                    <b-card
                        :title="infoModal.displayContent.name.common"
                        :img-src="infoModal.displayContent.flags.png"
                        :img-alt="infoModal.displayContent.flags.alt"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2"
                    >
                        <b-card-text>
                            {{ infoModal.displayContent.flags.alt }}
                        </b-card-text>
                    </b-card>
                    <!-- <pre>{{ infoModal.content }}</pre> -->
                </b-modal>
            </b-container>
        </div>
    </div>
</template>

<script>
const apiURL = 'https://restcountries.com/v3.1/all?fields=flags,name,cca2,cca3,altSpellings,idd'
import axios from 'axios'
export default {
    data() {
        return {
            items: [],
            fields: [
                { key: 'flags', label: 'Flags', sortable: false, class: 'text-center'},
                { key: 'name', label: 'Country name', sortable: true, sortDirection: 'desc' },
                { key: 'cca2', label: 'CCA2', sortable: false, class: 'text-center' },
                { key: 'cca3', label: 'CCA3', sortable: false, class: 'text-center' },
                { key: 'nativeName', label: 'Native Name' },
                { key: 'altSpellings', label: 'Alternative Country Name', sortable: false, class: 'text-center' },
                { key: 'idd', label: 'Country Calling Code', sortable: false, class: 'text-center' }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 25,
            pageOptions: [25, 50, 100, { value: 250, text: "Show a lot" }],
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            infoModal: {
                id: 'info-modal',
                title: '',
                content: {}
            }
        }
    },
    computed: {
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        }
    },
    mounted() {
        axios.get(apiURL)
            .then((response) => {
                this.items = response.data
                this.totalRows = this.items.length
            })
        // Set the initial number of items
        
    },
    methods: {
        info(item, index, button) {
            this.infoModal.title = `Row index: ${index}`
            this.infoModal.content = JSON.stringify(item, null, 2)
            this.infoModal.displayContent = item
            this.$root.$emit('bv::show::modal', this.infoModal.id, button)
        },
        resetInfoModal() {
            this.infoModal.title = ''
            this.infoModal.content = ''
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        }
    }
}
</script>

<style></style>