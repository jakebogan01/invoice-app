<script>
     import { DateInput } from 'date-picker-svelte'
     import { afterUpdate } from 'svelte';

     
     // const randomDate = new Date(timestamp);
     // return randomDate.toDateString().split(" ").slice(1).join(" ");
     
     let date = new Date();

     afterUpdate(() => {
          // console.log(date.toDateString().split(" ").slice(1).join(" "));
     })

     let example = "Next 30 Days";
     let showPaymentTerms = false;

     const test = (event) => {
          example = `Next ${event.target.innerHTML} Days`;
          showPaymentTerms = false;
     }
</script>

<form class="border-2 border-red-500">
     <h1 class="text-xl font-semibold leading-7 text-gray-900 pb-10">New Invoice</h1>
     <div class="space-y-12">
          <div class="border-b border-gray-900/10 pb-12">
               <h2 class="text-base font-semibold leading-7 text-gray-900">Bill From</h2>
               <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="col-span-full">
                         <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                         <div class="mt-2">
                              <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                         </div>
                    </div>

                    <div class="sm:col-span-2 sm:col-start-1">
                         <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
                         <div class="mt-2">
                              <input type="text" name="city" id="city" autocomplete="address-level2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                         </div>
                    </div>

                    <div class="sm:col-span-2">
                         <label for="region" class="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
                         <div class="mt-2">
                              <input type="text" name="region" id="region" autocomplete="address-level1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                         </div>
                    </div>

                    <div class="sm:col-span-2">
                         <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                         <div class="mt-2">
                              <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                         </div>
                    </div>
               </div>
          </div>

          <div class="border-b border-gray-900/10 pb-12">
               <h2 class="text-base font-semibold leading-7 text-gray-900">Bill To</h2>
               <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                         <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Client's name</label>
                         <div class="mt-2">
                              <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                         </div>
                    </div>

                    <div class="sm:col-span-4">
                         <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                         <div class="mt-2">
                              <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                         </div>
                    </div>

                    <div class="col-span-full">
                         <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                         <div class="mt-2">
                              <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                         </div>
                    </div>

                    <div class="sm:col-span-2 sm:col-start-1">
                         <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
                         <div class="mt-2">
                              <input type="text" name="city" id="city" autocomplete="address-level2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                         </div>
                    </div>

                    <div class="sm:col-span-2">
                         <label for="region" class="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
                         <div class="mt-2">
                              <input type="text" name="region" id="region" autocomplete="address-level1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                         </div>
                    </div>

                    <div class="sm:col-span-2">
                         <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                         <div class="mt-2">
                              <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                         </div>
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
                              <span class="block truncate">{ example }</span>
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
                                   {#each {length: 3} as _, i}
                                        <li class="text-gray-900 cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option" aria-selected="true">
                                             <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                                             <span class="font-normal block truncate" on:keydown={()=>{}} on:click={ (event) => { test(event) } }>{ i + 1 }</span>
                                        </li>
                                   {/each}
                              </ul>
                         {/if}
                    </div>
               </div>
               
          </div>
     </div>
   
     <div class="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
          <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
     </div>
</form>