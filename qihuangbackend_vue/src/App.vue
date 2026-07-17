<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
    <Setings ref="setingsRef" />
  </div>
</template>

<script>
import { Local } from "@/utils/storage.js";
import Setings from "@/layout/navBars/breadcrumb/setings.vue";

export default {
  name: "App",
  components: { Setings },

  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  mounted() {
    this.openSetingsDrawer();
    this.getLayoutThemeConfig();
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    // 布局配置弹窗打开
    openSetingsDrawer() {
      this.bus.$on("openSetingsDrawer", () => {
        this.$refs.setingsRef.openDrawer();
      });
    },
    // 获取缓存中的布局配置
    getLayoutThemeConfig() {
      if (Local.get("themeConfigPrev")) {
        this.$store.dispatch(
          "themeConfig/setThemeConfig",
          Local.get("themeConfigPrev")
        );
        document.documentElement.style.cssText = Local.get("themeConfigStyle");
      } else {
        Local.set("themeConfigPrev", this.$store.state.themeConfig.themeConfig);
      }
    }
  },
  destroyed() {
    this.bus.$off("openSetingsDrawer");
  }
};
</script>
