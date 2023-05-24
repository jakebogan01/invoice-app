<script>
     import { onMount } from "svelte";
     import { preferences } from "../stores/invoicesStore";
     import Button from "../components/Button.svelte";
     import Status from "./Status.svelte";
     export let data;
     export let editInvoice;
     export let delteModal;

     let amount;

     onMount(() => {
          // adding the amounts for each item and qty
          let sum = $preferences.map((item) => {
               if (item?.slug === data?.slug) {
                    return item.billToAddress.items.reduce((n, {total}) => n + total, 0);
               }
          });

          // removes undefined items in array
          sum = sum.filter(item => item !== undefined);
          
          amount = sum;
     })

     const handleUpdateStatusToPaid = () => {
          preferences.update(currentInvoices => {
               let copiedInvoices = [...currentInvoices];
               let updatedInvoice = copiedInvoices.find(invoice => invoice?.slug === data?.slug);

               updatedInvoice.status = "paid";

               return copiedInvoices;
          });
     }
</script>

<section style="margin-bottom: 200px;">
     {#each $preferences as invoice}
          {#if invoice?.slug === data?.slug}
               <div class="flex justify-between items-center bg-white dark:bg-[#1F2139] p-6 rounded-lg overflow-hidden">
                    <div class="flex-1 flex justify-between md:justify-start items-center md:space-x-8">
                         <Status invoice={ invoice } />
                    </div>
                    <div class="hidden md:flex items-center justify-between space-x-2">
                         <Button on:click={ () => { editInvoice = true } } style="flex justify-center items-center w-[4.5625rem] h-12 bg-[#F9FAFE] dark:bg-[#252945] hover:bg-[#DFE3FA] dark:hover:bg-white dark:hover:text-[#7E88C3] font-bold text-15 text-[#7E88C3] dark:text-white rounded-full">Edit</Button>
                         <Button on:click={ () => { delteModal = true } } style="flex justify-center items-center w-[5.5625rem] h-12 bg-[#EC5757] hover:bg-[#FF9797] font-bold text-15 text-white rounded-full">Delete</Button>
                         <Button on:click={ handleUpdateStatusToPaid } style="flex justify-center items-center w-[9.3125rem] h-12 bg-[#7C5DFA] hover:bg-[#9277FF] font-bold text-15 text-white rounded-full">Mark as Paid</Button>
                    </div>
               </div>

               <div class="bg-white dark:bg-[#1F2139] mt-4 p-6 text-13 text-[#7E88C3] dark:text-[#DFE3FA] rounded-lg overflow-hidden">
                    <div class="flex flex-col sm:flex-row sm:justify-between">
                         <div>
                              <p class="font-bold text-15 text-[#0C0E16] dark:text-white"><span class="text-[#7E88C3]">#</span>{ invoice?.slug }</p>
                              <p>{ invoice?.billToAddress?.description ? invoice?.billToAddress?.description : "Missing" }</p>
                         </div>
     
                         <div class="sm:text-right">
                              <p class="mt-6 sm:mt-0">{ invoice?.billFromAddress?.street ? invoice?.billFromAddress?.street : "Missing" }</p>
                              <p>{ invoice?.billFromAddress?.city ? invoice?.billFromAddress?.city : "Missing" }, { invoice?.billFromAddress?.state ? invoice?.billFromAddress?.state : "Missing" }, { invoice?.billFromAddress?.zip ? invoice?.billFromAddress?.zip : "Missing" }</p>
                         </div>
                    </div>

                    <div class="flex flex-wrap justify-start space-y-6 my-6 sm:my-12">
                         <div>
                              <h3 class="mb-1">Invoice Date</h3>
                              <p class="font-bold text-15 text-[#0C0E16] dark:text-white mb-6">{ invoice?.billToAddress?.invoiceDate ? invoice?.billToAddress?.invoiceDate : "Missing" }</p>

                              <h3 class="mb-1">Payment Due</h3>
                              <p class="font-bold text-15 text-[#0C0E16] dark:text-white">{ invoice?.billToAddress?.dueDate ? invoice?.billToAddress?.dueDate : "Missing" }</p>
                         </div>
                         <div class="mx-8 sm:mx-24">
                              <h3 class="mb-1">Bill To</h3>
                              <p class="font-bold text-15 text-[#0C0E16] dark:text-white mb-1">{ invoice?.billToAddress?.name ? invoice?.billToAddress?.name : "Missing" }</p>
                              
                              <p>{ invoice?.billFromAddress?.street ? invoice?.billFromAddress?.street : "Missing" }</p>
                              <p>{ invoice?.billFromAddress?.city ? invoice?.billFromAddress?.city : "Missing" }, { invoice?.billFromAddress?.state ? invoice?.billFromAddress?.state : "Missing" }, { invoice?.billFromAddress?.zip ? invoice?.billFromAddress?.zip : "Missing" }</p>
                         </div>
                         <div>
                              <h3 class="mb-1">Sent to</h3>
                              <p class="font-bold text-15 text-[#0C0E16] dark:text-white mb-6">{ invoice?.billToAddress?.email ? invoice?.billToAddress?.email : "Missing" }</p>
                         </div>
                    </div>

                    <div class="bg-[#F9FAFE] dark:bg-[#252945] pt-6 space-y-4 rounded-lg overflow-hidden">
                         <div class="hidden md:block px-6">
                              <table class="min-w-full">
                                   <thead>
                                        <tr>
                                             <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-13 font-medium text-[#7E88C3] dark:text-[#DFE3FA] sm:pl-0">Item Name</th>
                                             <th scope="col" class="px-3 py-3.5 text-center text-13 font-medium text-[#7E88C3] dark:text-[#DFE3FA]">QTY.</th>
                                             <th scope="col" class="px-3 py-3.5 text-left text-13 font-medium text-[#7E88C3] dark:text-[#DFE3FA]">Price</th>
                                             <th scope="col" class="px-3 py-3.5 text-right text-13 font-medium text-[#7E88C3] dark:text-[#DFE3FA]">Total</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {#each invoice?.billToAddress?.items as item}
                                             <tr>
                                                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-15 font-bold text-[#0C0E16] dark:text-white sm:pl-0">{ item?.name ? item?.name : "Missing" }</td>
                                                  <td class="whitespace-nowrap px-3 py-4 text-15 font-bold text-[#7E88C3] dark:text-white text-center">{ item?.qty ? item?.qty : "0" }</td>
                                                  <td class="whitespace-nowrap px-3 py-4 text-15 font-bold text-[#7E88C3] dark:text-white text-left">${ item?.price ? item?.price : "0" }</td>
                                                  <td class="whitespace-nowrap px-3 py-4 text-15 font-bold text-[#0C0E16] dark:text-white text-right">${ item?.total ? item?.total : "0" }</td>
                                             </tr>
                                        {/each}
                                   </tbody>
                              </table>
                         </div>
                         <div class="md:hidden">
                              {#each invoice?.billToAddress?.items as item}   
                                   <div class="flex justify-between items-center px-6">
                                        <div>
                                             <h3 class="font-bold text-15 text-[#0C0E16] dark:text-white">{ item?.name ? item?.name : "Missing" }</h3>
                                             <p class="font-bold text-15 text-[#7E88C3]">{ item?.qty ? item?.qty : "0" } x ${ item?.price ? item?.price : "0" }</p>
                                        </div>
                                        <div>
                                             <p class="font-bold text-15 text-[#0C0E16] dark:text-white">$ { item?.total ? item?.total.toLocaleString("en-US")  : "0" }</p>
                                        </div>
                                   </div>
                              {/each}
                         </div>
                         <div class="flex justify-between items-center bg-[#373B53] dark:bg-[#0C0E16] px-6 py-[1.625rem]">
                              <span class="hidden md:inline text-13 text-white">Amount Due</span>
                              <span class="md:hidden text-13 text-white">Grand Total</span>
                              <span class="font-bold text-2xl text-white">${ amount ? amount.toLocaleString("en-US") : "0" }</span>
                         </div>
                    </div>
               </div>
          {/if}
     {/each}
</section>