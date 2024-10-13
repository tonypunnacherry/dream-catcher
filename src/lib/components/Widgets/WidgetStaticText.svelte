<script lang="ts">
  import { AppState } from "$lib/stores/app.svelte";

  import { parse } from 'marked';
  
  // Props
  export let title: string;

  // Widget Details
  let widget = AppState.getWidgetByTitle(title).widget;
  let id: string | undefined = widget?.id;
  let widgetIndex: number = AppState.getWidgetByTitle(title).index || 0;
  let content = $AppState.widgets[widgetIndex].content;
</script>

<div class="party-widget-static" {id}>
  <div class="party-widget-header">{title}</div>
  <div class="party-widget-contents">
    {@html parse(content || "")}
  </div>
</div>