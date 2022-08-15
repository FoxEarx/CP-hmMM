<template>
  <div class="barrages-drop">
    <vue-baberrage
      :isShow="barrageIsShow"
      :barrageList="barrageList"
      :maxWordCount="maxWordCount"
      :throttleGap="throttleGap"
      :loop="barrageLoop"
      :boxHeight="boxHeight"
      :messageHeight="messageHeight"
    >
    </vue-baberrage>
  </div>
</template>
<script>
import Vue from "vue";
import { vueBaberrage, MESSAGE_TYPE } from "vue-baberrage";
Vue.use(vueBaberrage);
export default {
  name: "Barrages",
  data() {
    return {
      msg: "李娟娟,李娟娟,李娟娟",
      barrageIsShow: true,
      messageHeight: 3,
      boxHeight: 150,
      barrageLoop: true,
      maxWordCount: 3,
      throttleGap: 5000,
      barrageList: [],
    };
  },
  mounted() {
    this.addToList();
  },
  methods: {
    addToList() {
      let list = [
        {
          id: 1,
          avatar:
            "https://img1.baidu.com/it/u=3202982274,4058629737&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          msg: this.msg,
          time: 3,
          barrageStyle: "red",
        },
        {
          id: 2,
          avatar:
            "https://img1.baidu.com/it/u=3202982274,4058629737&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          msg: this.msg,
          time: 8,
          barrageStyle: "green",
        },
        {
          id: 3,
          avatar:
            "https://img1.baidu.com/it/u=3202982274,4058629737&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          msg: this.msg,
          time: 10,
          barrageStyle: "normal",
        },
        {
          id: 4,
          avatar:
            "https://img1.baidu.com/it/u=3202982274,4058629737&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          msg: this.msg,
          time: 5,
          barrageStyle: "blue",
        },
        {
          id: 5,
          avatar:
            "https://img1.baidu.com/it/u=3202982274,4058629737&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          msg: this.msg,
          time: 6,
          barrageStyle: "red",
        },
        {
          id: 6,
          avatar:
            "https://img1.baidu.com/it/u=3202982274,4058629737&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          msg: this.msg,
          time: 12,
          barrageStyle: "normal",
        },
        {
          id: 7,
          avatar:
            "https://img1.baidu.com/it/u=3202982274,4058629737&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          msg: this.msg,
          time: 5,
          barrageStyle: "red",
        },
        {
          id: 8,
          avatar:
            "https://img1.baidu.com/it/u=3202982274,4058629737&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          msg: this.msg,
          time: 14,
          barrageStyle: "normal",
        },
        {
          id: 9,
          avatar:
            "https://img1.baidu.com/it/u=3202982274,4058629737&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          msg: this.msg,
          time: 7,
          barrageStyle: "red",
        },
        {
          id: 10,
          avatar:
            "https://img1.baidu.com/it/u=3202982274,4058629737&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          msg: this.msg,
          time: 11,
          barrageStyle: "yellow",
        },
      ];
      list.forEach((v) => {
        this.barrageList.push({
          id: v.id,
          avatar: v.avatar,
          msg: v.msg,
          time: v.time,
          type: MESSAGE_TYPE.NORMAL,
          barrageStyle: v.barrageStyle,
        });
      });
    },
  },
};
</script>
<style lang="less">
.barrages-drop {
  .blue {
    border-radius: 100px;
    background: #e6ff75;
    color: #fff;
  }
  .green {
    border-radius: 100px;
    background: #75ffcd;
    color: #fff;
  }
  .red {
    border-radius: 100px;
    background: #e68fba;
    color: #fff;
  }
  .yellow {
    border-radius: 100px;
    background: #dfc795;
    color: #fff;
  }
  .baberrage-stage {
    position: absolute;
    width: 100%;
    height: 212px;
    overflow: hidden;
    bottom: 0;
    margin-top: 130px;
  }
}
</style>
