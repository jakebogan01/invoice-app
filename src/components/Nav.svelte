<script>
     import { theme } from "../stores/darkThemeStore";
     let changeTheme = false;

     const test = () => {
          changeTheme = !changeTheme;

          theme.update(currentTheme => {
               currentTheme[0].theme = changeTheme ? "dark" : "light";

               return currentTheme;
          });
     }
</script>

<nav class="flex flex-row 1440:flex-col justify-between items-center bg-[#373B53] 1440:rounded-tr-[1.25rem] 1440:rounded-br-[1.25rem] 1440:h-screen overflow-hidden z-50">
     <div>
          <div class="relative bg-[#7C5DFA] w-[4.5rem] h-[4.5rem] md:h-20 1440:w-[6.4375rem] 1440:h-[6.4375rem] rounded-tr-[1.25rem] rounded-br-[1.25rem] overflow-hidden">
               <div class="absolute top-[2.25rem] md:top-[2.5rem] 1440:top-[3.21875rem] bg-[#9277FF] w-[4.5rem] h-[4.5rem] 1440:w-[6.4375rem] 1440:h-[6.4375rem] rounded-tl-[1.25rem]"></div>
               <img src="/main-logo.svg" alt="logo" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1.625rem] md:h-[1.8125rem] 1440:h-auto">
          </div>
     </div>

     <div class="flex flex-row 1440:flex-col items-center h-[4.5rem] md:h-20 1440:w-full 1440:h-auto divide-x 1440:divide-y 1440:divide-x-0 divide-[#494E6E]">
          <div class="flex items-center 1440:justify-center px-6 1440:py-6 1440:w-full h-full">
               <button on:click={ test } type="button" role="switch" aria-checked="false" class="text-[#7E88C3] hover:text-[#DFE3FA]">
                    <span class="sr-only">Theme Mode</span>
                    {#if changeTheme}
                         <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M9.817 16.18a.96.96 0 01.953.848l.007.112v1.535a.96.96 0 01-1.913.112l-.006-.112V17.14c0-.53.43-.96.96-.96zm-4.5-1.863c.347.346.373.89.08 1.266l-.08.09-1.085 1.087a.96.96 0 01-1.437-1.267l.08-.09 1.086-1.086a.959.959 0 011.357 0zm10.356 0l1.086 1.086a.959.959 0 11-1.357 1.357l-1.085-1.086a.959.959 0 111.356-1.357zM9.817 4.9a4.924 4.924 0 014.918 4.918 4.924 4.924 0 01-4.918 4.918A4.924 4.924 0 014.9 9.818 4.924 4.924 0 019.817 4.9zm8.858 3.958a.96.96 0 110 1.919H17.14a.96.96 0 110-1.92h1.535zm-16.18 0a.96.96 0 01.112 1.912l-.112.007H.96a.96.96 0 01-.112-1.913l.112-.006h1.534zm14.264-5.983a.96.96 0 010 1.357l-1.086 1.086a.96.96 0 11-1.356-1.357l1.085-1.086a.96.96 0 011.357 0zm-12.617-.08l.09.08 1.086 1.086A.96.96 0 014.05 5.398l-.09-.08-1.086-1.086a.959.959 0 011.267-1.436zM9.817 0c.53 0 .96.43.96.96v1.535a.96.96 0 01-1.92 0V.96c0-.53.43-.96.96-.96z" fill="currentColor" fill-rule="nonzero"/></svg>
                    {:else}
                         <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M19.502 11.342a.703.703 0 00-.588.128 7.499 7.499 0 01-2.275 1.33 7.123 7.123 0 01-2.581.46A7.516 7.516 0 018.74 11.06a7.516 7.516 0 01-2.198-5.316c0-.87.153-1.713.41-2.48.28-.817.69-1.559 1.226-2.197a.652.652 0 00-.102-.92.703.703 0 00-.588-.128C5.316.607 3.425 1.91 2.07 3.649A10.082 10.082 0 000 9.783C0 12.57 1.125 15.1 2.965 16.94a10.04 10.04 0 007.156 2.965c2.352 0 4.524-.818 6.262-2.173a10.078 10.078 0 003.579-5.597.62.62 0 00-.46-.793z" fill="currentColor" fill-rule="nonzero"/></svg>
                    {/if}
               </button>
          </div>
          <div class="flex items-center 1440:justify-center px-6 1440:py-6 1440:w-full h-full">
               <div class="flex justify-center items-center bg-[#7E88C3] text-gray-300 rounded-full h-8 w-8 1440:w-10 1440:h-10 overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>                            
               </div>
          </div>
     </div>
</nav>