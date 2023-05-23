<script>
     import { onMount } from "svelte";
     import { preferences } from "../stores/invoicesStore";
     import Form from "../components/Form.svelte";

     let showForm = false;
     let openFilter = false;
     let amount = [];

     onMount(() => {
          // adding the amounts for each invoice
          let sum = $preferences.map((item) => {
               return item.billToAddress.items.reduce((n, {total}) => n + total, 0).toLocaleString("en-US");
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

<main class="px-6">
     <section class="flex justify-between items-center my-8">
          <div>
               <h1 class="font-bold text-[#0C0E16] dark:text-white text-2xl leading-[1.5625rem]">Invoices</h1>
               <span class="text-13 text-[#888DB1] dark:text-[#DFE3FA]">{ $preferences.length } Invoices</span>
          </div>

          <div class="flex items-center">
               <form>
                    <div class="relative">
                         <h3 class="flow-root">
                              <button on:click={ () => { openFilter = !openFilter } } type="button" class="flex w-full items-center justify-between px-2 py-3 text-sm text-gray-400" aria-controls="filter-section-0" aria-expanded="false">
                                   <span class="font-bold text-15 text-[#0C0E16] dark:text-white">Filter</span>
                                   <span class="ml-1.5 flex items-center text-[#7C5DFA] {openFilter ? "rotate-180" : "rotate-0"}">
                                        <svg class="rotate-0 h-5 w-5 transform" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>
                                   </span>
                              </button>
                         </h3>
                         {#if openFilter}
                              <div class="absolute top-12 right-0 bg-white dark:bg-[#252945] shadow-lg w-[12rem] p-6 text-15 font-bold text-[#1F2139] dark:text-white rounded-xl space-y-4" id="filter-section-0">
                                   <div class="flex items-center">
                                        <input on:change={ handleCheckbox } bind:value={ checkboxValues.paid } id="filter-mobile-category-0" name="paid" type="checkbox" class="h-4 w-4 rounded border-[#7C5DFA] bg-[#DFE3FA] dark:bg-[#1F2139] text-[#7C5DFA] focus:ring-[#7C5DFA]">
                                        <label for="filter-mobile-category-0" class="ml-3">Paid</label>
                                   </div>
                                   <div class="flex items-center">
                                        <input on:change={ handleCheckbox } bind:value={ checkboxValues.pending } id="filter-mobile-category-1" name="pending" type="checkbox" class="h-4 w-4 rounded border-[#7C5DFA] bg-[#DFE3FA] dark:bg-[#1F2139] text-[#7C5DFA] focus:ring-[#7C5DFA]">
                                        <label for="filter-mobile-category-1" class="ml-3">Pending</label>
                                   </div>
                                   <div class="flex items-center">
                                        <input on:change={ handleCheckbox } bind:value={ checkboxValues.draft } id="filter-mobile-category-2" name="draft" type="checkbox" class="h-4 w-4 rounded border-[#7C5DFA] bg-[#DFE3FA] dark:bg-[#1F2139] text-[#7C5DFA] focus:ring-[#7C5DFA]">
                                        <label for="filter-mobile-category-3" class="ml-3">Draft</label>
                                   </div>
                              </div>
                         {/if}
                    </div>
               </form>

               <button on:click={ () => { showForm = true } } type="button" class="flex items-center bg-[#7C5DFA] text-white py-1.5 pl-1.5 pr-3.5 font-bold text-15 rounded-full">
                    <div class="flex justify-center items-center bg-white w-8 h-8 mr-1.5 rounded-full">
                         <img src="/icon-plus.svg" role="presentation">
                    </div>
                    <span>New</span>
               </button>
          </div>
     </section>

     {#if showForm}
          <Form bind:showForm={showForm} />
     {/if}

     <div class="space-y-4">
          {#if $preferences.length == 0}
               <div class="flex flex-col justify-center items-center mt-[6.25rem] text-center">
                    <img src="/illustration-empty.svg" alt="empty" class="h-[10rem] md:h-auto">
                    <h1 class="font-bold text-2xl text-[#0C0E16] dark:text-white mt-10 mb-4">There is nothing here</h1>
                    <p class="text-[#888DB0] dark:text-white leading-tight">Create an invoice by clicking the<br><b>New</b> button and get started</p>
               </div>
          {/if}
          {#each $preferences as invoice, i}
               {#if startFiltering}
                    {#each filterArray as status}
                         {#if status == invoice?.status}
                              <div class="bg-white dark:bg-[#1F2139] rounded-lg overflow-hidden">
                                   <a href="/{ invoice?.slug }" class="flex justify-between items-start py-7 px-6">
                                        <div>
                                             <p class="font-bold text-15 text-[#7D88C2]">#<span class="text-[#0C0E16] dark:text-white">{ invoice?.slug }</span></p>
                                             <p class="text-13 text-[#7E88C3] dark:text-[#DFE3FA] mt-5">Due { invoice?.billToAddress?.dueDate }</p>
                                             <p class="font-bold text-15 text-[#0C0E16] dark:text-white mt-2">$ { amount[i] }</p>
                                        </div>
                                        <div>
                                             <p class="text-13 text-[#858BB2] dark:text-white">{ invoice?.billToAddress?.name }</p>
                                             {#if invoice?.status == "pending"}
                                                  <div class="flex justify-center items-center bg-[#FFF9F0] dark:bg-[#2B2736] font-bold text-15 text-[#FF8F00] w-[6.5rem] h-10 mt-[1.625rem] rounded-md">
                                                       <div class="bg-[#FF8F00] w-2 h-2 rounded-full"></div>
                                                       <span class="capitalize ml-2">{ invoice?.status }</span>
                                                  </div>
                                             {:else if invoice?.status == "draft"}
                                                  <div class="flex justify-center items-center bg-[#F4F4F5] dark:bg-[#2A2C44] font-bold text-15 text-[#373B53] dark:text-[#DFE3FA] w-[6.5rem] h-10 mt-[1.625rem] rounded-md">
                                                       <div class="bg-[#373B53] dark:bg-[#DFE3FA] w-2 h-2 rounded-full"></div>
                                                       <span class="capitalize ml-2">{ invoice?.status }</span>
                                                  </div>
                                             {:else}
                                                  <div class="flex justify-center items-center bg-[#F3FDFA] dark:bg-[#1E2B3F] font-bold text-15 text-[#33D69F] w-[6.5rem] h-10 mt-[1.625rem] rounded-md">
                                                       <div class="bg-[#33D69F] w-2 h-2 rounded-full"></div>
                                                       <span class="capitalize ml-2">{ invoice?.status }</span>
                                                  </div>
                                             {/if}
                                        </div>
                                   </a>
                              </div>
                         {/if}
                    {/each}
               {:else}
                    <div class="bg-white dark:bg-[#1F2139] rounded-lg overflow-hidden">
                         <a href="/{ invoice?.slug }" class="flex justify-between items-start py-7 px-6">
                              <div>
                                   <p class="font-bold text-15 text-[#7D88C2]">#<span class="text-[#0C0E16] dark:text-white">{ invoice?.slug }</span></p>
                                   <p class="text-13 text-[#7E88C3] dark:text-[#DFE3FA] mt-5">Due { invoice?.billToAddress?.dueDate }</p>
                                   <p class="font-bold text-15 text-[#0C0E16] dark:text-white mt-2">$ { amount[i] }</p>
                              </div>
                              <div>
                                   <p class="text-13 text-[#858BB2] dark:text-white">{ invoice?.billToAddress?.name }</p>
                                   {#if invoice?.status == "pending"}
                                        <div class="flex justify-center items-center bg-[#FFF9F0] dark:bg-[#2B2736] font-bold text-15 text-[#FF8F00] w-[6.5rem] h-10 mt-[1.625rem] rounded-md">
                                             <div class="bg-[#FF8F00] w-2 h-2 rounded-full"></div>
                                             <span class="capitalize ml-2">{ invoice?.status }</span>
                                        </div>
                                   {:else if invoice?.status == "draft"}
                                        <div class="flex justify-center items-center bg-[#F4F4F5] dark:bg-[#2A2C44] font-bold text-15 text-[#373B53] dark:text-[#DFE3FA] w-[6.5rem] h-10 mt-[1.625rem] rounded-md">
                                             <div class="bg-[#373B53] dark:bg-[#DFE3FA] w-2 h-2 rounded-full"></div>
                                             <span class="capitalize ml-2">{ invoice?.status }</span>
                                        </div>
                                   {:else}
                                        <div class="flex justify-center items-center bg-[#F3FDFA] dark:bg-[#1E2B3F] font-bold text-15 text-[#33D69F] w-[6.5rem] h-10 mt-[1.625rem] rounded-md">
                                             <div class="bg-[#33D69F] w-2 h-2 rounded-full"></div>
                                             <span class="capitalize ml-2">{ invoice?.status }</span>
                                        </div>
                                   {/if}
                              </div>
                         </a>
                    </div>
               {/if}
          {/each}
     </div>
</main>