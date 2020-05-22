<template>
  <div class="message">
    <h2></h2>
  </div>
</template>

<style lang="scss" scoped>
.message {
  width: 1280px;
  padding: 20px 40px;
  margin: 0 auto;
  background: #fff;
  min-height: 500px;
  color: #333;
}

section {
  margin-bottom: 10px;
  border-bottom: 1px dashed #ccc;
  padding-bottom: 20px;
  .title {
    font-size: 18px;
    display: flex;
    align-items: center;
    &::before {
      content: "";
      display: inline-block;
      margin-right: 10px;
      width: 5px;
      height: 1em;
      background: #03a9f4;
    }
  }
  .content {
    padding: 10px 0;
    display: flex;
  }
  .main {
    flex: 1;
    padding-right: 20px;
    p {
      text-indent: 2em;
      margin-bottom: 5px;
    }
  }
  .img-wrap {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
