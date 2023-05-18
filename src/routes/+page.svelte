<script>
     import { preferences } from "../stores/invoicesStore";
</script>

<div class="space-y-4">
     {#each $preferences as invoices}
          <div>
               <p>#{invoices.randomId}</p>
               <p>{invoices.id}</p>
               <p>${invoices.amount}</p>
               <p>{invoices.name}</p>
               <p>Due {invoices.dueDate}</p>
          </div>
          <hr>
     {/each}
</div>