<script>
     import { preferences } from "../stores/invoicesStore";
     import { goto } from '$app/navigation';
     import { DateInput } from 'date-picker-svelte'
     
     let date = new Date();
     let showPaymentTerms = false;
     let valid = false;

     let formItemField = {newTaskSubtask: []};
     let numberOfColumns = [1];
     let arrayOfItems = [
          { 
               name: "",
               qty: null,
               price: null,
               total: null
          }
     ];
     const addColumnOptions = (i, x, viewingTask) => {
          const index = numberOfColumns.indexOf(i);
          if (viewingTask && index > -1) {
               numberOfColumns.splice(index, 1);
               formItemField.newTaskSubtask.splice(x, 1);
               numberOfColumns = [...numberOfColumns];
               formItemField.newTaskSubtask = [...formItemField.newTaskSubtask];
               return;
          }
          if (index > -1) {
               numberOfColumns.splice(index, 1);
               arrayOfItems.splice(x, 1);
               numberOfColumns = [...numberOfColumns];
               arrayOfItems = [...arrayOfItems];
          }
     }

     class GenerateRandomSlug {
          getSlug() {
               let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
               let result = "";

               for (let i = 0; i < 6; i++) {
                    result += characters[Math.floor(Math.random() * characters.length)];
               }

               return result;
          }
     }
     const radonSlug = new GenerateRandomSlug();

     let formFields = {
          status: "",
          from: {
               street: "",
               city: "",
               state: "",
               zip: ""
          },
          to: {
               name: "",
               email: "",
               street: "",
               city: "",
               state: "",
               zip: null,
               invoiceDate: date.toDateString().split(" ").slice(1).join(" "),
               dueDate: "",
               daysLeft: 30,
               dueDateAnnouncement: "Next 30 Days",
               description: ""
          }
     }

     let errors = { 
          from: {
               street: "",
               city: "",
               state: "",
               zip: ""
          },
          to: {
               name: "",
               email: "",
               street: "",
               city: "",
               state: "",
               zip: "",
               description: ""
          }
      };

     const updatePaymentTerms = (event) => {
          formFields.to.dueDateAnnouncement = `Next ${event.target.innerHTML} Days`;
          formFields.to.daysLeft = event.target.innerHTML;

          let result = date;
          result.setDate(result.getDate() + 1);
          formFields.to.dueDate = result.toDateString().split(" ").slice(1).join(" ");

          showPaymentTerms = false;
     }

     const test = (field, type, property) => {
          valid = true;

          const checkField = (x, y, m, n) => {
               if (n) {
                    if (!/^\d+$/.test(formFields[x][y].trim()) || formFields[x][y].trim().length <= 4 || formFields[x][y].trim().length > 5) {
                         valid = false;
                         errors[x][y] = m;

                    } else {
                         errors[x][y] = "";
                    }
               } else {
                    if (formFields[x][y].trim().length < 2) {
                         valid = false;
                         errors[x][y] = m;
                    } else {
                         errors[x][y] = "";
                    }
               }
          }

          switch (field) {
               case "from-address":
               checkField(type, property, "can't be empty");
               break;
               case "from-city":
               checkField(type, property, "can't be empty");
               break;
               case "from-state":
               checkField(type, property, "can't be empty");
               break;
               case "from-zip":
               checkField(type, property, "invalid zip / postal code", true);
               break;
               case "to-name":
               checkField(type, property, "can't be empty");
               break;
          }
     }

     const handleCreateInvoice = (id) => {
          arrayOfItems.map((item) => {
               item.total = item.qty * item.price;
          })

          let newInvoice = {
               id: id,
               status: "paid",
               slug: radonSlug.getSlug(),
               billFromAddress: {
                    street: formFields.from.street,
                    city: formFields.from.city,
                    state: formFields.from.state,
                    zip: formFields.from.zip,
               },
               billToAddress: {
                    name: formFields.to.name,
                    email: formFields.to.email,
                    street: formFields.to.street,
                    city: formFields.to.city,
                    state: formFields.to.state,
                    zip: formFields.to.zip,
                    invoiceDate: formFields.to.invoiceDate,
                    dueDate: formFields.to.dueDate,
                    description: formFields.to.description,
                    items: [...arrayOfItems],
               },
          };

          if (valid) {
               preferences.update(currentInvoices => {
                    currentInvoices.forEach((invoice) => {
                         if (invoice.id === id) {
                              newInvoice.id += 1;
                         }
                    });
                    
                    return [...currentInvoices, newInvoice];
               });

               preferences.update(currentInvoices => {
                    console.log(currentInvoices);
               });

               goto("/");
          }
     }
</script>

