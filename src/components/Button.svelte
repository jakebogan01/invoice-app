<script>
     export let style = "bg-red-500";
</script>

<button class="{ style } text-white px-4" on:click>
     <slot />
</button>