<template>
  <div class="modalBg">
    <svg id="svg-spinner" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
      <circle cx="24" cy="4" r="4" fill="#fff" />
      <circle cx="12.19" cy="7.86" r="3.7" fill="#fffbf2" />
      <circle cx="5.02" cy="17.68" r="3.4" fill="#fef7e4" />
      <circle cx="5.02" cy="30.32" r="3.1" fill="#fef3d7" />
      <circle cx="12.19" cy="40.14" r="2.8" fill="#feefc9" />
      <circle cx="24" cy="44" r="2.5" fill="#feebbc" />
      <circle cx="35.81" cy="40.14" r="2.2" fill="#fde7af" />
      <circle cx="42.98" cy="30.32" r="1.9" fill="#fde3a1" />
      <circle cx="42.98" cy="17.68" r="1.6" fill="#fddf94" />
      <circle cx="35.81" cy="7.86" r="1.3" fill="#fcdb86" />
    </svg>
  </div>
</template>

<style scoped>
.modalBg {
  display: inline;
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(14, 13, 17, 0.637);
  /* Black w/ opacity */
}

#svg-spinner {
  -webkit-transition-property: -webkit-transform;
  -webkit-transition-duration: 1.2s;
  -webkit-animation-name: rotate;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;

  -moz-transition-property: -moz-transform;
  -moz-animation-name: rotate;
  -moz-animation-duration: 1.2s;
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;

  transition-property: transform;
  animation-name: rotate;
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
  }
}

@-moz-keyframes rotate {
  from {
    -moz-transform: rotate(0deg);
  }

  to {
    -moz-transform: rotate(360deg);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}


/* Rest of page style

#container{
  width:90%;
  max-width:700px;
  margin:1em auto;
  position:relative;
}
*/
/* spinner positioning */

#svg-spinner {
  position: absolute;
  top: 45%;
  left: 50%;
  margin-left: -24px;

}
</style>