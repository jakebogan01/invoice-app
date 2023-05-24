<script>
     export let style = "bg-red-500";
</script>

<button class="{ style }" on:click>
     <slot />
</button>