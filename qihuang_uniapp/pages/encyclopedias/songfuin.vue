<template>
  <view class="page-container">
    <!-- 顶部导航栏 -->
    <view class="top-nav">
      <!-- 返回箭头 -->
    <view class="btn" @click="goToSongfu">
        <text class="iconfont icon-return">←</text>
      </view>
      
      <!-- 标题区域（歌赋、详解） -->
      <view class="nav-title-wrap">
        <text 
          :class="{'active-title': currentTab === 'song'}" 
          @click="currentTab = 'song'"
        >歌赋</text>
        <text 
          :class="{'active-title': currentTab === 'detail'}" 
          @click="currentTab = 'detail'"
        >详解</text>
      </view>
      
      <!-- 右侧占位 -->
      <view class="empty"></view>
    </view>

    <!-- 内容区域，根据 tab 切换显示 -->
    <view class="content-box">
      <!-- 歌赋内容 -->
      <view v-if="currentTab === 'song'">
        <view class="meridian-title">手太阴肺经</view>
        <view class="original-title">原文</view>
        <text class="original-text">
          手太阴肺中焦生，下络大肠出贲门①；\n
          上膈属肺从肺系，系横出腋臑中行②。\n
          肘臂寸口上鱼际，大指内侧爪甲根③。\n
          支络还从腕后出，接次指属阳明经④。\n
          此经多气而少血，是动则病喘与咳⑤，\n
          肺胀彭彭缺盆痛⑥，两手交瞀为臂厥⑦。\n
          所生病者为气嗽⑧，喘渴烦心胸满结⑨，\n
          臑臂之内前廉痛⑩，小便频数掌中热⑪。\n
          气虚肩背痛而寒⑫，气盛亦疼风汗出⑬，\n
          欠伸少气不足息⑭，遗失无度溺色赤⑮。
        </text>
        
        <view class="annotation-title">注释</view>
        <text class="annotation-text">
          ①贲门：胃之上口。\n
          ②臑：上臂部。\n
          ③鱼际：手掌大鱼际部。\n
          ④次指：食指。\n
          ⑤喘与咳：气喘与咳嗽。\n
          ⑥缺盆：锁骨上窝。\n
          ⑦交瞀：两手交替出现视物不清。\n
          ⑧气嗽：肺气上逆作咳。\n
          ⑨胸满结：胸部胀满痞结。\n
          ⑩前廉：指前臂掌面桡侧缘。\n
          ⑪掌中热：掌心发热。\n
          ⑫肩背痛而寒：肩背部疼痛且畏冷。\n
          ⑬风汗出：感受风邪而汗出。\n
          ⑭欠伸：呵欠、伸懒腰。\n
          ⑮遗失无度溺色赤：小便失禁或频数，尿液色赤。
        </text>
      </view>
      
      <!-- 详解内容 -->
      <view v-else>
        <view class="meridian-title">手太阴肺经</view>
        
        <view class="detail-section">
          <view class="detail-title">经脉循行</view>
          <text class="detail-content">
            手太阴肺经起于中焦胃脘部，向下联络大肠，回绕过来沿着胃的上口，通过横膈，属于肺脏，从肺系（气管、喉咙）横行出来（中府穴），向下沿上臂内侧，行于手少阴经和手厥阴经的前面，下行到肘窝中，沿着前臂内侧前缘，进入寸口，经过鱼际，沿着鱼际的边缘，出拇指内侧端（少商穴）。
          </text>
          <text class="detail-content">
            手腕后方的支脉：从列缺穴分出，一直走向食指内侧端（商阳穴），与手阳明大肠经相接。
          </text>
        </view>
        
        <view class="detail-section">
          <view class="detail-title">主治病候</view>
          <text class="detail-content">
            本经异常变动可出现以下病症：咳嗽，气喘，胸部满闷；锁骨上窝痛，肩背及上肢前边外侧发冷、麻木酸痛等症。
          </text>
          <text class="detail-content">
            本经腧穴主治喉、胸、肺病，以及经脉循行部位的其他病症。如咳嗽，气喘，少气不足以息，咳血，伤风，胸部胀满，咽喉肿痛，缺盆部及手臂内侧前缘痛，肩背寒冷、疼痛等症。
          </text>
        </view>
        
        <view class="detail-section">
          <view class="detail-title">经穴分布</view>
          <text class="detail-content">
            手太阴肺经共有11个穴位，包括：中府、云门、天府、侠白、尺泽、孔最、列缺、经渠、太渊、鱼际、少商。
          </text>
          
          <view class="acupoint-grid">
            <view class="acupoint-item">
              <text class="acupoint-name">中府</text>
              <text class="acupoint-desc">肺之募穴</text>
            </view>
            <view class="acupoint-item">
              <text class="acupoint-name">尺泽</text>
              <text class="acupoint-desc">合穴</text>
            </view>
            <view class="acupoint-item">
              <text class="acupoint-name">孔最</text>
              <text class="acupoint-desc">郄穴</text>
            </view>
            <view class="acupoint-item">
              <text class="acupoint-name">列缺</text>
              <text class="acupoint-desc">络穴；八脉交会穴</text>
            </view>
            <view class="acupoint-item">
              <text class="acupoint-name">太渊</text>
              <text class="acupoint-desc">输穴；原穴；八会穴之脉会</text>
            </view>
            <view class="acupoint-item">
              <text class="acupoint-name">少商</text>
              <text class="acupoint-desc">井穴</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 音频控制栏 -->
    <view class="audio-controls">
      <view class="audio-title">音频朗读</view>
      
      <view class="time-display">
        <text class="current-time">{{ currentTime }}</text>
        <text class="total-time">{{ totalTime }}</text>
      </view>
      
      <view class="progress-bar">
        <view class="progress-bg">
          <view class="progress-fill" :style="{ width: progress + '%' }"></view>
        </view>
      </view>
      
      <view class="audio-buttons">
        <view class="btn" @click="seek(-15)"><text class="iconfont icon-back">⏪</text></view>
        <view class="btn play-btn" @click="togglePlay">
          <text class="iconfont">{{ isPlaying ? '❚❚' : '▶' }}</text>
        </view>
        <view class="btn" @click="seek(15)"><text class="iconfont icon-forward">⏩</text></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 'song', // 当前显示的标签页：'song' 或 'detail'
      isPlaying: false, // 音频播放状态
      currentTime: '00:00', // 当前播放时间
      totalTime: '01:12', // 音频总时长
      progress: 0, // 播放进度百分比
      duration: 72, // 音频总秒数
      timer: null // 计时器
    }
  },
  methods: {
    // 返回上一页
     goToSongfu() {
          // 方式一：保留当前页面，跳转到应用内的某个页面（可返回）
          uni.navigateTo({
            url: '/pages/encyclopedias/songfu' // 替换为实际的 songfu 页面路径，根据项目 pages.json 配置的路径写
          });
    },
     
    // 切换播放状态
    togglePlay() {
      this.isPlaying = !this.isPlaying;
      
      if (this.isPlaying) {
        // 开始播放
        this.timer = setInterval(() => {
          if (this.progress < 100) {
            this.progress += 1;
            this.updateTime();
          } else {
            // 播放结束
            this.isPlaying = false;
            clearInterval(this.timer);
          }
        }, this.duration * 10); // 模拟播放进度
      } else {
        // 暂停播放
        clearInterval(this.timer);
      }
    },
    
    // 更新时间显示
    updateTime() {
      const seconds = Math.floor((this.progress / 100) * this.duration);
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      this.currentTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },
    
    // 调整进度
    seek(seconds) {
      let newProgress = this.progress + (seconds / this.duration * 100);
      newProgress = Math.max(0, Math.min(100, newProgress));
      this.progress = newProgress;
      this.updateTime();
    }
  },
  
  // 组件销毁时清除计时器
  onUnload() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
