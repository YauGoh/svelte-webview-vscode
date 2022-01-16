<style lang="scss">
    li {
        cursor: pointer;

        &:hover {
            background: green;
        }
    }
</style>

<script lang="ts">
import Icon from "../../components/Icon.svelte";
import type { Something } from "../../models/something";
import { getSomthings } from "../../queries/getSomethings";

   // let somethings: Something[] = [];

    const initialise = getSomthings();

    const openSomthing = (something: Something) => {

    }
</script>

<ul>
    {#await initialise}
        loading ...
    {:then somethings} 
        {#each somethings as something}
            <li on:click={() => openSomthing(something)}>
                <Icon def={something.icon} />
                {something.name} - {something.description}
            </li>
        {/each}    
    {/await}
</ul>

