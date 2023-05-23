<script>
     import { theme } from "../stores/darkThemeStore";
     import "../app.css";

     let themeMode;
     $: {
          themeMode = $theme[0].theme;
     }
</script>

<div class="font-spartan font-medium {themeMode}">
     <slot />
</div>