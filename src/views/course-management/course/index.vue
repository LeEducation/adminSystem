<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from "vue";
import AddCourse from "./components/AddCourse.vue";
import { ElMessageBox } from "element-plus";

defineOptions({
  name: "我是course咯"
});

onMounted(() => {
  console.log("onMounted");
});

const active = ref(0);
const dialogVisible = ref(false);

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {});
</script>

<template>
  <div>
    <el-card>
      sssss {{ active }}

      <el-button text @click="dialogVisible = true">
        click to open the Dialog
      </el-button>
    </el-card>

    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="60%"
      :before-close="handleClose"
    >
      <AddCourse />
      <!-- <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template> -->
    </el-dialog>
  </div>
</template>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