</script>

<style lang="scss" scoped>
/* 页面整体样式 */
.page-container {
  background-color: #f5ebdc;
  min-height: 100vh;
  font-family: 'PingFang SC', sans-serif;
}

/* 顶部导航栏 */
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #f5ebdc;
  border-bottom: 1px solid #e6d8c7;
}

.back-arrow {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b6d57;
  font-size: 18px;
}

.nav-title-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.nav-title-wrap text {
  font-size: 18px;
  padding: 6px 15px;
  color: #5b4638;
}

.active-title {
  color: #d9ba85;
  font-weight: bold;
  position: relative;
}

.active-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 2px;
  background-color: #d9ba85;
}

.empty {
  width: 30px;
}

/* 内容区域 */
.content-box {
  background: #fff;
  height: 1050rpx;
  margin: 12px 16px;
  padding: 16px;
  overflow-y: auto;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.meridian-title {
  font-size: 20px;
  text-align: center;
  color: #333;
  margin-bottom: 12px;
  font-weight: bold;
}

.original-title, .annotation-title, .detail-title {
  font-size: 17px;
  font-weight: bold;
  color: #333;
  margin: 12px 0 8px;
}

.original-text, .annotation-text, .detail-content {
  font-size: 15px;
  color: #555;
  line-height: 1.8;
  white-space: pre-line;
}

.detail-section {
  margin-bottom: 15px;
}

.acupoint-grid {
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
}

.acupoint-item {
  width: 50%;
  padding: 5px 0;
}

.acupoint-name {
  font-weight: bold;
  color: #333;
}

.acupoint-desc {
  font-size: 13px;
  color: #666;
}

/* 音频控制栏 */
.audio-controls {
  background: #fff;
  margin: 12px 16px;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.audio-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.time-display {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.progress-bar {
  height: 4px;
  background-color: #e6d8c7;
  border-radius: 2px;
  margin-bottom: 15px;
}

.progress-bg {
  position: relative;
  height: 100%;
}

.progress-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #d9ba85;
  border-radius: 2px;
}

.audio-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b6d57;
  font-size: 20px;
}

.play-btn {
  width: 50px;
  height: 50px;
  background-color: #8b6d57;
  border-radius: 50%;
  color: #fff;
  font-size: 22px;
}
</style>    