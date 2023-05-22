<script>
     import { onMount } from "svelte";
     import { preferences } from "../stores/invoicesStore";
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

<div class="space-y-4 px-4 bg-gray-900 text-white min-h-screen">
     {#each $preferences as invoice}
          {#if invoice?.slug === data?.slug}
               <div>
                    <p>UniqueID: #{ invoice?.slug }</p>
                    <p>ID: { invoice?.id }</p>
                    <p>Status: { invoice?.status }</p>

                    <div class="py-4">
                         <hr>
                         <p>Bill From:</p>
                    </div>

                    <p>Address: { invoice?.billFromAddress?.street }</p>
                    <p>City: { invoice?.billFromAddress?.city }</p>
                    <p>State: { invoice?.billFromAddress?.state }</p>
                    <p>Zip: { invoice?.billFromAddress?.zip }</p>

                    <div class="py-4">
                         <hr>
                         <p>Bill To:</p>
                    </div>

                    <p>Name: { invoice?.billToAddress?.name }</p>
                    <p>Email: { invoice?.billToAddress?.email }</p>
                    <p>Address: { invoice?.billToAddress?.street }</p>
                    <p>City: { invoice?.billToAddress?.city }</p>
                    <p>State: { invoice?.billToAddress?.state }</p>
                    <p>Zip: { invoice?.billToAddress?.zip }</p>
                    <p>Invoice Date: { invoice?.billToAddress?.invoiceDate }</p>
                    <p>Due Date: { invoice?.billToAddress?.dueDate }</p>
                    <p>Description: { invoice?.billToAddress?.description }</p>

                    <div class="py-4">
                         <hr>
                         <p>Items:</p>
                    </div>

                    <div class="flex space-x-4">
                         {#each invoice?.billToAddress?.items as item}
                              <div>
                                   <p>ID: { item?.id }</p>
                                   <p>ID: { item?.name }</p>
                                   <p>Qty.: { item?.qty }</p>
                                   <p>Price: { item?.price }</p>
                                   <p>Total: { item?.total }</p>
                              </div>
                         {/each}
                    </div>

                    <div class="py-4">
                         <hr>
                         <p>Amount: { amount }</p>
                    </div>
               </div>
          {/if}
     {/each}
</div>