<form on:submit|preventDefault={ () => { handleCreateInvoice($preferences.length) } } class="border-2 border-red-500">
     <h1 class="text-xl font-semibold leading-7 text-gray-900 pb-10">New Invoice</h1>
     <div class="space-y-12">
          <div class="border-b border-gray-900/10 pb-12">
               <h2 class="text-base font-semibold leading-7 text-gray-900">Bill From</h2>
               <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="col-span-full">
                         <label for="from-street-address" class="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                         <div class="mt-2">
                              <input type="text" on:change={ () => { test("from-address", "from", "street") } } bind:value={ formFields.from.street } name="from-street-address" id="from-street-address" autocomplete="street-address" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                         </div>
                         <p class="text-red-500">{errors.from.street}</p>
                    </div>

                    <div class="sm:col-span-2 sm:col-start-1">
                         <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
                         <div class="mt-2">
                              <input type="text" on:change={ () => { test("from-city", "from", "city") } } bind:value={ formFields.from.city } name="city" id="city" autocomplete="address-level2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                         </div>
                         <p class="text-red-500">{errors.from.city}</p>
                    </div>

                    <div class="sm:col-span-2">
                         <label for="region" class="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
                         <div class="mt-2">
                              <input type="text" on:change={ () => { test("from-state", "from", "state") } } bind:value={ formFields.from.state } name="region" id="region" autocomplete="address-level1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                         </div>
                         <p class="text-red-500">{errors.from.state}</p>
                    </div>

                    <div class="sm:col-span-2">
                         <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                         <div class="mt-2">
                              <input type="text" on:change={ () => { test("from-zip", "from", "zip") } } bind:value={ formFields.from.zip } name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                         </div>
                         <p class="text-red-500">{errors.from.zip}</p>
                    </div>
               </div>
          </div>

          <div class="border-b border-gray-900/10 pb-12">
               <h2 class="text-base font-semibold leading-7 text-gray-900">Bill To</h2>
               <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                         <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Client's name</label>
                         <div class="mt-2">
                              <input type="text" on:change={ () => { test("to-name", "to", "name") } } bind:value={ formFields.to.name } name="name" id="name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                         </div>
                         <p class="text-red-500">{errors.to.name}</p>
                    </div>

                    <div class="sm:col-span-4">
                         <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                         <div class="mt-2">
                              <input id="email" bind:value={ formFields.to.email } name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                         </div>
                         <p class="text-red-500">{errors.to.email}</p>
                    </div>

                    <div class="col-span-full">
                         <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                         <div class="mt-2">
                              <input type="text" bind:value={ formFields.to.street } name="street-address" id="street-address" autocomplete="street-address" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                         </div>
                         <p class="text-red-500">{errors.to.street}</p>
                    </div>

                    <div class="sm:col-span-2 sm:col-start-1">
                         <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
                         <div class="mt-2">
                              <input type="text" bind:value={ formFields.to.city } name="city" id="city" autocomplete="address-level2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                         </div>
                         <p class="text-red-500">{errors.to.city}</p>
                    </div>

                    <div class="sm:col-span-2">
                         <label for="region" class="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
                         <div class="mt-2">
                              <input type="text" bind:value={ formFields.to.state } name="region" id="region" autocomplete="address-level1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                         </div>
                         <p class="text-red-500">{errors.to.state}</p>
                    </div>

                    <div class="sm:col-span-2">
                         <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                         <div class="mt-2">
                              <input type="text" bind:value={ formFields.to.zip } name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                         </div>
                         <p class="text-red-500">{errors.to.zip}</p>
                    </div>
               </div>

               <div class="relative max-w-sm">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                    </div>
                    <DateInput bind:value={ date } format="MM-dd-yyyy" />
               </div>

               <div>
                    <label id="listbox-label" class="block text-sm font-medium leading-6 text-gray-900">Assigned to</label>
                    <div class="relative mt-2">
                         <button on:click={ () => { showPaymentTerms = true } } type="button" class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                              <span class="block truncate">{ formFields.to.dueDateAnnouncement }</span>
                              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                   <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" /></svg>
                              </span>
                         </button>
                         {#if showPaymentTerms}
                              <ul class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                                   <!--
                                   Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
                                   Highlighted: "bg-indigo-600 text-white", Not Highlighted: "text-gray-900"
                                   -->
                                   {#each {length: 60} as _, i}
                                        <li class="text-gray-900 cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option" aria-selected="true">
                                             <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                                             <span class="font-normal block truncate" on:keydown={()=>{}} on:click={ (event) => { updatePaymentTerms(event) } }>{ i + 1 }</span>
                                        </li>
                                   {/each}
                              </ul>
                         {/if}
                    </div>
               </div>

               <div>
                    <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Project Description</label>
                    <div class="mt-2">
                         <input type="text" bind:value={ formFields.to.description } name="description" id="description" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                    <p class="text-red-500">{errors.to.description}</p>
               </div>
               
          </div>

          <div class="border-b border-gray-900/10 pb-12">
               <h2 class="text-base font-semibold leading-7 text-gray-900">Item List</h2>
               
               <div class="mt-5">
                    <span class="block text-xs font-bold leading-6 text-[#828FA3]">Columns</span>
                    <div class="mt-2 space-y-4">
                         {#each numberOfColumns as item, i}
                              <div class="flex items-center space-x-4">
                                   <input type="text" bind:value={ arrayOfItems[i].name } class="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="e.g. ToDo" required>
                                   <input type="text" bind:value={ arrayOfItems[i].qty } class="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="e.g. ToDo" required>
                                   <input type="text" bind:value={ arrayOfItems[i].price } class="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="e.g. ToDo" required>
                                   <button type="button" on:click={ () => { addColumnOptions(item, i) } } class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        <span class="sr-only">Close</span>
                                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                   </button>
                              </div>
                         {/each}
                    </div>
               </div>
               <button type="button" on:click={ () => { numberOfColumns = [...numberOfColumns, numberOfColumns.length + 1]; arrayOfItems.push({name: "", qty: null, price: null, test: name}) } } class="inline-flex w-full justify-center items-center rounded-md bg-[#635FC7] bg-opacity-20 px-3 h-10 text-sm font-semibold text-[#635FC7] hover:text-white shadow-sm hover:bg-opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2">
                    <span class="flex items-center space-x-1">
                         <span>
                              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.11001 8V5.09H0.200012V3.395H3.11001V0.5H4.80501V3.395H7.70001V5.09H4.80501V8H3.11001Z" fill="currentColor"/></svg>
                         </span>
                         <span>Add New Column</span>
                    </span>
               </button>
          </div>
     </div>
   
     <div class="mt-6 flex items-center justify-end gap-x-6">
          <button on:click type="button" class="text-sm font-semibold leading-6 text-gray-900">Discard</button>
          <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save & Send</button>
     </div>
</form>