<script lang="ts">
  export let className = '';
  export let style = '';
  export let insetLeft: boolean = false;
  export let insetRight: boolean = false;
</script>

<div
  class="flex w-full {className}
  {insetRight ? 'inset-right' : ''}
  {insetLeft ? 'inset-left' : ''}"
  {style}
>
  <slot />
</div>

<style>
  .inset-left {
    margin-left: -12px;
  }
  .inset-right {
    margin-right: -12px;
  }
</style>
