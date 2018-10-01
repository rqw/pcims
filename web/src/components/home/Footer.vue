<template>
    <div id="footer">
        <span class="info">
            技术支持：{{state.about.company.name}} 服务热线：{{state.about.company.phone}} 系统版本：{{state.about.app.version}} 数据库版本：{{state.about.db.version}}
        </span>
    </div>
</template>
<script>
   export default {
        data() {
            return {
                state:this.$store.state
            }
        },

        methods: {},
        mounted() {
        }
    }
</script>
<style scoped lang="scss">

</style>
