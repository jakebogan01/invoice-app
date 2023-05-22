<script>
     import { onMount } from "svelte";
     import { preferences } from "../stores/invoicesStore";
     import Form from "../components/Form.svelte";

     let showForm = false;
     let amount = [];

     onMount(() => {
          // adding the amounts for each invoice
          let sum = $preferences.map((item) => {
               return item.billToAddress.items.reduce((n, {total}) => n + total, 0);
          });
          amount = [...sum];
     })

     let startFiltering = false;
     let filterArray = [];
     let checkboxValues = {
          paid: "paid",
          pending: "pending",
          draft: "draft",
     }

     const checkForEmptyArray = () => {
          if (filterArray.length < 1) {
               startFiltering = false;
          }
     }

     const handleCheckbox = (event) => {
          checkForEmptyArray();

          if (event.target.checked) {
               // checked
               if (event.target.name == checkboxValues[event.target.name]) {
                    if (filterArray.length < 1) {
                         startFiltering = true;
                         filterArray = [...filterArray, checkboxValues[event.target.name]];
                    }

                    filterArray.forEach(value => {
                         if (value != checkboxValues[event.target.name]) {
                              startFiltering = true;
                              filterArray = [...filterArray, checkboxValues[event.target.name]];
                              // for some reason duplicates are being created here
                              // solution to remove duplicates see below
                              let unique = [...new Set(filterArray)];
                              filterArray = [...unique];
                         }
                         return
                    });
               }
          } else {
               //unchecked
               if (event.target.name == checkboxValues[event.target.name]) {
                    filterArray.forEach(value => {
                         if (value == checkboxValues[event.target.name]) {
                              let index = filterArray.indexOf(checkboxValues[event.target.name]);
                              if (index > -1) {
                                   filterArray.splice(index, 1);
                              }

                              filterArray = [...filterArray];
                         }
                         return
                    });

                    checkForEmptyArray();
               }
          }
     }
</script>

<div class="px-4">
     <button class="w-full bg-red-500 text-white" on:click={ () => { showForm = true } }>New Invoice</button>
</div>

{#if showForm}
     <Form on:click={ () => { showForm = false } } />
{/if}

<div class="space-y-4 px-4 bg-gray-900 text-white min-h-screen">
     <form class="mb-20">
          <div class="border-t border-gray-200 px-4 py-6">
               <h3 class="-mx-2 -my-3 flow-root">
                    <!-- Expand/collapse question button -->
                    <button type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400" aria-controls="filter-section-0" aria-expanded="false">
                         <span class="font-medium text-gray-900">Category</span>
                         <span class="ml-6 flex items-center">
                              <!--
                              Expand/collapse icon, toggle classes based on question open state.
                              Open: "-rotate-180", Closed: "rotate-0"
                              -->
                              <svg class="rotate-0 h-5 w-5 transform" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>
                         </span>
                    </button>
               </h3>
               <div class="pt-6" id="filter-section-0">
                    <div class="space-y-6">
                         <div class="flex items-center">
                              <input on:change={ handleCheckbox } bind:value={ checkboxValues.paid } id="filter-mobile-category-0" name="paid" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              <label for="filter-mobile-category-0" class="ml-3 text-sm text-gray-500">Paid</label>
                         </div>
                         <div class="flex items-center">
                              <input on:change={ handleCheckbox } bind:value={ checkboxValues.pending } id="filter-mobile-category-1" name="pending" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              <label for="filter-mobile-category-1" class="ml-3 text-sm text-gray-500">Pending</label>
                         </div>
                         <div class="flex items-center">
                              <input on:change={ handleCheckbox } bind:value={ checkboxValues.draft } id="filter-mobile-category-2" name="draft" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                              <label for="filter-mobile-category-3" class="ml-3 text-sm text-gray-500">Draft</label>
                         </div>
                    </div>
               </div>
          </div>
     </form>

     {#each $preferences as invoice, i}
          {#if startFiltering}
               {#each filterArray as status}
                    {#if status == invoice?.status}
                         <div>
                              <a href="/{ invoice?.slug }" class="block">
                                   <p>#{ invoice?.slug }</p>
                                   <p>{ invoice?.id }</p>
                                   <p class="text-red-500">$ { amount[i] }</p>
                                   <p>{ invoice?.billToAddress?.name }</p>
                                   <p>Due { invoice?.billToAddress?.dueDate }</p>
                                   <p>{ invoice?.status }</p>
                              </a>
                         </div>
                         <hr>
                    {/if}
               {/each}
          {:else}
               <div>
                    <a href="/{ invoice?.slug }" class="block">
                         <p>#{ invoice?.slug }</p>
                         <p>{ invoice?.id }</p>
                         <p class="text-red-500">$ { amount[i] }</p>
                         <p>{ invoice?.billToAddress?.name }</p>
                         <p>Due { invoice?.billToAddress?.dueDate }</p>
                         <p>{ invoice?.status }</p>
                    </a>
               </div>
               <hr>
          {/if}
     {/each}
</div>