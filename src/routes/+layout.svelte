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
     <Nav />
     <slot />
</div>