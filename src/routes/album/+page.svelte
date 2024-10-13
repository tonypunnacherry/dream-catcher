<script lang="ts">
    import { AppState } from "$lib/stores/app.svelte";
    const appTitle = $AppState.appDetails.title;
</script>

<svelte:head>
    <title>{appTitle}</title>
</svelte:head>

<main class="party-body">
    <h2 style="text-align:center;">your dream journal album ✨</h2>
    <div class="grid grid-cols-4 gap-4" style="padding: 0 60px;margin-top: 30px;">
    {#each $AppState.album as dream, index}
    <a href="/album/{index}" class="album-cover">
        <img src={dream.data[4] !== "" ? `data:image/png;base64,${dream.data[4]}` : "logo.png"} alt="album cover for dream" />
        <div class="date">
            {dream.date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
        </div>
    </a>
    {/each}
    </div>
    {#if $AppState.album.length === 0}
        <p>No dreams in your album! <a href="/">Enter in a dream</a></p>
    {/if}
</main>
