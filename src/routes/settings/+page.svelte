<script lang="ts">
    import { AppState } from "$lib/stores/app.svelte";
    const {title} = $AppState.appDetails;
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<main class="party-body">
    <h2>Settings</h2>
    <p>No settings available at this time!</p>
</main>
