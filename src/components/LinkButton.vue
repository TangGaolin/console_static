<style>
    .inline-div {
        display: inline-block;
    }
</style>
<template>
    <div class="inline-div">
        <Button :type=type :size= size>
            <router-link :to = to target="_blank">{{name}}</router-link>
        </Button>
    </div>
</template>
<script>
    export default {
        props: {
            to: String,
            size: String,
            type: String,
            name: String
        }
    }

</script>