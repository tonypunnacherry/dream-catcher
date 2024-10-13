<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { AppState } from "$lib/stores/app.svelte";

  export let title: string;

  let widget = AppState.getWidgetByTitle(title).widget;

  let { id, placeholder, defaultValue } = widget;

  let widgetIndex: number = AppState.getWidgetByTitle(title).index || 0;

  let value: string | undefined = defaultValue;
  let prevValue: string | undefined = "";

  let myTimer;

  $: {
    if (value != "") {
      clearTimeout(myTimer);
      if (value != prevValue) {
        $AppState.widgets[widgetIndex].value = value;
        prevValue = value;
        myTimer = setTimeout(function () {
          if (
            $AppState.widgets[1].value != null &&
            $AppState.widgets[2].value != null
          ) {
            $AppState.readyToGenerate = true;
          }
        }, 2000);
      }
    }
  }

  onMount(() => {
    prevValue = value;
  });
</script>

<div class="party-widget-input" {id}>
  <div class="party-widget-header">{title}</div>
  <div class="party-widget-contents">
    <textarea bind:value {placeholder}></textarea>
  </div>
</div>
