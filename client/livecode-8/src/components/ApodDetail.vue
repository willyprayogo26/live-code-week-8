<template>
  <div class="card" id="detail">
    <div class="card-header">Detail</div>
    <div class="card-body">
      <h2 class="card-title">
        <u>{{detail.title}}</u>
      </h2>
      <div class="card-text">
        <h4>Description</h4>
        {{detail.desc}}
        <br>
        <br>
        <br>
        <h4>Date of picture</h4>
        {{detail.date}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ["detail"],
    name: "ApodDetail"
};
</script>

<style>
</style>
