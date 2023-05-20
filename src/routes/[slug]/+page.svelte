<script>
     import Button from "../../components/Button.svelte";
     import DeleteModal from "../../components/DeleteModal.svelte";
     import Details from "../../components/Details.svelte";
     export let data;

     let delteModal = false;

     const handleDelete = () => {
          console.log("deleted");
     }
</script>

<div class="flex items-center justify-between px-4">
     <Button style="bg-green-500">Edit</Button>
     <Button on:click={()=>{delteModal = true}}>Delete</Button>
     <Button style="bg-purple-500">Mark as Paid</Button>
</div>

{#if delteModal}
     <DeleteModal bind:delteModal={delteModal} on:click={handleDelete} />
{/if}

<Details data={data} />