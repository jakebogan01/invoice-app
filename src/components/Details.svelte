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

<div class="space-y-4 bg-gray-900 text-white min-h-screen">
     {#each $preferences as invoice}
          {#if invoice?.slug === data?.slug}
               <div class="flex justify-between items-center bg-white p-6 rounded-lg overflow-hidden">
                    <Status invoice={ invoice } />
               </div>

               <div>
                    <p>UniqueID: #{ invoice?.slug }</p>
                    <p>ID: { invoice?.id }</p>
                    <p>Status: { invoice?.status }</p>

                    <div class="py-4">
                         <hr>
                         <p>Bill From:</p>
                    </div>

                    <p>Address: { invoice?.billFromAddress?.street ? invoice?.billFromAddress?.street : "Missing" }</p>
                    <p>City: { invoice?.billFromAddress?.city ? invoice?.billFromAddress?.city : "Missing" }</p>
                    <p>State: { invoice?.billFromAddress?.state ? invoice?.billFromAddress?.state : "Missing" }</p>
                    <p>Zip: { invoice?.billFromAddress?.zip ? invoice?.billFromAddress?.zip : "Missing" }</p>

                    <div class="py-4">
                         <hr>
                         <p>Bill To:</p>
                    </div>

                    <p>Name: { invoice?.billToAddress?.name ? invoice?.billToAddress?.name : "Missing" }</p>
                    <p>Email: { invoice?.billToAddress?.email ? invoice?.billToAddress?.email : "Missing" }</p>
                    <p>Address: { invoice?.billToAddress?.street ? invoice?.billToAddress?.street : "Missing" }</p>
                    <p>City: { invoice?.billToAddress?.city ? invoice?.billToAddress?.city : "Missing" }</p>
                    <p>State: { invoice?.billToAddress?.state ? invoice?.billToAddress?.state : "Missing" }</p>
                    <p>Zip: { invoice?.billToAddress?.zip ? invoice?.billToAddress?.zip : "Missing" }</p>
                    <p>Invoice Date: { invoice?.billToAddress?.invoiceDate ? invoice?.billToAddress?.invoiceDate : "Missing" }</p>
                    <p>Due Date: { invoice?.billToAddress?.dueDate ? invoice?.billToAddress?.dueDate : "Missing" }</p>
                    <p>Description: { invoice?.billToAddress?.description ? invoice?.billToAddress?.description : "Missing" }</p>

                    <div class="py-4">
                         <hr>
                         <p>Items:</p>
                    </div>

                    <div class="flex space-x-4">
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
                    </div>
               </div>
          {/if}
     {/each}
</div>