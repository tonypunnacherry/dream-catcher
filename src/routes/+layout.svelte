<script>
    import "../app.css";
    import { AppState } from "$lib/stores/app.svelte";
    const { title } = $AppState.appDetails;
</script>

<img alt="background" id="bg" src="bg.png"/>
<img alt="logo" id="logo" src="logo.png"/>
<div class="party-header">
  <h1>
    {title}
  </h1>
</div>
<nav>
	<a href="/">Journal</a>
	<a href="/album">Album</a>
	<a href="/settings">Settings</a>
</nav>
<slot />