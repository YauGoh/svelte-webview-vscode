<style lang="scss">
    @import "../styles/material-ui-icons.scss";
</style>

<script lang="ts">
import type { IconDefinition } from "../models/icon";
import { Icons } from "../models/icon";
    let def: IconDefinition = Icons.Account;
</script>

<span class={def.css}>{def.face}</span>