<script lang="ts">
    import { AppState } from "$lib/stores/app.svelte";
    const appTitle = $AppState.appDetails.title;
</script>

<svelte:head>
    <title>{appTitle}</title>
</svelte:head>

<main class="party-body">
    <h2>Settings</h2>
    <p>No settings available at this time!</p>
</main>
