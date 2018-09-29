//播放控制器
export default {
  state: {
    audio: null, //播放器
    music: null, //当前播放歌曲
    status: "pause", //状态:暂停(pause)，播放(playing)
    mode: "order", //模式:列表循环(order)，随机播放(random)，单曲循环(single)
    progress: 0, //播放进度(0-100)
    volume: 50, //音量(0-100)
    mute: false //是否静音(bool)
  },
  getters: {
    getStatus: state => state.status,
    getMode: state => state.mode,
    getProgress: state => state.progress,
    getVolume: state => state.volume,
    getMute: state => state.mute
  },
  mutations: {
    setAudio(state, obj) {
      state.audio = obj;
    },
    setStatus(state, obj) {
      if (obj === "") {
        obj = state.status === "pause" ? "playing" : "pause";
      }
      if (obj === "pause") {
        state.status = "pause";
        state.audio.pause();
      } else {
        state.status = "playing";
        state.audio.play();
      }
    }
  },
  actions: {
    attachPlayer({ commit }, ele) {
      commit("setAudio", ele);
    },
    detachPlayer({ commit }) {
      commit("setAudio", null);
    },
    playStart({ commit }, obj) {},
    playNext({ commit }) {},
    playPrev({ commit }) {},
    playEnded({ commit }) {},
    playToggle({ commit }) {
      commit("setStatus", "");
    }
  }
};