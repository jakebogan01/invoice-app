<script>
     import { preferences } from "../../stores/invoicesStore";
     import { goto } from '$app/navigation';
     import Button from "../../components/Button.svelte";
     import DeleteModal from "../../components/DeleteModal.svelte";
     import Details from "../../components/Details.svelte";
     export let data;

     let delteModal = false;

     const handleDeleteInvoice = () => {
          preferences.update(currentInvoices => {
               return currentInvoices.filter(invoice => invoice?.slug !== data?.slug);
          });

          goto("/");
     }

     const handleUpdateStatusToPaid = () => {
          console.log('works');
     }
</script>

<div class="flex items-center justify-between px-4">
     <Button style="bg-green-500">Edit</Button>
     <Button on:click={ () => { delteModal = true } }>Delete</Button>
     <Button on:click={ handleUpdateStatusToPaid } style="bg-purple-500">Mark as Paid</Button>
</div>

{#if delteModal}
     <DeleteModal bind:delteModal={ delteModal } on:click={ handleDeleteInvoice } />
{/if}

<Details data={ data } />