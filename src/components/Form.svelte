<script>
     import { preferences } from "../stores/invoicesStore";
     import { DateInput } from 'date-picker-svelte';
     import { theme } from "../stores/darkThemeStore";
     
     export let showForm;
     export let editInvoice = false;
     export let data = null;
     let date = new Date();
     let showPaymentTerms = false;
     let valid = false;
     let saveDraft = false;

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
          },
          items: {
               name: "",
               qty: "",
               price: ""
          }
      };

     const updatePaymentTerms = (event) => {
          formFields.to.dueDateAnnouncement = `Next ${event.target.innerHTML} Days`;
          formFields.to.daysLeft = event.target.innerHTML;

          date.setDate(date.getDate() + Number(formFields.to.daysLeft));
          formFields.to.dueDate = date.toDateString().split(" ").slice(1).join(" ");

          showPaymentTerms = false;
     }

     const validateForm = (field, type, property, e) => {
          valid = true;

          const checkField = (x, y, m, n, e) => {
               if (n) {
                    if ((!/^\d+$/.test(formFields[x][y]) || formFields[x][y].length <= 4 || formFields[x][y].length > 5) && (!/^\d+$/.test(e.target.value) || e.target.value.length <= 4 || e.target.value.length > 5)) {
                         valid = false;
                         errors[x][y] = m;

                    } else {
                         errors[x][y] = "";
                    }
               } else {
                    if (formFields[x][y].trim().length < 2 && e.target.value.trim().length < 2) {
                         valid = false;
                         errors[x][y] = m;
                    } else {
                         errors[x][y] = "";
                    }
               }
          }

          switch (field) {
               case "from-address":
                    checkField(type, property, "can't be empty", false, e);
                    if (editInvoice && e.target.value !== "") {
                         formFields.from.street = e.target.value;
                    }
               break;
               case "from-city":
                    checkField(type, property, "can't be empty", false, e);
                    if (editInvoice && e.target.value !== "") {
                         formFields.from.city = e.target.value;
                    }
               break;
               case "from-state":
                    checkField(type, property, "can't be empty", false, e);
                    if (editInvoice && e.target.value !== "") {
                         formFields.from.state = e.target.value;
                    }
               break;
               case "from-zip":
                    checkField(type, property, "invalid zip / postal code", true, e);
                    if (editInvoice && e.target.value !== "") {
                         formFields.from.zip = e.target.value;
                    }
               break;
               case "to-name":
                    checkField(type, property, "can't be empty", false, e);
                    if (editInvoice && e.target.value !== "") {
                         formFields.to.name = e.target.value;
                    }
               break;
               case "to-email":
                    checkField(type, property, "can't be empty", false, e);
                    if (editInvoice && e.target.value !== "") {
                         formFields.to.email = e.target.value;
                    }
               break;
               case "to-street":
                    checkField(type, property, "can't be empty", false, e);
                    if (editInvoice && e.target.value !== "") {
                         formFields.to.street = e.target.value;
                    }
               break;
               case "to-city":
                    checkField(type, property, "can't be empty", false, e);
                    if (editInvoice && e.target.value !== "") {
                         formFields.to.city = e.target.value;
                    }
               break;
               case "to-state":
                    checkField(type, property, "can't be empty", false, e);
                    if (editInvoice && e.target.value !== "") {
                         formFields.to.state = e.target.value;
                    }
               break;
               case "to-zip":
                    checkField(type, property, "invalid zip / postal code", true, e);
                    if (editInvoice && e.target.value !== "") {
                         formFields.to.zip = e.target.value;
                    }
               break;
               case "to-description":
                    checkField(type, property, "can't be empty", false, e);
                    if (editInvoice && e.target.value !== "") {
                         formFields.to.description = e.target.value;
                    }
               break;
          }

          arrayOfItems.forEach((item) => {
               if (field === "item-name") {
                    if (item.name.trim().length < 2 && e.target.value.trim().length < 2) {
                         valid = false;
                         errors.items.name = "can't be empty";
                    } else {
                         errors.items.name = "";
                         if (editInvoice && e.target.value.trim() !== "") {
                              item.name = e.target.value.trim();
                         }
                    }
               }
               if (field === "item-qty") {
                    if ((!/^\d+$/.test(item.qty) || item.qty.trim().length < 1) && (!/^\d+$/.test(e.target.value) || e.target.value.trim().length < 1)) {
                         valid = false;
                         errors.items.qty = "invalid qty.";
                    } else {
                         errors.items.qty = "";
                         if (editInvoice && e.target.value.trim() !== null) {
                              item.qty = e.target.value.trim();
                         }
                    }
               }
               if (field === "item-price") {
                    if ((!/^\d+$/.test(item.price) || item.price.trim().length < 1) && (!/^\d+$/.test(e.target.value) || e.target.value.trim().length < 1)) {
                         valid = false;
                         errors.items.price = "invalid price.";
                    } else {
                         errors.items.price = "";
                         if (editInvoice && e.target.value.trim() !== null) {
                              item.price = e.target.value.trim();
                         }
                    }
               }
          })
     }

     const handleCreateInvoice = (id) => {
          arrayOfItems.map((item) => {
               item.total = item.qty * item.price;
          })

          if (formFields.to.dueDate == "") {
               date.setDate(date.getDate() + 30);
               formFields.to.dueDate = date.toDateString().split(" ").slice(1).join(" ");
          }

          let status = "pending";

          if (saveDraft) {
               status = "draft";
          }

          let newInvoice = {
               id: id,
               status: status,
               slug: radonSlug.getSlug(),
               billFromAddress: {
                    street: formFields.from.street.trim().toLowerCase(),
                    city: formFields.from.city.trim().toLowerCase(),
                    state: formFields.from.state.trim().toLowerCase(),
                    zip: formFields.from.zip,
               },
               billToAddress: {
                    name: formFields.to.name.trim().toLowerCase(),
                    email: formFields.to.email.trim().toLowerCase(),
                    street: formFields.to.street.trim().toLowerCase(),
                    city: formFields.to.city.trim().toLowerCase(),
                    state: formFields.to.state.trim().toLowerCase(),
                    zip: formFields.to.zip,
                    invoiceDate: formFields.to.invoiceDate,
                    dueDate: formFields.to.dueDate,
                    description: formFields.to.description.trim().toLowerCase(),
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

               showForm = false;
          }
     }

     const handleEditInvoice = () => {
          arrayOfItems.map((item) => {
               item.total = item.qty * item.price;
          })

          if (valid) {
               preferences.update(currentInvoices => {
                    let copiedInvoices = [...currentInvoices];
                    let updatedInvoice = copiedInvoices.find(invoice => invoice.slug === data?.slug);

                    updatedInvoice.billFromAddress.street = formFields.from.street !== "" ? formFields.from.street : updatedInvoice.billFromAddress.street;
                    updatedInvoice.billFromAddress.city = formFields.from.city !== "" ? formFields.from.city : updatedInvoice.billFromAddress.city;
                    updatedInvoice.billFromAddress.state = formFields.from.state !== "" ? formFields.from.state : updatedInvoice.billFromAddress.state;
                    updatedInvoice.billFromAddress.zip = formFields.from.zip !== "" ? formFields.from.zip : updatedInvoice.billFromAddress.zip;
                    
                    updatedInvoice.billToAddress.name = formFields.to.name !== "" ? formFields.to.name : updatedInvoice.billToAddress.name;
                    updatedInvoice.billToAddress.email = formFields.to.email !== "" ? formFields.to.email : updatedInvoice.billToAddress.email;
                    updatedInvoice.billToAddress.street = formFields.to.street !== "" ? formFields.to.street : updatedInvoice.billToAddress.street;
                    updatedInvoice.billToAddress.city = formFields.to.city !== "" ? formFields.to.city : updatedInvoice.billToAddress.city;
                    updatedInvoice.billToAddress.state = formFields.to.state !== "" ? formFields.to.state : updatedInvoice.billToAddress.state;
                    updatedInvoice.billToAddress.zip = formFields.to.zip !== "" ? formFields.to.zip : updatedInvoice.billToAddress.zip;
                    
                    updatedInvoice.billToAddress.description = formFields.to.description !== "" ? formFields.to.description : updatedInvoice.billToAddress.description;
                    
                    return copiedInvoices;
               });

               showForm = false;
          }
     }
 </script>

<div class="fixed inset-0 bg-black bg-opacity-25 transition-opacity z-30"></div>
{#if editInvoice}
     {#each $preferences as invoice}
          {#if invoice?.slug == data?.slug}
               <form on:submit|preventDefault={ handleEditInvoice } class="fixed w-full max-w-[55.3125rem] pt-[5rem] 1440:pt-0 left-1/2 -translate-x-1/2 1440:translate-x-0 1440:left-[5.625rem] bg-[#F9FAFE] dark:bg-[#141625] h-screen overflow-y-auto z-40">
                    <h1 class="font-bold text-2xl text-[#0C0E16] dark:text-white pb-10 px-6 sm:px-14 pt-14">Edit <span class="text-[#888EB0]">#</span>{ invoice?.slug }</h1>
                    <div class="space-y-12 px-6 sm:px-14 pb-14">
                         <div class="pb-4">
                              <h2 class="font-bold text-15 text-[#7C5DFA]">Bill From</h2>
                              <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                   <div class="col-span-full">
                                        <label for="from-street-address" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">Street address</label>
                                        <div class="mt-2">
                                             <input type="text" on:input={ (event) => { validateForm("from-address", "from", "street", event) } } value={ invoice?.billFromAddress?.street } name="from-street-address" id="from-street-address" autocomplete="street-address" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.from.street.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                                        </div>
                                        <p class="text-red-500">{errors.from.street}</p>
                                   </div>

                                   <div class="sm:col-span-2 sm:col-start-1">
                                        <label for="city" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">City</label>
                                        <div class="mt-2">
                                             <input type="text" on:input={ (event) => { validateForm("from-city", "from", "city", event) } } value={ invoice?.billFromAddress?.city } name="city" id="city" autocomplete="address-level2" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.from.city.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                                        </div>
                                        <p class="text-red-500">{errors.from.city}</p>
                                   </div>

                                   <div class="sm:col-span-2">
                                        <label for="region" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">State / Province</label>
                                        <div class="mt-2">
                                             <input type="text" on:input={ (event) => { validateForm("from-state", "from", "state", event) } } value={ invoice?.billFromAddress?.state } name="region" id="region" autocomplete="address-level1" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.from.state.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                                        </div>
                                        <p class="text-red-500">{errors.from.state}</p>
                                   </div>

                                   <div class="sm:col-span-2">
                                        <label for="postal-code" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">ZIP / Postal code</label>
                                        <div class="mt-2">
                                             <input type="text" on:input={ (event) => { validateForm("from-zip", "from", "zip", event) } } value={ invoice?.billFromAddress?.zip } maxlength="5" name="postal-code" id="postal-code" autocomplete="postal-code" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.from.zip.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                                        </div>
                                        <p class="text-red-500">{errors.from.zip}</p>
                                   </div>
                              </div>
                         </div>

                         <div class="pb-4">
                              <h2 class="font-bold text-15 text-[#7C5DFA]">Bill To</h2>
                              <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                   <div class="col-span-full">
                                        <label for="name" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">Client's name</label>
                                        <div class="mt-2">
                                             <input type="text" on:input={ (event) => { validateForm("to-name", "to", "name", event) } } value={ invoice?.billToAddress?.name } name="name" id="name" autocomplete="given-name" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.to.name.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                                        </div>
                                        <p class="text-red-500">{errors.to.name}</p>
                                   </div>

                                   <div class="col-span-full">
                                        <label for="email" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">Client's Email</label>
                                        <div class="mt-2">
                                             <input id="email" on:input={ (event) => { validateForm("to-email", "to", "email", event) } } value={ invoice?.billToAddress?.email } name="email" type="email" autocomplete="email" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.to.email.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                                        </div>
                                        <p class="text-red-500">{errors.to.email}</p>
                                   </div>

                                   <div class="col-span-full">
                                        <label for="street-address" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">Street address</label>
                                        <div class="mt-2">
                                             <input type="text" on:input={ (event) => { validateForm("to-street", "to", "street", event) } } value={ invoice?.billToAddress?.street } name="street-address" id="street-address" autocomplete="street-address" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.to.street.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                                        </div>
                                        <p class="text-red-500">{errors.to.street}</p>
                                   </div>

                                   <div class="sm:col-span-2 sm:col-start-1">
                                        <label for="city" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">City</label>
                                        <div class="mt-2">
                                             <input type="text" on:input={ (event) => { validateForm("to-city", "to", "city", event) } } value={ invoice?.billToAddress?.city } name="city" id="city" autocomplete="address-level2" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.to.city.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                                        </div>
                                        <p class="text-red-500">{errors.to.city}</p>
                                   </div>

                                   <div class="sm:col-span-2">
                                        <label for="region" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">State / Province</label>
                                        <div class="mt-2">
                                             <input type="text" on:input={ (event) => { validateForm("to-state", "to", "state", event) } } value={ invoice?.billToAddress?.state } name="region" id="region" autocomplete="address-level1" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.to.state.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                                        </div>
                                        <p class="text-red-500">{errors.to.state}</p>
                                   </div>

                                   <div class="sm:col-span-2">
                                        <label for="postal-code" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">ZIP / Postal code</label>
                                        <div class="mt-2">
                                             <input type="text" on:input={ (event) => { validateForm("to-zip", "to", "zip", event) } } value={ invoice?.billToAddress?.zip } maxlength="5" name="postal-code" id="postal-code" autocomplete="postal-code" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.to.zip.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                                        </div>
                                        <p class="text-red-500">{errors.to.zip}</p>
                                   </div>
                              </div>

                              <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                   <div class="sm:col-span-3">
                                        <label for="invoice-date" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">Invoice Date</label>
                                        {#if $theme[0].theme == "dark"}
                                             <div class="dark-date relative mt-2">
                                                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                       <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                                  </div>
                                                  <DateInput bind:value={ date } format="MM-dd-yyyy" />
                                             </div>
                                        {:else}
                                             <div class="light-date relative mt-2">
                                                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                       <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                                  </div>
                                                  <DateInput bind:value={ date } format="MM-dd-yyyy" />
                                             </div>
                                        {/if}
                                   </div>
                           
                                   <div class="sm:col-span-3">
                                        <label for="invoice-date" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">Invoice Date</label>
                                        <div class="relative mt-2">
                                             <button on:click={ () => { showPaymentTerms = !showPaymentTerms } } type="button" class="relative bg-[#F9FAFE] dark:bg-[#1F2139] w-full cursor-default rounded-md text-left py-3 px-5 font-base text-15 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-white" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                                                  <span class="block truncate text-15">{ formFields.to.dueDateAnnouncement }</span>
                                                  <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                       <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" /></svg>
                                                  </span>
                                             </button>
                                             {#if showPaymentTerms}
                                                  <ul class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                                                       {#each {length: 60} as _, i}
                                                            <li id="listbox-label[{i}]" class="text-gray-900 hover:bg-gray-200 cursor-pointer select-none py-2 pl-3 pr-9" role="option" aria-selected="true">
                                                                 <span class="font-base block truncate" on:keydown={()=>{}} on:click={ (event) => { updatePaymentTerms(event) } }>{ i + 1 }</span>
                                                            </li>
                                                       {/each}
                                                  </ul>
                                             {/if}
                                        </div>
                                   </div>
                              </div>

                              <div class="mt-6">
                                   <label for="description" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">Project Description</label>
                                   <div class="mt-2">
                                        <input type="text" on:input={ (event) => { validateForm("to-description", "to", "description", event) } } value={ invoice?.billToAddress?.description } name="description" id="description" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.to.description.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                                   </div>
                                   <p class="text-red-500">{errors.to.description}</p>
                              </div>
                         </div>

                         <div class="pb-4">
                              <h2 class="font-bold text-15 text-[#7C5DFA] dark:text-[#767F98]">Item List</h2>
                              <div class="mt-1">
                                   <div class="space-y-4">
                                        {#each invoice.billToAddress.items as item, i}
                                             <div class="flex flex-col sm:flex-row items-center pt-5 sm:space-x-4">
                                                  <input id="item-name" type="text" on:input={ (event) => { validateForm("item-name", false, false, event) } } value={ item?.name } class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.items.name.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white" placeholder="Item Name">
                                                  <div class="mt-4 sm:mt-0 grid grid-cols-3 gap-4">
                                                       <input id="qty" type="text" on:input={ (event) => { validateForm("item-qty", false, false, event) } } value={ item?.qty } class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.items.qty.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white" placeholder="Qty.">
                                                       <input id="price" type="text" on:input={ (event) => { validateForm("item-price", false, false, event) } } value={ item?.price } class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.items.price.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white" placeholder="Price">
                                                       <div id="total" class="flex flex-col justify-end items-center w-full font-bold text-15 text-[#888EB0] dark:text-white"><span class="text-black dark:text-[#767F98]">Total:</span>${ item?.total.toLocaleString("en-US") }</div>
                                                  </div>
                                             </div>
                                        {/each}
                                        <p class="text-red-500">{errors.items.name}</p>
                                        <p class="text-red-500">{errors.items.qty}</p>
                                        <p class="text-red-500">{errors.items.price}</p>
                                   </div>
                              </div>
                         </div>
                    </div>
                    
                    <div class="sticky bottom-0 left-0 bg-white dark:bg-[#141625] w-full h-[6.875rem] px-6 sm:px-14 flex items-center justify-end gap-x-6">
                         <button on:click={ () => { showForm = false } } type="button" class="rounded-full bg-[#F9FAFE] dark:bg-[#252945] w-[6rem] h-[3rem] text-15 font-bold text-[#7D88C2] dark:text-[#DFE3FA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Discard</button>
                         <button type="submit" class="rounded-full bg-[#7C5DFA] w-[8.625rem] h-[3rem] text-15 font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save Changes</button>
                    </div>
               </form>
          {/if}
     {/each}
{:else}
     <form on:submit|preventDefault={ () => { handleCreateInvoice($preferences.length) } } class="fixed w-full max-w-[55.3125rem] pt-[5rem] 1440:pt-0 left-1/2 -translate-x-1/2 1440:translate-x-0 1440:left-[5.625rem] bg-[#F9FAFE] dark:bg-[#141625] h-screen overflow-y-auto z-40">
          <h1 class="font-bold text-2xl text-[#0C0E16] dark:text-white pb-10 px-6 sm:px-14 pt-14">New Invoice</h1>
          <div class="space-y-12 px-6 sm:px-14 pb-14">
               <div class="pb-4">
                    <h2 class="font-bold text-15 text-[#7C5DFA]">Bill From</h2>
                    <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                         <div class="col-span-full">
                              <label for="from-street-address" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">Street address</label>
                              <div class="mt-2">
                                   <input type="text" on:input={ (event) => { validateForm("from-address", "from", "street", event) } } bind:value={ formFields.from.street } name="from-street-address" id="from-street-address" autocomplete="street-address" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.from.street.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                              </div>
                              <p class="text-red-500">{errors.from.street}</p>
                         </div>

                         <div class="sm:col-span-2 sm:col-start-1">
                              <label for="city" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">City</label>
                              <div class="mt-2">
                                   <input type="text" on:input={ (event) => { validateForm("from-city", "from", "city", event) } } bind:value={ formFields.from.city } name="city" id="city" autocomplete="address-level2" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.from.city.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                              </div>
                              <p class="text-red-500">{errors.from.city}</p>
                         </div>

                         <div class="sm:col-span-2">
                              <label for="region" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">State / Province</label>
                              <div class="mt-2">
                                   <input type="text" on:input={ (event) => { validateForm("from-state", "from", "state", event) } } bind:value={ formFields.from.state } name="region" id="region" autocomplete="address-level1" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.from.state.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                              </div>
                              <p class="text-red-500">{errors.from.state}</p>
                         </div>

                         <div class="sm:col-span-2">
                              <label for="postal-code" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">ZIP / Postal code</label>
                              <div class="mt-2">
                                   <input type="text" on:input={ (event) => { validateForm("from-zip", "from", "zip", event) } } bind:value={ formFields.from.zip } maxlength="5" name="postal-code" id="postal-code" autocomplete="postal-code" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.from.zip.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                              </div>
                              <p class="text-red-500">{errors.from.zip}</p>
                         </div>
                    </div>
               </div>

               <div class="pb-4">
                    <h2 class="font-bold text-15 text-[#7C5DFA]">Bill To</h2>
                    <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                         <div class="col-span-full">
                              <label for="name" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">Client's name</label>
                              <div class="mt-2">
                                   <input type="text" on:input={ (event) => { validateForm("to-name", "to", "name", event) } } bind:value={ formFields.to.name } name="name" id="name" autocomplete="given-name" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.to.name.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                              </div>
                              <p class="text-red-500">{errors.to.name}</p>
                         </div>

                         <div class="col-span-full">
                              <label for="email" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">Client's Email</label>
                              <div class="mt-2">
                                   <input id="email" on:input={ (event) => { validateForm("to-email", "to", "email", event) } } bind:value={ formFields.to.email } name="email" type="email" autocomplete="email" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.to.email.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                              </div>
                              <p class="text-red-500">{errors.to.email}</p>
                         </div>

                         <div class="col-span-full">
                              <label for="street-address" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">Street address</label>
                              <div class="mt-2">
                                   <input type="text" on:input={ (event) => { validateForm("to-street", "to", "street", event) } } bind:value={ formFields.to.street } name="street-address" id="street-address" autocomplete="street-address" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.to.street.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                              </div>
                              <p class="text-red-500">{errors.to.street}</p>
                         </div>

                         <div class="sm:col-span-2 sm:col-start-1">
                              <label for="city" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">City</label>
                              <div class="mt-2">
                                   <input type="text" on:input={ (event) => { validateForm("to-city", "to", "city", event) } } bind:value={ formFields.to.city } name="city" id="city" autocomplete="address-level2" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.to.city.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                              </div>
                              <p class="text-red-500">{errors.to.city}</p>
                         </div>

                         <div class="sm:col-span-2">
                              <label for="region" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">State / Province</label>
                              <div class="mt-2">
                                   <input type="text" on:input={ (event) => { validateForm("to-state", "to", "state", event) } } bind:value={ formFields.to.state } name="region" id="region" autocomplete="address-level1" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.to.state.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                              </div>
                              <p class="text-red-500">{errors.to.state}</p>
                         </div>

                         <div class="sm:col-span-2">
                              <label for="postal-code" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">ZIP / Postal code</label>
                              <div class="mt-2">
                                   <input type="text" on:input={ (event) => { validateForm("to-zip", "to", "zip", event) } } bind:value={ formFields.to.zip } maxlength="5" name="postal-code" id="postal-code" autocomplete="postal-code" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.to.zip.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                              </div>
                              <p class="text-red-500">{errors.to.zip}</p>
                         </div>
                    </div>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                         <div class="sm:col-span-3">
                              <label for="invoice-date" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">Invoice Date</label>
                              {#if $theme[0].theme == "dark"}
                                   <div class="dark-date relative mt-2">
                                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                             <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                        </div>
                                        <DateInput bind:value={ date } format="MM-dd-yyyy" />
                                   </div>
                              {:else}
                                   <div class="light-date relative mt-2">
                                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                             <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                        </div>
                                        <DateInput bind:value={ date } format="MM-dd-yyyy" />
                                   </div>
                              {/if}
                         </div>
                 
                         <div class="sm:col-span-3">
                              <label for="invoice-date" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">Invoice Date</label>
                              <div class="relative mt-2">
                                   <button on:click={ () => { showPaymentTerms = !showPaymentTerms } } type="button" class="relative bg-[#F9FAFE] dark:bg-[#1F2139] w-full cursor-default rounded-md text-left py-3 px-5 font-base text-15 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-white" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                                        <span class="block truncate text-15">{ formFields.to.dueDateAnnouncement }</span>
                                        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                             <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" /></svg>
                                        </span>
                                   </button>
                                   {#if showPaymentTerms}
                                        <ul class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                                             {#each {length: 60} as _, i}
                                                  <li id="listbox-label[{i}]" class="text-gray-900 hover:bg-gray-200 cursor-pointer select-none py-2 pl-3 pr-9" role="option" aria-selected="true">
                                                       <span class="font-base block truncate" on:keydown={()=>{}} on:click={ (event) => { updatePaymentTerms(event) } }>{ i + 1 }</span>
                                                  </li>
                                             {/each}
                                        </ul>
                                   {/if}
                              </div>
                         </div>
                    </div>

                    <div class="mt-6">
                         <label for="description" class="block text-13 text-[#7E87C4] dark:text-[#DFE3FA]">Project Description</label>
                         <div class="mt-2">
                              <input type="text" on:input={ (event) => { validateForm("to-description", "to", "description", event) } } bind:value={ formFields.to.description } name="description" id="description" class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.to.description.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white">
                         </div>
                         <p class="text-red-500">{errors.to.description}</p>
                    </div>
               </div>

               <div class="pb-4">
                    <h2 class="font-bold text-15 text-[#7C5DFA] dark:text-[#767F98]">Item List</h2>
                    <div class="mt-1">
                         <div class="space-y-4">
                              {#each numberOfColumns as item, i}
                                   <div class="flex flex-col sm:flex-row items-center pt-5 sm:space-x-4">
                                        <input id="item-name" type="text" on:input={ (event) => { validateForm("item-name", false, false, event) } } bind:value={ arrayOfItems[i].name } class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.items.name.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white" placeholder="Item Name">
                                        <div class="mt-4 sm:mt-0 grid grid-cols-3 gap-4">
                                             <input id="qty" type="text" on:input={ (event) => { validateForm("item-qty", false, false, event) } } bind:value={ arrayOfItems[i].qty } class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.items.qty.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white" placeholder="Qty.">
                                             <input id="price" type="text" on:input={ (event) => { validateForm("item-price", false, false, event) } } bind:value={ arrayOfItems[i].price } class="block bg-[#F9FAFE] dark:bg-[#1F2139] w-full rounded-md border {errors.items.price.length < 1 ? "border-transparent" : "border-red-500"} py-3 px-5 font-base text-15 text-gray-900 dark:text-[#FFFFFF] shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#252945] placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-white" placeholder="Price">
                                             {#if i >= 1}
                                                  <button type="button" on:click={ () => { addColumnOptions(item, i) } } class="flex justify-center items-center rounded-md text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                       <span class="sr-only">Close</span>
                                                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" /></svg>
                                                  </button>
                                             {/if}
                                        </div>
                                   </div>
                              {/each}
                              <p class="text-red-500">{errors.items.name}</p>
                              <p class="text-red-500">{errors.items.qty}</p>
                              <p class="text-red-500">{errors.items.price}</p>
                         </div>
                    </div>
                    <button type="button" on:click={ () => { numberOfColumns = [...numberOfColumns, numberOfColumns.length + 1]; arrayOfItems.push({name: "", qty: null, price: null, total: null}) } } class="mt-4 inline-flex w-full justify-center items-center rounded-full bg-[#635FC7] bg-opacity-20 px-3 h-[3rem] text-15 font-bold text-[#635FC7] hover:text-white shadow-sm hover:bg-opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2">
                         <span class="flex items-center space-x-1">
                              <span>
                                   <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.11001 8V5.09H0.200012V3.395H3.11001V0.5H4.80501V3.395H7.70001V5.09H4.80501V8H3.11001Z" fill="currentColor"/></svg>
                              </span>
                              <span>Add New Column</span>
                         </span>
                    </button>
               </div>
          </div>

          <div class="sticky bottom-0 left-0 bg-white dark:bg-[#141625] w-full h-[6.875rem] px-6 sm:px-14 flex items-center justify-between gap-x-4">
               <button on:click={ () => { showForm = false } } type="button" class="rounded-full bg-[#F9FAFE] w-[6rem] h-[3rem] text-15 font-bold text-[#7E88C3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Discard</button>
               <div class="flex space-x-4">
                    <button on:click={ () => { saveDraft = true } } type="submit" class="rounded-full bg-[#373B53] w-[8.3125rem] h-[3rem] text-15 font-bold text-[#888EB0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save Draft</button>
                    <button type="submit" class="rounded-full bg-[#7C5DFA] w-[8.625rem] h-[3rem] text-15 font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save & Send</button>
               </div>
          </div>
     </form>
{/if}