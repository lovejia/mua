<template>
  <!-- 歌曲列表 -->
  <div class="music-list data-box">
    <div class="list-item list-head"> <span class="music-album"> 专辑 </span> <span class="auth-name"> 歌手 </span> <span class="music-name"> 歌曲 </span></div>

    <div v-for="(item, index) in musicList" :key="item.id" class="list-item" :class="{'list-playing':curIndex==index}">
      <span class="list-num">{{index + 1}}</span>
      <span class="list-mobile-menu"></span>
      <span class="music-album">{{item.album}}</span>
      <span class="auth-name">{{item.artist}}</span>
      <span class="music-name">
        <span class="music-name-cult">{{item.name}}</span>
        <div class="list-menu">
          <span class="list-icon icon-play" @click="playMusic(index)" title="点击播放这首歌"></span>
          <span class="list-icon icon-download" title="点击下载这首歌"></span>
          <span class="list-icon icon-share" title="点击分享这首歌"></span>
        </div>
      </span>
    </div>

    <div class="list-item text-center list-clickable" @click="clearMusics">清空列表</div>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      musicList: state => state.music.musicList
    }),
    ...mapGetters(["curIndex"])
  },
  methods: {
    ...mapMutations(["clearMusics"]),
    ...mapActions([]),
    playMusic(index) {
      this.$store.dispatch("playStart", this.$store.getters.getMusic(index));
    }
  }
};
</script>
<style lang="less" scoped>
/* 数据区域容器 */
.data-box {
  position: absolute;
  left: 10px;
  right: 10px;
  top: 10px;
  bottom: 10px;
  overflow-y: auto;
  text-align: left;
}

/*以下是播放列表 css 样式*/
/* 列表头 */
.list-head {
  height: 40px;
}

/* 一项数据 */
.list-item {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #bdbdbe;
  color: rgba(225, 225, 225, 0.8);
  font-size: 14px;
  overflow: hidden;
  border-bottom: 1px solid rgba(150, 150, 150, 0.1);
  cursor: default;
  position: relative;
}

/* 正在播放的那项 */
.list-playing {
  color: #fff;
}

/* 列表数字 */
.list-num {
  display: block;
  width: 30px;
  text-align: center;
  float: left;
  overflow: hidden;
}
/* 正在播放的那项数字 */
.list-playing .list-num {
  background: url("~assets/wave.gif") 10px 20px no-repeat;
  text-indent: -99px;
}

/* 音乐名字 */
.music-name {
  position: relative;
  display: block;
  width: auto;
  margin-left: 40px;
  margin-right: 300px;
  height: 100%;
  -webkit-user-select: none;
  -moz-user-select: none; /*禁止双击选定*/
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
/* 鼠标滑过时音乐名字被截断 */
.music-name-cult {
  display: block;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list-item:hover .music-name-cult {
  padding-right: 150px;
}
.list-playing:hover .music-name-cult {
  padding-right: 100px;
}
/* 作者名称与音乐专辑 */
.auth-name,
.music-album {
  position: relative;
  display: block;
  width: 150px;
  float: right;
  height: 100%;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 移动端的菜单图标 */
.list-mobile-menu {
  display: none;
}

/*列表中滑动出现的菜单*/
.list-menu {
  position: absolute;
  right: 10px;
  top: 50%;
  overflow: hidden;
  font-size: 0;
  height: 36px;
  margin-top: -18px;
  float: right;
  display: none;
}
.list-item:hover .list-menu {
  display: block;
}
.list-head:hover .list-menu {
  display: none;
}

/* 列表中滑动出现的小图标 */
.list-icon {
  display: block;
  width: 36px;
  height: 36px;
  background-image: url("~assets/icon_list_menu.png");
  float: left;
  margin-left: 10px;
  cursor: pointer;
}
.list-playing .icon-play {
  display: none;
}
.icon-play {
  background-position: -80px 0;
}
.icon-play:hover {
  background-position: -120px 0;
}
.icon-download {
  background-position: -80px -120px;
}
.icon-download:hover {
  background-position: -120px -120px;
}
.icon-share {
  background-position: -80px -40px;
}
.icon-share:hover {
  background-position: -120px -40px;
}

/* 分享弹窗中的链接框 */
.share-url {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  line-height: 30px;
  box-sizing: border-box;
  padding: 0 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1) inset;
  color: #333;
  height: 35px;
}
.share-tips {
  font-size: 12px;
  color: #a9a9a9;
}

/* 列表中可以被点击的横条 */
.list-clickable {
  cursor: pointer;
  text-align: center;
}
</style>
