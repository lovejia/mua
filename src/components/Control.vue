<template>
  <!-- 播放器底部区域 -->
  <div class="footer">
    <div class="container">
      <div class="con-btn">
        <a @click="playPrev" class="player-btn btn-prev" title="上一首"></a>
        <a @click="playToggle" v-if="playing" class="player-btn btn-pause" title="暂停/继续"></a>
        <a @click="playToggle" v-else class="player-btn btn-play" title="暂停/继续"></a>
        <a @click="playNext" class="player-btn btn-next" title="下一首"></a>
        <a v-on:click="modeToggle" class="player-btn btn-order" :class="{'btn-order-list':mode==='list','btn-order-single':mode==='single','btn-order-random':mode==='random'}" title="循环控制"></a>
      </div>
      <!--class="con-btn"-->

      <div class="vol">
        <div class="quiet">
          <a href="javascript:;" class="player-btn btn-quiet" title="静音"></a>
        </div>
        <div class="volume">
          <div class="volume-box">
            <div id="volume-progress" class="mkpgb-area"></div>
          </div>
        </div>
      </div>
      <!--class="footer"-->

      <div class="progress">
        <div class="progress-box">
          <div id="music-progress" class="mkpgb-area"></div>
        </div>
      </div>
      <!--class="progress"-->
    </div>
    <!--class="container"-->
    <audio id="audio" ref="audio" @ended="playEnded"></audio>
  </div>
  <!--class="footer"-->
</template>
<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({ mode: state => state.control.mode }),
    ...mapGetters(["playing"])
  },
  methods: {
    ...mapMutations([]),
    ...mapActions([
      "playEnded",
      "playToggle",
      "playNext",
      "playPrev",
      "modeToggle"
    ])
  },
  mounted() {
    this.$store.dispatch("iniMusicList");
    this.$store.dispatch("attachPlayer", this.$refs.audio);
  },
  beforeDestroy() {
    this.$store.dispatch("detachPlayer");
  }
};
</script>
<style lang="less" scoped>
/* 宽度约束容器 */
.container {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* 底部 */
.footer {
  height: 100px;
  bottom: 0;
  width: 100%;
  position: absolute;
}

/* 带图片的按钮 */
.player-btn {
  background-image: url("~assets/player.png");
  opacity: 0.8;
  filter: alpha(opacity=80);
}
.player-btn:hover {
  opacity: 1;
  filter: alpha(opacity=100);
}
/* 暂停状态 */
.btn-state-paused {
  background-position: -30px 0;
}
/* 控制按钮(上一首、播放、下一首)区域 */
.con-btn {
  float: left;
  width: 130px;
  height: 100%;
  position: relative;
  margin: 0 10px;
}
.con-btn a {
  display: inline-block;
  position: absolute;
  top: 50%;
}
.btn-prev {
  background-position: 0 -30px;
  width: 19px;
  height: 20px;
  margin-top: -10px;
  left: 0;
}
.btn-pause {
  background-position: -30px 0;
  width: 19px;
  height: 29px;
  margin-top: -14.5px;
  left: 36%;
  margin-left: -10.5px;
}
.btn-play {
  width: 19px;
  height: 29px;
  margin-top: -14.5px;
  left: 36%;
  margin-left: -10.5px;
}
.btn-next {
  background-position: 0 -52px;
  right: 30%;
  width: 19px;
  height: 20px;
  margin-top: -10px;
}
.btn-order {
  background-size: 450%;
  right: 0;
  width: 25px;
  height: 25px;
  margin-top: -10px;
}
.btn-order-single {
  background-position: 0 -196px;
}
.btn-order-list {
  background-position: 0 -173px;
}
.btn-order-random {
  background-position: 0 -62px;
  height: 18px;
  margin-top: -9px;
}

/* 音乐进度条区域 */
.progress {
  width: auto;
  margin-left: 150px;
  margin-right: 200px;
  height: 100%;
  position: relative;
}

/* 限制进度条的盒子 */
.progress-box {
  position: absolute;
  height: 20px;
  left: 10px;
  right: 0;
  top: 50%;
  margin-top: -9px;
}

/* 音量控制区域 */
.vol {
  float: right;
  width: 200px;
  height: 100%;
  right: 0;
  position: relative;
}

.quiet {
  width: 60px;
  height: 100%;
  position: relative;
  float: left;
}
.btn-quiet {
  display: inline-block;
  position: absolute;
  width: 26px;
  height: 21px;
  top: 50%;
  right: 0;
  margin-top: -10px;
  background-position: 0 -144px;
}
.btn-state-quiet {
  background-position: 0 -182px;
}
.volume {
  position: relative;
  margin-left: 60px;
  height: 100%;
  overflow: hidden;
}
/* 限制声音进度条的盒子 */
.volume-box {
  position: absolute;
  height: 20px;
  left: 10px;
  right: 10px;
  top: 50%;
  margin-top: -10px;
}
/* 以下是孟坤进度条控件样式区域 */
/* 进度条可点击区域 */
.mkpgb-area {
  position: relative;
  cursor: pointer;
  height: 100%;
}
/* 进度条有背景区域 */
.mkpgb-bar {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  margin-top: -1px;
  border-radius: 2px;
  background-color: #808284;
  overflow: hidden;
}
/* 进度条已完成区域 */
.mkpgb-cur {
  position: absolute;
  background-color: #d8d8d8;
  width: 0;
  height: 2px;
  top: 50%;
  margin-top: -1px;
  border-radius: 2px;
  transition: all 0.25s ease;
  -webkit-transition: all 0.25s ease;
  -moz-transition: all 0.25s ease;
  -o-transition: all 0.25s ease;
  -ms-transition: all 0.25s ease;
}
/* 进度条小点 */
.mkpgb-dot {
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  position: absolute;
  left: 0px;
  margin-left: -5px;
  top: 50%;
  margin-top: -5px;
  transition: all 0.25s ease;
  -webkit-transition: all 0.25s ease;
  -moz-transition: all 0.25s ease;
  -o-transition: all 0.25s ease;
  -ms-transition: all 0.25s ease;
}
/* 进度条禁止点击样式 */
.mkpgb-locked {
  cursor: default;
}

/* 闪动效果作者：qiuye */
.dot-move {
  -webkit-box-shadow: 0 0 20px #fff;
  -moz-animation: dot-move 3s linear 2s infinite;
  -webkit-animation: dot-move 3s linear 2s infinite;
  -o-animation: dot-move 3s linear 2s infinite;
  -ms-animation: dot-move 3s linear 2s infinite;
  box-shadow: 0 0 20px #fff;
  animation: dot-move 3s linear 2s infinite;
}
@-webkit-keyframes dot-move {
  0% {
    -webkit-box-shadow: 0 0 20px #fff;
  }
  25% {
    -webkit-box-shadow: 0 0 10px #fff;
  }
  50% {
    -webkit-box-shadow: 0 0 0px #fff;
  }
  75% {
    -webkit-box-shadow: 0 0 10px #fff;
  }
  100% {
    -webkit-box-shadow: 0 0 20px #fff;
  }
}
@keyframes dot-move {
  0% {
    -webkit-box-shadow: 0 0 10px #363333;
  }
  25% {
    -webkit-box-shadow: 0 0 7px #363333;
  }
  50% {
    -webkit-box-shadow: 0 0 0px #fff;
  }
  75% {
    -webkit-box-shadow: 0 0 6px #fff;
  }
  100% {
    -webkit-box-shadow: 0 0 10px #363333;
  }
}
</style>
