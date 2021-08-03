<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref="userForm" :model="user" status-icon :rules="rules">
        <div class="title">Ideal</div>
        <el-form-item prop="username">
          <el-input
            type="text"
            prefix-icon="el-icon-user"
            v-model="user.username"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            prefix-icon="el-icon-view"
            v-model="user.password"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="isBtnLoading"
            type="primary"
            class="btn-login"
            @click="handleConfirm"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import storage from '../utils/storage'
export default {
  name: "LoginPage",
  data() {
    return {
      isBtnLoading: false,
      user: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async login() {
      this.isBtnLoading = true;
      try {
        const res = await this.$api.login(this.user);
        storage.setItem('token', res.token)
        this.$router.push({ name: "welcome" });
      } catch (error) {
        console.log(error,'error');
        ElMessage.error(error.message || error);
      }
      this.isBtnLoading = false;
    },
    handleConfirm() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fcff;
  width: 100vw;
  height: 100vh;
  .modal {
    width: 500px;
    padding: 50px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 10px 3px #c7c9cb4d;
    .title {
      font-size: 50px;
      line-height: 1.5;
      text-align: center;
      margin-bottom: 30px;
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>
