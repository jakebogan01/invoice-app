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
     <div class="flex flex-col 1440:flex-row dark:bg-[#141625] min-h-screen 1440:min-h-full">
          <Nav />
          <slot />
     </div>
</div>