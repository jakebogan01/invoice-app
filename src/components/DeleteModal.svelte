<script>
     export let delteModal;
     export let data;
</script>

<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
     <div class="fixed inset-0 bg-black bg-opacity-25 transition-opacity"></div>
     <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0" on:keydown={()=>{}} on:click|self={ () => { delteModal = false } }>
               <div class="relative transform overflow-hidden rounded-lg bg-white dark:bg-[#1F2139] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                         <h3 class="font-bold text-2xl dark:text-white" id="modal-title">Confirm Deletion</h3>
                         <div class="mt-2">
                              <p class="text-[#888EB0]">Are you sure you want to delete invoice #{ data?.slug }? This action cannot be undone.</p>
                         </div>
                    </div>
                    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                         <button on:click type="button" class="inline-flex w-full justify-center rounded-md bg-[#EC5757] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Delete</button>
                         <button on:click={ () => { delteModal = false } } type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-[#252945] px-3 py-2 text-sm font-semibold text-[#7E88C3] dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#1F2139] hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                    </div>
               </div>
          </div>
     </div>
</div>