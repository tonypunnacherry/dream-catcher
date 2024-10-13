<script lang="ts">
    export let data;
    import { AppState } from "$lib/stores/app.svelte";
    import { page } from "$app/stores";
    const appTitle = $AppState.appDetails.title;
    const dream = $AppState.album[$page.params.dream];
</script>

<svelte:head>
    <title>{appTitle}</title>
</svelte:head>

<main class="party-body">
    <a href="/album"><button style="margin-bottom:30px;">Back to album</button></a>
    {#if dream != null}
    <h2 style="text-shadow:0 4px 8px rgba(0,0,0,0.2);color:#FFE082;font-size:32px;">{dream.date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })}</h2>
      <div class="party-widget-static">
        <div class="party-widget-header">your dream summary</div>
        <div class="party-widget-contents">
          <textarea readonly>{dream.data[1]}</textarea>
        </div>
      </div>
      <div class="party-widget-static">
        <div class="party-widget-header">your mood in the morning</div>
        <div class="party-widget-contents">
          <img style="width:50px" src={dream.data[2] === "angry" ?
            "../../angry.png" :
            (dream.data[2] === "sad" ?
                "../../sad.png"
                : (dream.data[2] === "very happy" ?
                    "../../great.png"
                    : (dream.data[2] === "happy" ?
                        "../../happy.png"
                        : "../../meh.png"
                    )
                )
            )
            } alt={dream.data[2]} title={dream.data[2]}/>
        </div>
      </div>
      <div class="party-widget-static">
        <div class="party-widget-header">AI dream analysis</div>
        <div class="party-widget-contents">
          {dream.data[3]}
        </div>
      </div>
      <div class="party-widget-static">
        <div class="party-widget-header">AI dream visual</div>
        <div class="party-widget-contents">
            <img src={dream.data[4] !== "" ? `data:image/png;base64,${dream.data[4]}` : "logo.png"} alt="album cover for dream" />
        </div>
      </div>
      <div class="party-widget-static">
        <div class="party-widget-header">AI story based on dream</div>
        <div class="party-widget-contents">
            {dream.data[5]}
        </div>
      </div>
      <div class="party-widget-static">
        <div class="party-widget-header">AI predictions of influence</div>
        <div class="party-widget-contents">
            {dream.data[6]}
        </div>
      </div>
      <div class="party-widget-static">
        <div class="party-widget-header">your notes</div>
        <div class="party-widget-contents">
            {dream.data[7] == null ? "You didn't write any notes!" : dream.data[7]}
        </div>
      </div>
    {:else}
    <h2>Dream not found</h2>
    {/if}
</main>
