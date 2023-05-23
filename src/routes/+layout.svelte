<script>
     import { theme } from "../stores/darkThemeStore";
     import "../app.css";
     import Nav from "../components/Nav.svelte";

     let themeMode;
     $: {
          themeMode = $theme[0].theme;
     }
</script>

<div class="font-spartan font-medium {themeMode}">
     <div class="dark:bg-[#141625] min-h-screen">
          <Nav />
          <slot />
     </div>
</div>