<script>
     import { onMount } from "svelte";
     import { preferences } from "../stores/invoicesStore";
     import Status from "./Status.svelte";
     export let data;

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
</script>

<section>
     {#each $preferences as invoice}
          {#if invoice?.slug === data?.slug}
               <div class="flex justify-between items-center bg-white p-6 rounded-lg overflow-hidden">
                    <Status invoice={ invoice } />
               </div>

               <div class="bg-white mt-4 p-6 text-13 text-[#7E88C3] rounded-lg overflow-hidden">
                    <p class="font-bold text-15 text-[#0C0E16]"><span class="text-[#7E88C3]">#</span>{ invoice?.slug }</p>
                    <p>{ invoice?.billToAddress?.description ? invoice?.billToAddress?.description : "Missing" }</p>

                    <p class="mt-6">{ invoice?.billFromAddress?.street ? invoice?.billFromAddress?.street : "Missing" }</p>
                    <p>{ invoice?.billFromAddress?.city ? invoice?.billFromAddress?.city : "Missing" }, { invoice?.billFromAddress?.state ? invoice?.billFromAddress?.state : "Missing" }, { invoice?.billFromAddress?.zip ? invoice?.billFromAddress?.zip : "Missing" }</p>

                    <div class="flex my-6 space-x-8">
                         <div>
                              <h3 class="mb-1">Invoice Date</h3>
                              <p class="font-bold text-15 text-[#0C0E16] mb-6">{ invoice?.billToAddress?.invoiceDate ? invoice?.billToAddress?.invoiceDate : "Missing" }</p>

                              <h3 class="mb-1">Payment Due</h3>
                              <p class="font-bold text-15 text-[#0C0E16]">{ invoice?.billToAddress?.dueDate ? invoice?.billToAddress?.dueDate : "Missing" }</p>
                         </div>
                         <div>
                              <h3 class="mb-1">Bill To</h3>
                              <p class="font-bold text-15 text-[#0C0E16] mb-1">{ invoice?.billToAddress?.name ? invoice?.billToAddress?.name : "Missing" }</p>
                              
                              <p>{ invoice?.billFromAddress?.street ? invoice?.billFromAddress?.street : "Missing" }</p>
                              <p>{ invoice?.billFromAddress?.city ? invoice?.billFromAddress?.city : "Missing" }, { invoice?.billFromAddress?.state ? invoice?.billFromAddress?.state : "Missing" }, { invoice?.billFromAddress?.zip ? invoice?.billFromAddress?.zip : "Missing" }</p>
                         </div>
                    </div>

                    <h3 class="mb-1">Sent to</h3>
                    <p class="font-bold text-15 text-[#0C0E16] mb-6">{ invoice?.billToAddress?.email ? invoice?.billToAddress?.email : "Missing" }</p>

                    <div class="bg-[#F9FAFE] px-6 pt-6 space-y-4">
                         {#each invoice?.billToAddress?.items as item}
                              <div class="flex justify-between items-center">
                                   <div>
                                        <h3 class="font-bold text-15 text-[#0C0E16]">{ item?.name ? item?.name : "Missing" }</h3>
                                        <p class="font-bold text-15 text-[#7E88C3]">{ item?.qty ? item?.qty : "0" } x $ { item?.price ? item?.price : "0" }</p>
                                   </div>
                                   <div>
                                        <p class="font-bold text-15 text-[#0C0E16]">$ { item?.total ? item?.total : "0" }</p>
                                   </div>
                              </div>
                         {/each}
                         <div class="bg-[#373B53]">
                              <span>Grand Total</span>
                              <span>$ { amount ? amount : "0" }</span>
                         </div>
                    </div>

                    <!-- <div class="flex space-x-4">
                         {#each invoice?.billToAddress?.items as item}
                              <div>
                                   <p>Name: { item?.name ? item?.name : "Missing" }</p>
                                   <p>Qty.: { item?.qty ? item?.qty : "0" }</p>
                                   <p>Price: { item?.price ? item?.price : "0" }</p>
                                   <p>Total: { item?.total ? item?.total : "0" }</p>
                              </div>
                         {/each}
                    </div>

                    <div class="py-4">
                         <hr>
                         <p>Amount: { amount ? amount : "0" }</p>
                    </div> -->


               </div>
          {/if}
     {/each}
</section>