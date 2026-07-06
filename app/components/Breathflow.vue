<template>
  <div class="w-screen h-[400px] flex items-center justify-center">
    <div class="flex items-center w-full px-8">
      <!-- 感測器 -->
      <div class="node">聲音傳感器</div>

      <!-- 分岔 -->
      <div class="w-16 h-32 flex-shrink-0 py-4">
        <svg class="w-full h-full">
          <line
            x1="0"
            y1="50%"
            x2="100%"
            y2="0"
            stroke="black"
            stroke-width="0.5"
          />
          <line
            x1="0"
            y1="50%"
            x2="100%"
            y2="100%"
            stroke="black"
            stroke-width="0.5"
          />
        </svg>
      </div>

      <!-- 分支 -->
      <div class="flex flex-col justify-between h-32 w-screen">
        <div class="flex items-center w-full">
          <div class="node">有偵測到訊號</div>
          <div class="line"></div>
          <div class="node">電磁閥通電</div>
          <div class="line"></div>
          <div class="node">充氣馬達啟動</div>
          <div class="line"></div>

          <div class="node">裝置膨脹・吐氣</div>

          <div class="line"></div>
        </div>

        <div class="flex items-center">
          <div class="node">無偵測到訊號</div>
          <div class="line"></div>
          <div class="node">電磁閥斷電</div>
          <div class="line"></div>
          <div class="node">抽氣馬達啟動</div>
          <div class="line"></div>
          <div class="node">裝置收縮・吸氣</div>
          <div class="line"></div>
        </div>
      </div>
      <!-- 循環 -->
      <div class="flex flex-col items-center h-32">
        <div
          class="self-start h-8 mt-5 border-r-[0.5px] border-t-[0.5px] border-black"
        ></div>

        <div
          class="border-[0.5px] border-black px-2 py-1 text-xs whitespace-nowrap"
        >
          循環
        </div>

        <div
          class="self-start h-8 mb-5 border-r-[0.5px] border-b-[0.5px] border-black"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.node {
  width: 120px; /* ✔ 固定寬度 */
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  border: 0.5px solid black;
  white-space: nowrap;
  flex-shrink: 0;
}

/* 循環區 */
.loop {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 128px;
  width: 64px;
}

.loop-line {
  flex: 1;
  width: 0.5px;
  background: black;
}

.loop-box {
  border: 0.5px solid black;
  font-size: 12px;
  padding: 2px 6px;
}

.line {
  flex: 1;
  height: 0.5px;
  background: black;
}
</style>
