<template>
    <button class="btn h3">
        <slot />
    </button>
</template>

<style>

.btn {
    padding: 50px 20px;
    border-radius: 5px;
    text-transform: uppercase;
    font-weight: 700;
    border: none;
    box-shadow: 0px 5px 10px black;
    transition: all .2s;
}

.btn:hover {
    transform: translateY(-2px);
}

</style>