<script>
     import { preferences } from "../../stores/invoicesStore";
     export let data;
     console.log(data?.slug)
</script>

<div class="space-y-4 px-4 bg-gray-900 text-white min-h-screen">
     {#each $preferences as invoice}
          {#if invoice?.slug === data?.slug}
               <div>
                    <p>#{invoice?.slug}</p>
                    <p>{invoice?.id}</p>
                    <p class="text-red-500">$ {invoice?.billToAddress?.amount}</p>
                    <p>{invoice?.billToAddress?.name}</p>
                    <p>Due {invoice?.billToAddress?.dueDate}</p>
                    <p>{invoice?.status}</p>
               </div>
          {/if}
     {/each}
</div>