<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

import { reactive, ref, shallowRef, onBeforeUnmount, onMounted } from "vue";
import type { FormInstance, FormRules, UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

// const props = defineProps({
//   name: {
//     type: String,
//     default: "我是course咯"
//   }
// });

interface BasicInfoRuleForm {
  name: string;
  category: Array<number>;
  cost: string;
  minPrice: string;
  student: string;
  duration: string;
  isAuction: boolean;
  auctionStartTime: string;
  regDeadline: string;
}
interface IntroRuleForm {
  summary: string; // 课程简介
}
interface posterRuleForm {
  summary: string; // 课程简介
}
interface trialRuleForm {
  trialType: string; // 课程简介
}

onMounted(() => {
  console.log("onMounted");
});

const mode = "default";
const active = ref(0);
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
// 内容 HTML
const valueHtml = ref("<p>你好</p>");
const imageUrl = ref("");
const basicInfoFormRef = ref<FormInstance>();
const introFormRef = ref<FormInstance>();
const posterFormRef = ref<FormInstance>();
const trialFormRef = ref<FormInstance>();
const basicInfoForm = reactive<BasicInfoRuleForm>({
  name: "Hello", // 课程名称
  category: [], // 课程分类
  cost: "", // 课时费用
  minPrice: "", // 底价
  student: "", // 指定学生
  duration: "", // 开课时长
  isAuction: true, // 拍卖课程
  auctionStartTime: "", // 起拍时间
  regDeadline: "" // 报名截止时间
});

const introForm = reactive<IntroRuleForm>({
  summary: "" // 课程名称
});

const posterForm = reactive<posterRuleForm>({
  summary: "" // 课程名称
});

const trialForm = reactive<trialRuleForm>({
  trialType: "" // 课程名称
});

const categoryProps = {
  multiple: true
};
const categoryOptions = [
  {
    value: 1,
    label: "Asia",
    children: [
      {
        value: 2,
        label: "China",
        children: [
          { value: 3, label: "Beijing" },
          { value: 4, label: "Shanghai" },
          { value: 5, label: "Hangzhou" }
        ]
      },
      {
        value: 6,
        label: "Japan",
        children: [
          { value: 7, label: "Tokyo" },
          { value: 8, label: "Osaka" },
          { value: 9, label: "Kyoto" }
        ]
      },
      {
        value: 10,
        label: "Korea",
        children: [
          { value: 11, label: "Seoul" },
          { value: 12, label: "Busan" },
          { value: 13, label: "Taegu" }
        ]
      }
    ]
  },
  {
    value: 14,
    label: "Europe",
    children: [
      {
        value: 15,
        label: "France",
        children: [
          { value: 16, label: "Paris" },
          { value: 17, label: "Marseille" },
          { value: 18, label: "Lyon" }
        ]
      },
      {
        value: 19,
        label: "UK",
        children: [
          { value: 20, label: "London" },
          { value: 21, label: "Birmingham" },
          { value: 22, label: "Manchester" }
        ]
      }
    ]
  },
  {
    value: 23,
    label: "North America",
    children: [
      {
        value: 24,
        label: "US",
        children: [
          { value: 25, label: "New York" },
          { value: 26, label: "Los Angeles" },
          { value: 27, label: "Washington" }
        ]
      },
      {
        value: 28,
        label: "Canada",
        children: [
          { value: 29, label: "Toronto" },
          { value: 30, label: "Montreal" },
          { value: 31, label: "Ottawa" }
        ]
      }
    ]
  }
];
const basicInfoRules = reactive<FormRules<BasicInfoRuleForm>>({
  name: [
    { required: true, message: "请填写课程名称", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" }
  ],
  category: [
    {
      required: true,
      message: "请填写课程分类",
      trigger: "change"
    }
  ],
  cost: [
    {
      required: true,
      message: "请填写课时费用",
      trigger: "blur"
    }
  ],
  minPrice: [
    {
      required: true,
      message: "请填写底价",
      trigger: "blur"
    }
  ],
  // student: [
  //   {
  //     required: true,
  //     message: "请填写指定学生",
  //     trigger: "blur"
  //   }
  // ],
  duration: [
    {
      required: true,
      message: "请填写开课时长",
      trigger: "blur"
    }
  ],
  auctionStartTime: [
    {
      required: true,
      message: "请填写起拍时间",
      trigger: "blur"
    }
  ],
  regDeadline: [
    {
      required: true,
      message: "请填写报名截止时间",
      trigger: "blur"
    }
  ],
  isAuction: [
    {
      required: true,
      trigger: "blur"
    }
  ]
});

const introRules = reactive<FormRules<IntroRuleForm>>({
  summary: [{ required: true, message: "请填写课程简介", trigger: "blur" }]
});

const posterRules = reactive<FormRules<posterRuleForm>>({
  summary: [{ required: true, message: "请填写课程简介", trigger: "blur" }]
});

const trialRules = reactive<FormRules<trialRuleForm>>({
  // trialRules: [{ required: false, message: "请填写课程简介", trigger: "blur" }]
});
// const resetForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   formEl.resetFields();
// };

const next = () => {
  if (active.value++ > 3) active.value = 0;
};

const toolbarConfig: any = { excludeKeys: "fullScreen" };
const editorConfig = { placeholder: "请输入内容..." };

const handleCreated = editor => {
  // 记录 editor 实例，重要！
  editorRef.value = editor;
};

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = rawFile => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

// const submitForm = async (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   await formEl.validate((valid, fields) => {
//     if (valid) {
//       console.log("submit!");
//     } else {
//       console.log("error submit!", fields);
//     }
//   });
// };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<template>
  <div style="height: 500px; overflow: auto">
    <!-- active：{{ active }} basicInfoForm{{ basicInfoForm }}--valueHtml:{{
      valueHtml
    }} -->
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="基本信息" />
      <el-step title="课程介绍" />
      <el-step title="课程海报" />
      <el-step title="试听课程" />
    </el-steps>

    <!-- 基本信息 -->
    <el-form
      v-if="active === 0"
      ref="basicInfoFormRef"
      :model="basicInfoForm"
      :rules="basicInfoRules"
      label-width="120px"
      class="demo-basicInfoForm"
      status-icon
    >
      <el-form-item label="课程名称" prop="name">
        <el-input v-model="basicInfoForm.name" />
      </el-form-item>
      <el-form-item label="课程分类" prop="category">
        <el-cascader
          v-model="basicInfoForm.category"
          :options="categoryOptions"
          :props="categoryProps"
          clearable
        />
      </el-form-item>
      <el-form-item label="拍卖课程" prop="isAuction">
        <el-radio-group v-model="basicInfoForm.isAuction">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="basicInfoForm.isAuction" label="底价" prop="minPrice">
        <el-input v-model="basicInfoForm.minPrice" />
      </el-form-item>
      <el-form-item
        v-if="!basicInfoForm.isAuction"
        label="课时费用"
        prop="cost"
      >
        <el-input v-model="basicInfoForm.cost" />
      </el-form-item>

      <el-form-item
        v-if="!basicInfoForm.isAuction"
        label="指定学生"
        prop="student"
      >
        <el-input v-model="basicInfoForm.student" />
      </el-form-item>
      <el-form-item label="开课时长" prop="duration">
        <el-input v-model="basicInfoForm.duration" />
      </el-form-item>
      <el-form-item label="报名截止时间" prop="regDeadline">
        <el-date-picker
          v-model="basicInfoForm.regDeadline"
          type="date"
          placeholder="请选择报名截止时间"
          clearable
        />
      </el-form-item>
      <el-form-item label="起拍时间" prop="auctionStartTime">
        <el-date-picker
          v-model="basicInfoForm.auctionStartTime"
          type="date"
          placeholder="请选择起拍时间"
          clearable
        />
      </el-form-item>
    </el-form>
    <!-- 课程介绍 -->
    <el-form
      v-if="active === 1"
      ref="introFormRef"
      :model="introForm"
      label-width="120px"
      class="introForm"
      status-icon
      :rules="introRules"
    >
      <el-form-item label="课程简介" prop="summary">
        <el-input v-model="introForm.summary" placeholder="请输入内容" />
      </el-form-item>

      <el-form-item label="课程简介" prop="summary">
        <div class="wangeditor">
          <Toolbar
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode"
            style="border: 1px solid #ccc"
          />
          <Editor
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            :mode="mode"
            style="height: 301px; overflow-y: hidden; border: 1px solid #ccc"
            @onCreated="handleCreated"
          />
        </div>
      </el-form-item>
    </el-form>
    <!-- 课程海报 -->
    <el-form
      v-if="active === 2"
      ref="posterFormRef"
      :model="posterForm"
      label-width="120px"
      class="posterForm"
      status-icon
      :rules="posterRules"
    >
      <el-form-item label="请上传海报" prop="summary">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <el-form
      v-if="active === 3"
      ref="trialFormRef"
      :model="trialForm"
      label-width="120px"
      class="trialForm"
      status-icon
      :rules="trialRules"
    >
      <el-form-item label="试听课件类型" prop="trialType">
        <el-radio-group v-model="trialForm.trialType">
          <el-radio label="video">视频</el-radio>
          <el-radio label="audio">音频</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
  <el-button style="margin-top: 12px" @click="next">保存并下一步</el-button>
</template>

<style scoped>
.avatar-uploader .avatar {
  display: block;
  width: 178px;
  height: 178px;
}
</style>

<style>
.avatar-uploader .el-upload {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  width: 178px;
  height: 178px;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
</style>
