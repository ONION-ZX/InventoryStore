import Vue from 'vue';

export default Vue.directive('top', {
    inserted: function(el) {
        el.addEventListener('click',() => {
            window.scrollTo(0,0);
        });
    }
})
