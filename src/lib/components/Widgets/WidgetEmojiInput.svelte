<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
  
    import { AppState } from '$lib/stores/app.svelte';
    
    export let title: string;
    
    let widget = AppState.getWidgetByTitle(title).widget;
    let {id, defaultValue} = widget;
  
    let widgetIndex: number = AppState.getWidgetByTitle(title).index || 0;
  
    let value: string | undefined = defaultValue;
    let prevValue: string | undefined = "";
    
    $: {
      if (value != '') {
        if (value != prevValue) {
          $AppState.widgets[widgetIndex].value = value;
          prevValue = value;
          if ($AppState.widgets[1].value != null && $AppState.widgets[2].value != null) {
            $AppState.readyToGenerate = true;
          }
        }
      }
    }

    const handleClick = (e) => { 
        value = e.target.value;
     }
  
    onMount(() => {
      prevValue = value;
    });
  </script>
    
<div class="party-widget-emoji-input" {id}>
    <div class="party-widget-header">{title}</div>
    <div class="party-widget-contents">
        <div class="emoji"><input class:active={value === "angry"} type="image" alt="emoji1" src="angry.png" value="angry" on:click={handleClick} /></div>
        <div class="emoji"><input class:active={value === "sad"} type="image" alt="emoji2" src="sad.png" value="sad" on:click={handleClick} /></div>
        <div class="emoji"><input class:active={value === "neutral"} type="image" alt="emoji3" src="meh.png" value="neutral" on:click={handleClick} /></div>
        <div class="emoji"><input class:active={value === "happy"} type="image" alt="emoji4" src="happy.png" value="happy" on:click={handleClick} /></div>
        <div class="emoji"><input class:active={value === "very happy"} type="image" alt="emoji5" src="great.png" value="very happy" on:click={handleClick} /></div>
    </div>
</div>