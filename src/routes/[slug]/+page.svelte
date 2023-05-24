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

{#if editInvoice}
     <Form bind:showForm={editInvoice} editInvoice={editInvoice} data={data} />
{/if}

<main class="px-6 w-full max-w-[45.625rem] md:max-w-[52rem] mx-auto" style="height: 100vh; overflow-y: auto;">
     <a href="/" class="flex items-center font-bold text-15 text-[#0C0E16] dark:text-white my-8 md:mt-20">
          <span class="mr-1.5 flex items-center text-[#7C5DFA]">
               <svg class="rotate-90 h-5 w-5 transform" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>
          </span>
          <span class="pt-0.5">Go back</span>
     </a>
     
     {#if delteModal}
          <DeleteModal bind:delteModal={ delteModal } on:click={ handleDeleteInvoice } />
     {/if}
     
     <Details data={ data } bind:editInvoice={editInvoice} bind:delteModal={delteModal} />
     
     <div class="md:hidden absolute left-0 bottom-0 flex items-center justify-between space-x-2 bg-white dark:bg-[#1F2139] w-full h-[6.875rem] px-6">
          <Button on:click={ () => { editInvoice = true } } style="flex justify-center items-center w-[4.5625rem] h-12 bg-[#F9FAFE] dark:bg-[#252945] font-bold text-15 text-[#7E88C3] dark:text-white rounded-full">Edit</Button>
          <Button on:click={ () => { delteModal = true } } style="flex justify-center items-center w-[5.5625rem] h-12 bg-[#EC5757] font-bold text-15 text-white rounded-full">Delete</Button>
          <Button on:click={ handleUpdateStatusToPaid } style="flex justify-center items-center w-[9.3125rem] h-12 bg-[#7C5DFA] font-bold text-15 text-white rounded-full">Mark as Paid</Button>
     </div>
</main>