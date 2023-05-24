<script>
     export let invoice;
     export let margin = "";
</script>

<span class="text-13 text-[#858BB2] dark:text-white">Status</span>
{#if invoice?.status == "pending"}
     <div class="flex justify-center items-center bg-[#FFF9F0] dark:bg-[#2B2736] font-bold text-15 text-[#FF8F00] w-[6.5rem] h-10 { margin } rounded-md">
          <div class="bg-[#FF8F00] w-2 h-2 rounded-full"></div>
          <span class="capitalize ml-2">{ invoice?.status }</span>
     </div>
{:else if invoice?.status == "draft"}
     <div class="flex justify-center items-center bg-[#F4F4F5] dark:bg-[#2A2C44] font-bold text-15 text-[#373B53] dark:text-[#DFE3FA] w-[6.5rem] h-10 { margin } rounded-md">
          <div class="bg-[#373B53] dark:bg-[#DFE3FA] w-2 h-2 rounded-full"></div>
          <span class="capitalize ml-2">{ invoice?.status }</span>
     </div>
{:else}
     <div class="flex justify-center items-center bg-[#F3FDFA] dark:bg-[#1E2B3F] font-bold text-15 text-[#33D69F] w-[6.5rem] h-10 { margin } rounded-md">
          <div class="bg-[#33D69F] w-2 h-2 rounded-full"></div>
          <span class="capitalize ml-2">{ invoice?.status }</span>
     </div>
{/if}