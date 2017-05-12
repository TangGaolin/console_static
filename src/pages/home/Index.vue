<style scoped>
    .layout{
        border-top: 5px solid #44b549;
        background: #e7e8eb;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: auto;
        border-radius: 3px;
        line-height: 60px;
        float: left;
        position: relative;
        left: 100px;
        font-size: 30px;
        font-weight: bolder;
        color: #b3b6b7;
    }
    .layout-account{
        width: 300px;
        height: auto;
        border-radius: 3px;
        line-height: 60px;
        float: right;
        margin-left: 100px;
        position: relative;
        font-size: 13px;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-body{
        width: 1200px;
        margin-left: auto;
        margin-right: auto;
        padding: 36px 0 88px;
    }
    .layout-content{
        border: 1px solid #d9dadc;
        background-color: #fff;
        min-height: 700px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    
</style>
<template>
    <div class="layout">
        <div class="layout-header">
            <div class="layout-logo">德美店务后台</div>
            <div class='layout-account'>
                 技术支持 * 唐高林 | 
                 <a href="javascript:;">退出</a>
            </div>
        </div>

        <div class="layout-body">
            <div class="layout-content">
                <Row>
                    <i-col span="4">
                        <Menu active-name="1-2" width="auto" :open-names="['1']">
                            <Submenu name="1">
                                <template slot="title">
                                    <Icon type="ios-navigate"></Icon>
                                    导航一
                                </template>
                                <Menu-item name="1-1">选项 1</Menu-item>
                                <Menu-item name="1-2">选项 2</Menu-item>
                                <Menu-item name="1-3">选项 3</Menu-item>
                            </Submenu>
                            <Submenu name="2">
                                <template slot="title">
                                    <Icon type="ios-keypad"></Icon>
                                    导航二
                                </template>
                                <Menu-item name="2-1">选项 1</Menu-item>
                                <Menu-item name="2-2">选项 2</Menu-item>
                            </Submenu>
                            <Submenu name="3">
                                <template slot="title">
                                    <Icon type="ios-analytics"></Icon>
                                    导航三
                                </template>
                                <Menu-item name="3-1">选项 1</Menu-item>
                                <Menu-item name="3-2">选项 2</Menu-item>
                            </Submenu>
                        </Menu>
                    </i-col>
                    <i-col span="20">
                        <div class="layout-content-main">
                            
                        </div>
                    </i-col>
                </Row>
            </div>
        </div>

        <div class="layout-copy">
            2011-2017 &copy; 德美中国
        </div>
    </div>
</template>
<script>
    export default {
        
    }
</script>
