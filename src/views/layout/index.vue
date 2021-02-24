<template>
    <el-container class="layout-container">
        <el-aside
        class="aside"  :width="isCollapse?'64px':'200px'">
            <div class="logo" :class="{minLogo:isCollapse}"></div>
            <el-menu
            router 
            :collapse='isCollapse'
            :collapse-transition='false'
            default-active='2'
            class="nav-menu"
            background-color="#002033"
            text-color="#fff"
            active-text-color="#ffd04b"
            >
            <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/articles">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
            </el-menu-item>
            <el-menu-item index="/image">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
            </el-menu-item>
            <el-menu-item index="/addArticle">
            <i class="el-icon-s-promition"></i>
            <span slot="title">发布文章</span>
            </el-menu-item>
            <el-menu-item index="/comment">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
            </el-menu-item>
            <el-menu-item index="/fans">
            <i class="el-icon-setting"></i>
            <span slot="title">粉丝管理</span>
            </el-menu-item>
            <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
            </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="header">
                <div>
                    <i :class="isCollapse?'el-icon-s-fold':'el-icon-s-unfold'" @click="hSwitch"></i>
                    <span>你好啊，亲</span>
                </div>
                <el-dropdown>
                    <div class="avatar-wrap">
                        <img class="avatar" src="user.photo" alt="">
                        <span>{{user.name}}</span>
                        <i class="el-icon-arrow-down el-icon-right"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>设置</el-dropdown-item>
                        <!-- 注意并不是所有的组件都支持@click的如果某个组件不能用click不能用则补充一个native -->
                        <el-dropdown-item @click.native="hQuit">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main class="main"><router-view></router-view></el-main>
        </el-container>
    </el-container>
</template>

<script>
import { userGetProfile } from '../../api/user'
import { delUser} from '../../utils/storage.js'
export default {
    name: 'Layout',
    props: { },
    data () { 
        return { 
            user:{},
            isCollapse:'false'
        }
    },
    methods:{
        setUserProfile(){
            userGetProfile().then(res=>{
                this.user = res.data.data
            }).catch(err=>{
                if (err.response.status===401) {
                    alert('无权访问')
                    this.$router.push('/login')
                }
            })
        },
        hquit(){
            this.$confirm('就走了','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                delUser()
                this.$router.push('/login')
            }).catch(()=>{
                //用户取消了
            })
        }
    },
    computed: { },
    created () { 
        this.setUserProfile()
    },
    mounted () { }
}
</script>

<style scoped lang='less'>
    .layout-container {
        position: fixed;
        left: 0;
        right: 0;
        bottom:0;
        top: 0;
    }
    .aside {
        background-color: #d3dce6;
        .el-menu {
            border-right: none;
        }
        .logo {
            width: 100%;
            height: 60px;
            background: #002244 no-repeat center / 140px auto;
        }
        .minLogo {
            background-image: url('../../assets/login_bg.jpg');
            background-size: 36px auto;
        }
    }
    .nav-menu {
        .iconfont {
            margin-right: 10px;
            padding-left: 5px;
        }
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        .avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
        }
    }
    .main {
        background-color: #e9eef3;
    }
</style>