<template>
    <div v-top class="top">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJESURBVGhD7do9SFVhHMfxC6Eg5JDZi6nV0NYUYVtbTlo4RQTORShBQ0SBUCG0VWtUkyK4BC0NLUH0Mjj1/mKoe9BWDVF9f+gf/ti5ds3nf+5z4/zgA/pcfe75ce+553mO1qpUyTubcQnP8B73cQwtlT68w68C19EyeYiiEuYkss9++IO+hqN46saeI/schx3wCw2s5ABs/JsGco/eNnbAjzWwkt2wcck+VZHcUhXJLY0WuYIhbEOWabSI9xFTGMchtKHpqVdEy5af8AXq+Y4n0HLmBPag9NQromzFMC7jAT7DF1jLHEZQWtYqUpR90O/cgF6Fr/AFPL2iZ1BK1ltkdXR+aDlzGnfxEj9gc6qozrfwbLRIUXTg+kCwec8iPBFFlKuweW9pIEV2omv5yz8SVeQCbN5pDWwk2qpq22oTfsEsDsOSfRF99PmTbrU7aEfWRTZhCTZRPY8w477PrsgAbBI5iE4MQgfvH/OyK6LFnT/ASVj0at2Df9xkV6Qb2n/7g9Qyw9IB3WC4iVewn8nyZN+O17DJZAJF6YFO+pQXrmRFlB14A1/mIspI0iKKLoZv4cucR3SSF1F2wV8Y5RwiE1JE6cUH+DKRi7mwIop2fX5Vqv3CGCISWkRRmXn4MtpLpE54EaUfn+DLnMKWhHTdCi+i6AbBAuzJIoUWUfZiEUVPnlJ4EWUURU+eUilF/H5Efz8ser//i9LOEUtLbHUbSVXkL2lqEd1cO5LIbTStSJSqyHqie19arkRqqf+eqPKfpVb7DYrb5Bc0QJ6EAAAAAElFTkSuQmCC">
    </div>
</template>
<script>
import '../directive/top';
export default {
    methods: {
    }
}
</script>

 <style scoped>
    .top {
        position: fixed;
        top: 93%;
        left: 93%;
    }
    img {
        width: 60%;
    }
 </style>
 