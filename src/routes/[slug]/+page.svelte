<script>
     import { preferences } from "../../stores/invoicesStore";
     import { goto } from '$app/navigation';
     import Button from "../../components/Button.svelte";
     import DeleteModal from "../../components/DeleteModal.svelte";
     import Details from "../../components/Details.svelte";
     import Form from "../../components/Form.svelte";
     export let data;

     let delteModal = false;
     let editInvoice = false;

     const handleDeleteInvoice = () => {
          preferences.update(currentInvoices => {
               return currentInvoices.filter(invoice => invoice?.slug !== data?.slug);
          });

          goto("/");
     }

     const handleUpdateStatusToPaid = () => {
          preferences.update(currentInvoices => {
               let copiedInvoices = [...currentInvoices];
               let updatedInvoice = copiedInvoices.find(invoice => invoice?.slug === data?.slug);

               updatedInvoice.status = "paid";

               return copiedInvoices;
          });
     }
</script>

<div class="flex items-center justify-between px-4">
     <Button on:click={ () => { editInvoice = true } } style="bg-green-500">Edit</Button>
     <Button on:click={ () => { delteModal = true } }>Delete</Button>
     <Button on:click={ handleUpdateStatusToPaid } style="bg-purple-500">Mark as Paid</Button>
</div>

{#if editInvoice}
     <Form bind:showForm={editInvoice} editInvoice={editInvoice} data={data} />
{/if}

{#if delteModal}
     <DeleteModal bind:delteModal={ delteModal } on:click={ handleDeleteInvoice } />
{/if}

<Details data={ data } />