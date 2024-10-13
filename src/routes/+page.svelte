<script lang="ts">
  import WidgetStaticText from "$lib/components/Widgets/WidgetStaticText.svelte";
  import WidgetUserInput from "$lib/components/Widgets/WidgetUserInput.svelte";
  import WidgetTextGeneration from "$lib/components/Widgets/WidgetTextGeneration.svelte";
  import WidgetImageGeneration from "$lib/components/Widgets/WidgetImageGeneration.svelte";
  import WidgetEmojiInput from "$lib/components/Widgets/WidgetEmojiInput.svelte";

  import { AppState } from "$lib/stores/app.svelte";
  import WidgetChatbot from "$lib/components/Widgets/WidgetChatbot.svelte";
  import definition from "../lib/stores/definition.json";
  import { goto } from '$app/navigation';

  const {title} = $AppState.appDetails;
  $AppState.widgets = [...definition.result.data.definition.widgets];
  $AppState.readyToGenerate = false;

  function saveDream() {
    const temp = $AppState.album;
    temp.unshift({date: new Date(), data: $AppState.widgets.map(widget => widget.value)});
    $AppState.album = temp;
    goto("/album");
  }

  function discardDream() {
    $AppState.widgets = [...definition.result.data.definition.widgets];
    $AppState.readyToGenerate = false;
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main class="party-body">
  {#if $AppState.readyToGenerate}
    <div id="output">
      <div id="button_bar">
        <button id="saveEntry" on:click={saveDream} disabled={$AppState.widgets.some(widget => widget.required && widget.value == null)}
        ><span class="material-symbols-outlined"> save </span>Save Dream</button>
      <button id="deleteEntry" on:click={discardDream}
        ><span class="material-symbols-outlined"> delete </span>Discard Dream</button>
      </div>
      <WidgetTextGeneration title={$AppState.widgets[3].title} />
      <WidgetImageGeneration title={$AppState.widgets[4].title} />
      <WidgetTextGeneration title={$AppState.widgets[5].title} />
      <WidgetTextGeneration title={$AppState.widgets[6].title} />
      <WidgetUserInput title={$AppState.widgets[7].title} />
      <WidgetChatbot title={$AppState.widgets[8].title} />
    </div>
  {:else}
    <WidgetStaticText title={$AppState.widgets[0].title} />
    <div id="input">
      <WidgetUserInput title={$AppState.widgets[1].title} />
      <WidgetEmojiInput title={$AppState.widgets[2].title} />
    </div>
  {/if}

  <div class="party-footer">Powered by AWS Bedrock</div>
</main>

<style>
  @keyframes -global-slidein {
    from {
      transform: translateX(-50px);
      opacity: 0;
    }
    to {
      transform: translateX(0px);
      opacity: 1;
    }
  }
</style>
